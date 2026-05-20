'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { adminApi } from '@/lib/admin/api';
import { NeonButton } from '@/components/ui/NeonButton';
import type { Certification } from '@/lib/types/database';

const CATEGORIES = ['blockchain', 'security', 'platform', 'language', 'other'];

export function CertificationsManager({ initial }: { initial: Certification[] }) {
  const [items, setItems] = useState(initial);
  const [editing, setEditing] = useState<Partial<Certification> | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function save() {
    if (!editing) return;
    setError('');
    setBusy(true);
    try {
      if (editing.id) {
        const row = await adminApi.update<Certification>('certifications', editing.id, editing);
        setItems((a) => a.map((x) => (x.id === row.id ? row : x)));
      } else {
        const row = await adminApi.create<Certification>('certifications', editing);
        setItems((a) => [...a, row]);
      }
      setEditing(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!confirm('Delete this certification?')) return;
    try {
      await adminApi.remove('certifications', id);
      setItems((a) => a.filter((x) => x.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <NeonButton onClick={() => setEditing({ name: '', issuer: '', category: 'platform', sort_order: items.length + 1 })}>
          <Plus className="h-4 w-4" /> New Certification
        </NeonButton>
      </div>

      {error && <p className="font-mono text-xs text-accent-red">&gt; ERROR: {error}</p>}

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {items.map((c) => (
          <div key={c.id} className="rounded-lg border border-border-neon bg-bg-card p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-display text-sm font-bold text-text-primary">{c.name}</p>
                <p className="font-mono text-[10px] text-text-muted">{c.issuer}</p>
                {c.category && <p className="mt-1 font-mono text-[10px] text-accent-cyan">{c.category}</p>}
              </div>
              <div className="flex gap-1">
                <button onClick={() => setEditing(c)} className="text-text-muted hover:text-accent-cyan">
                  <Edit2 className="h-4 w-4" />
                </button>
                <button onClick={() => remove(c.id)} className="text-text-muted hover:text-accent-red">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="col-span-full p-8 text-center font-mono text-xs text-text-muted">No certifications.</p>}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-primary/90 p-4 backdrop-blur" onClick={() => setEditing(null)}>
          <div onClick={(ev) => ev.stopPropagation()} className="w-full max-w-md rounded-lg border border-accent-green/40 bg-bg-card p-6 shadow-glow-green">
            <div className="mb-4 flex justify-between">
              <h3 className="font-display text-xl font-bold text-text-primary">
                {editing.id ? 'Edit Certification' : 'New Certification'}
              </h3>
              <button onClick={() => setEditing(null)} className="text-text-muted hover:text-accent-red">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3">
              <Field label="Name">
                <input value={editing.name ?? ''} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="adminField" />
              </Field>
              <Field label="Issuer">
                <input value={editing.issuer ?? ''} onChange={(e) => setEditing({ ...editing, issuer: e.target.value })} className="adminField" />
              </Field>
              <Field label="Category">
                <select value={editing.category ?? 'platform'} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="adminField">
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Issue date">
                <input type="date" value={editing.issue_date ?? ''} onChange={(e) => setEditing({ ...editing, issue_date: e.target.value || null })} className="adminField" />
              </Field>
              <Field label="Credential URL">
                <input value={editing.credential_url ?? ''} onChange={(e) => setEditing({ ...editing, credential_url: e.target.value })} className="adminField" />
              </Field>
              <Field label="Sort order">
                <input type="number" value={editing.sort_order ?? 0} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} className="adminField" />
              </Field>
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
