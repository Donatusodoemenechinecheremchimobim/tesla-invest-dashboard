#!/bin/bash
cat << 'EOF' > src/lib/db.ts
// @ts-ignore
import { Pool } from 'pg';

// This ensures the connection works even in serverless environments
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export default pool;
EOF