'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, loadSplitText } from '@/lib/gsap-config';

export function ScrollScrubSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(async () => {
    const container = containerRef.current;
    if (!container || !textRef.current) return;

    // Load SplitText plugin dynamically
    const SplitText = await loadSplitText();
    const split = new SplitText(textRef.current, { type: 'chars' });

    // Scrub animation - text follows scroll position exactly
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

    // Set initial state for 3D transforms
    gsap.set(split.chars, {
      transformStyle: 'preserve-3d',
      backfaceVisibility: 'hidden',
    });

    // Character rotation and scale based on scroll
    tl.to(split.chars, {
      rotation: (i) => i * 15,
      scale: (i) => 1 + Math.sin(i * 0.3) * 0.3,
      color: (i) => {
        const progress = i / split.chars.length;
        return `hsl(${25 + progress * 20}, 90%, ${60 + progress * 20}%)`;
      },
      stagger: {
        each: 0.02,
        from: 'center',
      },
      duration: 1,
      ease: 'none',
    }, 0);

    // 3D rotation effect on scroll
    tl.to(split.chars, {
      rotationY: 360,
      rotationX: (i) => Math.sin(i * 0.5) * 180,
      z: (i) => 100 + Math.abs(i - split.chars.length / 2) * 10,
      transformOrigin: 'center center -100px',
      stagger: {
        each: 0.01,
        from: 'center',
      },
      duration: 1,
      ease: 'none',
    }, 0.5);

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      tl.kill();
      split.revert();
      gsap.killTweensOf(split.chars);
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden bg-gradient-to-br from-zinc-950 via-orange-950 to-zinc-900 flex items-center justify-center">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `
          radial-gradient(circle at 20% 50%, #f97316 1px, transparent 1px),
          radial-gradient(circle at 80% 50%, #f97316 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }} />

      <div className="relative z-10 px-6 text-center max-w-4xl">
        <p className="text-orange-500 text-sm font-mono uppercase tracking-[0.3em] mb-8">
          Scroll Scrub
        </p>
        <h2
          ref={textRef}
          className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight"
          style={{ perspective: '1000px' }}
        >
          Scroll to animate
        </h2>
      </div>
    </section>
  );
}
