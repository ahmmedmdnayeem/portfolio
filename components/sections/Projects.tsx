'use client';

import { useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectCard } from '@/components/ui/ProjectCard';
import type { Project, ProjectCategory } from '@/lib/types/database';
import { cn } from '@/lib/utils/cn';

const FILTERS: { label: string; value: ProjectCategory | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Blockchain', value: 'blockchain' },
  { label: 'Smart Contracts', value: 'smart-contract' },
  { label: 'Audits', value: 'audit' },
  { label: 'DeFi', value: 'defi' },
  { label: 'Web3', value: 'web3' },
  { label: 'Cybersecurity', value: 'cybersecurity' },
];

export function Projects({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<ProjectCategory | 'all'>('all');
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)),
    [projects, filter],
  );

  return (
    <section id="projects" className="relative bg-bg-primary py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          label="featured_work"
          title="Selected Projects"
          description="Smart contracts shipped, audits delivered, and dApps built for clients worldwide."
        />

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                'rounded-md border px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest transition-all',
                filter === f.value
                  ? 'border-accent-green bg-accent-green/10 text-accent-green shadow-glow-green'
                  : 'border-border-neon text-text-muted hover:border-accent-green/50 hover:text-text-primary',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} onClick={() => setSelected(p)} />
          ))}
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-bg-primary/90 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-lg border border-accent-green/40 bg-bg-card p-8 shadow-glow-green"
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 text-text-muted hover:text-accent-green"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <span className="font-mono text-[10px] uppercase tracking-widest text-accent-green">
              // {selected.category}
            </span>
            <h3 className="mt-2 font-display text-3xl font-bold text-text-primary">
              {selected.title}
            </h3>
            <p className="mt-4 text-sm text-text-muted">
              {selected.long_description || selected.description}
            </p>
            <div className="mt-6">
              <h4 className="mb-2 font-mono text-xs uppercase tracking-widest text-accent-cyan">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {selected.tech_stack.map((t) => (
                  <span
                    key={t}
                    className="rounded border border-border-neon bg-bg-secondary px-2 py-1 font-mono text-[11px] text-text-primary"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            {selected.client_name && (
              <p className="mt-4 font-mono text-xs text-text-muted">
                Client: <span className="text-text-primary">{selected.client_name}</span>
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}