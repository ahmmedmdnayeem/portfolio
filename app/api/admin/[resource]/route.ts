import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth/check';
import { ALLOWED_TABLES, insertRow, listTable, type StoreTable } from '@/lib/store/local';

function isAllowed(r: string): r is StoreTable {
  return (ALLOWED_TABLES as readonly string[]).includes(r);
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
  const orderBy = params.resource === 'contact_messages' ? 'created_at' : 'sort_order';
  const desc = params.resource === 'contact_messages';
  const rows = await listTable(params.resource, { orderBy, desc });
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
  const row = await insertRow(params.resource, body);
  return NextResponse.json({ row });
}
