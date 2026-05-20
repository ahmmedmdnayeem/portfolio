import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

interface NeonButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'green' | 'cyan' | 'red';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
  external?: boolean;
}

const variants = {
  green: 'border-accent-green text-accent-green hover:bg-accent-green/10 hover:shadow-glow-green',
  cyan: 'border-accent-cyan text-accent-cyan hover:bg-accent-cyan/10 hover:shadow-glow-cyan',
  red: 'border-accent-red text-accent-red hover:bg-accent-red/10 hover:shadow-glow-red',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

export function NeonButton({
  children,
  href,
  onClick,
  variant = 'green',
  size = 'md',
  type = 'button',
  disabled,
  className,
  external,
}: NeonButtonProps) {
  const cls = cn(
    'inline-flex items-center justify-center gap-2 rounded-md border-2 font-mono uppercase tracking-wider transition-all duration-200 bg-transparent disabled:opacity-50 disabled:cursor-not-allowed',
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}