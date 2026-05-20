import { cn } from '@/lib/utils/cn';

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({ label, title, description, align = 'center', className }: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-12 flex flex-col gap-3',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-green">
        // {label}
      </span>
      <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-text-primary md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-sm text-text-muted md:text-base">{description}</p>
      )}
      <div className="mt-2 h-px w-24 bg-gradient-to-r from-accent-green to-accent-cyan" />
    </div>
  );
}