import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Debugging: Log to console if keys are missing (Check your F12 Console)
if (!supabaseUrl || !supabaseKey) {
  console.error("🚨 CRITICAL ERROR: Supabase keys are missing! Check .env.local");
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseKey || 'placeholder-key'
);
