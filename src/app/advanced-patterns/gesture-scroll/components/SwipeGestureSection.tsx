'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-config';
import { useSwipeCallback, type SwipeDirection } from '@/lib/utils/gesture-recognizer';

export function SwipeGestureSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lastSwipe, setLastSwipe] = useState<SwipeDirection>('none');
  const [swipeCount, setSwipeCount] = useState(0);

  const swipeRef = useSwipeCallback({
    onSwipe: (gesture) => {
      setLastSwipe(gesture.direction);
      setSwipeCount(prev => prev + 1);

      const container = containerRef.current;
      if (!container) return;

      const box = container.querySelector('.swipe-box') as HTMLElement;
      if (!box) return;

      switch (gesture.direction) {
        case 'left':
          gsap.to(box, { x: -100, rotation: -15, duration: 0.4, ease: 'power2.out' });
          break;
        case 'right':
          gsap.to(box, { x: 100, rotation: 15, duration: 0.4, ease: 'power2.out' });
          break;
        case 'up':
          gsap.to(box, { y: -100, scale: 1.2, duration: 0.4, ease: 'power2.out' });
          break;
        case 'down':
          gsap.to(box, { y: 100, scale: 0.8, duration: 0.4, ease: 'power2.out' });
          break;
      }

      gsap.to(box, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        delay: 0.6,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });
    },
  });

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const box = container.querySelector('.swipe-box') as HTMLElement;
    if (!box) return;

    gsap.from(box, {
      scale: 0,
      rotation: -180,
      duration: 0.8,
      ease: 'back.out(1.7)',
    });

    return () => {
      gsap.killTweensOf(box);
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-32 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <p className="text-blue-500 text-sm font-mono uppercase tracking-[0.3em] mb-4">
          useSwipeCallback()
        </p>
        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-12">
          Swipe Gesture
          <span className="block text-blue-500">Recognition</span>
        </h2>

        <div
          ref={swipeRef}
          className="relative bg-zinc-800/50 backdrop-blur border-2 border-zinc-700 rounded-3xl p-12 min-h-[400px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
        >
          <div className="swipe-box w-48 h-48 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-2xl" style={{ willChange: 'transform' }}>
            <div className="text-center text-white">
              <div className="text-4xl mb-2">👆</div>
              <div className="text-sm font-mono uppercase">Swipe me!</div>
            </div>
          </div>

          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-zinc-500 text-sm">↑ Swipe Up</div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-zinc-500 text-sm">↓ Swipe Down</div>
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">← Swipe Left</div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">Swipe Right →</div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-zinc-400 mb-2">
            Last swipe: <span className="font-mono text-blue-500">{lastSwipe.toUpperCase()}</span>
          </p>
          <p className="text-zinc-500 text-sm">
            Total swipes: <span className="font-mono">{swipeCount}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
