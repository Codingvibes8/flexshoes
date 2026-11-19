import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

import { authHelpers } from "@/lib/auth/helpers"
import { dbHelpers } from "@/lib/db/helpers"

function formatAmount(amount: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount)
}

export default async function AccountPage() {
  const userId = await authHelpers.getUserId()

  if (!userId) {
    redirect("/sign-in")
  }

  const user = await currentUser()
  const { data: orders, error } = await dbHelpers.getOrdersByUserId(userId)

  if (error) {
    console.error("Error fetching orders:", error)
  }

  return (
    <main className="container mx-auto px-4 py-40">
      <h1 className="mb-8 text-4xl font-bold">Your Account</h1>

      <section className="max-w-xl space-y-3 rounded-lg border p-6">
        <p className="text-lg font-semibold">
          {user?.firstName || user?.username || "FlexShoes customer"}
        </p>
        <p className="text-muted-foreground">
          {user?.primaryEmailAddress?.emailAddress}
        </p>
        <p className="text-sm text-muted-foreground">
          Signed in with Clerk user ID: {userId}
        </p>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="mb-4 text-2xl font-bold">Your Orders</h2>

        {!orders || orders.length === 0 ? (
          <p className="text-muted-foreground">You have not placed any orders yet.</p>
        ) : (
          <ul className="space-y-3">
            {orders.map((order) => (
              <li
                key={order.id}
                className="flex flex-col gap-1 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold">{formatAmount(order.totalAmount)}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <span className="w-fit rounded-full border px-3 py-1 text-xs font-medium capitalize">
                  {order.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}
