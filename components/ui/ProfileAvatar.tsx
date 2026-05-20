'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

interface ProfileAvatarProps {
  src?: string;
  alt: string;
  size?: number;
  className?: string;
  glow?: boolean;
}

/**
 * Circular profile photo with a neon-green glow ring.
 * If the image fails to load (e.g. file not added yet) falls back to a
 * gradient placeholder showing initials — the build/page never breaks.
 */
export function ProfileAvatar({
  src,
  alt,
  size = 144,
  className,
  glow = true,
}: ProfileAvatarProps) {
  const [errored, setErrored] = useState(false);
  const showImage = src && !errored;
  const initials = alt
    .split(' ')
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden rounded-full border-2 border-accent-green bg-bg-card',
        glow && 'shadow-glow-green ring-2 ring-accent-green/30 ring-offset-4 ring-offset-bg-primary',
        className,
      )}
      style={{ width: size, height: size }}
    >
      {showImage ? (
        <Image
          src={src}
          alt={alt}
          width={size * 2}
          height={size * 2}
          priority
          onError={() => setErrored(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-bg-card via-bg-secondary to-bg-primary font-display text-3xl font-extrabold text-accent-green">
          {initials || '?'}
        </div>
      )}
      {glow && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            boxShadow: 'inset 0 0 20px rgba(0, 255, 136, 0.25)',
          }}
        />
      )}
    </div>
  );
}
