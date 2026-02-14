require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const schema = `
  -- 1. CLEANUP
  DROP TABLE IF EXISTS notifications CASCADE;
  DROP TABLE IF EXISTS kyc_documents CASCADE;
  DROP TABLE IF EXISTS transactions CASCADE;
  DROP TABLE IF EXISTS investments CASCADE;
  DROP TABLE IF EXISTS users CASCADE;

  -- 2. CREATE CORE TABLES
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    balance DECIMAL(15, 2) DEFAULT 0.00,
    profit DECIMAL(15, 2) DEFAULT 0.00,
    status VARCHAR(50) DEFAULT 'active',
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE investments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    plan_name VARCHAR(100),
    amount DECIMAL(15, 2),
    status VARCHAR(50) DEFAULT 'active',
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50), -- deposit, withdrawal
    amount DECIMAL(15, 2),
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  -- 3. SEED ADMIN
  INSERT INTO users (email, password, first_name, last_name, is_admin, balance)
  VALUES ('admin@verde.com', 'admin123', 'Verde', 'Admin', TRUE, 1000000.00);
`;

async function setup() {
  try {
    console.log("⏳ Connecting to Supabase hyfaudwoepxqjzwkudpc...");
    await pool.query(schema);
    console.log("✅ TABLES CREATED SUCCESSFULLY.");
    console.log("👤 Admin Access: admin@verde.com / admin123");
  } catch (err) {
    console.error("❌ Database Error:", err.message);
  } finally {
    pool.end();
  }
}

setup();
