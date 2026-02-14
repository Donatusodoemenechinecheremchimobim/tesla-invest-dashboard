"use server";

import pool from '@/lib/db';
import { cookies } from 'next/headers';

export async function handleServerAuth(data: any, mode: 'login' | 'signup') {
  const { email, password, fullName } = data;

  try {
    if (mode === 'signup') {
      const nameParts = fullName.split(' ');
      await pool.query(
        'INSERT INTO users (email, password, first_name, last_name, full_name, balance, profit, kyc_status) VALUES ($1, $2, $3, $4, $5, 0.00, 0.00, $6)',
        [email, password, nameParts[0] || 'Client', nameParts.slice(1).join(' ') || '', fullName, 'unverified']
      );
    }

    const userRes = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
    
    if (userRes.rows.length === 0) return { error: 'Invalid credentials' };

    const user = userRes.rows[0];
    const cookieStore = await cookies();
    
    cookieStore.set('portal_session', JSON.stringify({ id: user.id, email: user.email }), {
      httpOnly: true,
      secure: true, // Always true for Vercel HTTPS
      maxAge: 60 * 60 * 24,
      path: '/',
      sameSite: 'lax'
    });

    return { success: true };
  } catch (err: any) {
    return { error: 'Auth failed: ' + err.message };
  }
}
