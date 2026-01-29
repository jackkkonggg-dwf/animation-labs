'use client';

import { useRef, useState, useTransition } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-config';

export function CursorTrailSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [, startTransition] = useTransition();

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const cursors = cursorRefs.current.filter(Boolean) as HTMLDivElement[];
    const quickTos: Array<(x: number) => void> = [];
    const quickToYs: Array<(y: number) => void> = [];

    // Create quickTo functions for each cursor trail element
    cursors.forEach((cursor, i) => {
      const lag = 0.1 + (i * 0.08);
      const xTo = gsap.quickTo(cursor, 'x', { duration: lag, ease: 'power2.out' });
      const yTo = gsap.quickTo(cursor, 'y', { duration: lag, ease: 'power2.out' });
      quickTos.push(xTo);
      quickToYs.push(yTo);

      gsap.set(cursor, { x: -100, y: -100, scale: 1 - (i * 0.15), opacity: 1 - (i * 0.15) });
    });

    const handleMouseMove = (e: MouseEvent) => {
      // Get fresh bounds on every mouse move to account for scroll
      const containerBounds = container.getBoundingClientRect();
      const x = e.clientX - containerBounds.left;
      const y = e.clientY - containerBounds.top;

      quickTos.forEach((xTo, i) => {
        setTimeout(() => xTo(x - 20), i * 30);
      });
      quickToYs.forEach((yTo, i) => {
        setTimeout(() => yTo(y - 20), i * 30);
      });

      startTransition(() => {
        setMousePos({ x, y });
      });
    };

    container.addEventListener('mousemove', handleMouseMove);

    gsap.from(cursors, {
      scale: 0,
      opacity: 0,
      stagger: 0.05,
      duration: 0.5,
      ease: 'back.out(1.7)',
    });

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      gsap.killTweensOf(cursors);
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden bg-zinc-950">
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, #f97316 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            ref={(el) => { cursorRefs.current[i] = el; }}
            className="absolute w-10 h-10 rounded-full border-2 border-orange-500"
            style={{ left: 0, top: 0 }}
          />
        ))}
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <p className="text-orange-500 text-sm font-mono uppercase tracking-[0.3em] mb-4">
          gsap.quickTo()
        </p>
        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight text-center mb-6">
          Cursor
          <span className="block text-orange-500">Trail Effect</span>
        </h2>
        <p className="text-zinc-400 text-lg max-w-2xl text-center">
          Move your mouse to see the cascading trail effect. Each element follows with increasing lag for a fluid, organic feel.
        </p>
        <div className="mt-8 font-mono text-sm text-zinc-500">
          Position: ({Math.round(mousePos.x)}, {Math.round(mousePos.y)})
        </div>
      </div>

      <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-orange-500" />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-orange-500" />
    </section>
  );
}
