'use client';

import { useEffect, useRef } from 'react';

export function MatrixBackground({ opacity = 0.15 }: { opacity?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ'.split('');
    const fontSize = 14;
    const cols = Math.floor(canvas.width / fontSize);
    const drops = Array.from({ length: cols }, () => Math.random() * -100);

    let last = 0;
    const draw = (t: number) => {
      if (t - last > 70) {
        last = t;
        ctx.fillStyle = `rgba(2, 4, 8, 0.08)`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = `rgba(0, 255, 136, ${opacity * 2})`;
        ctx.font = `${fontSize}px monospace`;
        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
          drops[i]++;
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, [opacity]);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ opacity }}
      aria-hidden
    />
  );
}