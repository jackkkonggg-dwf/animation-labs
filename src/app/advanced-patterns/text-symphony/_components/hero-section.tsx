'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, loadSplitText } from '@/lib/gsap-config';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(async () => {
    const container = containerRef.current;
    if (!container || !titleRef.current || !subtitleRef.current) return;

    // Load SplitText plugin dynamically
    const SplitText = await loadSplitText();

    // Split text into characters and words
    const titleSplit = new SplitText(titleRef.current, { type: 'chars, words' });
    const subtitleSplit = new SplitText(subtitleRef.current, { type: 'words' });

    // Auto-playing master timeline with complex choreography
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Set initial state
    gsap.set(titleSplit.chars, { opacity: 0, y: 100, rotationX: -90 });
    gsap.set(subtitleSplit.words, { opacity: 0, y: 50 });

    // Character cascade wave effect - creates a ripple from left to right
    tl.to(titleSplit.chars, {
      y: 0,
      opacity: 1,
      rotationX: 0,
      stagger: {
        each: 0.03,
        from: 'start',
      },
      duration: 0.8,
      ease: 'back.out(1.7)',
    }, 0);

    // Word-based subtitle reveal with elastic bounce
    tl.to(subtitleSplit.words, {
      y: 0,
      opacity: 1,
      stagger: 0.15,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
    }, 0.4);

    // Character color wave effect
    tl.to(titleSplit.chars, {
      color: (i) => {
        const colors = ['#f97316', '#fb923c', '#fdba74', '#ffffff'];
        return colors[i % colors.length];
      },
      stagger: {
        each: 0.05,
        from: 'center',
      },
      duration: 0.5,
      ease: 'power2.out',
    }, 1);

    // Pulse animation on characters
    tl.to(titleSplit.chars, {
      scale: 1.2,
      stagger: {
        each: 0.02,
        from: 'random',
      },
      duration: 0.3,
      ease: 'power1.out',
      yoyo: true,
      repeat: 1,
    }, 1.5);

    return () => {
      tl.kill();
      titleSplit.revert();
      subtitleSplit.revert();
      gsap.killTweensOf([...titleSplit.chars, ...subtitleSplit.words]);
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden bg-zinc-950">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-orange-950" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(to right, #f97316 1px, transparent 1px),
            linear-gradient(to bottom, #f97316 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter text-center mb-8"
        >
          Text Symphony
        </h1>
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-zinc-400 font-mono uppercase tracking-widest text-center"
        >
          Advanced SplitText choreography
        </p>
      </div>
    </section>
  );
}
