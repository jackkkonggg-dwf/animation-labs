'use client';

import { useRef, useState, useEffect, useTransition } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { useScrollState } from '@/lib/utils/scroll-velocity';

export function DirectionScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<'up' | 'down' | 'none'>('none');
  const scrollState = useScrollState();
  const arrowTextRef = useRef<HTMLDivElement>(null);
  const currentDirectionRef = useRef<'up' | 'down' | 'none'>('none');
  const [, startTransition] = useTransition();

  useEffect(() => {
    currentDirectionRef.current = scrollState.direction;
  }, [scrollState.direction]);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = {
      circle: container.querySelector('.direction-circle') as HTMLElement,
      arrow: arrowTextRef.current,
      cards: container.querySelectorAll('.direction-card'),
    };

    let lastDirection: 'up' | 'down' | 'none' = 'none';
    let updateTimeout: number | null = null;

    const directionTrigger = ScrollTrigger.create({
      trigger: container,
      start: 'top bottom',
      end: 'bottom top',
      fastScrollEnd: true,
      onUpdate: () => {
        const currentDirection = currentDirectionRef.current;

        if (currentDirection !== lastDirection && currentDirection !== 'none') {
          if (updateTimeout) return;

          lastDirection = currentDirection;

          const displayChar = currentDirection === 'down' ? '↓' : currentDirection === 'up' ? '↑' : '↕';
          if (elements.arrow) {
            elements.arrow.textContent = displayChar;
          }

          startTransition(() => {
            setDirection(currentDirection);
          });

          if (currentDirection === 'down') {
            gsap.to(elements.circle, {
              rotation: 180,
              scale: 1.2,
              backgroundColor: '#f97316',
              duration: 0.4,
              ease: 'back.out(1.7)',
            });
            gsap.to(elements.arrow, { y: 10, duration: 0.4 });
          } else if (currentDirection === 'up') {
            gsap.to(elements.circle, {
              rotation: 0,
              scale: 0.8,
              backgroundColor: '#3b82f6',
              duration: 0.4,
              ease: 'back.out(1.7)',
            });
            gsap.to(elements.arrow, { y: -10, duration: 0.4 });
          }

          if (currentDirection === 'down') {
            gsap.to(elements.cards, {
              x: (i) => (i % 2 === 0 ? 20 : -20),
              duration: 0.3,
              stagger: 0.05,
            });
          } else {
            gsap.to(elements.cards, {
              x: (i) => (i % 2 === 0 ? -20 : 20),
              duration: 0.3,
              stagger: 0.05,
            });
          }

          updateTimeout = window.setTimeout(() => {
            updateTimeout = null;
          }, 100);
        }
      },
    });

    return () => {
      if (updateTimeout) clearTimeout(updateTimeout);
      directionTrigger.kill();
      gsap.killTweensOf([elements.circle, elements.arrow, ...elements.cards]);
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-32 bg-zinc-950">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <p className="text-orange-500 text-sm font-mono uppercase tracking-[0.3em] mb-4">
          Scroll Direction Detection
        </p>
        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-12">
          Direction
          <span className="block text-orange-500">Awareness</span>
        </h2>

        <div className="flex items-center justify-center mb-12">
          <div className="direction-circle w-32 h-32 bg-zinc-800 rounded-full flex items-center justify-center border-4 border-zinc-700" style={{ willChange: 'transform, background-color' }}>
            <div ref={arrowTextRef} className="direction-arrow text-4xl">↕</div>
          </div>
        </div>

        <p className="text-center text-zinc-400 mb-12">
          Current direction: <span className="font-mono text-orange-500">{direction.toUpperCase()}</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="direction-card bg-zinc-800/80 backdrop-blur border border-zinc-700 rounded-xl p-4 transition-colors"
              style={{ willChange: 'transform' }}
            >
              <div className="text-center">
                <div className="text-2xl font-black text-zinc-400 mb-1">0{i + 1}</div>
                <div className="text-xs text-zinc-500 uppercase">
                  {direction === 'down' ? 'Slides right' : direction === 'up' ? 'Slides left' : 'Waiting'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
