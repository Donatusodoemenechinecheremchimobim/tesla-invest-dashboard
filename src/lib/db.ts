import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    // This is the critical line that fixes the "self-signed certificate" error
    rejectUnauthorized: false 
  }
});

export default pool;
