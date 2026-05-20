#!/usr/bin/env node
// One-shot data migration: data/portfolio.json -> Supabase
//
// Usage:  npm run migrate:supabase
//
// Requires NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in .env.local.
// Service role key is used because we need to bypass RLS for the bulk insert.

import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

// --- Load .env.local manually (no dependency on dotenv) ---
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

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || url.includes('your-project') || !serviceKey || serviceKey.includes('your_service')) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing/placeholder in .env.local');
  process.exit(1);
}

const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

const dataPath = path.join(process.cwd(), 'data', 'portfolio.json');
const raw = await fs.readFile(dataPath, 'utf8').catch(() => null);
if (!raw) {
  console.error(`❌ Could not read ${dataPath}`);
  process.exit(1);
}
const store = JSON.parse(raw);

const TABLES = [
  'projects',
  'skills',
  'experience',
  'certifications',
  'testimonials',
  'contact_messages',
];

// Strip non-UUID local ids so Postgres can generate fresh UUIDs.
// (Our seed data uses ids like "1", "2" which aren't valid UUIDs.)
function cleanRow(table, row) {
  const out = { ...row };
  if (typeof out.id === 'string' && !/^[0-9a-f]{8}-[0-9a-f]{4}-/i.test(out.id)) {
    delete out.id;
  }
  // Don't pass updated_at / created_at — let Postgres defaults set them
  delete out.updated_at;
  return out;
}

async function migrateTable(table) {
  const rows = store[table] ?? [];
  if (!rows.length) {
    console.log(`  · ${table}: empty, skipping`);
    return { table, count: 0 };
  }

  console.log(`  · ${table}: deleting existing rows...`);
  const del = await supabase.from(table).delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (del.error) {
    console.error(`    ⚠ delete failed: ${del.error.message}`);
  }

  const cleaned = rows.map((r) => cleanRow(table, r));
  console.log(`  · ${table}: inserting ${cleaned.length} rows...`);
  const ins = await supabase.from(table).insert(cleaned).select('id');
  if (ins.error) {
    console.error(`    ❌ insert failed: ${ins.error.message}`);
    return { table, count: 0, error: ins.error.message };
  }
  console.log(`    ✓ inserted ${ins.data?.length ?? 0}`);
  return { table, count: ins.data?.length ?? 0 };
}

console.log(`\n→ Migrating ${dataPath} → ${url}\n`);

const results = [];
for (const t of TABLES) {
  results.push(await migrateTable(t));
}

console.log('\nSummary:');
for (const r of results) {
  console.log(`  ${r.error ? '✗' : '✓'} ${r.table.padEnd(20)} ${r.count} rows${r.error ? ` — ${r.error}` : ''}`);
}

const hasErrors = results.some((r) => r.error);
console.log(hasErrors ? '\n⚠ Migration completed with errors' : '\n✅ Migration complete');
process.exit(hasErrors ? 1 : 0);
