'use client';

import { useMemo, useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SkillBadge } from '@/components/ui/SkillBadge';
import type { Skill, SkillCategory } from '@/lib/types/database';
import { cn } from '@/lib/utils/cn';

const FILTERS: { label: string; value: SkillCategory | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Languages', value: 'languages' },
  { label: 'Full-Stack', value: 'fullstack' },
  { label: 'Blockchain', value: 'blockchain' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Tools', value: 'tools' },
];

export function Skills({ skills }: { skills: Skill[] }) {
  const [filter, setFilter] = useState<SkillCategory | 'all'>('all');

  const filtered = useMemo(
    () => (filter === 'all' ? skills : skills.filter((s) => s.category === filter)),
    [skills, filter],
  );

  return (
    <section id="skills" className="relative bg-bg-secondary/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          label="tech_stack"
          title="Skills & Tools"
          description="The arsenal I use to build, break, and secure decentralized systems."
        />

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                'rounded-md border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-all',
                filter === f.value
                  ? 'border-accent-green bg-accent-green/10 text-accent-green shadow-glow-green'
                  : 'border-border-neon text-text-muted hover:border-accent-green/50 hover:text-text-primary',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((s) => (
            <SkillBadge key={s.id} skill={s} />
          ))}
        </div>
      </div>
    </section>
  );
}