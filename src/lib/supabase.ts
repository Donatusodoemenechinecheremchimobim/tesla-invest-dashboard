import { createClient } from '@supabase/supabase-js';

// Absolute Connection - No environment variables needed
const supabaseUrl = 'https://imxtelulqiqylqsxwaja.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlteHJ0ZWx1bHFpcXlscXN4d2FqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwMDMxOTcsImV4cCI6MjA4NjU3OTE5N30.lum9pXI7PB-HS82uq_rP9Suhfj4zuF-5pNK_8-y0JrI';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});
