import { eq, sql } from "drizzle-orm"
import type Stripe from "stripe"

import { db } from "@/lib/db"
import { orders, products, type ShippingAddress } from "@/lib/db/schema"

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function toShippingAddress(
  session: Stripe.Checkout.Session,
): ShippingAddress | null {
  const address =
    session.collected_information?.shipping_details?.address ??
    session.customer_details?.address

  if (!address?.line1 || !address.city || !address.postal_code || !address.country) {
    return null
  }

  return {
    line1: address.line1,
    line2: address.line2 ?? undefined,
    city: address.city,
    region: address.state ?? undefined,
    postalCode: address.postal_code,
    country: address.country,
  }
}

/**
 * Persists a paid Checkout Session as an order and decrements stock.
 *
 * Called from both the Stripe webhook and the success page, so it is safe to
 * run more than once: the unique `stripe_session_id` column makes the second
 * call a no-op.
 */
export async function recordPaidCheckoutSession(
  session: Stripe.Checkout.Session,
) {
  if (session.payment_status !== "paid") {
    return null
  }

  const [existing] = await db
    .select()
    .from(orders)
    .where(eq(orders.stripeSessionId, session.id))
    .limit(1)

  if (existing) {
    return existing
  }

  const metadata = session.metadata ?? {}
  const userId = metadata.userId
  const productId = metadata.productId

  if (!userId || !productId || !UUID_PATTERN.test(productId)) {
    console.warn(
      `Checkout session ${session.id} is missing a valid userId/productId in metadata.`,
    )
    return null
  }

  const quantity = Math.max(1, Math.trunc(Number(metadata.quantity ?? 1)) || 1)
  const paymentIntentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : (session.payment_intent?.id ?? null)

  try {
    const [order] = await db
      .insert(orders)
      .values({
        userId,
        totalAmount: (session.amount_total ?? 0) / 100,
        status: "paid",
        shippingAddress: toShippingAddress(session),
        stripeSessionId: session.id,
        stripePaymentIntentId: paymentIntentId,
      })
      .returning()

    await db
      .update(products)
      .set({
        stock: sql`greatest(${products.stock} - ${quantity}, 0)`,
        updatedAt: new Date(),
      })
      .where(eq(products.id, productId))

    return order
  } catch (error) {
    // A concurrent webhook/success-page call may have inserted first.
    const [existingOrder] = await db
      .select()
      .from(orders)
      .where(eq(orders.stripeSessionId, session.id))
      .limit(1)

    if (existingOrder) {
      return existingOrder
    }

    throw error
  }
}
