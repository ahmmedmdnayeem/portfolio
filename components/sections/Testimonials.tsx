import { Star, ShieldCheck } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { Testimonial } from '@/lib/types/database';

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const items = [...testimonials, ...testimonials];

  return (
    <section className="relative overflow-hidden bg-bg-secondary/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          label="client_feedback"
          title="Testimonials"
          description="What clients say after the contracts ship and the audits land."
        />
      </div>

      <div className="group relative w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg-primary to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg-primary to-transparent" />
        <div className="flex w-max animate-[scroll_40s_linear_infinite] gap-6 px-6 group-hover:[animation-play-state:paused]">
          {items.map((t, i) => (
            <div
              key={`${t.id}-${i}`}
              className="flex w-[340px] flex-shrink-0 flex-col rounded-lg border border-border-neon bg-bg-card p-5 transition-all hover:border-accent-green/40 hover:shadow-glow-green"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-accent-green text-accent-green" />
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 rounded border border-accent-green/40 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-accent-green">
                  <ShieldCheck className="h-3 w-3" /> Verified
                </span>
              </div>
              <p className="flex-1 text-sm text-text-primary">&ldquo;{t.content}&rdquo;</p>
              <div className="mt-4 flex items-center justify-between border-t border-border-neon pt-3">
                <div>
                  <p className="font-mono text-xs font-semibold text-accent-cyan">{t.client_name}</p>
                  <p className="font-mono text-[10px] text-text-muted">
                    {t.client_title}
                    {t.client_company && ` · ${t.client_company}`}
                  </p>
                </div>
                {t.platform && (
                  <span className="rounded border border-border-neon px-2 py-0.5 font-mono text-[9px] uppercase text-text-muted">
                    {t.platform}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}