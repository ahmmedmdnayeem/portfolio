#!/usr/bin/env node
// Creates / updates the admin Supabase Auth user using credentials from .env.local.
//
// Usage:  npm run create:admin
//
// Reads ADMIN_EMAIL + ADMIN_PASSWORD from .env.local.
// Uses SUPABASE_SERVICE_ROLE_KEY to call admin auth APIs.

import { createClient } from '@supabase/supabase-js';
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

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

if (!url || url.includes('your-project') || !serviceKey || serviceKey.includes('your_service')) {
  console.error('❌ Supabase URL or service role key not configured in .env.local');
  process.exit(1);
}
if (!email || !password) {
  console.error('❌ ADMIN_EMAIL or ADMIN_PASSWORD missing in .env.local');
  process.exit(1);
}

const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

console.log(`→ Looking up existing user for ${email}...`);
const list = await supabase.auth.admin.listUsers();
if (list.error) {
  console.error('❌ listUsers failed:', list.error.message);
  process.exit(1);
}

const existing = list.data.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());

if (existing) {
  console.log(`  · user already exists (id=${existing.id}). Updating password...`);
  const upd = await supabase.auth.admin.updateUserById(existing.id, {
    password,
    email_confirm: true,
  });
  if (upd.error) {
    console.error('❌ update failed:', upd.error.message);
    process.exit(1);
  }
  console.log('✅ password updated, email confirmed');
} else {
  console.log('  · creating new admin user...');
  const cr = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (cr.error) {
    console.error('❌ create failed:', cr.error.message);
    process.exit(1);
  }
  console.log(`✅ admin user created (id=${cr.data.user.id})`);
}

console.log(`\nLog in at: ${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/login`);
console.log(`  email:    ${email}`);
console.log(`  password: ${password}`);
