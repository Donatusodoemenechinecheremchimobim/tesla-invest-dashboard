import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://imxtelulqiqylqsxwaja.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlteHJ0ZWx1bHFpcXlscXN4d2FqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwMDMxOTcsImV4cCI6MjA4NjU3OTE5N30.lum9pXI7PB-HS82uq_rP9Suhfj4zuF-5pNK_8-y0JrI';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'investment-tesla-auth'
  },
  global: {
    headers: { 'x-application-name': 'investment-tesla' }
  }
});

// Logic to log connection status in the browser console (Press F12 to see)
if (typeof window !== 'undefined') {
  fetch(supabaseUrl).then(() => console.log("✅ Supabase Reachable"))
    .catch(() => console.error("🚨 Supabase Blocked by Network/Adblocker"));
}
