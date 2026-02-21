import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mnowlrfjavvwowwiauzs.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseAnonKey) {
  throw new Error('Falta VITE_SUPABASE_ANON_KEY en el entorno del frontend');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
