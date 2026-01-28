'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-config';
import { RelatedPatterns } from '@/components/patterns/related-patterns';
import { PatternNavigation } from '@/components/patterns/pattern-navigation';

// ============================================================================
// PATTERN HEADER COMPONENT
// ============================================================================

function PatternHeader() {
  return (
    <header className="relative border-b border-orange-500/20 bg-zinc-900/50 backdrop-blur-sm">
      {/* Corner accent - top left */}
      <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-orange-500" />
      {/* Corner accent - bottom right */}
      <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-orange-500" />

      {/* Diagonal stripe decoration */}
      <div className="absolute top-0 right-0 w-64 h-1 bg-gradient-to-l from-orange-500 to-transparent opacity-50" />

      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        {/* Category badge */}
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="text-orange-500 text-xs font-black tracking-[0.3em] uppercase">
            Timelines
          </span>
          <span className="w-8 h-px bg-orange-500/50" />
          <span className="text-zinc-500 text-xs font-bold tracking-[0.2em] uppercase">
            Intermediate
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase mb-6">
          Sequential <span className="text-orange-500">Timeline</span>
        </h1>

        {/* Description */}
        <p className="text-zinc-400 text-lg md:text-xl max-w-3xl font-light leading-relaxed">
          Choreograph multiple animations that play in perfect sequence. Timelines give you precise control over animation
          choreography, making complex multi-step animations simple to manage and maintain.
        </p>

        {/* Key features */}
        <div className="flex flex-wrap gap-4 mt-8">
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-zinc-300 text-sm font-mono">gsap.timeline()</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-zinc-300 text-sm font-mono">chained animations</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-zinc-300 text-sm font-mono">position parameter</span>
          </div>
        </div>
      </div>
    </header>
  );
}

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

// ============================================================================
// CODE VIEWER SECTION
// ============================================================================

function CodeViewer() {
  const [copied, setCopied] = useState(false);

  const code = `// ============================================================================
// SEQUENTIAL TIMELINE PATTERN
// ============================================================================

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

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative border-b border-zinc-800 bg-zinc-900/30">
      {/* Diagonal stripe decoration */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-orange-500 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Section header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight flex items-center gap-4">
              <span className="w-3 h-8 bg-orange-500" />
              Code
            </h2>
            <p className="text-zinc-500 mt-3 ml-7">Copy and paste into your project</p>
          </div>

          {/* Copy button */}
          <button
            onClick={handleCopy}
            className="group relative px-6 py-3 bg-zinc-800 border border-zinc-700 hover:border-orange-500 rounded transition-all duration-300 flex items-center gap-3"
          >
            <span className="text-zinc-400 group-hover:text-orange-500 transition-colors text-sm font-bold uppercase tracking-wider">
              {copied ? 'Copied!' : 'Copy Code'}
            </span>
            <svg
              className={`w-5 h-5 text-zinc-500 group-hover:text-orange-500 transition-all duration-300 ${copied ? 'scale-110' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {copied ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              )}
            </svg>
            {/* Scan line effect */}
            <div className="absolute inset-0 overflow-hidden rounded">
              <div className="w-1 h-full bg-white/10 skew-x-[-12deg] translate-x-[-100%] group-hover:translate-x-[400%] transition-transform duration-700 ease-in-out" />
            </div>
          </button>
        </div>

        {/* Code block */}
        <div className="relative bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-orange-500" />
          <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-orange-500" />

          {/* Language badge */}
          <div className="absolute top-4 right-4 px-3 py-1 bg-zinc-800 border border-zinc-700 rounded text-xs font-mono text-zinc-400 uppercase">
            TSX
          </div>

          {/* Code content with syntax highlighting */}
          <pre className="p-6 pt-8 overflow-x-auto">
            <code className="text-sm font-mono leading-relaxed">
              <span className="text-zinc-500">{`// ============================================================================`}</span>
              <br />
              <span className="text-zinc-500">{`// SEQUENTIAL TIMELINE PATTERN`}</span>
              <br />
              <span className="text-zinc-500">{`// ============================================================================`}</span>
              <br />
              <br />
              <span className="text-purple-400">{`'use client'`}</span>
              <span className="text-white">;</span>
              <br />
              <br />
              <span className="text-purple-400">{`import`}</span>
              <span className="text-white">{` { useRef } `}</span>
              <span className="text-purple-400">{`from`}</span>
              <span className="text-cyan-400">{` 'react'`}</span>
              <span className="text-white">;</span>
              <br />
              <span className="text-purple-400">{`import`}</span>
              <span className="text-white">{` { useGSAP } `}</span>
              <span className="text-purple-400">{`from`}</span>
              <span className="text-cyan-400">{` '@gsap/react'`}</span>
              <span className="text-white">;</span>
              <br />
              <span className="text-purple-400">{`import`}</span>
              <span className="text-white">{` { gsap } `}</span>
              <span className="text-purple-400">{`from`}</span>
              <span className="text-cyan-400">{` '@/lib/gsap-config'`}</span>
              <span className="text-white">;</span>
              <br />
              <br />
              <br />
              <span className="text-purple-400">{`export`}</span>
              <span className="text-purple-400">{` function`}</span>
              <span className="text-yellow-300">{` SequentialTimelineDemo`}</span>
              <span className="text-white">() {`{`}</span>
              <br />
              &nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` containerRef `}</span>
              <span className="text-purple-400">{`= useRef`}</span>
              <span className="text-orange-400">{`&lt;HTMLDivElement&gt;`}</span>
              <span className="text-white">(null);</span>
              <br />
              <br />
              &nbsp;&nbsp;<span className="text-blue-400">{`useGSAP`}</span>
              <span className="text-white">(() {`=>`} {`{`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` container `}</span>
              <span className="text-purple-400">{`= containerRef.current`}</span>
              <span className="text-white">;</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`if`}</span>
              <span className="text-white"> (!container) </span>
              <span className="text-purple-400">{`return`}</span>
              <span className="text-white">;</span>
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` circle `}</span>
              <span className="text-purple-400">{`= container.querySelector`}</span>
              <span className="text-orange-400">{`('.circle')`}</span>
              <span className="text-white">;</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` square `}</span>
              <span className="text-purple-400">{`= container.querySelector`}</span>
              <span className="text-orange-400">{`('.square')`}</span>
              <span className="text-white">;</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` triangle `}</span>
              <span className="text-purple-400">{`= container.querySelector`}</span>
              <span className="text-orange-400">{`('.triangle')`}</span>
              <span className="text-white">;</span>
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">{`// Create timeline for sequential animations`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` tl `}</span>
              <span className="text-purple-400">{`= gsap.timeline`}</span>
              <span className="text-white">({`{`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`repeat: -1,`}</span>
              <span className="text-zinc-500">{`        // Loop infinitely`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`repeatDelay: 1,`}</span>
              <span className="text-zinc-500">{`    // Wait 1s between loops`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`}});`}</span>
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">{`// Chain animations - each plays after the previous completes`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">{`tl`}</span>
              <span className="text-white">.</span>
              <span className="text-blue-400">{`to`}</span>
              <span className="text-white">(circle, {`{`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`scale: 1.2,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`backgroundColor: '#f97316',`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`duration: 0.4,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`ease: 'back.out(1.7)',`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`}})`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">.</span><span className="text-blue-400">{`to`}</span>
              <span className="text-white">(square, {`{`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`rotation: 180,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`backgroundColor: '#06b6d4',`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`duration: 0.5,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`ease: 'back.out(1.5)',`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`}})`}</span>, <span className="text-emerald-400">{`'-=0.1'`}</span><span className="text-white">{`)`}</span>
              <span className="text-zinc-500">{`  // Overlap: start 0.1s before circle finishes`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">.</span><span className="text-blue-400">{`to`}</span>
              <span className="text-white">(triangle, {`{`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`x: 50,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`backgroundColor: '#10b981',`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`duration: 0.4,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`ease: 'power2.out',`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`})`}</span>, <span className="text-cyan-400">{`'+=0.1'`}</span><span className="text-white">{`)`}</span>
              <span className="text-zinc-500">{`  // Delay: start 0.1s after square finishes`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">.</span><span className="text-blue-400">{`to`}</span>
              <span className="text-white">([circle, square, triangle], {`{`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`scale: 1,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`rotation: 0,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`x: 0,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`backgroundColor: '#3f3f46',`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`duration: 0.3,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`}});`}</span>
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`return`}</span>
              <span className="text-white"> () {`=>`}</span>
              <span className="text-white">{` {`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`tl.kill();`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">{`gsap.killTweensOf`}</span>
              <span className="text-white">([circle, square, triangle]);</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`}`});</span>
              <br />
              &nbsp;&nbsp;<span className="text-white">{`}`}</span>, <span className="text-white">{`{ scope: containerRef `}</span><span className="text-white">{`}`});</span>
              <br />
              <br />
              &nbsp;&nbsp;<span className="text-purple-400">{`return`}</span>
              <span className="text-white"> (</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`&lt;div`}</span>
              <span className="text-white">{` ref={containerRef}`}</span>
              <span className="text-purple-400">{`&gt;`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`&lt;div`}</span>
              <span className="text-white">{` className="circle w-16 h-16 rounded-full bg-zinc-700" /`}</span><span className="text-purple-400">{`&gt;`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`&lt;div`}</span>
              <span className="text-white">{` className="square w-16 h-16 rounded bg-zinc-700" /`}</span><span className="text-purple-400">{`&gt;`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`&lt;div`}</span>
              <span className="text-white">{` className="triangle w-16 h-16 bg-zinc-700" /`}</span><span className="text-purple-400">{`&gt;`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`&lt;/div&gt;`}</span>
              <br />
              &nbsp;&nbsp;<span className="text-white">{`);`}</span>
              <br />
              <span className="text-white">{`}`}</span>
            </code>
          </pre>

          {/* Bottom scan line */}
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50" />
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// PATTERN NOTES SECTION
// ============================================================================

function PatternNotes() {
  const notes = [
    {
      title: 'TIMELINE CREATION',
      description: 'Use gsap.timeline() to create a timeline. Timelines are like containers for tweens that can be controlled as a group. You can pause, reverse, repeat, or scrub the entire timeline.',
    },
    {
      title: 'CHAINING ANIMATIONS',
      description: 'Each .to() call adds an animation to the timeline. By default, animations are added sequentially - each starts when the previous ends. This creates complex choreography with simple code.',
    },
    {
      title: 'POSITION PARAMETER',
      description: 'The third parameter controls timing: "-=0.1" overlaps (starts before previous ends), "+=0.1" delays (waits after previous ends), "myLabel" starts at a labeled point, and 0.5 starts at an absolute time.',
    },
    {
      title: 'TIMELINE METHODS',
      description: 'Timelines have methods like .play(), .pause(), .reverse(), .restart(), .time(progress), .progress(), and .seek(). Use them to control playback programmatically or bind to scroll interactions.',
    },
  ];

  return (
    <section className="relative border-b border-zinc-800">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5 grid-pattern-overlay" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* Section header */}
        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight flex items-center gap-4 mb-12">
          <span className="w-3 h-8 bg-orange-500" />
          Key Concepts
        </h2>

        {/* Notes grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notes.map((note, index) => (
            <div
              key={index}
              className="relative bg-zinc-900/50 border border-zinc-800 p-6 rounded hover:border-orange-500/30 transition-colors duration-300"
            >
              {/* Number badge */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-orange-500 text-black font-black text-sm flex items-center justify-center rounded">
                {index + 1}
              </div>

              {/* Title */}
              <h3 className="text-lg font-black text-white uppercase tracking-tight mb-3">
                {note.title}
              </h3>

              {/* Description */}
              <p className="text-zinc-400 text-sm leading-relaxed">
                {note.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function SequentialTimelinePattern() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <PatternHeader />
      <LiveDemo />
      <CodeViewer />
      <PatternNotes />

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
