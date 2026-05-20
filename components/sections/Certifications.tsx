import { Award, ExternalLink } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { Certification } from '@/lib/types/database';
import { formatDate } from '@/lib/utils/formatDate';
import { cn } from '@/lib/utils/cn';

const categoryAccent: Record<string, string> = {
  security: 'border-accent-red/40 text-accent-red',
  blockchain: 'border-accent-green/40 text-accent-green',
  platform: 'border-accent-cyan/40 text-accent-cyan',
};

export function Certifications({ certifications }: { certifications: Certification[] }) {
  return (
    <section id="certifications" className="relative bg-bg-primary py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          label="credentials"
          title="Certifications"
          description="Industry credentials backing the work."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c) => (
            <div
              key={c.id}
              className={cn(
                'group rounded-lg border bg-bg-card p-5 transition-all hover:bg-bg-secondary/40',
                categoryAccent[c.category ?? 'platform'] ?? 'border-border-neon',
              )}
            >
              <div className="mb-3 flex items-center justify-between">
                <Award className="h-7 w-7" />
                {c.category && (
                  <span className="font-mono text-[10px] uppercase tracking-widest opacity-70">
                    {c.category}
                  </span>
                )}
              </div>
              <h3 className="font-display text-base font-bold text-text-primary">{c.name}</h3>
              <p className="mt-1 font-mono text-xs text-text-muted">{c.issuer}</p>
              {c.issue_date && (
                <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-text-muted">
                  Issued {formatDate(c.issue_date)}
                </p>
              )}
              {c.credential_url && (
                <a
                  href={c.credential_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 font-mono text-xs text-accent-cyan hover:text-accent-green"
                >
                  <ExternalLink className="h-3 w-3" /> Verify
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}