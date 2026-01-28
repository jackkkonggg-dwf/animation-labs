'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-config';
import { PatternHeader, CodeViewer } from '@/components/patterns';
import { RelatedPatterns } from '@/components/patterns/related-patterns';
import { PatternNavigation } from '@/components/patterns/pattern-navigation';
import Link from 'next/link';

// ============================================================================
// CODE EXAMPLE
// ============================================================================

const CODE_EXAMPLE = `
'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-config';

export function SequentialTimelineDemo() {
  const containerRef = useRef&lt;HTMLDivElement&gt;(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const circle = container.querySelector('.circle');
    const square = container.querySelector('.square');
    const triangle = container.querySelector('.triangle');

    if (!circle || !square || !triangle) return;

    // Create timeline for sequential animations
    const tl = gsap.timeline({
      repeat: -1,        // Loop infinitely
      repeatDelay: 1,    // Wait 1s between loops
    });

    // Chain animations - each plays after the previous completes
    tl.to(circle, {
        scale: 1.2,
        backgroundColor: '#f97316',
        duration: 0.4,
        ease: 'back.out(1.7)',
      })
      .to(square, {
        rotation: 180,
        backgroundColor: '#06b6d4',
        duration: 0.5,
        ease: 'back.out(1.5)',
      }, '-=0.1')  // Overlap: start 0.1s before circle finishes
      .to(triangle, {
        x: 50,
        backgroundColor: '#10b981',
        duration: 0.4,
        ease: 'power2.out',
      }, '+=0.1')  // Delay: start 0.1s after square finishes
      .to([circle, square, triangle], {
        scale: 1,
        rotation: 0,
        x: 0,
        backgroundColor: '#3f3f46',
        duration: 0.3,
      });

    return () => {
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
// LIVE DEMO SECTION - SEQUENTIAL TIMELINE
// ============================================================================

function SequentialTimelineDemo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = {
      circle: container.querySelector('.demo-circle'),
      square: container.querySelector('.demo-square'),
      triangle: container.querySelector('.demo-triangle'),
    };

    if (!elements.circle || !elements.square || !elements.triangle) return;

    // Create timeline for sequential animations
    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 1,
    });

    // Animation 1: Circle scales up
    tl.to(elements.circle, {
      scale: 1.2,
      backgroundColor: '#f97316',
      duration: 0.4,
      ease: 'back.out(1.7)',
    })
      // Animation 2: Square rotates (plays after circle completes)
      .to(
        elements.square,
        {
          rotation: 180,
          backgroundColor: '#06b6d4',
          duration: 0.5,
          ease: 'back.out(1.5)',
        },
        '-=0.1' // Slight overlap with previous animation
      )
      // Animation 3: Triangle slides (plays after square completes)
      .to(
        elements.triangle,
        {
          x: 50,
          backgroundColor: '#10b981',
          duration: 0.4,
          ease: 'power2.out',
        },
        '+=0.1' // Slight delay after previous animation
      )
      // Reset all elements
      .to([elements.circle, elements.square, elements.triangle], {
        scale: 1,
        rotation: 0,
        x: 0,
        backgroundColor: '#3f3f46',
        duration: 0.3,
        ease: 'power2.inOut',
      });

    return () => {
      tl.kill();
      gsap.killTweensOf([elements.circle, elements.square, elements.triangle]);
    };
  }, { scope: containerRef });

  return (
    <div className="flex flex-col items-center gap-6">
      <div ref={containerRef} className="flex items-center justify-center gap-6 h-32 w-full">
        {/* Circle */}
        <div className="demo-circle w-16 h-16 rounded-full bg-zinc-700" />
        {/* Square */}
        <div className="demo-square w-16 h-16 rounded-lg bg-zinc-700" />
        {/* Triangle (using CSS clip-path) */}
        <div className="demo-triangle w-16 h-16 bg-zinc-700" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
      </div>
      <span className="text-zinc-500 text-xs font-mono">timeline with chained .to() calls</span>
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
        <p className="text-zinc-500 mt-3 ml-7">Watch animations play in sequence using a GSAP timeline</p>
      </div>

      {/* Demo cards */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main sequential demo */}
          <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-lg p-8">
            <div className="text-4xl mb-6 text-center">🎬</div>
            <h3 className="text-lg font-black text-white uppercase tracking-tight mb-6 text-center">
              Sequential Animation
            </h3>
            <SequentialTimelineDemo />
          </div>

          {/* Timeline concepts card */}
          <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-lg p-8 flex flex-col justify-center">
            <h3 className="text-lg font-black text-white uppercase tracking-tight mb-6">
              Timeline Flow
            </h3>
            <div className="space-y-4">
              {[
                { step: '1', label: 'Circle scales up', color: 'bg-orange-500' },
                { step: '2', label: 'Square rotates 180°', color: 'bg-cyan-500' },
                { step: '3', label: 'Triangle slides right', color: 'bg-emerald-500' },
                { step: '↻', label: 'Loop and repeat', color: 'bg-zinc-500' },
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

        {/* Position parameter examples */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
            <h4 className="text-orange-500 font-black text-sm uppercase mb-2">Default</h4>
            <code className="text-zinc-400 text-xs font-mono">{`.to(elem, {...})`}</code>
            <p className="text-zinc-500 text-xs mt-2">Plays after previous animation ends</p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
            <h4 className="text-cyan-500 font-black text-sm uppercase mb-2">Overlap</h4>
            <code className="text-zinc-400 text-xs font-mono">{`.to(elem, {...}, "-=0.1")`}</code>
            <p className="text-zinc-500 text-xs mt-2">Starts 0.1s before previous ends</p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
            <h4 className="text-emerald-500 font-black text-sm uppercase mb-2">Delay</h4>
            <code className="text-zinc-400 text-xs font-mono">{`.to(elem, {...}, "+=0.1")`}</code>
            <p className="text-zinc-500 text-xs mt-2">Starts 0.1s after previous ends</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SequentialTimelinePattern() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <PatternHeader
        category="Timeline"
        difficulty="Intermediate"
        title="Timeline"
        titleHighlight="Sequential"
        description="Chain multiple animations in sequence using GSAP timelines. Control timing and dependencies with precision."
        features={[
          { label: 'gsap.timeline' },
          { label: '.to() chaining' },
          { label: 'Position params' }]}
      />
      <LiveDemo />
      <CodeViewer code={CODE_EXAMPLE} language="tsx" filename="tsx" />

      {/* Related Patterns */}
      <RelatedPatterns currentPatternId="sequential-timeline" />

      {/* Pattern Navigation */}
      <PatternNavigation currentPatternId="sequential-timeline" />

      {/* Footer CTA */}
      <section className="relative border-t border-orange-500/20 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
            Ready to <span className="text-orange-500">Choreograph</span>?
          </h2>
          <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
            This is just the beginning. Explore 50+ GSAP animation patterns in our complete collection.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-orange-500 text-black font-black text-sm uppercase tracking-wider rounded hover:bg-orange-400 transition-colors duration-300"
          >
            View All Patterns
          </Link>
        </div>
      </section>
    </div>
  );
}
