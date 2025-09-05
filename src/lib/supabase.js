import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ybetzuydubtcnebfagrr.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('Supabase configuration:', {
  url: supabaseUrl,
  hasKey: !!supabaseKey,
  keyPrefix: supabaseKey?.substring(0, 20) + '...'
})

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase configuration:', {
    url: supabaseUrl,
    key: supabaseKey ? 'Present' : 'Missing'
  })
}

export const supabase = createClient(supabaseUrl, supabaseKey)
