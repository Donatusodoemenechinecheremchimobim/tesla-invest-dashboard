import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import pool from '@/lib/db';

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get('portal_session');

  if (!session) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  try {
    const { id } = JSON.parse(session.value);
    const result = await pool.query(
      'SELECT id, email, first_name, last_name, balance, profit, kyc_status, is_verified FROM users WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    return NextResponse.json({ user: result.rows[0] });
  } catch (err) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
