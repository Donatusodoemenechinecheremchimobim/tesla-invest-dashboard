require('dotenv').config();
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function update() {
  try {
    await pool.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS ssn VARCHAR(11),
      ADD COLUMN IF NOT EXISTS kyc_status VARCHAR(20) DEFAULT 'unverified', -- unverified, pending, approved
      ADD COLUMN IF NOT EXISTS id_document_url TEXT;
    `);
    console.log("✅ Database schema updated for SSN and KYC status.");
  } catch (err) { console.error(err); } finally { pool.end(); }
}
update();
