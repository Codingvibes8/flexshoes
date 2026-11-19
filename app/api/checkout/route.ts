import { NextResponse } from "next/server"

import { authHelpers } from "@/lib/auth/helpers"
import { dbHelpers } from "@/lib/db/helpers"
import { STRIPE_CURRENCY, stripe } from "@/lib/stripe"

export const runtime = "nodejs"

const MAX_QUANTITY = 10

type CheckoutBody = {
  productId?: string
  size?: string
  color?: string
  quantity?: number
}

function resolveOrigin(request: Request) {
  const configured = process.env.NEXT_PUBLIC_APP_URL?.trim()
  if (configured) {
    return configured.replace(/\/+$/, "")
  }
  return new URL(request.url).origin
}

function absoluteImageUrl(imageUrl: string, origin: string) {
  if (/^https?:\/\//i.test(imageUrl)) {
    return imageUrl
  }
  return `${origin}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`
}

export async function POST(request: Request) {
  let userId: string

  try {
    userId = await authHelpers.requireUserId()
  } catch {
    return NextResponse.json(
      { error: "Please sign in before checking out." },
      { status: 401 },
    )
  }

  let body: CheckoutBody

  try {
    body = (await request.json()) as CheckoutBody
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 })
  }

  const { productId, size, color } = body
  const quantity = Math.min(
    Math.max(Math.trunc(Number(body.quantity ?? 1)) || 1, 1),
    MAX_QUANTITY,
  )

  if (!productId) {
    return NextResponse.json({ error: "productId is required." }, { status: 400 })
  }

  const { data: product, error } = await dbHelpers.getProductById(productId)

  if (error) {
    console.error("Checkout: failed to load product", error)
    return NextResponse.json({ error: "Could not load product." }, { status: 500 })
  }

  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 })
  }

  if (product.stock < quantity) {
    return NextResponse.json(
      { error: "This product is out of stock." },
      { status: 409 },
    )
  }

  const origin = resolveOrigin(request)
  const unitAmount = Math.round((product.salePrice ?? product.price) * 100)

  if (unitAmount <= 0) {
    return NextResponse.json({ error: "Invalid product price." }, { status: 400 })
  }

  const details = [product.brand, size ? `Size ${size}` : null, color]
    .filter(Boolean)
    .join(" · ")

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity,
          price_data: {
            currency: STRIPE_CURRENCY,
            unit_amount: unitAmount,
            product_data: {
              name: product.name,
              description: details || undefined,
              images: [absoluteImageUrl(product.imageUrl, origin)],
            },
          },
        },
      ],
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/products/${product.id}`,
      metadata: {
        userId,
        productId: product.id,
        quantity: String(quantity),
        ...(size ? { size } : {}),
        ...(color ? { color } : {}),
      },
      shipping_address_collection: {
        allowed_countries: [
          "US",
          "GB",
          "CA",
          "AU",
          "DE",
          "FR",
          "NL",
          "IE",
          "ES",
          "IT",
        ],
      },
      phone_number_collection: { enabled: true },
      allow_promotion_codes: true,
    })

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a checkout URL." },
        { status: 502 },
      )
    }

    return NextResponse.json({ url: session.url })
  } catch (stripeError) {
    console.error("Checkout: failed to create Stripe session", stripeError)
    const message =
      stripeError instanceof Error ? stripeError.message : "Stripe request failed."
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
