import Link from 'next/link';
import { FolderKanban, Mail, Sparkles, Award, Briefcase, MessageSquareQuote } from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabase/server';
import { listTable } from '@/lib/store/local';
import type { ContactMessage } from '@/lib/types/database';

export const dynamic = 'force-dynamic';

async function getStats() {
  const [projects, skills, messages, experience, certifications, testimonials] = await Promise.all([
    listTable('projects'),
    listTable('skills'),
    listTable('contact_messages', { orderBy: 'created_at', desc: true }),
    listTable('experience'),
    listTable('certifications'),
    listTable('testimonials'),
  ]);
  const msgs = messages as ContactMessage[];
  return {
    projects: projects.length,
    skills: skills.length,
    experience: experience.length,
    certifications: certifications.length,
    testimonials: testimonials.length,
    unread: msgs.filter((m) => m.status === 'unread').length,
    total: msgs.length,
    recent: msgs.slice(0, 5),
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-3xl font-bold text-text-primary">Dashboard</h1>
        <p className="mt-1 font-mono text-xs text-text-muted">// overview of your portfolio</p>
      </header>

      {!isSupabaseConfigured() && (
        <div className="rounded-md border border-accent-cyan/40 bg-accent-cyan/5 p-4 font-mono text-xs text-accent-cyan">
          ℹ Running in <span className="text-text-primary">local storage mode</span> (no Supabase configured).
          All edits persist to <code className="text-text-primary">data/portfolio.json</code>.
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Projects" value={stats.projects} icon={FolderKanban} href="/admin/projects" />
        <StatCard label="Skills" value={stats.skills} icon={Sparkles} href="/admin/skills" />
        <StatCard label="Experience" value={stats.experience} icon={Briefcase} href="/admin/experience" />
        <StatCard label="Certifications" value={stats.certifications} icon={Award} href="/admin/certifications" />
        <StatCard label="Testimonials" value={stats.testimonials} icon={MessageSquareQuote} href="/admin/testimonials" />
        <StatCard label="Unread Messages" value={stats.unread} icon={Mail} href="/admin/messages" accent="red" />
        <StatCard label="Total Messages" value={stats.total} icon={Mail} href="/admin/messages" />
      </div>

      <section>
        <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-accent-cyan">
          // recent_messages
        </h2>
        <div className="rounded-lg border border-border-neon bg-bg-card">
          {stats.recent.length === 0 ? (
            <p className="p-6 text-center font-mono text-xs text-text-muted">
              No messages yet. Try submitting the contact form on the home page.
            </p>
          ) : (
            <ul className="divide-y divide-border-neon">
              {stats.recent.map((m) => (
                <li key={m.id} className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-mono text-sm text-text-primary">{m.name}</p>
                    <p className="font-mono text-[10px] text-text-muted">{m.email}</p>
                  </div>
                  <span
                    className={`rounded border px-2 py-0.5 font-mono text-[10px] uppercase ${
                      m.status === 'unread'
                        ? 'border-accent-green text-accent-green'
                        : 'border-border-neon text-text-muted'
                    }`}
                  >
                    {m.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  href,
  accent = 'green',
}: {
  label: string;
  value: number;
  icon: any;
  href: string;
  accent?: 'green' | 'red';
}) {
  return (
    <Link
      href={href}
      className="group rounded-lg border border-border-neon bg-bg-card p-5 transition-all hover:border-accent-green/40 hover:shadow-glow-green"
    >
      <div className="flex items-center justify-between">
        <Icon className={accent === 'red' ? 'h-5 w-5 text-accent-red' : 'h-5 w-5 text-accent-green'} />
        <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
          {label}
        </span>
      </div>
      <p className="mt-4 font-display text-3xl font-extrabold text-text-primary">{value}</p>
    </Link>
  );
}
