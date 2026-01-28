'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { PatternHeader, CodeViewer, ReplayButton } from '@/components/patterns';
import { RelatedPatterns } from '@/components/patterns/related-patterns';
import { PatternNavigation } from '@/components/patterns/pattern-navigation';

// ============================================================================
// CODE EXAMPLE
// ============================================================================

const CODE_EXAMPLE = `
'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

export function PinnedSequenceDemo() {
  const containerRef = useRef&lt;HTMLDivElement&gt;(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const circle = container.querySelector('.circle');
    const square = container.querySelector('.square');
    const triangle = container.querySelector('.triangle');

    if (!circle || !square || !triangle) return;

    // Create timeline with pin enabled
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top center',    // When to start pinning
        end: '+=2000',           // Pin duration (scroll distance)
        scrub: 1,                // Smooth scroll linking
        pin: true,               // PIN the container in place!
      },
    });

    // Animation sequence - all plays while pinned
    tl.to(circle, {
        scale: 1.5,
        backgroundColor: '#f97316',
        rotation: 360,
        duration: 1,
      })
      .to(square, {
        scale: 1.4,
        backgroundColor: '#06b6d4',
        rotation: -360,
        x: 50,
        duration: 1,
      }, 0.5)
      .to(triangle, {
        scale: 1.6,
        backgroundColor: '#10b981',
        rotation: 540,
        y: -50,
        duration: 1,
      }, 1);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      tl.kill();
      gsap.killTweensOf([circle, square, triangle]);
    };
  }, { scope: containerRef });

  return (
    &lt;div ref={containerRef} className="bg-zinc-900 rounded-lg p-12"&gt;
      &lt;div className="circle w-20 h-20 rounded-full bg-zinc-700" /&gt;
      &lt;div className="square w-20 h-20 rounded bg-zinc-700" /&gt;
      &lt;div className="triangle w-20 h-20 bg-zinc-700" /&gt;
    &lt;/div&gt;
  );
}`;

// ============================================================================
// LIVE DEMO SECTION - PINNED SEQUENCE
// ============================================================================

function PinnedSequenceDemo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = {
      circle: container.querySelector('.pin-circle'),
      square: container.querySelector('.pin-square'),
      triangle: container.querySelector('.pin-triangle'),
      card1: container.querySelector('.pin-card-1'),
      card2: container.querySelector('.pin-card-2'),
      card3: container.querySelector('.pin-card-3'),
    };

    if (!elements.circle || !elements.square || !elements.triangle ||
        !elements.card1 || !elements.card2 || !elements.card3) return;

    // Create pinned timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top center',
        end: '+=2000', // Pin for 2000px of scroll
        scrub: 1,
        pin: true, // This pins the container in place
      },
    });

    // Animation sequence that plays while pinned
    tl.to(elements.circle, {
      scale: 1.5,
      backgroundColor: '#f97316',
      rotation: 360,
      duration: 1,
    })
      .to(elements.square, {
        scale: 1.4,
        backgroundColor: '#06b6d4',
        rotation: -360,
        x: 50,
        duration: 1,
      }, 0.5)
      .to(elements.triangle, {
        scale: 1.6,
        backgroundColor: '#10b981',
        rotation: 540,
        y: -50,
        duration: 1,
      }, 1)
      .from([elements.card1, elements.card2, elements.card3], {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
      }, 1.5);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      tl.kill();
      gsap.killTweensOf([
        elements.circle, elements.square, elements.triangle,
        elements.card1, elements.card2, elements.card3,
      ]);
    };
  }, { scope: containerRef });

  return (
    <div className="space-y-12">
      {/* Scroll indicator */}
      <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono uppercase tracking-wider">
        <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
        Scroll to pin and play
      </div>

      {/* Pinned container */}
      <div
        ref={containerRef}
        className="relative bg-zinc-900/80 border border-zinc-800 rounded-lg p-12 overflow-hidden"
      >
        {/* Pin indicator badge */}
        <div className="absolute top-4 right-4 px-3 py-1 bg-orange-500/20 border border-orange-500/50 rounded">
          <span className="text-orange-500 text-xs font-mono uppercase">Pinned Section</span>
        </div>

        {/* Animated shapes */}
        <div className="flex items-center justify-center gap-8 h-40 mb-12">
          <div className="pin-circle w-20 h-20 rounded-full bg-zinc-700" />
          <div className="pin-square w-20 h-20 rounded-lg bg-zinc-700" />
          <div className="pin-triangle w-20 h-20 bg-zinc-700" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
        </div>

        {/* Info cards that appear */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="pin-card-1 bg-zinc-800/50 border border-zinc-700 rounded-lg p-6 text-center">
            <div className="text-3xl mb-3">📌</div>
            <h3 className="text-white font-bold uppercase mb-2">Stay Fixed</h3>
            <p className="text-zinc-500 text-sm">Section pins to viewport while animation plays</p>
          </div>
          <div className="pin-card-2 bg-zinc-800/50 border border-zinc-700 rounded-lg p-6 text-center">
            <div className="text-3xl mb-3">🎬</div>
            <h3 className="text-white font-bold uppercase mb-2">Timeline Plays</h3>
            <p className="text-zinc-500 text-sm">Full animation sequence runs to completion</p>
          </div>
          <div className="pin-card-3 bg-zinc-800/50 border border-zinc-700 rounded-lg p-6 text-center">
            <div className="text-3xl mb-3">📜</div>
            <h3 className="text-white font-bold uppercase mb-2">Scroll Control</h3>
            <p className="text-zinc-500 text-sm">Scroll position drives animation progress</p>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mt-8 text-center">
          <div className="text-zinc-600 text-xs font-mono">scroll to drive the pinned animation</div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// LIVE DEMO SECTION
// ============================================================================

function LiveDemo() {
  return (
    <section className="relative border-b border-zinc-800">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5 grid-pattern-overlay" />

      {/* Section header */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-8">
        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight flex items-center gap-4">
          <span className="w-3 h-8 bg-orange-500" />
          Live Demo
        </h2>
        <p className="text-zinc-500 mt-3 ml-7">Scroll down to see the pinned section in action</p>
      </div>

      {/* Demo content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <PinnedSequenceDemo />

        {/* Comparison cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Pinned behavior */}
          <div className="bg-zinc-900/80 backdrop-blur-sm border border-orange-500/30 rounded-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-500 text-black font-black flex items-center justify-center rounded">📌</div>
              <h3 className="text-lg font-black text-white uppercase tracking-tight">With Pin</h3>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-orange-500">→</span>
                <span className="text-zinc-400">Section stays fixed in viewport</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500">→</span>
                <span className="text-zinc-400">Full animation plays to completion</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500">→</span>
                <span className="text-zinc-400">User experiences entire sequence</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500">→</span>
                <span className="text-zinc-400">Perfect for storytelling moments</span>
              </li>
            </ul>
          </div>

          {/* Normal behavior */}
          <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-700 rounded-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-zinc-700 text-white font-black flex items-center justify-center rounded">📄</div>
              <h3 className="text-lg font-black text-white uppercase tracking-tight">Without Pin</h3>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-zinc-500">→</span>
                <span className="text-zinc-400">Section scrolls with page normally</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-zinc-500">→</span>
                <span className="text-zinc-400">Animation may be cut off mid-sequence</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-zinc-500">→</span>
                <span className="text-zinc-400">User might miss part of animation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-zinc-500">→</span>
                <span className="text-zinc-400">Less control over user experience</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PinnedSequencePattern() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <PatternHeader
        category="ScrollTrigger"
        difficulty="Advanced"
        title="Sequence"
        titleHighlight="Pinned"
        description="Pin elements and animate through a sequence as user scrolls. Perfect for step-by-step reveals and storytelling."
        features={[
          { label: 'pin: true' },
          { label: 'scrub: true' },
          { label: 'Timeline' }]}
      />
      <LiveDemo />
      <CodeViewer code={CODE_EXAMPLE} language="tsx" filename="tsx" />

      {/* Related Patterns */}
      <RelatedPatterns currentPatternId="pinned-sequence" />

      {/* Pattern Navigation */}
      <PatternNavigation currentPatternId="pinned-sequence" />

      {/* Footer CTA */}
      <section className="relative border-t border-orange-500/20 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
            Create <span className="text-orange-500">Stories</span>
          </h2>
          <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
            Pinned sequences are perfect for product reveals, storytelling moments, and guided animations.
          </p>
          <a
            href="/"
            className="inline-block px-8 py-4 bg-orange-500 text-black font-black text-sm uppercase tracking-wider rounded hover:bg-orange-400 transition-colors duration-300"
          >
            View All Patterns
          </a>
        </div>
      </section>
    </div>
  );
}
