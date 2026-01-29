'use client';

import { useRef, useState, useEffect, useTransition } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-config';
import { useScrollState } from '@/lib/utils/scroll-velocity';

export function VelocityScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollState = useScrollState({ updateInterval: 16 });
  const [displayVelocity, setDisplayVelocity] = useState(0);
  const smoothedVelocityRef = useRef({ value: 0 });
  const meterTextRef = useRef<HTMLParagraphElement>(null);
  const currentVelocityRef = useRef(0);
  const [, startTransition] = useTransition();

  useEffect(() => {
    currentVelocityRef.current = scrollState.velocity;
  }, [scrollState.velocity]);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = {
      cards: container.querySelectorAll('.velocity-card'),
      meter: container.querySelector('.velocity-meter') as HTMLElement,
      meterText: meterTextRef.current,
    };

    gsap.from(elements.cards, {
      y: 100,
      opacity: 0,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: 'top center',
        toggleActions: 'play none none reverse',
        fastScrollEnd: true,
        invalidateOnRefresh: true,
      },
    });

    const meterWidthSetter = gsap.quickSetter(elements.meter, 'width', '%');
    const meterBgSetter = gsap.quickSetter(elements.meter, 'backgroundColor');
    const cardsScaleSetter = gsap.quickSetter(elements.cards, 'scale');

    let frameCount = 0;
    const UPDATE_INTERVAL = 4;

    const updateVelocity = () => {
      const targetVelocity = currentVelocityRef.current;
      const current = smoothedVelocityRef.current.value;

      if (Math.abs(targetVelocity - current) < 0.01) return;

      const lerpFactor = 0.05;
      const smoothedVelocity = current + (targetVelocity - current) * lerpFactor;

      smoothedVelocityRef.current.value = smoothedVelocity;

      const isFast = targetVelocity > 1.5;
      const velocityInPxPerSecond = smoothedVelocity * 1000;
      const meterPercent = Math.min(velocityInPxPerSecond / 20, 100);
      meterWidthSetter(meterPercent);
      meterBgSetter(isFast ? '#ef4444' : velocityInPxPerSecond > 700 ? '#f59e0b' : '#22c55e');

      if (elements.meterText) {
        elements.meterText.textContent = `${velocityInPxPerSecond.toFixed(0)} px/s`;
      }

      const scale = 1 + Math.min(velocityInPxPerSecond * 0.0001, 0.3);
      cardsScaleSetter(scale);

      frameCount++;
      if (frameCount % UPDATE_INTERVAL === 0) {
        startTransition(() => {
          setDisplayVelocity(smoothedVelocity);
        });
      }
    };

    gsap.ticker.add(updateVelocity);

    return () => {
      gsap.ticker.remove(updateVelocity);
      gsap.killTweensOf([...elements.cards, elements.meter]);
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-32 bg-gradient-to-br from-zinc-900 via-zinc-950 to-orange-950">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <p className="text-orange-500 text-sm font-mono uppercase tracking-[0.3em] mb-4">
          useScrollVelocity()
        </p>
        <h2 className="velocity-title text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-12">
          Scroll Speed
          <span className="block text-orange-500">Detection</span>
        </h2>

        <div className="mb-12 bg-zinc-800 rounded-full h-6 overflow-hidden border border-zinc-700">
          <div className="velocity-meter h-full bg-green-500" style={{ width: `0%` }} />
        </div>
        <p ref={meterTextRef} className="velocity-meter-text text-zinc-400 font-mono text-sm mb-12">
          {(displayVelocity * 1000).toFixed(0)} px/s
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="velocity-card bg-zinc-800/80 backdrop-blur border-2 border-zinc-700 rounded-2xl p-6"
              style={{ willChange: 'transform, opacity' }}
            >
              <div className="text-4xl font-black text-orange-500 mb-2">0{i + 1}</div>
              <div className="text-zinc-400 text-sm uppercase tracking-wider">
                Card reacts to velocity
              </div>
            </div>
          ))}
        </div>

        <p className="mt-12 text-zinc-500 text-sm">
          Scroll at different speeds to see the cards scale dynamically.
        </p>
      </div>
    </section>
  );
}
