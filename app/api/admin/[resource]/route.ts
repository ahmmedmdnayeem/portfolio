import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth/check';
import { ALLOWED_TABLES, insertRow, listTable, type StoreTable } from '@/lib/store/local';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/server';

function isAllowed(r: string): r is StoreTable {
  return (ALLOWED_TABLES as readonly string[]).includes(r);
}

function orderingFor(resource: StoreTable): { col: string; ascending: boolean } {
  if (resource === 'contact_messages') return { col: 'created_at', ascending: false };
  return { col: 'sort_order', ascending: true };
}

export async function GET(
  _req: Request,
  { params }: { params: { resource: string } },
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!isAllowed(params.resource)) {
    return NextResponse.json({ error: 'Unknown resource' }, { status: 400 });
  }

  if (isSupabaseConfigured()) {
    const { col, ascending } = orderingFor(params.resource);
    const supabase = createClient();
    const { data, error } = await supabase
      .from(params.resource)
      .select('*')
      .order(col, { ascending });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ rows: data ?? [] });
  }

  const { col, ascending } = orderingFor(params.resource);
  const rows = await listTable(params.resource, { orderBy: col, desc: !ascending });
  return NextResponse.json({ rows });
}

export async function POST(
  req: Request,
  { params }: { params: { resource: string } },
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!isAllowed(params.resource)) {
    return NextResponse.json({ error: 'Unknown resource' }, { status: 400 });
  }
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (isSupabaseConfigured()) {
    // Strip non-UUID id (the local store uses simple "1","2" ids that aren't valid UUIDs)
    if (typeof body.id === 'string' && !/^[0-9a-f]{8}-[0-9a-f]{4}-/i.test(body.id)) {
      delete body.id;
    }
    delete body.created_at;
    delete body.updated_at;
    const supabase = createClient();
    const { data, error } = await supabase
      .from(params.resource)
      .insert(body)
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ row: data });
  }

  const row = await insertRow(params.resource, body);
  return NextResponse.json({ row });
}
