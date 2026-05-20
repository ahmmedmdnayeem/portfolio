'use client';

import { useEffect, useState } from 'react';

interface TypewriterProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
  className?: string;
}

export function Typewriter({
  phrases,
  typingSpeed = 80,
  deletingSpeed = 40,
  pause = 1500,
  className,
}: TypewriterProps) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[index % phrases.length];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => i + 1);
    } else {
      timeout = setTimeout(
        () => {
          setText((t) =>
            deleting ? current.substring(0, t.length - 1) : current.substring(0, t.length + 1),
          );
        },
        deleting ? deletingSpeed : typingSpeed,
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, index, phrases, typingSpeed, deletingSpeed, pause]);

  return (
    <span className={className}>
      {text}
      <span className="ml-0.5 inline-block h-5 w-2 -translate-y-0.5 animate-blink bg-accent-green align-middle" />
    </span>
  );
}