'use client';

import { cn } from '@/lib/utils/cn';

interface GlitchTextProps {
  children: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export function GlitchText({ children, className, as: Tag = 'h1' }: GlitchTextProps) {
  return (
    <Tag
      data-text={children}
      className={cn('glitch relative inline-block', className)}
    >
      {children}
    </Tag>
  );
}