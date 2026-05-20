import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth/check';
import { ALLOWED_TABLES, deleteRow, updateRow, type StoreTable } from '@/lib/store/local';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/server';

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

  if (isSupabaseConfigured()) {
    delete body.id;
    delete body.created_at;
    delete body.updated_at;
    const supabase = createClient();
    const { data, error } = await supabase
      .from(params.resource)
      .update(body)
      .eq('id', params.id)
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ row: data });
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

  if (isSupabaseConfigured()) {
    const supabase = createClient();
    const { error } = await supabase.from(params.resource).delete().eq('id', params.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  const ok = await deleteRow(params.resource, params.id);
  if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}
