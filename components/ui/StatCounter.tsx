'use client';

import { useEffect, useRef, useState } from 'react';

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
}

export function StatCounter({ value, suffix = '', label, duration = 1500 }: StatCounterProps) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          const start = performance.now();
          const tick = (t: number) => {
            const progress = Math.min((t - start) / duration, 1);
            setN(Math.floor(progress * value));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-3xl font-extrabold text-accent-green md:text-4xl">
        {n}
        {suffix}
      </div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-text-muted md:text-xs">
        {label}
      </div>
    </div>
  );
}