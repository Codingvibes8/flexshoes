import { supabase } from '../supabase'

export const authHelpers = {
  async signUp(email: string, password: string, userData?: any) {
    return supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
  },

  async signIn(email: string, password: string) {
    return supabase.auth.signInWithPassword({
      email,
      password
    })
  },

  async signOut() {
    return supabase.auth.signOut()
  },

  async getCurrentUser() {
    return supabase.auth.getUser()
  },

  async resetPassword(email: string) {
    return supabase.auth.resetPasswordForEmail(email)
  }
}
