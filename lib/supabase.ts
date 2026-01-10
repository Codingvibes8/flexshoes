import { createClient } from '@supabase/supabase-js'
import { Database } from './db/types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and anonymous key are required.')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

export default supabase