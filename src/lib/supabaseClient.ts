import { createClient } from '@supabase/supabase-js';

// Hardcoded project credentials to ensure immediate connection
const supabaseUrl = "https://nkfmgbefjhpcabswjham.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rZm1nYmVmamhwY2Fic3dqaGFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExMjM5MDgsImV4cCI6MjA4NjY0OTkwOH0.f1ziaEdwzk4A_uLbG4J1h-SV9Oqik4ehVWIvLr44kF0";

// Initialize the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);
