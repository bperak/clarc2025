import { createClient } from '@supabase/supabase-js';

// src/lib/supabase/client.ts
// Provides a singleton Supabase client configured with credentials from environment variables.
// Keeping the client in its own module ensures we don't create multiple Supabase
// instances across the application.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  // Reason: Fail fast so that missing environment variables are caught early during development.
  throw new Error('Supabase environment variables are missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
}); 