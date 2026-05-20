import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import { GlitchText } from '@/components/ui/GlitchText';
import { NeonButton } from '@/components/ui/NeonButton';
import { TerminalCard } from '@/components/ui/TerminalCard';

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg-primary px-6 py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,255,136,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.06) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="scanlines pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(2,4,8,0.95)_90%)]" />

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center">
        <GlitchText
          as="h1"
          className="font-display text-8xl font-extrabold uppercase leading-none text-text-primary md:text-9xl"
        >
          404
        </GlitchText>

        <p className="mt-4 font-mono text-sm uppercase tracking-[0.3em] text-accent-cyan md:text-base">
          // signal_lost · page_not_found
        </p>

        <p className="mt-6 max-w-md text-sm text-text-muted md:text-base">
          The route you requested doesn&apos;t exist on this server. It may have
          been moved, archived, or never deployed.
        </p>

        <div className="mt-10 w-full max-w-md">
          <TerminalCard title="error.log">
            <div className="space-y-1 text-left leading-relaxed">
              <div>
                <span className="text-accent-green">$</span>{' '}
                <span className="text-text-primary">curl -I &lt;path&gt;</span>
              </div>
              <div className="pl-3 text-text-muted">&gt; HTTP/2 404</div>
              <div className="pl-3 text-text-muted">&gt; content-length: 0</div>
              <div>
                <span className="text-accent-green">$</span>{' '}
                <span className="text-text-primary">suggest_action</span>
              </div>
              <div className="pl-3 text-accent-green">&gt; return to home</div>
            </div>
          </TerminalCard>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <NeonButton href="/" variant="green" size="lg">
            <Home className="h-4 w-4" /> Back to Home
          </NeonButton>
          <NeonButton href="/#contact" variant="cyan" size="lg">
            <ArrowLeft className="h-4 w-4" /> Contact Me
          </NeonButton>
        </div>
      </div>
    </main>
  );
}
