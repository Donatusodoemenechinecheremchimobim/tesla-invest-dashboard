require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const schema = `
  -- 1. FRESH START (DROP EXISTING)
  DROP TABLE IF EXISTS notifications CASCADE;
  DROP TABLE IF EXISTS kyc_documents CASCADE;
  DROP TABLE IF EXISTS transactions CASCADE;
  DROP TABLE IF EXISTS investments CASCADE;
  DROP TABLE IF EXISTS users CASCADE;

  -- 2. CREATE TABLES
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
    roi DECIMAL(5, 2),
    status VARCHAR(50) DEFAULT 'active',
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP
  );

  CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50),
    amount DECIMAL(15, 2),
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE kyc_documents (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    document_type VARCHAR(50),
    file_url TEXT,
    status VARCHAR(50) DEFAULT 'pending'
  );

  CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200),
    message TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  -- 3. SEED DATA
  INSERT INTO users (email, password, first_name, last_name, is_admin, balance)
  VALUES 
  ('admin@verde.com', 'admin123', 'Verde', 'Admin', TRUE, 1000000.00),
  ('user@demo.com', 'user123', 'John', 'Doe', FALSE, 500.00);
`;

async function setup() {
  try {
    console.log("⏳ Initializing Database Tables...");
    await pool.query(schema);
    console.log("✅ TABLES CREATED.");
    console.log("👤 Admin: admin@verde.com / admin123");
  } catch (err) {
    console.error("❌ DB Setup Error:", err);
  } finally {
    await pool.end();
  }
}

setup();
