'use client';

import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { Experience as ExperienceItem } from '@/lib/types/database';
import { formatDateRange } from '@/lib/utils/formatDate';
import { cn } from '@/lib/utils/cn';

export function Experience({ experience }: { experience: ExperienceItem[] }) {
  return (
    <section id="experience" className="relative bg-bg-secondary/30 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          label="career_log"
          title="Experience"
          description="Where I have shipped, audited, and learned."
        />

        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-accent-green via-accent-cyan to-transparent md:left-1/2 md:-translate-x-1/2" />

          {experience.map((e, i) => {
            const left = i % 2 === 0;
            return (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, x: left ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5 }}
                className={cn(
                  'relative mb-12 pl-12 md:w-1/2 md:pl-0',
                  left ? 'md:pr-12' : 'md:ml-auto md:pl-12',
                )}
              >
                <div
                  className={cn(
                    'absolute left-2 top-2 z-10 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full border-2 border-accent-green bg-bg-primary shadow-glow-green md:left-auto',
                    left ? 'md:right-0 md:translate-x-1/2' : 'md:left-0 md:-translate-x-1/2',
                  )}
                >
                  <Briefcase className="h-2.5 w-2.5 text-accent-green" />
                </div>

                <div className="rounded-lg border border-border-neon bg-bg-card p-5 transition-all hover:border-accent-green/40 hover:shadow-glow-green">
                  <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-accent-cyan">
                    {formatDateRange(e.start_date, e.end_date)}
                    {e.is_current && (
                      <span className="ml-2 inline-flex items-center gap-1 text-accent-green">
                        <span className="h-1.5 w-1.5 animate-blink rounded-full bg-accent-green" />
                        CURRENT
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-lg font-bold text-text-primary">{e.role}</h3>
                  <p className="font-mono text-sm text-accent-green">{e.company}</p>
                  {e.description && <p className="mt-2 text-sm text-text-muted">{e.description}</p>}
                  {e.responsibilities && e.responsibilities.length > 0 && (
                    <ul className="mt-3 space-y-1 text-xs text-text-primary">
                      {e.responsibilities.map((r) => (
                        <li key={r} className="flex gap-2">
                          <span className="text-accent-green">▸</span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  )}
                  {e.tech_used && e.tech_used.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {e.tech_used.map((t) => (
                        <span
                          key={t}
                          className="rounded border border-border-neon bg-bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-text-primary"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}