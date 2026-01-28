'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

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
          Scrub <span className="text-orange-500">Timeline</span>
        </h1>

        {/* Description */}
        <p className="text-zinc-400 text-lg md:text-xl max-w-3xl font-light leading-relaxed">
          Control animation playback with scroll position. Scrubbing links your timeline directly to the scroll bar,
          creating perfectly synchronized scroll-driven animations that feel responsive and engaging.
        </p>

        {/* Key features */}
        <div className="flex flex-wrap gap-4 mt-8">
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-zinc-300 text-sm font-mono">scrollTrigger scrub</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-zinc-300 text-sm font-mono">timeline control</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-zinc-300 text-sm font-mono">reversible</span>
          </div>
        </div>
      </div>
    </header>
  );
}

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

// ============================================================================
// CODE VIEWER SECTION
// ============================================================================

function CodeViewer() {
  const [copied, setCopied] = useState(false);

  const code = `// ============================================================================
// SCRUB TIMELINE PATTERN
// ============================================================================

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
              <span className="text-zinc-500">{`// SCRUB TIMELINE PATTERN`}</span>
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
              <span className="text-white">{` { gsap, ScrollTrigger } `}</span>
              <span className="text-purple-400">{`from`}</span>
              <span className="text-cyan-400">{` '@/lib/gsap-config'`}</span>
              <span className="text-white">;</span>
              <br />
              <br />
              <br />
              <span className="text-purple-400">{`export`}</span>
              <span className="text-purple-400">{` function`}</span>
              <span className="text-yellow-300">{` ScrubTimelineDemo`}</span>
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
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`if`}</span>
              <span className="text-white"> (!circle || !square || !triangle) </span>
              <span className="text-purple-400">{`return`}</span>
              <span className="text-white">;</span>
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">{`// Create timeline linked to scroll position`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` tl `}</span>
              <span className="text-purple-400">{`= gsap.timeline`}</span>
              <span className="text-white">({`{`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`scrollTrigger: {`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`trigger: container,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`start: 'top center',`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`end: 'bottom center',`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`scrub: 1,`}</span>
              <span className="text-zinc-500">{`                  // Smooth 1-second catch-up`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`},`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`}});`}</span>
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">{`// Chain animations - all controlled by scroll`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">{`tl`}</span>
              <span className="text-white">.</span>
              <span className="text-blue-400">{`to`}</span>
              <span className="text-white">(circle, {`{`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`scale: 1.3,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`backgroundColor: '#f97316',`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`rotation: 180,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`duration: 1,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`}})`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">.</span><span className="text-blue-400">{`to`}</span>
              <span className="text-white">(square, {`{`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`scale: 1.2,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`backgroundColor: '#06b6d4',`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`rotation: -270,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`x: 30,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`duration: 1,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`})`}</span>, <span className="text-emerald-400">{`0.5`}</span><span className="text-white">{`)`}</span>
              <span className="text-zinc-500">{`  // Start at 0.5s (overlap with circle)`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">.</span><span className="text-blue-400">{`to`}</span>
              <span className="text-white">(triangle, {`{`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`scale: 1.4,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`backgroundColor: '#10b981',`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`rotation: 360,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`y: -20,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`duration: 1,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`})`}</span>, <span className="text-cyan-400">{`1`}</span><span className="text-white">{`)`}</span>
              <span className="text-zinc-500">{`     // Start at 1s (after circle completes)`}</span>
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`return`}</span>
              <span className="text-white"> () {`=>`}</span>
              <span className="text-white">{` {`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">{`ScrollTrigger`}</span>
              <span className="text-white">.</span><span className="text-blue-400">{`getAll`}</span>
              <span className="text-white">().</span><span className="text-blue-400">{`forEach`}</span>
              <span className="text-white">(t {`=>`} t.</span><span className="text-blue-400">{`kill`}</span>
              <span className="text-white">());</span>
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
      title: 'SCRUB OPTION',
      description: 'The scrub option links timeline progress to scroll position. Use scrub: true for instant 1:1 response, or scrub: 1 for smooth 1-second "catch up" lag that feels more polished.',
    },
    {
      title: 'TIMELINE + SCROLLTRIGGER',
      description: 'Pass scrollTrigger config directly to gsap.timeline(). This binds the entire timeline to scroll - all animations advance and reverse together as you scroll.',
    },
    {
      title: 'START/END POSITION',
      description: 'start: "top center" triggers when container top hits viewport center. end: "bottom center" defines when animation completes. The scroll distance between them becomes your timeline duration.',
    },
    {
      title: 'AUTOMATIC REVERSAL',
      description: 'Scrubbed timelines automatically play in reverse when scrolling back up. No extra code needed - the timeline is permanently bound to scroll position.',
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

export function ScrubTimelinePattern() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <PatternHeader />
      <LiveDemo />
      <CodeViewer />
      <PatternNotes />

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
