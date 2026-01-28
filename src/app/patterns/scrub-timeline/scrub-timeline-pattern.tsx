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

export function ScrubTimelineDemo() {
  const containerRef = useRef&lt;HTMLDivElement&gt;(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const circle = container.querySelector('.circle');
    const square = container.querySelector('.square');
    const triangle = container.querySelector('.triangle');

    if (!circle || !square || !triangle) return;

    // Create timeline linked to scroll position
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top center',      // When top of container hits center
        end: 'bottom center',      // When bottom of container hits center
        scrub: 1,                  // Smooth 1-second catch-up
      },
    });

    // Chain animations - all controlled by scroll
    tl.to(circle, {
        scale: 1.3,
        backgroundColor: '#f97316',
        rotation: 180,
        duration: 1,
      })
      .to(square, {
        scale: 1.2,
        backgroundColor: '#06b6d4',
        rotation: -270,
        x: 30,
        duration: 1,
      }, 0.5)  // Start at 0.5s (overlap with circle)
      .to(triangle, {
        scale: 1.4,
        backgroundColor: '#10b981',
        rotation: 360,
        y: -20,
        duration: 1,
      }, 1);     // Start at 1s (after circle completes)

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      tl.kill();
      gsap.killTweensOf([circle, square, triangle]);
    };
  }, { scope: containerRef });

  return (
    &lt;div ref={containerRef}&gt;
      &lt;div className="circle w-16 h-16 rounded-full bg-zinc-700" /&gt;
      &lt;div className="square w-16 h-16 rounded bg-zinc-700" /&gt;
      &lt;div className="triangle w-16 h-16 bg-zinc-700" /&gt;
    &lt;/div&gt;
  );
}`;

// ============================================================================
// LIVE DEMO SECTION - SCRUB TIMELINE
// ============================================================================

function ScrubTimelineDemo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = {
      circle: container.querySelector('.scrub-circle'),
      square: container.querySelector('.scrub-square'),
      triangle: container.querySelector('.scrub-triangle'),
      progressBar: container.querySelector('.scrub-progress'),
    };

    if (!elements.circle || !elements.square || !elements.triangle || !elements.progressBar) return;

    // Create timeline linked to scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top center',
        end: 'bottom center',
        scrub: 1, // Smooth scrub with 1 second catch-up
      },
    });

    // Animation sequence controlled by scroll
    tl.to(elements.circle, {
      scale: 1.3,
      backgroundColor: '#f97316',
      rotation: 180,
      duration: 1,
    })
      .to(elements.square, {
        scale: 1.2,
        backgroundColor: '#06b6d4',
        rotation: -270,
        x: 30,
        duration: 1,
      }, 0.5) // Start halfway through circle animation
      .to(elements.triangle, {
        scale: 1.4,
        backgroundColor: '#10b981',
        rotation: 360,
        y: -20,
        duration: 1,
      }, 1) // Start after circle completes
      .to(elements.progressBar, {
        scaleX: 1,
        duration: 2,
        ease: 'none',
      }, 0); // Start at beginning, span entire timeline

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      tl.kill();
      gsap.killTweensOf([elements.circle, elements.square, elements.triangle, elements.progressBar]);
    };
  }, { scope: containerRef });

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Scroll indicator */}
      <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono uppercase tracking-wider">
        <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
        Scroll to animate
      </div>

      <div ref={containerRef} className="flex flex-col items-center gap-8 py-20 w-full">
        {/* Animated shapes */}
        <div className="flex items-center justify-center gap-8 h-32 w-full">
          {/* Circle */}
          <div className="scrub-circle w-16 h-16 rounded-full bg-zinc-700" />
          {/* Square */}
          <div className="scrub-square w-16 h-16 rounded-lg bg-zinc-700" />
          {/* Triangle */}
          <div className="scrub-triangle w-16 h-16 bg-zinc-700" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
        </div>

        {/* Progress bar */}
        <div className="w-64 h-2 bg-zinc-800 rounded overflow-hidden">
          <div className="scrub-progress h-full bg-gradient-to-r from-orange-500 to-amber-500 origin-left" style={{ transform: 'scaleX(0)' }} />
        </div>

        {/* Scroll position indicator */}
        <div className="text-zinc-600 text-xs font-mono">timeline progress follows scroll</div>
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
        <p className="text-zinc-500 mt-3 ml-7">Scroll down to control the animation timeline</p>
      </div>

      {/* Demo cards */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main scrub demo */}
          <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-lg p-8">
            <div className="text-4xl mb-6 text-center">🎜️</div>
            <h3 className="text-lg font-black text-white uppercase tracking-tight mb-6 text-center">
              Scroll-Linked Timeline
            </h3>
            <ScrubTimelineDemo />
          </div>

          {/* Scrub concepts card */}
          <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-lg p-8 flex flex-col justify-center">
            <h3 className="text-lg font-black text-white uppercase tracking-tight mb-6">
              How Scrub Works
            </h3>
            <div className="space-y-4">
              {[
                { step: '↓', label: 'Scroll down advances timeline', color: 'bg-orange-500' },
                { step: '↕', label: 'Scroll up reverses timeline', color: 'bg-cyan-500' },
                { step: '⏸', label: 'Stop scrolling pauses animation', color: 'bg-emerald-500' },
                { step: '1:1', label: 'Direct scroll-to-progress link', color: 'bg-zinc-500' },
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-4">
                  <div className={`w-8 h-8 ${item.color} text-black font-black text-sm flex items-center justify-center rounded`}>
                    {item.step}
                  </div>
                  <span className="text-zinc-300 text-sm font-mono">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scrub value examples */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
            <h4 className="text-orange-500 font-black text-sm uppercase mb-2">scrub: true</h4>
            <code className="text-zinc-400 text-xs font-mono">{`scrub: true`}</code>
            <p className="text-zinc-500 text-xs mt-2">Direct 1:1 scroll link, instant response</p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
            <h4 className="text-cyan-500 font-black text-sm uppercase mb-2">scrub: 1</h4>
            <code className="text-zinc-400 text-xs font-mono">{`scrub: 1`}</code>
            <p className="text-zinc-500 text-xs mt-2">1 second catch-up for smooth feel</p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
            <h4 className="text-emerald-500 font-black text-sm uppercase mb-2">scrub: 0.5</h4>
            <code className="text-zinc-400 text-xs font-mono">{`scrub: 0.5`}</code>
            <p className="text-zinc-500 text-xs mt-2">0.5s catch-up, more responsive</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ScrubTimelinePattern() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <PatternHeader
        category="Timeline"
        difficulty="Advanced"
        title="Timeline"
        titleHighlight="Scrub"
        description="Link timeline progress directly to scroll position. Creates frame-by-frame control perfect for interactive storytelling."
        features={[
          { label: 'scrub: true' },
          { label: 'Link to scroll' },
          { label: 'Precise control' }]}
      />
      <LiveDemo />
      <CodeViewer code={CODE_EXAMPLE} language="tsx" filename="tsx" />

      {/* Related Patterns */}
      <RelatedPatterns currentPatternId="scrub-timeline" />

      {/* Pattern Navigation */}
      <PatternNavigation currentPatternId="scrub-timeline" />

      {/* Footer CTA */}
      <section className="relative border-t border-orange-500/20 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
            Ready to <span className="text-orange-500">Scroll</span>?
          </h2>
          <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
            This is just the beginning. Explore 50+ GSAP animation patterns in our complete collection.
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
