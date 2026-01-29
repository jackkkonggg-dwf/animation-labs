'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = {
      title: container.querySelector('.hero-title') as HTMLElement,
      subtitle: container.querySelector('.hero-subtitle') as HTMLElement,
      background: container.querySelector('.hero-bg') as HTMLElement,
      grid: container.querySelector('.hero-grid') as HTMLElement,
    };

    // Nested timeline for hero section
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

    // Background parallax (slowest)
    tl.to(elements.background, {
      y: -150,
      scale: 1.1,
      ease: 'none',
      duration: 2,
    }, 0);

    // Grid pattern parallax (medium)
    tl.to(elements.grid, {
      y: -80,
      rotation: 2,
      ease: 'none',
      duration: 2,
    }, 0);

    // Title reveal with back.out easing
    tl.from(elements.title, {
      y: 100,
      opacity: 0,
      scale: 0.8,
      ease: 'back.out(1.7)',
      duration: 1,
    }, 0.2);

    // Title scale and fade on progress
    tl.to(elements.title, {
      scale: 1.5,
      opacity: 0,
      y: -100,
      ease: 'expo.inOut',
      duration: 1,
    }, 1);

    // Subtitle reveal with elastic.out
    tl.from(elements.subtitle, {
      y: 50,
      opacity: 0,
      ease: 'elastic.out(1, 0.5)',
      duration: 1.2,
    }, 0.5);

    // Subtitle fade out
    tl.to(elements.subtitle, {
      opacity: 0,
      y: -50,
      ease: 'power2.inOut',
      duration: 0.8,
    }, 1.2);

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
      gsap.killTweensOf(Object.values(elements));
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Background with parallax */}
      <div className="hero-bg absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-orange-950">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }} />
      </div>

      {/* Grid overlay with parallax */}
      <div className="hero-grid absolute inset-0 opacity-10" style={{
        backgroundImage: `
          radial-gradient(circle at 2px 2px, #f97316 1px, transparent 0)
        `,
        backgroundSize: '40px 40px'
      }} />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <h1 className="hero-title text-6xl md:text-8xl font-black text-white uppercase tracking-tighter text-center mb-6">
          Cinematic
          <span className="block text-orange-500">Scroll</span>
        </h1>
        <p className="hero-subtitle text-xl md:text-2xl text-zinc-400 font-mono uppercase tracking-widest text-center">
          Expert-level animation sequences
        </p>
      </div>
    </section>
  );
}
