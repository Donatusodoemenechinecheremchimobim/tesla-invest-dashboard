import { Pool } from 'pg';

const isProduction = process.env.NODE_SET === 'production' || process.env.VERCEL === '1';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    // This is the absolute requirement for Supabase + Vercel
    rejectUnauthorized: false
  },
  // Extra stability for serverless
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

export default pool;
