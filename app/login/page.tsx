'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { NeonButton } from '@/components/ui/NeonButton';
import { TerminalCard } from '@/components/ui/TerminalCard';

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        router.push(search.get('next') ?? '/admin');
        router.refresh();
        return;
      }

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      if (supabaseUrl && !supabaseUrl.includes('your-project')) {
        const supabase = createClient();
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push(search.get('next') ?? '/admin');
        router.refresh();
        return;
      }

      const data = await res.json().catch(() => ({}));
      throw new Error(data.error ?? 'Login failed');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-bg-primary px-6 py-12">
      <div className="w-full max-w-md">
        <TerminalCard title="auth/login">
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <div className="font-mono text-accent-green">$ login --admin</div>
              <p className="mt-1 font-mono text-xs text-text-muted">
                Restricted access. Authentication required.
              </p>
            </div>

            <div>
              <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-text-muted">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-md border border-border-neon bg-bg-secondary px-3 py-2 font-mono text-sm text-text-primary focus:border-accent-green focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-text-muted">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-md border border-border-neon bg-bg-secondary px-3 py-2 font-mono text-sm text-text-primary focus:border-accent-green focus:outline-none"
              />
            </div>

            {error && (
              <p className="font-mono text-xs text-accent-red">&gt; ERROR: {error}</p>
            )}

            <NeonButton type="submit" disabled={loading} className="w-full">
              {loading ? 'Authenticating...' : 'Login'}
            </NeonButton>
          </form>
        </TerminalCard>
      </div>
    </main>
  );
}