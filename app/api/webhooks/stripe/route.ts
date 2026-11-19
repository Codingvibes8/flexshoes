import { NextResponse } from "next/server"
import type Stripe from "stripe"

import { recordPaidCheckoutSession } from "@/lib/orders"
import { stripe } from "@/lib/stripe"

export const runtime = "nodejs"

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature")
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Missing Stripe signature or STRIPE_WEBHOOK_SECRET." },
      { status: 400 },
    )
  }

  const payload = await request.text()

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid signature."
    console.error("Stripe webhook signature verification failed:", message)
    return NextResponse.json({ error: message }, { status: 400 })
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded":
        await recordPaidCheckoutSession(event.data.object)
        break
      default:
        break
    }
  } catch (error) {
    console.error(`Stripe webhook handler failed for ${event.type}:`, error)
    // Returning 500 makes Stripe retry the delivery.
    return NextResponse.json({ error: "Webhook handler failed." }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
