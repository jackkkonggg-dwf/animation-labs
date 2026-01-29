'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, loadSplitText } from '@/lib/gsap-config';

export function CharacterCascadeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(async () => {
    const container = containerRef.current;
    if (!container || !textRef.current) return;

    // Load SplitText plugin dynamically
    const SplitText = await loadSplitText();
    const split = new SplitText(textRef.current, { type: 'chars' });

    // Scroll-triggered character cascade
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=2000',
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Wave effect - each character animates based on its position
    tl.from(split.chars, {
      y: (i) => 50 + Math.sin(i * 0.3) * 30,
      opacity: 0,
      rotation: (i) => Math.sin(i * 0.2) * 20,
      stagger: {
        each: 0.05,
        from: 'start',
      },
      duration: 1,
      ease: 'power2.out',
    }, 0);

    // Color blend on scroll progress
    tl.to(split.chars, {
      color: (i) => {
        const colors = ['#f97316', '#ea580c', '#c2410c', '#9a3412'];
        return colors[i % colors.length];
      },
      stagger: {
        each: 0.03,
        from: 'start',
      },
      duration: 0.8,
      ease: 'none',
    }, 0.3);

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      tl.kill();
      split.revert();
      gsap.killTweensOf(split.chars);
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden bg-zinc-900 flex items-center justify-center">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border-l-2 border-t-2 border-orange-500/30" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-r-2 border-b-2 border-orange-500/30" />

      {/* Content */}
      <div className="relative z-10 px-6 text-center max-w-5xl">
        <p className="text-orange-500 text-sm font-mono uppercase tracking-[0.3em] mb-6">
          Character Cascade
        </p>
        <h2
          ref={textRef}
          className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight leading-tight"
        >
          Every character dances to its own rhythm in this wave cascade animation
        </h2>
      </div>
    </section>
  );
}
