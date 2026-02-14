import { Pool } from 'pg';

// Prevents multiple pools from being created during Next.js Hot Module Replacement (HMR)
const globalForPg = global as unknown as { pool: Pool };

const pool = globalForPg.pool || new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Critical for Supabase
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 30000,
  max: 10, // Recommended for serverless environments
});

if (process.env.NODE_ENV !== 'production') globalForPg.pool = pool;

// Updated to show the CORRECT project ID from your new URL
console.log("🔌 Database Pool Active: hyfaudwoepxqjzwkudpc");

export default pool;
