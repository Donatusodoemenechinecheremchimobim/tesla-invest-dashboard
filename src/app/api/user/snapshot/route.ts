import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import pool from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { image } = await req.json();
    const cookieStore = await cookies();
    const session = cookieStore.get('portal_session');
    
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { id } = JSON.parse(session.value);

    // Hardcoded keys to bypass .env signature issues
    const SUPABASE_URL = "https://nkfmgbefjhpcabswjham.supabase.co";
    const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rZm1nYmVmamhwY2Fic3dqaGFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwNzM5MDgsImV4cCI6MjA4NjY0OTkwOH0.f1ziaEdwzk4A_uLbG4J1h-SV9Oqik4ehVWIvLr44kF0";

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    // Convert Base64 to Buffer (Stable binary upload)
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, 'base64');
    const fileName = `snap_${id}_${Date.now()}.jpg`;

    const { error: uploadError } = await supabase.storage
      .from('proctor-snapshots')
      .upload(fileName, buffer, {
        contentType: 'image/jpeg',
        upsert: true
      });

    if (uploadError) {
      console.error("❌ SNAPSHOT UPLOAD FAILED:", uploadError.message);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: { publicUrl } } = supabase.storage.from('proctor-snapshots').getPublicUrl(fileName);

    await pool.query(
      'INSERT INTO snapshots (user_id, image_data) VALUES ($1, $2)',
      [id, publicUrl]
    );

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("🚨 SNAPSHOT API CRASH:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
