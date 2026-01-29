'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, loadSplitText } from '@/lib/gsap-config';

export function GradientBlendSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(async () => {
    const container = containerRef.current;
    if (!container || !textRef.current) return;

    // Load SplitText plugin dynamically
    const SplitText = await loadSplitText();
    const split = new SplitText(textRef.current, { type: 'words' });

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

    // Gradient color blend on scroll progress
    tl.to(split.words, {
      backgroundImage: (i) => {
        const colors = [
          'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
          'linear-gradient(135deg, #fb923c 0%, #f97316 100%)',
          'linear-gradient(135deg, #fdba74 0%, #fb923c 100%)',
          'linear-gradient(135deg, #ffffff 0%, #f97316 100%)',
        ];
        return colors[i % colors.length];
      },
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      stagger: 0.15,
      duration: 1,
      ease: 'none',
    }, 0);

    // Scale effect
    tl.to(split.words, {
      scale: (i) => 1 + (i % 3) * 0.1,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out',
    }, 0.2);

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      tl.kill();
      split.revert();
      gsap.killTweensOf(split.words);
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden bg-zinc-950 flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-950/20 via-zinc-900 to-zinc-950" />

      <div className="relative z-10 px-6 text-center max-w-4xl">
        <p className="text-orange-500 text-sm font-mono uppercase tracking-[0.3em] mb-8">
          Gradient Blend
        </p>
        <h2
          ref={textRef}
          className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight"
        >
          Colors shift and blend through every word as you progress
        </h2>
      </div>
    </section>
  );
}
