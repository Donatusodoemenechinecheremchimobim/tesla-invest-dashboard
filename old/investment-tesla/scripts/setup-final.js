require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Required for Supabase
});

const schema = `
  -- 1. DROP EVERYTHING (FRESH START)
  DROP TABLE IF EXISTS notifications CASCADE;
  DROP TABLE IF EXISTS kyc_documents CASCADE;
  DROP TABLE IF EXISTS transactions CASCADE;
  DROP TABLE IF EXISTS investments CASCADE;
  DROP TABLE IF EXISTS users CASCADE;

  -- 2. USERS TABLE
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Plain text for now as per request
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(50),
    country VARCHAR(100),
    balance DECIMAL(15, 2) DEFAULT 0.00,
    profit DECIMAL(15, 2) DEFAULT 0.00,
    status VARCHAR(50) DEFAULT 'active', -- active, suspended
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  -- 3. INVESTMENTS TABLE
  CREATE TABLE investments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    plan_name VARCHAR(100), -- 'Gold', 'Premium', 'Tesla'
    amount DECIMAL(15, 2) NOT NULL,
    roi DECIMAL(5, 2), -- Return on Investment %
    status VARCHAR(50) DEFAULT 'active', -- active, completed, cancelled
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP
  );

  -- 4. TRANSACTIONS TABLE
  CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- deposit, withdrawal, bonus, profit
    amount DECIMAL(15, 2) NOT NULL,
    currency VARCHAR(20) DEFAULT 'USD',
    wallet_address TEXT, -- For withdrawals
    status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  -- 5. KYC DOCUMENTS TABLE
  CREATE TABLE kyc_documents (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    document_type VARCHAR(50), -- passport, id_card, driver_license
    file_url TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  -- 6. NOTIFICATIONS TABLE
  CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200),
    message TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  -- 7. SEED DATA (Default Admin)
  INSERT INTO users (email, password, first_name, last_name, is_admin, balance, status)
  VALUES 
  ('admin@verde.com', 'admin123', 'Verde', 'Admin', TRUE, 1000000.00, 'active'),
  ('user@demo.com', 'user123', 'John', 'Doe', FALSE, 500.00, 'active');
`;

async function setup() {
  try {
    console.log("⏳ Connecting to Database...");
    await pool.query(schema);
    console.log("✅ TABLES CREATED SUCCESSFULLY.");
    console.log("👤 Admin Created: admin@verde.com / admin123");
    console.log("👤 Demo User Created: user@demo.com / user123");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await pool.end();
  }
}

setup();
