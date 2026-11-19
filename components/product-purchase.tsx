"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ProductPurchaseProps = {
  productId: string
  sizes: string[]
  colors: string[]
  inStock: boolean
}

export function ProductPurchase({
  productId,
  sizes,
  colors,
  inStock,
}: ProductPurchaseProps) {
  const router = useRouter()
  const [size, setSize] = useState(sizes[0] ?? "")
  const [color, setColor] = useState(colors[0] ?? "")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleCheckout() {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, size, color, quantity: 1 }),
      })

      if (response.status === 401) {
        const redirectUrl = encodeURIComponent(`/products/${productId}`)
        router.push(`/sign-in?redirect_url=${redirectUrl}`)
        return
      }

      const data = (await response.json()) as { url?: string; error?: string }

      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Could not start checkout.")
      }

      window.location.assign(data.url)
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : "Could not start checkout.",
      )
      setLoading(false)
    }
  }

  return (
    <div className="space-y-5">
      {sizes.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Select size</h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={size === option}
                onClick={() => setSize(option)}
                className={cn(
                  "rounded-md border px-4 py-2 text-sm font-medium transition-colors",
                  size === option
                    ? "border-primary bg-primary text-primary-foreground"
                    : "hover:bg-accent hover:text-accent-foreground",
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {colors.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Select color</h3>
          <div className="flex flex-wrap gap-2">
            {colors.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={color === option}
                onClick={() => setColor(option)}
                className={cn(
                  "rounded-md border px-4 py-2 text-sm font-medium transition-colors",
                  color === option
                    ? "border-primary bg-primary text-primary-foreground"
                    : "hover:bg-accent hover:text-accent-foreground",
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      <Button
        size="lg"
        className="w-full"
        disabled={!inStock || loading}
        onClick={handleCheckout}
      >
        {loading && <Loader2 className="size-4 animate-spin" />}
        {!inStock ? "Out of stock" : loading ? "Redirecting to Stripe…" : "Buy now"}
      </Button>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <p className="text-xs text-muted-foreground">
        Secure payment powered by Stripe. You will be redirected to Stripe to
        complete your order.
      </p>
    </div>
  )
}
