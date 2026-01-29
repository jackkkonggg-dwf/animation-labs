'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

export function FinaleSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = {
      title: container.querySelector('.finale-title') as HTMLElement,
      subtitle: container.querySelector('.finale-subtitle') as HTMLElement,
      shapes: container.querySelectorAll('.finale-shape'),
      line: container.querySelector('.finale-line') as HTMLElement,
    };

    // Final timeline with all advanced easing
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=1500',
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Line draw animation
    tl.from(elements.line, {
      scaleX: 0,
      transformOrigin: 'left center',
      ease: 'expo.inOut',
      duration: 1,
    }, 0);

    // Shapes burst with elastic easing
    tl.from(elements.shapes, {
      scale: 0,
      opacity: 0,
      stagger: { each: 0.1, from: 'center' },
      ease: 'elastic.out(1, 0.6)',
      duration: 1.2,
    }, 0.3);

    // Title reveal with back easing
    tl.from(elements.title, {
      y: 100,
      opacity: 0,
      ease: 'back.out(2)',
      duration: 1,
    }, 0.5);

    // Subtitle reveal
    tl.from(elements.subtitle, {
      y: 50,
      opacity: 0,
      ease: 'expo.out',
      duration: 0.8,
    }, 0.8);

    // Shapes rotate with expo easing
    tl.to(elements.shapes, {
      rotation: (i) => (i % 2 === 0 ? 180 : -180),
      ease: 'expo.inOut',
      duration: 1,
      stagger: 0.05,
    }, 1.5);

    // Final scale
    tl.to([elements.title, elements.subtitle], {
      scale: 1.1,
      ease: 'back.out(1.5)',
      duration: 0.8,
    }, 2);

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
      gsap.killTweensOf([elements.title, elements.subtitle, elements.line, ...elements.shapes]);
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden bg-zinc-950">
      {/* Decorative shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="finale-shape absolute border-2 border-orange-500/30 rounded-full"
            style={{
              width: `${40 + Math.random() * 80}px`,
              height: `${40 + Math.random() * 80}px`,
              top: `${20 + Math.random() * 60}%`,
              left: `${10 + (i * 8)}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        {/* Decorative line */}
        <div className="finale-line w-32 h-1 bg-orange-500 mb-8" />

        <h2 className="finale-title text-5xl md:text-7xl font-black text-white uppercase tracking-tight text-center mb-6">
          Expert
          <span className="block text-orange-500">Animation</span>
        </h2>
        <p className="finale-subtitle text-xl text-zinc-400 font-mono uppercase tracking-widest text-center">
          Master cinematic scroll sequences
        </p>
      </div>
    </section>
  );
}
