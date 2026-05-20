'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export function LogoutButton() {
  const router = useRouter();
  async function onClick() {
    await fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {}
    router.push('/login');
    router.refresh();
  }
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-center gap-2 rounded-md border border-accent-red/40 px-3 py-2 font-mono text-xs uppercase text-accent-red transition-colors hover:bg-accent-red/10"
    >
      <LogOut className="h-3.5 w-3.5" /> Logout
    </button>
  );
}