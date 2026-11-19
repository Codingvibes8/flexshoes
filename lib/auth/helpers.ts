import { auth, currentUser } from "@clerk/nextjs/server"

export const authHelpers = {
  /**
   * Returns the signed-in Clerk user, or null when there is no session.
   * Clerk stores users, so there is no local users table to query.
   */
  async getCurrentUser() {
    const { userId } = await auth()

    if (!userId) {
      return { data: null, error: null }
    }

    try {
      const user = await currentUser()
      return { data: user, error: null }
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error : new Error(String(error)),
      }
    }
  },

  /** Returns the Clerk user id for the current session, or null. */
  async getUserId() {
    const { userId } = await auth()
    return userId
  },

  /** Throws when the request is unauthenticated. Use in server actions/route handlers. */
  async requireUserId() {
    const { userId } = await auth()

    if (!userId) {
      throw new Error("Unauthorized")
    }

    return userId
  },

  /** Returns the current session claims (role, metadata, etc.). */
  async getSessionClaims() {
    const { sessionClaims } = await auth()
    return sessionClaims
  },
}
