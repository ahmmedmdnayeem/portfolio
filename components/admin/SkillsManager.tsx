'use client';

import { useState } from 'react';
import { Plus, Trash2, Edit2, X } from 'lucide-react';
import { adminApi } from '@/lib/admin/api';
import { NeonButton } from '@/components/ui/NeonButton';
import type { Skill, SkillCategory } from '@/lib/types/database';

const CATEGORIES: SkillCategory[] = ['languages', 'fullstack', 'blockchain', 'marketing', 'tools', 'cybersecurity', 'frameworks', 'platforms'];

export function SkillsManager({ initial }: { initial: Skill[] }) {
  const [skills, setSkills] = useState(initial);
  const [editing, setEditing] = useState<Partial<Skill> | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function save() {
    if (!editing) return;
    setError('');
    setBusy(true);
    try {
      if (editing.id) {
        const row = await adminApi.update<Skill>('skills', editing.id, editing);
        setSkills((s) => s.map((x) => (x.id === row.id ? row : x)));
      } else {
        const row = await adminApi.create<Skill>('skills', editing);
        setSkills((s) => [...s, row]);
      }
      setEditing(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!confirm('Delete this skill?')) return;
    try {
      await adminApi.remove('skills', id);
      setSkills((s) => s.filter((x) => x.id !== id));
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
              name: '',
              category: 'languages',
              proficiency: 80,
              sort_order: skills.length + 1,
            })
          }
        >
          <Plus className="h-4 w-4" /> New Skill
        </NeonButton>
      </div>

      {error && <p className="font-mono text-xs text-accent-red">&gt; ERROR: {error}</p>}

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((s) => (
          <div key={s.id} className="flex items-center justify-between rounded-md border border-border-neon bg-bg-card p-3">
            <div className="flex-1">
              <p className="font-mono text-sm text-text-primary">{s.name}</p>
              <p className="font-mono text-[10px] text-text-muted">
                {s.category} · {s.proficiency}%
              </p>
            </div>
            <button onClick={() => setEditing(s)} className="mr-2 text-text-muted hover:text-accent-cyan">
              <Edit2 className="h-4 w-4" />
            </button>
            <button onClick={() => remove(s.id)} className="text-text-muted hover:text-accent-red">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        {skills.length === 0 && (
          <p className="col-span-full p-8 text-center font-mono text-xs text-text-muted">
            No skills yet.
          </p>
        )}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-primary/90 p-4 backdrop-blur" onClick={() => setEditing(null)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-lg border border-accent-green/40 bg-bg-card p-6 shadow-glow-green">
            <div className="mb-4 flex justify-between">
              <h3 className="font-display text-xl font-bold text-text-primary">
                {editing.id ? 'Edit Skill' : 'New Skill'}
              </h3>
              <button onClick={() => setEditing(null)} className="text-text-muted hover:text-accent-red">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3">
              <Field label="Name">
                <input value={editing.name ?? ''} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="adminField" />
              </Field>
              <Field label="Category">
                <select value={editing.category ?? 'languages'} onChange={(e) => setEditing({ ...editing, category: e.target.value as SkillCategory })} className="adminField">
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </Field>
              <Field label={`Proficiency: ${editing.proficiency ?? 0}%`}>
                <input type="range" min={0} max={100} value={editing.proficiency ?? 0} onChange={(e) => setEditing({ ...editing, proficiency: Number(e.target.value) })} className="w-full accent-accent-green" />
              </Field>
              <Field label="Years Experience">
                <input type="number" step="0.5" value={editing.years_experience ?? ''} onChange={(e) => setEditing({ ...editing, years_experience: Number(e.target.value) })} className="adminField" />
              </Field>
              <Field label="Sort Order">
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

      <style jsx global>{`
        .adminField {
          width: 100%;
          border-radius: 0.375rem;
          border: 1px solid #1a2540;
          background: rgba(10, 15, 26, 0.6);
          padding: 0.5rem 0.75rem;
          font-family: var(--font-mono);
          font-size: 0.875rem;
          color: #e2e8f0;
          outline: none;
        }
        .adminField:focus { border-color: #00ff88; }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-text-muted">
        {label}
      </label>
      {children}
    </div>
  );
}
