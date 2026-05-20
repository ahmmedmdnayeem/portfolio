import { Check } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TerminalCard } from '@/components/ui/TerminalCard';
import { StatCounter } from '@/components/ui/StatCounter';

const SPECIALIZATIONS = [
  'Python — automation, scripting, backend basics',
  'Full-stack web (Next.js, React, Node.js)',
  'Blockchain fundamentals (Solidity, Web3 concepts)',
  'Marketing analytics & growth strategy',
  'Client communication & project delivery',
  'Trilingual: Bangla · 中文 · English',
];

export function About() {
  return (
    <section id="about" className="relative bg-bg-primary py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          label="about_me"
          title="Who Am I"
          description="A proven freelancer pivoting from marketing into software engineering."
        />

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6 text-text-primary">
            <p className="text-base leading-relaxed text-text-muted">
              I&apos;m Ahmmed MD Nayeem — a <span className="text-accent-green">Top 1% Upwork freelancer</span> who
              earned <span className="text-accent-green">$100,000+</span> in marketing revenue over the past two
              years. That work taught me how to ship: deadlines, clients, real outcomes, sustained quality.
            </p>
            <p className="text-base leading-relaxed text-text-muted">
              Now I&apos;m channeling that same execution into <span className="text-text-primary">software engineering</span>.
              I&apos;m building practical projects in Python, learning full-stack development end-to-end,
              and exploring blockchain fundamentals. I&apos;m friendly, patient, and deeply thoughtful —
              and I&apos;m looking for an entry-level role or internship where I can grow with a team
              that values learning as much as shipping.
            </p>

            <div>
              <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-accent-cyan">
                // what_i_bring
              </h3>
              <ul className="space-y-2">
                {SPECIALIZATIONS.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-text-primary">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-green" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-border-neon pt-6">
              <StatCounter value={100} suffix="K+" label="Revenue Generated" />
              <StatCounter value={2} suffix="y" label="Upwork Freelance" />
              <StatCounter value={1} suffix="%" label="Top on Upwork" />
              <StatCounter value={3} label="Languages Spoken" />
            </div>
          </div>

          <TerminalCard title="~/about/ahmmed.sh">
            <div className="space-y-3 leading-relaxed">
              <div>
                <span className="text-accent-green">$</span>{' '}
                <span className="text-text-primary">whoami</span>
              </div>
              <div className="pl-3 text-text-muted">
                &gt; ahmmed_md_nayeem (marketer → engineer)
              </div>

              <div>
                <span className="text-accent-green">$</span>{' '}
                <span className="text-text-primary">cat strengths.txt</span>
              </div>
              <div className="pl-3 text-text-muted">
                &gt; Python · Full-Stack · Blockchain Basics · Growth Marketing
              </div>

              <div>
                <span className="text-accent-green">$</span>{' '}
                <span className="text-text-primary">ls revenue/</span>
              </div>
              <div className="pl-3 text-text-muted">
                &gt; $100k+ earned · Top 1% on Upwork · 2 years freelancing
              </div>

              <div>
                <span className="text-accent-green">$</span>{' '}
                <span className="text-text-primary">cat languages.json</span>
              </div>
              <div className="pl-3 text-text-muted">
                &gt; {'{ "bangla": "native", "english": "fluent", "中文": "advanced" }'}
              </div>

              <div>
                <span className="text-accent-green">$</span>{' '}
                <span className="text-text-primary">cat goal.md</span>
              </div>
              <div className="pl-3 text-text-muted">
                &gt; Join a team. Apply CS skills. Grow together.
              </div>

              <div>
                <span className="text-accent-green">$</span>{' '}
                <span className="text-text-primary">status</span>
              </div>
              <div className="pl-3 text-accent-green">
                &gt; OPEN TO INTERNSHIPS & ENTRY-LEVEL ROLES ✓
              </div>

              <div className="flex items-center gap-1 pt-2">
                <span className="text-accent-green">$</span>
                <span className="ml-0.5 inline-block h-4 w-2 animate-blink bg-accent-green" />
              </div>
            </div>
          </TerminalCard>
        </div>
      </div>
    </section>
  );
}