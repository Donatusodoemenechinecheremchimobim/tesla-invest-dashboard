import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import pool from '@/lib/db';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const ssn = formData.get('ssn') as string;

    const cookieStore = await cookies();
    const session = cookieStore.get('portal_session');
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { id } = JSON.parse(session.value);

    // Using the exact keys you provided to bypass environment issues
    const SUPABASE_URL = "https://nkfmgbefjhpcabswjham.supabase.co";
    const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rZm1nYmVmamhwY2Fic3dqaGFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwNzM5MDgsImV4cCI6MjA4NjY0OTkwOH0.f1ziaEdwzk4A_uLbG4J1h-SV9Oqik4ehVWIvLr44kF0";

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    const arrayBuffer = await file.arrayBuffer();
    const fileData = new Uint8Array(arrayBuffer);
    const fileName = `kyc_${id}_${Date.now()}.jpg`;

    const { data, error: uploadError } = await supabase.storage
      .from('user-kyc')
      .upload(fileName, fileData, { contentType: file.type, upsert: true });

    if (uploadError) {
      console.error("❌ STORAGE ERROR:", uploadError.message);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: { publicUrl } } = supabase.storage.from('user-kyc').getPublicUrl(fileName);

    await pool.query(
      'UPDATE users SET ssn = $1, id_document_url = $2, kyc_status = $3 WHERE id = $4',
      [ssn, publicUrl, 'pending', id]
    );

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("🚨 SIGNATURE ERROR FIX:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
