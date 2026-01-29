'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

export function ImageRevealSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = {
      card1: container.querySelector('.img-card-1') as HTMLElement,
      card2: container.querySelector('.img-card-2') as HTMLElement,
      card3: container.querySelector('.img-card-3') as HTMLElement,
      title: container.querySelector('.img-title') as HTMLElement,
      particles: container.querySelectorAll('.particle'),
    };

    // Complex nested timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=2500',
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Title reveal
    tl.from(elements.title, {
      y: -100,
      opacity: 0,
      ease: 'back.out(2)',
      duration: 1,
    }, 0);

    // Cards cascade entry with different timings
    tl.from(elements.card1, {
      x: -200,
      y: 100,
      rotation: -15,
      opacity: 0,
      ease: 'back.out(1.3)',
      duration: 1,
    }, 0.3);

    tl.from(elements.card2, {
      y: 150,
      scale: 0.5,
      opacity: 0,
      ease: 'elastic.out(1, 0.5)',
      duration: 1.2,
    }, 0.5);

    tl.from(elements.card3, {
      x: 200,
      y: 100,
      rotation: 15,
      opacity: 0,
      ease: 'back.out(1.3)',
      duration: 1,
    }, 0.7);

    // Cards dance with elastic easing
    tl.to(elements.card1, {
      y: -30,
      rotation: 5,
      ease: 'elastic.out(1, 0.4)',
      duration: 0.8,
    }, 1.2);

    tl.to(elements.card2, {
      y: -50,
      scale: 1.1,
      ease: 'back.out(1.5)',
      duration: 0.6,
    }, 1.3);

    tl.to(elements.card3, {
      y: -30,
      rotation: -5,
      ease: 'elastic.out(1, 0.4)',
      duration: 0.8,
    }, 1.4);

    // Particle explosion
    tl.from(elements.particles, {
      scale: 0,
      opacity: 0,
      stagger: { each: 0.05, from: 'center' },
      ease: 'back.out(2)',
      duration: 0.8,
    }, 1.8);

    // Final arrangement with expo easing
    tl.to([elements.card1, elements.card2, elements.card3], {
      y: 0,
      x: 0,
      rotation: 0,
      scale: 1,
      opacity: 1,
      ease: 'expo.inOut',
      duration: 1,
    }, 2.2);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      tl.kill();
      gsap.killTweensOf([elements.card1, elements.card2, elements.card3, elements.title, ...elements.particles]);
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-orange-950">
      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 bg-orange-500/30 rounded-full"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${20 + Math.random() * 60}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <h2 className="img-title text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-16 text-center">
          Image Layer
          <span className="block text-orange-500">Reveals</span>
        </h2>

        {/* Image cards */}
        <div className="relative w-full max-w-4xl h-80">
          {/* Card 1 */}
          <div className="img-card-1 absolute left-0 top-0 w-64 h-64 bg-zinc-800/80 backdrop-blur border-2 border-zinc-700 rounded-2xl p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">01</div>
              <div className="text-zinc-400 text-sm uppercase tracking-wider">Layer One</div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="img-card-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-orange-500/90 backdrop-blur border-2 border-orange-400 rounded-2xl p-6 flex items-center justify-center shadow-2xl">
            <div className="text-center text-black">
              <div className="text-5xl mb-2 font-black">02</div>
              <div className="text-black/70 text-sm uppercase tracking-wider">Focus Point</div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="img-card-3 absolute right-0 top-0 w-64 h-64 bg-zinc-800/80 backdrop-blur border-2 border-zinc-700 rounded-2xl p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">03</div>
              <div className="text-zinc-400 text-sm uppercase tracking-wider">Layer Three</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
