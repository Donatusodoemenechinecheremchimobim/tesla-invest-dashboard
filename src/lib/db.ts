import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    // This tells Vercel to trust the Supabase certificate
    rejectUnauthorized: false 
  }
});

export default pool;