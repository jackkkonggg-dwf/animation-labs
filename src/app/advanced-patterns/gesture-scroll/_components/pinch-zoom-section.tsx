'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-config';
import { useGestureRecognizer } from '@/lib/utils/gesture-recognizer';

export function PinchZoomSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gestureAreaRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useGestureRecognizer(gestureAreaRef as React.RefObject<HTMLElement>, {
    onPinchStart: () => {
      const box = containerRef.current?.querySelector('.pinch-box') as HTMLElement;
      if (box) {
        gsap.to(box, { borderColor: '#f97316', duration: 0.2 });
      }
    },
    onPinch: (gesture) => {
      setScale(gesture.scale);
      const container = containerRef.current;
      if (!container) return;

      const box = container.querySelector('.pinch-box') as HTMLElement;
      if (!box) return;

      gsap.to(box, {
        scale: Math.min(Math.max(gesture.scale, 0.5), 3),
        duration: 0.1,
        ease: 'power1.out',
      });
    },
    onPinchEnd: () => {
      const box = containerRef.current?.querySelector('.pinch-box') as HTMLElement;
      if (box) {
        gsap.to(box, {
          scale: 1,
          borderColor: '#3f3f46',
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
        });
        setTimeout(() => setScale(1), 500);
      }
    },
  });

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const box = container.querySelector('.pinch-box') as HTMLElement;
    if (!box) return;

    gsap.from(box, {
      scale: 0,
      rotation: -90,
      duration: 0.8,
      ease: 'back.out(1.7)',
    });

    return () => {
      gsap.killTweensOf(box);
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-32 bg-zinc-950">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <p className="text-orange-500 text-sm font-mono uppercase tracking-[0.3em] mb-4">
          Pinch Gesture Recognition
        </p>
        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-12">
          Pinch to
          <span className="block text-orange-500">Zoom</span>
        </h2>

        <div
          ref={gestureAreaRef}
          className="relative bg-zinc-800/50 backdrop-blur border-2 border-zinc-700 rounded-3xl p-12 min-h-[400px] flex items-center justify-center touch-none"
        >
          <div className="pinch-box w-64 h-64 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl flex items-center justify-center shadow-2xl border-4 border-zinc-600" style={{ willChange: 'transform' }}>
            <div className="text-center text-white">
              <div className="text-4xl mb-2">🤏</div>
              <div className="text-sm font-mono uppercase">Pinch me!</div>
              <div className="text-xs mt-2 opacity-70">Or Ctrl+Scroll</div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-zinc-400">
            Current scale: <span className="font-mono text-orange-500">{scale.toFixed(2)}x</span>
          </p>
        </div>
      </div>
    </section>
  );
}
