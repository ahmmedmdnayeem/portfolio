import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { LayoutDashboard, FolderKanban, Mail, Sparkles, Briefcase, Award, MessageSquareQuote } from 'lucide-react';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/server';
import { verifySessionToken, SESSION_COOKIE } from '@/lib/auth/local';
import { LogoutButton } from '@/components/admin/LogoutButton';

const ADMIN_LINKS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { href: '/admin/skills', label: 'Skills', icon: Sparkles },
  { href: '/admin/experience', label: 'Experience', icon: Briefcase },
  { href: '/admin/certifications', label: 'Certifications', icon: Award },
  { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquareQuote },
  { href: '/admin/messages', label: 'Messages', icon: Mail },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const localToken = cookies().get(SESSION_COOKIE)?.value;
  const localSession = await verifySessionToken(localToken);

  if (isSupabaseConfigured()) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user && !localSession) redirect('/login?next=/admin');
  } else if (!localSession) {
    redirect('/login?next=/admin');
  }

  return (
    <div className="flex min-h-screen bg-bg-primary">
      <aside className="hidden w-64 flex-col border-r border-border-neon bg-bg-secondary/40 p-6 md:flex">
        <Link href="/admin" className="mb-8 font-mono text-lg font-bold text-accent-green">
          &gt; ADMIN_
        </Link>
        <nav className="flex flex-1 flex-col gap-1">
          {ADMIN_LINKS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-md px-3 py-2 font-mono text-xs uppercase tracking-widest text-text-muted transition-colors hover:bg-bg-card hover:text-accent-green"
            >
              <Icon className="h-4 w-4" /> {label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto space-y-2">
          <Link
            href="/"
            className="block rounded-md border border-border-neon px-3 py-2 text-center font-mono text-xs uppercase text-text-muted hover:border-accent-cyan hover:text-accent-cyan"
          >
            ← View Site
          </Link>
          <LogoutButton />
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden p-6 md:p-10">{children}</main>
    </div>
  );
}