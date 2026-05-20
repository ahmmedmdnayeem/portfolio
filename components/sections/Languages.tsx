import { Languages as LangIcon } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils/cn';

interface LanguageItem {
  name: string;
  nativeScript: string;
  level: 'Native' | 'Fluent' | 'Advanced' | 'Intermediate';
  proficiency: number;
  flag: string;
}

const LANGUAGES: LanguageItem[] = [
  { name: 'Bangla', nativeScript: 'বাংলা', level: 'Native', proficiency: 100, flag: '🇧🇩' },
  { name: 'English', nativeScript: 'English', level: 'Fluent', proficiency: 90, flag: '🇬🇧' },
  { name: 'Chinese', nativeScript: '中文', level: 'Advanced', proficiency: 80, flag: '🇨🇳' },
];

const LEVEL_COLOR: Record<LanguageItem['level'], string> = {
  Native: 'text-accent-green border-accent-green/40',
  Fluent: 'text-accent-cyan border-accent-cyan/40',
  Advanced: 'text-purple-400 border-purple-400/40',
  Intermediate: 'text-yellow-400 border-yellow-400/40',
};

const LEVEL_BAR: Record<LanguageItem['level'], string> = {
  Native: 'bg-accent-green',
  Fluent: 'bg-accent-cyan',
  Advanced: 'bg-purple-400',
  Intermediate: 'bg-yellow-400',
};

export function Languages() {
  return (
    <section id="languages" className="relative bg-bg-primary py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          label="languages"
          title="Speaking the World"
          description="Communicating across three languages — a real edge for international and China-facing teams."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LANGUAGES.map((l) => (
            <div
              key={l.name}
              className={cn(
                'group rounded-lg border bg-bg-card p-6 transition-all hover:bg-bg-secondary/40',
                LEVEL_COLOR[l.level],
              )}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-3xl" aria-hidden>{l.flag}</span>
                <span className="rounded border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest">
                  {l.level}
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-text-primary">{l.name}</h3>
              <p className="mt-1 font-mono text-sm opacity-70">{l.nativeScript}</p>

              <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-bg-secondary">
                <div
                  className={cn('h-full transition-all duration-700', LEVEL_BAR[l.level])}
                  style={{ width: `${l.proficiency}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 font-mono text-xs text-text-muted">
          <LangIcon className="h-4 w-4 text-accent-green" />
          Trilingual: collaborate naturally across Bangla, English, and Chinese-speaking teams.
        </div>
      </div>
    </section>
  );
}