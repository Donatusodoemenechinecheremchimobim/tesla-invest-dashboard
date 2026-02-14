#!/bin/bash
cat << 'EOF' > src/lib/db.ts
// @ts-ignore
import { Pool } from 'pg';

const globalForPg = global as unknown as { pool: any };

const pool = globalForPg.pool || new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

if (process.env.NODE_ENV !== 'production') globalForPg.pool = pool;

export default pool;
EOF