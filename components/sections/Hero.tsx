import { ArrowRight, Download, ChevronDown } from 'lucide-react';
import { GlitchText } from '@/components/ui/GlitchText';
import { NeonButton } from '@/components/ui/NeonButton';
import { Typewriter } from '@/components/ui/Typewriter';
import { MatrixBackground } from '@/components/ui/MatrixBackground';
import { StatCounter } from '@/components/ui/StatCounter';
import { ProfileAvatar } from '@/components/ui/ProfileAvatar';
import { SITE_CONFIG } from '@/lib/constants/navigation';

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden bg-bg-primary pt-20">
      <MatrixBackground opacity={0.12} />

      <div className="pointer-events-none absolute inset-0 z-10 scanlines" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(2,4,8,0.95)_90%)]" />

      <div className="relative z-20 mx-auto w-full max-w-7xl px-6 py-16">
        <div className="flex flex-col items-center text-center">
          <ProfileAvatar
            src={SITE_CONFIG.profileImage}
            alt={SITE_CONFIG.name}
            size={148}
            className="mb-6"
          />

          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-green bg-accent-green/10 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-accent-green">
            <span className="h-2 w-2 animate-blink rounded-full bg-accent-green shadow-glow-green" />
            Open to Internships & Entry-Level Roles
          </span>

          <GlitchText
            as="h1"
            className="font-display text-5xl font-extrabold uppercase leading-[1] tracking-tight text-text-primary md:text-7xl lg:text-8xl"
          >
            Ahmmed MD Nayeem
          </GlitchText>

          <div className="mt-6 font-mono text-base text-accent-cyan md:text-xl">
            <span className="text-text-muted">&gt;</span>{' '}
            <Typewriter
              phrases={[
                'Marketer Turned Engineer',
                'Python Developer',
                'Full-Stack Builder',
                'Blockchain Learner',
                'Top 1% Upwork Freelancer',
              ]}
            />
          </div>

          <p className="mt-6 max-w-2xl text-sm text-text-muted md:text-base">
            Top 1% freelancer on Upwork with <span className="text-accent-green">$100K+</span> in marketing
            revenue over 2 years. Now applying my CS fundamentals — Python, full-stack, blockchain — to build
            real products. Looking for a team to grow with.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <NeonButton href="#projects" variant="green" size="lg">
              View Work <ArrowRight className="h-4 w-4" />
            </NeonButton>
            <NeonButton href="#contact" variant="cyan" size="lg">
              Let&apos;s Connect <Download className="h-4 w-4" />
            </NeonButton>
          </div>

          <div className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-6 border-t border-border-neon pt-8 md:grid-cols-4">
            <StatCounter value={100} suffix="K+" label="Revenue (USD)" />
            <StatCounter value={2} suffix="y" label="Upwork Freelance" />
            <StatCounter value={1} suffix="%" label="Top on Upwork" />
            <StatCounter value={3} label="Languages" />
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 animate-bounce-slow text-accent-green"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-7 w-7" />
      </a>
    </section>
  );
}