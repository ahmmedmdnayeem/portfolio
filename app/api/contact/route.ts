import { NextResponse } from 'next/server';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/server';
import { insertRow } from '@/lib/store/local';

const recent = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (arr.length >= MAX_PER_WINDOW) return true;
  arr.push(now);
  recent.set(ip, arr);
  return false;
}

interface ContactBody {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  projectType?: string;
  budget?: string;
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests. Try again later.' }, { status: 429 });
  }

  let body: ContactBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { name, email, message } = body;
  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }
  if (name.length > 100 || email.length > 200 || message.length > 5000) {
    return NextResponse.json({ error: 'Field length exceeded' }, { status: 400 });
  }

  if (!isSupabaseConfigured()) {
    await insertRow('contact_messages', {
      name,
      email,
      subject: body.subject ?? null,
      message,
      project_type: body.projectType ?? null,
      budget_range: body.budget ?? null,
      status: 'unread',
      ip_address: ip === 'unknown' ? null : ip,
      user_agent: req.headers.get('user-agent') ?? null,
    });
    return NextResponse.json({ success: true });
  }

  const supabase = createClient();
  const { error } = await supabase.from('contact_messages').insert({
    name,
    email,
    subject: body.subject ?? null,
    message,
    project_type: body.projectType ?? null,
    budget_range: body.budget ?? null,
    ip_address: ip === 'unknown' ? null : ip,
    user_agent: req.headers.get('user-agent') ?? null,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}