'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { adminApi } from '@/lib/admin/api';
import { NeonButton } from '@/components/ui/NeonButton';
import type { Experience } from '@/lib/types/database';
import { formatDateRange } from '@/lib/utils/formatDate';

function joinArr(v: unknown): string {
  return Array.isArray(v) ? v.join(', ') : '';
}
function splitArr(s: string): string[] {
  return s.split(',').map((x) => x.trim()).filter(Boolean);
}

export function ExperienceManager({ initial }: { initial: Experience[] }) {
  const [items, setItems] = useState(initial);
  const [editing, setEditing] = useState<Partial<Experience> | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function save() {
    if (!editing) return;
    setError('');
    setBusy(true);
    try {
      const payload = { ...editing };
      if (editing.id) {
        const row = await adminApi.update<Experience>('experience', editing.id, payload);
        setItems((arr) => arr.map((x) => (x.id === row.id ? row : x)));
      } else {
        const row = await adminApi.create<Experience>('experience', payload);
        setItems((arr) => [...arr, row]);
      }
      setEditing(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!confirm('Delete this entry?')) return;
    try {
      await adminApi.remove('experience', id);
      setItems((arr) => arr.filter((x) => x.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <NeonButton
          onClick={() =>
            setEditing({
              company: '',
              role: '',
              description: '',
              responsibilities: [],
              tech_used: [],
              start_date: new Date().toISOString().slice(0, 10),
              end_date: null,
              is_current: false,
              sort_order: items.length + 1,
            })
          }
        >
          <Plus className="h-4 w-4" /> New Entry
        </NeonButton>
      </div>

      {error && <p className="font-mono text-xs text-accent-red">&gt; ERROR: {error}</p>}

      <div className="space-y-3">
        {items.map((e) => (
          <div key={e.id} className="flex items-start justify-between rounded-lg border border-border-neon bg-bg-card p-4">
            <div className="flex-1">
              <div className="font-mono text-[10px] uppercase tracking-widest text-accent-cyan">
                {formatDateRange(e.start_date, e.end_date)}
                {e.is_current && <span className="ml-2 text-accent-green">· CURRENT</span>}
              </div>
              <p className="font-display text-base font-bold text-text-primary">{e.role}</p>
              <p className="font-mono text-sm text-accent-green">{e.company}</p>
              {e.description && <p className="mt-1 text-sm text-text-muted">{e.description}</p>}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditing(e)} className="text-text-muted hover:text-accent-cyan">
                <Edit2 className="h-4 w-4" />
              </button>
              <button onClick={() => remove(e.id)} className="text-text-muted hover:text-accent-red">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="p-8 text-center font-mono text-xs text-text-muted">No experience entries.</p>
        )}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-primary/90 p-4 backdrop-blur" onClick={() => setEditing(null)}>
          <div onClick={(ev) => ev.stopPropagation()} className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-accent-green/40 bg-bg-card p-6 shadow-glow-green">
            <div className="mb-4 flex justify-between">
              <h3 className="font-display text-xl font-bold text-text-primary">
                {editing.id ? 'Edit Experience' : 'New Experience'}
              </h3>
              <button onClick={() => setEditing(null)} className="text-text-muted hover:text-accent-red">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3">
              <Field label="Company">
                <input value={editing.company ?? ''} onChange={(e) => setEditing({ ...editing, company: e.target.value })} className="adminField" />
              </Field>
              <Field label="Role">
                <input value={editing.role ?? ''} onChange={(e) => setEditing({ ...editing, role: e.target.value })} className="adminField" />
              </Field>
              <Field label="Description">
                <textarea rows={3} value={editing.description ?? ''} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="adminField" />
              </Field>
              <Field label="Responsibilities (comma separated)">
                <textarea rows={2} value={joinArr(editing.responsibilities)} onChange={(e) => setEditing({ ...editing, responsibilities: splitArr(e.target.value) })} className="adminField" />
              </Field>
              <Field label="Tech used (comma separated)">
                <input value={joinArr(editing.tech_used)} onChange={(e) => setEditing({ ...editing, tech_used: splitArr(e.target.value) })} className="adminField" />
              </Field>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Start date">
                  <input type="date" value={editing.start_date ?? ''} onChange={(e) => setEditing({ ...editing, start_date: e.target.value })} className="adminField" />
                </Field>
                <Field label="End date (blank if current)">
                  <input type="date" value={editing.end_date ?? ''} onChange={(e) => setEditing({ ...editing, end_date: e.target.value || null })} className="adminField" />
                </Field>
              </div>
              <Field label="Company URL">
                <input value={editing.company_url ?? ''} onChange={(e) => setEditing({ ...editing, company_url: e.target.value })} className="adminField" />
              </Field>
              <Field label="Sort order">
                <input type="number" value={editing.sort_order ?? 0} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} className="adminField" />
              </Field>
              <label className="flex items-center gap-2 font-mono text-xs text-text-primary">
                <input type="checkbox" checked={editing.is_current ?? false} onChange={(e) => setEditing({ ...editing, is_current: e.target.checked })} className="accent-accent-green" />
                Currently here
              </label>
              <div className="flex justify-end gap-3 pt-2">
                <button onClick={() => setEditing(null)} className="font-mono text-xs text-text-muted hover:text-text-primary">Cancel</button>
                <NeonButton onClick={save} disabled={busy}>{busy ? 'Saving...' : 'Save'}</NeonButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-text-muted">{label}</label>
      {children}
    </div>
  );
}
