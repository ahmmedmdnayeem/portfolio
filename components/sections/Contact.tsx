'use client';

import { useState } from 'react';
import { Mail, MapPin, Send, Twitter, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { NeonButton } from '@/components/ui/NeonButton';
import { SITE_CONFIG } from '@/lib/constants/navigation';

type Status = 'idle' | 'sending' | 'success' | 'error';

export function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: fd.get('name'),
      email: fd.get('email'),
      projectType: fd.get('projectType'),
      budget: fd.get('budget'),
      message: fd.get('message'),
      subject: `New inquiry: ${fd.get('projectType') ?? 'General'}`,
    };
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? 'Failed to send');
      }
      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Unknown error');
    }
  }

  return (
    <section id="contact" className="relative bg-bg-primary py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          label="get_in_touch"
          title="Let's Build Something"
          description="Got a smart contract to ship or a system to audit? Drop a line."
        />

        <div className="grid gap-10 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-2">
            <div>
              <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-accent-cyan">
                // direct_channels
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 text-accent-green" />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted">Email</p>
                    <a href={`mailto:${SITE_CONFIG.email}`} className="text-sm text-text-primary hover:text-accent-green">
                      {SITE_CONFIG.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Twitter className="mt-0.5 h-4 w-4 text-accent-green" />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted">X / Twitter</p>
                    <a href="https://x.com/ahmmednayeem" target="_blank" rel="noopener noreferrer" className="text-sm text-text-primary hover:text-accent-green">
                      @ahmmednayeem
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Send className="mt-0.5 h-4 w-4 text-accent-green" />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted">Telegram</p>
                    <a href="https://t.me/ahmmednayeem" target="_blank" rel="noopener noreferrer" className="text-sm text-text-primary hover:text-accent-green">
                      @ahmmednayeem
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-accent-green" />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted">Timezone</p>
                    <p className="text-sm text-text-primary">{SITE_CONFIG.timezone}</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-accent-green/40 bg-bg-card/60 p-4">
              <p className="flex items-center gap-2 font-mono text-xs text-accent-green">
                <span className="h-2 w-2 animate-blink rounded-full bg-accent-green shadow-glow-green" />
                AVAILABLE FOR PROJECTS — Response within 24h
              </p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="rounded-lg border border-border-neon bg-bg-card p-6 lg:col-span-3">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                <CheckCircle2 className="h-14 w-14 text-accent-green" />
                <p className="font-mono text-sm text-accent-green">
                  &gt; MESSAGE_TRANSMITTED ✓
                </p>
                <p className="font-mono text-xs text-text-muted">
                  Connection established. Response queued for delivery.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="font-mono text-xs text-accent-cyan hover:text-accent-green"
                >
                  Send another →
                </button>
              </div>
            ) : (
              <div className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name" name="name" required />
                  <Field label="Email" name="email" type="email" required />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Select
                    label="Project Type"
                    name="projectType"
                    options={['Blockchain Dev', 'Security Audit', 'Smart Contract', 'Consulting', 'Other']}
                  />
                  <Select
                    label="Budget"
                    name="budget"
                    options={['< $1k', '$1k – $5k', '$5k – $15k', '$15k – $50k', '$50k+']}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-text-muted">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me about the project..."
                    className="w-full rounded-md border border-border-neon bg-bg-secondary/60 px-3 py-2 font-mono text-sm text-text-primary placeholder:text-text-muted focus:border-accent-green focus:outline-none focus:ring-1 focus:ring-accent-green"
                  />
                </div>
                {status === 'error' && (
                  <p className="font-mono text-xs text-accent-red">&gt; ERROR: {errorMsg}</p>
                )}
                <NeonButton type="submit" disabled={status === 'sending'} size="lg" className="w-full">
                  {status === 'sending' ? 'Transmitting...' : 'Send Message'} <Send className="h-4 w-4" />
                </NeonButton>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = 'text', required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-text-muted">
        {label} {required && <span className="text-accent-red">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full rounded-md border border-border-neon bg-bg-secondary/60 px-3 py-2 font-mono text-sm text-text-primary placeholder:text-text-muted focus:border-accent-green focus:outline-none focus:ring-1 focus:ring-accent-green"
      />
    </div>
  );
}

function Select({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div>
      <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-text-muted">
        {label}
      </label>
      <select
        name={name}
        className="w-full rounded-md border border-border-neon bg-bg-secondary/60 px-3 py-2 font-mono text-sm text-text-primary focus:border-accent-green focus:outline-none focus:ring-1 focus:ring-accent-green"
      >
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}