import { Pool } from 'pg';

const pool = new Pool({
  // Use the postgres:// URL from your Supabase Dashboard -> Project Settings -> Database
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export default pool;
