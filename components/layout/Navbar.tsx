'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants/navigation';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { NeonButton } from '@/components/ui/NeonButton';
import { cn } from '@/lib/utils/cn';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(NAV_LINKS.map((l) => l.href.slice(1)));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'border-b border-border-neon bg-bg-primary/80 backdrop-blur-md' : 'bg-transparent',
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="#home" className="group font-mono text-lg font-bold text-accent-green">
          <span className="text-text-muted">&gt;</span> {SITE_CONFIG.handle}
          <span className="ml-0.5 inline-block h-4 w-1.5 -translate-y-0.5 animate-blink bg-accent-green align-middle" />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => {
            const isActive = active === l.href.slice(1);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    'font-mono text-xs uppercase tracking-widest transition-colors',
                    isActive ? 'text-accent-green' : 'text-text-muted hover:text-text-primary',
                  )}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:block">
          <NeonButton href="#contact" size="sm" variant="green">
            Hire Me
          </NeonButton>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="text-accent-green md:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border-neon bg-bg-primary/95 backdrop-blur md:hidden">
          <ul className="flex flex-col gap-1 px-6 py-4">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 font-mono text-sm uppercase tracking-widest text-text-muted hover:text-accent-green"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <NeonButton href="#contact" size="sm" className="w-full">
                Hire Me
              </NeonButton>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}