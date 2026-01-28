'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

// ============================================================================
// CINEMATIC SECTION 1 - Hero Parallax
// ============================================================================

function HeroSection() {
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

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
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

// ============================================================================
// CINEMATIC SECTION 2 - Text Reveal Cascade
// ============================================================================

function TextRevealSection() {
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

// ============================================================================
// CINEMATIC SECTION 3 - Image Reveal Layers
// ============================================================================

function ImageRevealSection() {
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

// ============================================================================
// CINEMATIC SECTION 4 - Grand Finale
// ============================================================================

function FinaleSection() {
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
        start: 'top center',
        end: '+=1500',
        scrub: 1,
        pin: true,
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

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
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

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function CinematicScrollPage() {
  return (
    <main className="min-h-screen">
      {/* Info banner */}
      <div className="sticky top-0 z-50 bg-zinc-900/95 backdrop-blur border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-orange-500 text-xs font-black tracking-[0.2em] uppercase">
              Advanced Pattern
            </span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400 text-sm">Scroll to experience</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-zinc-500 text-xs font-mono">4 PINNED SECTIONS</span>
          </div>
        </div>
      </div>

      {/* Cinematic sections */}
      <HeroSection />
      <TextRevealSection />
      <ImageRevealSection />
      <FinaleSection />

      {/* Footer */}
      <footer className="bg-zinc-900/50 border-t border-zinc-800 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-zinc-500 text-sm font-mono">
            Featuring: pin: true, nested timelines, back.out, elastic.out, expo.inOut
          </p>
        </div>
      </footer>
    </main>
  );
}
