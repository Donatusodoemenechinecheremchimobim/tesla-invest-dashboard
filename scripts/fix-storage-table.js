require('dotenv').config();
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function fix() {
  await pool.query(`ALTER TABLE snapshots ALTER COLUMN image_data TYPE TEXT;`);
  console.log("✅ Table optimized for URL storage.");
  pool.end();
}
fix();
