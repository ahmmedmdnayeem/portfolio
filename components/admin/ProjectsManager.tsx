'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, X, Star } from 'lucide-react';
import { adminApi } from '@/lib/admin/api';
import { NeonButton } from '@/components/ui/NeonButton';
import type { Project, ProjectCategory, ProjectStatus } from '@/lib/types/database';

const CATEGORIES: ProjectCategory[] = ['blockchain', 'cybersecurity', 'web3', 'defi', 'smart-contract', 'audit', 'other'];
const STATUSES: ProjectStatus[] = ['completed', 'in-progress', 'archived'];

export function ProjectsManager({ initial }: { initial: Project[] }) {
  const [projects, setProjects] = useState(initial);
  const [editing, setEditing] = useState<Partial<Project> | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  function startNew() {
    setError('');
    setEditing({
      title: '',
      slug: '',
      description: '',
      category: 'blockchain',
      tech_stack: [],
      featured: false,
      status: 'completed',
      sort_order: projects.length + 1,
    });
  }

  async function save() {
    if (!editing) return;
    setError('');
    setBusy(true);
    const payload = {
      ...editing,
      tech_stack: Array.isArray(editing.tech_stack)
        ? editing.tech_stack
        : String(editing.tech_stack ?? '').split(',').map((s) => s.trim()).filter(Boolean),
    };
    try {
      if (editing.id) {
        const row = await adminApi.update<Project>('projects', editing.id, payload);
        setProjects((p) => p.map((x) => (x.id === row.id ? row : x)));
      } else {
        const row = await adminApi.create<Project>('projects', payload);
        setProjects((p) => [...p, row]);
      }
      setEditing(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!confirm('Delete this project?')) return;
    setError('');
    try {
      await adminApi.remove('projects', id);
      setProjects((p) => p.filter((x) => x.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <NeonButton onClick={startNew}>
          <Plus className="h-4 w-4" /> New Project
        </NeonButton>
      </div>

      {error && <p className="font-mono text-xs text-accent-red">&gt; ERROR: {error}</p>}

      <div className="overflow-x-auto rounded-lg border border-border-neon bg-bg-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border-neon bg-bg-secondary/40 font-mono text-[10px] uppercase tracking-widest text-text-muted">
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Featured</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border-neon">
            {projects.map((p) => (
              <tr key={p.id} className="hover:bg-bg-secondary/30">
                <td className="px-4 py-3 font-mono text-text-primary">{p.title}</td>
                <td className="px-4 py-3 font-mono text-xs text-accent-cyan">{p.category}</td>
                <td className="px-4 py-3 font-mono text-xs text-text-muted">{p.status}</td>
                <td className="px-4 py-3">
                  {p.featured && <Star className="h-4 w-4 fill-accent-green text-accent-green" />}
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => setEditing(p)} className="mr-3 text-text-muted hover:text-accent-cyan">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button onClick={() => remove(p.id)} className="text-text-muted hover:text-accent-red">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center font-mono text-xs text-text-muted">
                  No projects yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-bg-primary/90 p-4 backdrop-blur"
          onClick={() => setEditing(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-accent-green/40 bg-bg-card p-6 shadow-glow-green"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-xl font-bold text-text-primary">
                {editing.id ? 'Edit Project' : 'New Project'}
              </h3>
              <button onClick={() => setEditing(null)} className="text-text-muted hover:text-accent-red">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              <FormField label="Title">
                <input value={editing.title ?? ''} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="adminInput" />
              </FormField>
              <FormField label="Slug">
                <input value={editing.slug ?? ''} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className="adminInput" />
              </FormField>
              <FormField label="Description">
                <textarea rows={2} value={editing.description ?? ''} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="adminInput" />
              </FormField>
              <FormField label="Long Description">
                <textarea rows={4} value={editing.long_description ?? ''} onChange={(e) => setEditing({ ...editing, long_description: e.target.value })} className="adminInput" />
              </FormField>
              <div className="grid gap-3 sm:grid-cols-2">
                <FormField label="Category">
                  <select value={editing.category ?? 'blockchain'} onChange={(e) => setEditing({ ...editing, category: e.target.value as ProjectCategory })} className="adminInput">
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </FormField>
                <FormField label="Status">
                  <select value={editing.status ?? 'completed'} onChange={(e) => setEditing({ ...editing, status: e.target.value as ProjectStatus })} className="adminInput">
                    {STATUSES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </FormField>
              </div>
              <FormField label="Tech Stack (comma separated)">
                <input
                  value={Array.isArray(editing.tech_stack) ? editing.tech_stack.join(', ') : ''}
                  onChange={(e) => setEditing({ ...editing, tech_stack: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
                  className="adminInput"
                />
              </FormField>
              <div className="grid gap-3 sm:grid-cols-2">
                <FormField label="Live URL">
                  <input value={editing.live_url ?? ''} onChange={(e) => setEditing({ ...editing, live_url: e.target.value })} className="adminInput" />
                </FormField>
                <FormField label="GitHub URL">
                  <input value={editing.github_url ?? ''} onChange={(e) => setEditing({ ...editing, github_url: e.target.value })} className="adminInput" />
                </FormField>
              </div>
              <FormField label="Sort Order">
                <input type="number" value={editing.sort_order ?? 0} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} className="adminInput" />
              </FormField>
              <label className="flex items-center gap-2 font-mono text-xs text-text-primary">
                <input type="checkbox" checked={editing.featured ?? false} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} className="accent-accent-green" />
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

      <style jsx global>{`
        .adminInput {
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
        .adminInput:focus { border-color: #00ff88; }
      `}</style>
    </div>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-text-muted">
        {label}
      </label>
      {children}
    </div>
  );
}
