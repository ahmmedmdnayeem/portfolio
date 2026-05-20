'use client';

import { useState } from 'react';
import { Mail, ChevronDown, Trash2 } from 'lucide-react';
import { adminApi } from '@/lib/admin/api';
import type { ContactMessage, MessageStatus } from '@/lib/types/database';
import { formatDate } from '@/lib/utils/formatDate';
import { cn } from '@/lib/utils/cn';

const STATUSES: MessageStatus[] = ['unread', 'read', 'replied', 'archived'];

export function MessageList({ initial }: { initial: ContactMessage[] }) {
  const [messages, setMessages] = useState(initial);
  const [filter, setFilter] = useState<MessageStatus | 'all'>('all');
  const [open, setOpen] = useState<string | null>(null);
  const [error, setError] = useState('');

  const filtered = filter === 'all' ? messages : messages.filter((m) => m.status === filter);

  async function updateStatus(id: string, status: MessageStatus) {
    try {
      await adminApi.update('contact_messages', id, { status });
      setMessages((m) => m.map((x) => (x.id === id ? { ...x, status } : x)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed');
    }
  }

  async function remove(id: string) {
    if (!confirm('Delete this message?')) return;
    try {
      await adminApi.remove('contact_messages', id);
      setMessages((m) => m.filter((x) => x.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  }

  return (
    <div className="space-y-4">
      {error && <p className="font-mono text-xs text-accent-red">&gt; ERROR: {error}</p>}

      <div className="flex flex-wrap gap-2">
        {(['all', ...STATUSES] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={cn(
              'rounded-md border px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest transition-all',
              filter === s
                ? 'border-accent-green bg-accent-green/10 text-accent-green'
                : 'border-border-neon text-text-muted hover:text-text-primary',
            )}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="rounded-lg border border-border-neon bg-bg-card">
        {filtered.length === 0 ? (
          <p className="p-8 text-center font-mono text-xs text-text-muted">No messages.</p>
        ) : (
          <ul className="divide-y divide-border-neon">
            {filtered.map((m) => (
              <li key={m.id}>
                <button
                  onClick={() => {
                    setOpen(open === m.id ? null : m.id);
                    if (m.status === 'unread') updateStatus(m.id, 'read');
                  }}
                  className="flex w-full items-center gap-4 px-4 py-3 text-left hover:bg-bg-secondary/40"
                >
                  <Mail className={cn('h-4 w-4', m.status === 'unread' ? 'text-accent-green' : 'text-text-muted')} />
                  <div className="flex-1 overflow-hidden">
                    <p className="font-mono text-sm text-text-primary">{m.name}</p>
                    <p className="truncate font-mono text-xs text-text-muted">
                      {m.subject || m.message.slice(0, 80)}
                    </p>
                  </div>
                  <span className="hidden font-mono text-[10px] text-text-muted sm:inline">
                    {formatDate(m.created_at)}
                  </span>
                  <span
                    className={cn(
                      'rounded border px-2 py-0.5 font-mono text-[9px] uppercase',
                      m.status === 'unread'
                        ? 'border-accent-green text-accent-green'
                        : 'border-border-neon text-text-muted',
                    )}
                  >
                    {m.status}
                  </span>
                  <ChevronDown className={cn('h-4 w-4 text-text-muted transition-transform', open === m.id && 'rotate-180')} />
                </button>
                {open === m.id && (
                  <div className="border-t border-border-neon bg-bg-secondary/30 p-4">
                    <div className="grid gap-2 text-sm">
                      <div>
                        <span className="font-mono text-[10px] text-text-muted">Email:</span>{' '}
                        <a href={`mailto:${m.email}`} className="text-accent-cyan">{m.email}</a>
                      </div>
                      {m.project_type && (
                        <div>
                          <span className="font-mono text-[10px] text-text-muted">Project:</span>{' '}
                          {m.project_type}
                        </div>
                      )}
                      {m.budget_range && (
                        <div>
                          <span className="font-mono text-[10px] text-text-muted">Budget:</span>{' '}
                          {m.budget_range}
                        </div>
                      )}
                      <div className="mt-3 whitespace-pre-wrap rounded-md border border-border-neon bg-bg-card p-3 font-mono text-xs text-text-primary">
                        {m.message}
                      </div>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[10px] uppercase text-text-muted">Set status:</span>
                        {STATUSES.map((s) => (
                          <button
                            key={s}
                            onClick={() => updateStatus(m.id, s)}
                            className={cn(
                              'rounded border px-2 py-0.5 font-mono text-[10px] uppercase',
                              m.status === s
                                ? 'border-accent-green text-accent-green'
                                : 'border-border-neon text-text-muted hover:text-text-primary',
                            )}
                          >
                            {s}
                          </button>
                        ))}
                        <button
                          onClick={() => remove(m.id)}
                          className="ml-auto inline-flex items-center gap-1 font-mono text-[10px] uppercase text-accent-red hover:underline"
                        >
                          <Trash2 className="h-3 w-3" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
