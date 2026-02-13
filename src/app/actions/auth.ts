'use server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://imxtelulqiqylqsxwaja.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlteHJ0ZWx1bHFpcXlscXN4d2FqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwMDMxOTcsImV4cCI6MjA4NjU3OTE5N30.lum9pXI7PB-HS82uq_rP9Suhfj4zuF-5pNK_8-y0JrI';

const supabase = createClient(supabaseUrl, supabaseKey);

export async function handleServerAuth(formData: any, mode: 'login' | 'signup') {
  const email = formData.email;
  const password = formData.password;
  const fullName = formData.fullName;

  if (mode === 'signup') {
    return await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } }
    });
  } else {
    return await supabase.auth.signInWithPassword({ email, password });
  }
}
