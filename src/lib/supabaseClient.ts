import { createClient } from '@supabase/supabase-js';

// Project: wazjqsbrafnxpzrrekhu
const supabaseUrl = "https://wazjqsbrafnxpzrrekhu.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indhempxc2JyYWZueHB6cnJla2h1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExNTQ2MDgsImV4cCI6MjA4NjczMDYwOH0.VwG73_vS_qDQjTNKUHOUBukR2fdKlYqz7jh8YdXsZd0";

export const supabase = createClient(supabaseUrl, supabaseKey);
