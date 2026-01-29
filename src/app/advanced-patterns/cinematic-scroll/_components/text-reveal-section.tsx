'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

export function TextRevealSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = {
      words: container.querySelectorAll('.reveal-word'),
      background: container.querySelector('.reveal-bg') as HTMLElement,
      circle: container.querySelector('.reveal-circle') as HTMLElement,
    };

    // Nested timeline with multiple child animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=1800',
        scrub: 1,
        pin: true,
      },
    });

    // Background color shift
    tl.to(elements.background, {
      backgroundColor: '#18181b',
      ease: 'none',
      duration: 2,
    }, 0);

    // Circle expansion with elastic easing
    tl.fromTo(elements.circle,
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, ease: 'elastic.out(1, 0.6)', duration: 1.5 },
      0.3
    );

    // Circle morph with back easing
    tl.to(elements.circle, {
      borderRadius: '0%',
      rotation: 45,
      ease: 'back.out(1.2)',
      duration: 0.8,
    }, 1);

    // Word cascade reveals
    tl.from(elements.words, {
      y: 80,
      opacity: 0,
      stagger: 0.15,
      ease: 'back.out(1.5)',
      duration: 0.8,
    }, 0.5);

    // Word exit with expo easing
    tl.to(elements.words, {
      y: -60,
      opacity: 0,
      stagger: 0.1,
      ease: 'expo.in',
      duration: 0.6,
    }, 1.4);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      tl.kill();
      gsap.killTweensOf([...elements.words, elements.background, elements.circle]);
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="reveal-bg relative h-screen overflow-hidden bg-zinc-950">
      {/* Animated circle */}
      <div className="reveal-circle absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <div className="text-center space-y-4">
          <p className="reveal-word text-orange-500 text-sm font-mono uppercase tracking-[0.3em]">
            Nested Timelines
          </p>
          <h2 className="reveal-word text-5xl md:text-7xl font-black text-white uppercase tracking-tight">
            Text Cascade
          </h2>
          <p className="reveal-word text-2xl md:text-3xl text-zinc-400 font-light">
            Staggered reveals with precision
          </p>
        </div>
      </div>
    </section>
  );
}
