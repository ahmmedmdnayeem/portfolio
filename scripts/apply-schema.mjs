#!/usr/bin/env node
// Applies supabase/migrations/001_initial_schema.sql via the Supabase Postgres
// connection string. Alternative path if you prefer to run the SQL by hand in
// the Supabase SQL Editor (which is also fine).
//
// Usage:  npm run apply:schema
//
// Requires SUPABASE_DB_URL in .env.local. Find it in:
//   Project Settings → Database → Connection string → URI
// Use the "Session" pooler (port 5432) and substitute your db password.

import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

async function loadEnv() {
  try {
    const txt = await fs.readFile(path.join(process.cwd(), '.env.local'), 'utf8');
    for (const line of txt.split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  } catch {}
}

await loadEnv();

const dbUrl = process.env.SUPABASE_DB_URL;
if (!dbUrl) {
  console.error('❌ SUPABASE_DB_URL not set in .env.local.');
  console.error('   Find it in Supabase: Project Settings → Database → Connection string → URI');
  console.error('   (Use the Session pooler and replace [YOUR-PASSWORD] with your db password.)');
  console.error('');
  console.error('   Easiest alternative: open Supabase → SQL Editor → paste the contents of');
  console.error('   supabase/migrations/001_initial_schema.sql → Run.');
  process.exit(1);
}

let pgModule;
try {
  pgModule = await import('pg');
} catch {
  console.error('❌ The `pg` package is not installed. Install it first:');
  console.error('   npm install --no-save pg');
  process.exit(1);
}

const { Client } = pgModule.default;
const sqlPath = path.join(process.cwd(), 'supabase', 'migrations', '001_initial_schema.sql');
const sql = await fs.readFile(sqlPath, 'utf8');

const client = new Client({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } });
console.log('→ Connecting to Supabase Postgres...');
await client.connect();
console.log('→ Applying schema...');
try {
  await client.query(sql);
  console.log('✅ Schema applied');
} catch (err) {
  console.error('❌ Schema apply failed:', err.message);
  process.exit(1);
} finally {
  await client.end();
}
