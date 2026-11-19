import Stripe from "stripe"

const secretKey = process.env.STRIPE_SECRET_KEY

if (!secretKey) {
  throw new Error(
    "STRIPE_SECRET_KEY is not set. Add your Stripe secret key to .env.local.",
  )
}

/**
 * Server-side Stripe client. Never import this from a client component:
 * the secret key must stay on the server.
 */
export const stripe = new Stripe(secretKey, {
  appInfo: {
    name: "FlexShoes",
    version: "0.1.0",
  },
})

/** Currency used for Checkout line items. Must be lowercase ISO 4217. */
export const STRIPE_CURRENCY = (process.env.STRIPE_CURRENCY ?? "usd").toLowerCase()
