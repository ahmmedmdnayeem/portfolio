#!/usr/bin/env node
// Apply a specific migration file to Supabase via the SQL Editor API.
// Usage: node scripts/apply-migration.mjs supabase/migrations/003_restrict_admin_to_specific_user.sql

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

const file = process.argv[2];
if (!file) {
  console.error('Usage: node scripts/apply-migration.mjs <sql-file>');
  process.exit(1);
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) {
  console.error('❌ Missing Supabase env vars');
  process.exit(1);
}

const sql = await fs.readFile(file, 'utf8');
console.log(`→ Applying ${file} to ${url}\n`);

// Supabase does not expose a public REST endpoint for arbitrary SQL.
// We have to use the postgres-meta endpoint reserved for the studio UI.
// This works with the service_role key.
const res = await fetch(`${url}/rest/v1/rpc/exec_sql`, {
  method: 'POST',
  headers: {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ sql }),
});

if (res.status === 404) {
  console.log('ℹ exec_sql RPC not available (expected on default Supabase projects).');
  console.log('  Paste the SQL into the Supabase Dashboard → SQL Editor instead:\n');
  console.log('─'.repeat(60));
  console.log(sql);
  console.log('─'.repeat(60));
  process.exit(2);
}

if (!res.ok) {
  console.error(`❌ ${res.status} ${res.statusText}`);
  console.error(await res.text());
  process.exit(1);
}

console.log('✅ Migration applied');
