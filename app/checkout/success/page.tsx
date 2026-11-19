import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { recordPaidCheckoutSession } from "@/lib/orders"
import { stripe } from "@/lib/stripe"

type CheckoutSuccessPageProps = {
  searchParams: Promise<{ session_id?: string }>
}

function formatAmount(amountInCents: number | null, currency: string | null) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: (currency ?? "usd").toUpperCase(),
  }).format((amountInCents ?? 0) / 100)
}

export default async function CheckoutSuccessPage({
  searchParams,
}: CheckoutSuccessPageProps) {
  const { session_id: sessionId } = await searchParams

  let session = null

  if (sessionId) {
    try {
      session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["line_items"],
      })
    } catch (error) {
      console.error("Could not retrieve Checkout Session:", error)
    }
  }

  if (session) {
    try {
      // Backup for the webhook so local development works without `stripe listen`.
      await recordPaidCheckoutSession(session)
    } catch (error) {
      console.error("Could not record order from success page:", error)
    }
  }

  const paid = session?.payment_status === "paid"
  const itemName = session?.line_items?.data[0]?.description

  return (
    <main className="container mx-auto max-w-2xl px-4 py-40">
      <div className="space-y-6 rounded-lg border p-8 text-center">
        <CheckCircle2 className="mx-auto size-12 text-green-600" />
        <h1 className="text-3xl font-bold">
          {paid ? "Payment received" : "Thank you for your order"}
        </h1>

        {session ? (
          <div className="space-y-2 text-muted-foreground">
            <p>
              {formatAmount(session.amount_total, session.currency)} paid
              {session.customer_details?.email
                ? ` · receipt sent to ${session.customer_details.email}`
                : ""}
            </p>
            {itemName && <p>{itemName}</p>}
            <p className="text-xs">Order reference: {session.id}</p>
          </div>
        ) : (
          <p className="text-muted-foreground">
            We could not find the payment details, but if you were charged you
            will receive a receipt by email.
          </p>
        )}

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/account">View your orders</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/products">Continue shopping</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
