require('dotenv').config();
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function update() {
  try {
    // 1. Add verification status to users if it doesn't exist
    await pool.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE;`);

    // 2. Create snapshots table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS snapshots (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        image_data TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Database schema updated for Proctoring.");
  } catch (err) { console.error(err); } finally { pool.end(); }
}
update();
