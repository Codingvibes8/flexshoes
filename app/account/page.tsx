import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

import { authHelpers } from "@/lib/auth/helpers"

export default async function AccountPage() {
  const userId = await authHelpers.getUserId()

  if (!userId) {
    redirect("/sign-in")
  }

  const user = await currentUser()

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
    </main>
  )
}
