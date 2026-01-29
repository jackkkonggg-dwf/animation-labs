'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap-config';

export function LineByLineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container || !textRef.current) return;
    const split = new SplitText(textRef.current, {
      type: 'lines',
      linesClass: 'overflow-hidden', // Class to add to line wrappers
    });

    // Set initial state
    gsap.set(split.lines, { y: 100, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=1200',
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        toggleActions: 'play none none reverse',
      },
    });

    // Line-by-line reveal with elastic easing
    tl.to(split.lines, {
      y: 0,
      opacity: 1,
      stagger: 0.2,
      duration: 0.8,
      ease: 'elastic.out(1, 0.6)',
    }, 0);

    // Refresh ScrollTrigger after setup
    ScrollTrigger.refresh();

    // Track the specific ScrollTrigger for cleanup
    const scrollTrigger = tl.scrollTrigger;

    return () => {
      // Only kill the ScrollTrigger we created, not all global triggers
      if (scrollTrigger) {
        scrollTrigger.kill();
      }
      tl.kill();
      split.revert();
      gsap.killTweensOf(split.lines);
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden bg-zinc-900 flex items-center justify-center">
      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5" style={{
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(249, 115, 22, 0.1) 2px, rgba(249, 115, 22, 0.1) 4px)',
      }} />

      <div className="relative z-10 px-6 max-w-3xl">
        <p className="text-orange-500 text-sm font-mono uppercase tracking-[0.3em] mb-8 text-center">
          Line by Line
        </p>
        <div
          ref={textRef}
          className="text-2xl md:text-3xl text-white font-medium leading-relaxed text-center space-y-4"
        >
          <p>Each line reveals with custom easing</p>
          <p>From back bounce to elastic spring</p>
          <p>Creating a dynamic reading experience</p>
          <p>That guides the eye through content</p>
        </div>
      </div>
    </section>
  );
}
