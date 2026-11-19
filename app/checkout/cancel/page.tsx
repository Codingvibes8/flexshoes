import Link from "next/link"
import { XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function CheckoutCancelPage() {
  return (
    <main className="container mx-auto max-w-2xl px-4 py-40">
      <div className="space-y-6 rounded-lg border p-8 text-center">
        <XCircle className="mx-auto size-12 text-destructive" />
        <h1 className="text-3xl font-bold">Checkout cancelled</h1>
        <p className="text-muted-foreground">
          You have not been charged. Your card details were not saved.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/products">Back to products</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
