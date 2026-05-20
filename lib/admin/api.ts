async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error ?? `Request failed (${res.status})`);
  }
  return res.json();
}

export const adminApi = {
  async list<T>(resource: string): Promise<T[]> {
    const res = await fetch(`/api/admin/${resource}`, { cache: 'no-store' });
    const data = await handle<{ rows: T[] }>(res);
    return data.rows;
  },
  async create<T>(resource: string, body: Record<string, unknown>): Promise<T> {
    const res = await fetch(`/api/admin/${resource}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await handle<{ row: T }>(res);
    return data.row;
  },
  async update<T>(resource: string, id: string, body: Record<string, unknown>): Promise<T> {
    const res = await fetch(`/api/admin/${resource}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await handle<{ row: T }>(res);
    return data.row;
  },
  async remove(resource: string, id: string): Promise<void> {
    const res = await fetch(`/api/admin/${resource}/${id}`, { method: 'DELETE' });
    await handle(res);
  },
};
