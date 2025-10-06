import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Validação rigorosa das variáveis de ambiente
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL) {
  throw new Error('VITE_SUPABASE_URL environment variable is required');
}

if (!SUPABASE_PUBLISHABLE_KEY) {
  throw new Error('VITE_SUPABASE_ANON_KEY environment variable is required');
}

// Validate URL format
try {
  new URL(SUPABASE_URL);
} catch {
  throw new Error('VITE_SUPABASE_URL must be a valid URL');
}

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: typeof window !== 'undefined' ? localStorage : undefined,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'studio-auth-token', // Isolamento de sessão para o Studio
  },
  realtime: {
    params: {
      eventsPerSecond: 2,
    },
  },
  global: {
    headers: {
      'X-Client-Info': 'psynka-studio-web',
      'X-Project-Context': 'studio', // Identificação específica do Studio
    },
  },
});