'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, X, Star } from 'lucide-react';
import { adminApi } from '@/lib/admin/api';
import { NeonButton } from '@/components/ui/NeonButton';
import type { Testimonial, Platform } from '@/lib/types/database';

const PLATFORMS: Platform[] = ['upwork', 'fiverr', 'direct', 'linkedin', 'x'];

export function TestimonialsManager({ initial }: { initial: Testimonial[] }) {
  const [items, setItems] = useState(initial);
  const [editing, setEditing] = useState<Partial<Testimonial> | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function save() {
    if (!editing) return;
    setError('');
    setBusy(true);
    try {
      if (editing.id) {
        const row = await adminApi.update<Testimonial>('testimonials', editing.id, editing);
        setItems((a) => a.map((x) => (x.id === row.id ? row : x)));
      } else {
        const row = await adminApi.create<Testimonial>('testimonials', editing);
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
    if (!confirm('Delete this testimonial?')) return;
    try {
      await adminApi.remove('testimonials', id);
      setItems((a) => a.filter((x) => x.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <NeonButton
          onClick={() => setEditing({ client_name: '', content: '', rating: 5, platform: 'upwork', is_featured: false, sort_order: items.length + 1 })}
        >
          <Plus className="h-4 w-4" /> New Testimonial
        </NeonButton>
      </div>

      {error && <p className="font-mono text-xs text-accent-red">&gt; ERROR: {error}</p>}

      <div className="grid gap-3 md:grid-cols-2">
        {items.map((t) => (
          <div key={t.id} className="rounded-lg border border-border-neon bg-bg-card p-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-accent-green text-accent-green" />
                ))}
              </div>
              <div className="flex gap-1">
                <button onClick={() => setEditing(t)} className="text-text-muted hover:text-accent-cyan">
                  <Edit2 className="h-4 w-4" />
                </button>
                <button onClick={() => remove(t.id)} className="text-text-muted hover:text-accent-red">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="text-sm text-text-primary line-clamp-3">&ldquo;{t.content}&rdquo;</p>
            <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-text-muted">
              <span>{t.client_name}{t.client_company ? ` · ${t.client_company}` : ''}</span>
              {t.platform && <span className="rounded border border-border-neon px-1.5 py-0.5 uppercase">{t.platform}</span>}
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="col-span-full p-8 text-center font-mono text-xs text-text-muted">No testimonials.</p>}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-primary/90 p-4 backdrop-blur" onClick={() => setEditing(null)}>
          <div onClick={(ev) => ev.stopPropagation()} className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-lg border border-accent-green/40 bg-bg-card p-6 shadow-glow-green">
            <div className="mb-4 flex justify-between">
              <h3 className="font-display text-xl font-bold text-text-primary">
                {editing.id ? 'Edit Testimonial' : 'New Testimonial'}
              </h3>
              <button onClick={() => setEditing(null)} className="text-text-muted hover:text-accent-red">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3">
              <Field label="Client name">
                <input value={editing.client_name ?? ''} onChange={(e) => setEditing({ ...editing, client_name: e.target.value })} className="adminField" />
              </Field>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Title">
                  <input value={editing.client_title ?? ''} onChange={(e) => setEditing({ ...editing, client_title: e.target.value })} className="adminField" />
                </Field>
                <Field label="Company">
                  <input value={editing.client_company ?? ''} onChange={(e) => setEditing({ ...editing, client_company: e.target.value })} className="adminField" />
                </Field>
              </div>
              <Field label="Content (quote)">
                <textarea rows={4} value={editing.content ?? ''} onChange={(e) => setEditing({ ...editing, content: e.target.value })} className="adminField" />
              </Field>
              <div className="grid gap-3 sm:grid-cols-3">
                <Field label="Rating">
                  <input type="number" min={1} max={5} value={editing.rating ?? 5} onChange={(e) => setEditing({ ...editing, rating: Number(e.target.value) })} className="adminField" />
                </Field>
                <Field label="Platform">
                  <select value={editing.platform ?? 'upwork'} onChange={(e) => setEditing({ ...editing, platform: e.target.value as Platform })} className="adminField">
                    {PLATFORMS.map((p) => <option key={p}>{p}</option>)}
                  </select>
                </Field>
                <Field label="Sort order">
                  <input type="number" value={editing.sort_order ?? 0} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} className="adminField" />
                </Field>
              </div>
              <Field label="Project type">
                <input value={editing.project_type ?? ''} onChange={(e) => setEditing({ ...editing, project_type: e.target.value })} className="adminField" />
              </Field>
              <label className="flex items-center gap-2 font-mono text-xs text-text-primary">
                <input type="checkbox" checked={editing.is_featured ?? false} onChange={(e) => setEditing({ ...editing, is_featured: e.target.checked })} className="accent-accent-green" />
                Featured
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
