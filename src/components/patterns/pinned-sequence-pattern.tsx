'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { RelatedPatterns } from '@/components/patterns/related-patterns';

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
            Advanced Scroll
          </span>
          <span className="w-8 h-px bg-orange-500/50" />
          <span className="text-zinc-500 text-xs font-bold tracking-[0.2em] uppercase">
            Advanced
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase mb-6">
          Pinned <span className="text-orange-500">Sequence</span>
        </h1>

        {/* Description */}
        <p className="text-zinc-400 text-lg md:text-xl max-w-3xl font-light leading-relaxed">
          Pin sections in place while animations play. The pinned element stays fixed in the viewport while your timeline
          runs, creating immersive storytelling experiences that command attention.
        </p>

        {/* Key features */}
        <div className="flex flex-wrap gap-4 mt-8">
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-zinc-300 text-sm font-mono">pin: true</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-zinc-300 text-sm font-mono">timeline sequences</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-zinc-300 text-sm font-mono">storytelling</span>
          </div>
        </div>
      </div>
    </header>
  );
}

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

// ============================================================================
// CODE VIEWER SECTION
// ============================================================================

function CodeViewer() {
  const [copied, setCopied] = useState(false);

  const code = `// ============================================================================
// PINNED SEQUENCE PATTERN
// ============================================================================

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
              <span className="text-zinc-500">{`// PINNED SEQUENCE PATTERN`}</span>
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
              <span className="text-yellow-300">{` PinnedSequenceDemo`}</span>
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
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">{`// Create timeline with pin enabled`}</span>
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
              <span className="text-zinc-500">{`    // When to start pinning`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`end: '+=2000',`}</span>
              <span className="text-zinc-500">{`           // Pin duration`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`scrub: 1,`}</span>
              <span className="text-zinc-500">{`                // Smooth scroll linking`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-500">{`pin: true,`}</span>
              <span className="text-zinc-500">{`               // PIN the container!`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`},`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`}});`}</span>
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">{`// Animation sequence - all plays while pinned`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">{`tl`}</span>
              <span className="text-white">.</span>
              <span className="text-blue-400">{`to`}</span>
              <span className="text-white">(circle, {`{`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`scale: 1.5,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`backgroundColor: '#f97316',`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`rotation: 360,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`duration: 1,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`}})`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">.</span><span className="text-blue-400">{`to`}</span>
              <span className="text-white">(square, {`{`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`scale: 1.4,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`backgroundColor: '#06b6d4',`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`rotation: -360,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`x: 50,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`duration: 1,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`})`}</span>, <span className="text-emerald-400">{`0.5`}</span><span className="text-white">{`)`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">.</span><span className="text-blue-400">{`to`}</span>
              <span className="text-white">(triangle, {`{`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`scale: 1.6,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`backgroundColor: '#10b981',`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`rotation: 540,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`y: -50,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`duration: 1,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`})`}</span>, <span className="text-cyan-400">{`1`}</span><span className="text-white">{`)`}</span>
              <span className="text-white">;</span>
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
              <span className="text-white">{` className="bg-zinc-900 rounded-lg p-12"`}</span>
              <span className="text-purple-400">{`&gt;`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`&lt;div`}</span>
              <span className="text-white">{` className="circle w-20 h-20 rounded-full bg-zinc-700" /`}</span><span className="text-purple-400">{`&gt;`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`&lt;div`}</span>
              <span className="text-white">{` className="square w-20 h-20 rounded bg-zinc-700" /`}</span><span className="text-purple-400">{`&gt;`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`&lt;div`}</span>
              <span className="text-white">{` className="triangle w-20 h-20 bg-zinc-700" /`}</span><span className="text-purple-400">{`&gt;`}</span>
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
      title: 'PIN: TRUE',
      description: 'The pin option locks the trigger element in place during the animation. The section stays fixed in the viewport while the timeline runs, then releases when complete.',
    },
    {
      title: 'END DURATION',
      description: 'Use end: "+=2000" to define how long to pin. This value is the scroll distance in pixels. The user scrolls 2000px while the section stays pinned and animation plays.',
    },
    {
      title: 'PIN SPACER',
      description: 'GSAP creates a spacer element to hold the document flow. The spacer maintains the element\'s original height while the element itself is positioned fixed.',
    },
    {
      title: 'SCRUB + PIN',
      description: 'Combine pin with scrub for scroll-controlled animations. The animation progress is directly tied to scroll position within the pinned region.',
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

export function PinnedSequencePattern() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <PatternHeader />
      <LiveDemo />
      <CodeViewer />
      <PatternNotes />

      {/* Related Patterns */}
      <RelatedPatterns currentPatternId="pinned-sequence" />

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
