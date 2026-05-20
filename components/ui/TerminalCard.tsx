import { cn } from '@/lib/utils/cn';

interface TerminalCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function TerminalCard({ title = 'terminal', children, className }: TerminalCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-border-neon bg-bg-card shadow-glow-green/20 overflow-hidden font-mono text-sm',
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-border-neon bg-bg-secondary/80 px-4 py-2">
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-accent-red" />
          <span className="h-3 w-3 rounded-full bg-yellow-400" />
          <span className="h-3 w-3 rounded-full bg-accent-green" />
        </div>
        <span className="text-xs text-text-muted">{title}</span>
        <span className="w-12" />
      </div>
      <div className="p-5 text-text-primary">{children}</div>
    </div>
  );
}