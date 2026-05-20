import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth/check';
import { ALLOWED_TABLES, deleteRow, updateRow, type StoreTable } from '@/lib/store/local';

function isAllowed(r: string): r is StoreTable {
  return (ALLOWED_TABLES as readonly string[]).includes(r);
}

export async function PATCH(
  req: Request,
  { params }: { params: { resource: string; id: string } },
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
  const row = await updateRow(params.resource, params.id, body);
  if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ row });
}

export async function DELETE(
  _req: Request,
  { params }: { params: { resource: string; id: string } },
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!isAllowed(params.resource)) {
    return NextResponse.json({ error: 'Unknown resource' }, { status: 400 });
  }
  const ok = await deleteRow(params.resource, params.id);
  if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}
