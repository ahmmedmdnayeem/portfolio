import Link from 'next/link';
import { NAV_LINKS, SOCIAL_LINKS, SITE_CONFIG } from '@/lib/constants/navigation';

export function Footer() {
  return (
    <footer className="border-t border-border-neon bg-bg-secondary/40 py-12">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-3">
        <div>
          <div className="font-mono text-lg font-bold text-accent-green">
            &gt; {SITE_CONFIG.handle}
          </div>
          <p className="mt-3 max-w-xs text-sm text-text-muted">
            Top 1% Upwork freelancer pivoting into software engineering.
            Python · Full-Stack · Blockchain fundamentals.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 font-mono text-xs">
            <span className="h-2 w-2 animate-blink rounded-full bg-accent-green shadow-glow-green" />
            <span className="text-accent-green">OPEN TO INTERNSHIPS & ENTRY-LEVEL ROLES</span>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-accent-cyan">
            Navigation
          </h3>
          <ul className="space-y-2">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="font-mono text-sm text-text-muted hover:text-accent-green">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-accent-cyan">
            Connect
          </h3>
          <div className="flex flex-wrap gap-3">
            {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-md border border-border-neon p-2.5 text-text-muted transition-all hover:border-accent-green hover:text-accent-green hover:shadow-glow-green"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <p className="mt-4 font-mono text-xs text-text-muted">{SITE_CONFIG.email}</p>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-border-neon px-6 pt-6">
        <p className="text-center font-mono text-xs text-text-muted">
          © {new Date().getFullYear()} {SITE_CONFIG.name} — Built with Next.js & Supabase
        </p>
      </div>
    </footer>
  );
}