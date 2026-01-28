'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
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
            Performance
          </span>
          <span className="w-8 h-px bg-orange-500/50" />
          <span className="text-zinc-500 text-xs font-bold tracking-[0.2em] uppercase">
            Advanced
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase mb-6">
          Performance <span className="text-orange-500">Optimization</span>
        </h1>

        {/* Description */}
        <p className="text-zinc-400 text-lg md:text-xl max-w-3xl font-light leading-relaxed">
          Learn GPU acceleration techniques and CSS optimization strategies for buttery smooth 60fps animations.
          Compare will-change hints, transform-only properties, and hardware acceleration.
        </p>

        {/* Key features */}
        <div className="flex flex-wrap gap-4 mt-8">
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-zinc-300 text-sm font-mono">will-change</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-zinc-300 text-sm font-mono">transform3d</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-zinc-300 text-sm font-mono">GPU加速</span>
          </div>
        </div>
      </div>
    </header>
  );
}

// ============================================================================
// PERFORMANCE CARD COMPONENT (Animated)
// ============================================================================

interface PerfCardProps {
  title: string;
  icon: string;
  optimized: boolean;
  color: string;
}

function PerfCard({ title, icon, optimized, color }: PerfCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const card = cardRef.current;
    if (!card) return;

    // Animate continuously to show performance difference
    gsap.to(card, {
      rotation: 360,
      scale: 1.1,
      duration: 2,
      repeat: -1,
      ease: 'none',
    });

    return () => {
      gsap.killTweensOf(card);
    };
  }, { scope: cardRef });

  return (
    <div
      ref={cardRef}
      className={`
        relative p-6 rounded-lg border flex items-center justify-center
        ${optimized
          ? 'will-change-transform will-change-opacity border-orange-500/50 bg-zinc-900'
          : 'border-zinc-700 bg-zinc-900/50'
        }
      `}
    >
      <div className="text-center">
        <div className="text-4xl mb-3">{icon}</div>
        <div className={`text-xs font-black uppercase tracking-wider ${optimized ? 'text-orange-500' : 'text-zinc-500'}`}>
          {title}
        </div>
        {optimized && (
          <div className="mt-2 text-[10px] text-green-500 font-mono">GPU ACCELERATED</div>
        )}
      </div>

      {/* Performance indicator */}
      <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${optimized ? 'bg-green-500 animate-pulse' : 'bg-zinc-600'}`} />
    </div>
  );
}

// ============================================================================
// LIVE DEMO SECTION - Side by Side Comparison
// ============================================================================

function LiveDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fps, setFps] = useState({ optimized: 60, unoptimized: 60 });
  const frameCountRef = useRef({ optimized: 0, unoptimized: 0 });
  const lastTimeRef = useRef({ optimized: 0, unoptimized: 0 });

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.perf-card');

    // Set initial state
    gsap.set(cards, { opacity: 0, y: 40 });

    // Animate cards in with stagger
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        end: 'bottom 70%',
        toggleActions: 'play none none reverse',
      },
    });

    ScrollTrigger.refresh();

    return () => {
      gsap.killTweensOf(cards);
    };
  }, { scope: containerRef });

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
        <p className="text-zinc-500 mt-3 ml-7">Compare GPU accelerated vs non-optimized animations</p>
      </div>

      {/* Comparison demo */}
      <div ref={containerRef} className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Unoptimized column */}
          <div className="perf-card">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-3">
                  <span className="w-3 h-3 bg-zinc-500 rounded-full" />
                  Without Optimization
                </h3>
                <span className="text-xs font-mono text-zinc-500">CPU BOUND</span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-zinc-800 rounded flex items-center justify-center"
                  >
                    <span className="text-2xl">{'⚡'}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-zinc-800/50 rounded border border-zinc-700">
                <code className="text-xs font-mono text-zinc-400">
                  .card {`{`} <br />
                  &nbsp;&nbsp;animation: rotate 2s;<br />
                  {`}`}
                </code>
              </div>
            </div>
          </div>

          {/* Optimized column */}
          <div className="perf-card">
            <div className="bg-zinc-900/50 border border-orange-500/30 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-3">
                  <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  With GPU Acceleration
                </h3>
                <span className="text-xs font-mono text-green-500">GPU ACCELERATED</span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="will-change-transform aspect-square bg-zinc-800 border border-orange-500/30 rounded flex items-center justify-center"
                  >
                    <span className="text-2xl">{'⚡'}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-zinc-800/50 rounded border border-orange-500/30">
                <code className="text-xs font-mono text-orange-400">
                  .card {`{`} <br />
                  &nbsp;&nbsp;will-change: transform;<br />
                  &nbsp;&nbsp;transform: translateZ(0);<br />
                  {`}`}
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* GPU properties reference */}
        <div className="bg-zinc-900/30 border border-zinc-800 rounded-lg p-6">
          <h4 className="text-sm font-black text-orange-500 uppercase tracking-wider mb-4">
            GPU-Accelerated Properties
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-zinc-800/50 rounded">
              <code className="text-xs font-mono text-green-400">transform</code>
              <p className="text-[10px] text-zinc-500 mt-1">translate, scale, rotate</p>
            </div>
            <div className="text-center p-3 bg-zinc-800/50 rounded">
              <code className="text-xs font-mono text-green-400">opacity</code>
              <p className="text-[10px] text-zinc-500 mt-1">fade in/out</p>
            </div>
            <div className="text-center p-3 bg-zinc-800/50 rounded">
              <code className="text-xs font-mono text-green-400">filter</code>
              <p className="text-[10px] text-zinc-500 mt-1">blur, brightness</p>
            </div>
            <div className="text-center p-3 bg-zinc-800/50 rounded">
              <code className="text-xs font-mono text-yellow-400">will-change</code>
              <p className="text-[10px] text-zinc-500 mt-1">hint browser</p>
            </div>
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
// GSAP PERFORMANCE OPTIMIZATION PATTERN
// ============================================================================

'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

export function OptimizedAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll('.gpu-item');

    // Set initial state with GPU-accelerated properties only
    gsap.set(elements, {
      opacity: 0,        // GPU-accelerated
      scale: 0.8,        // GPU-accelerated (transform)
      y: 50,             // GPU-accelerated (transform: translateY)
    });

    // Animate with optimized properties
    gsap.to(elements, {
      opacity: 1,        // GPU-accelerated
      scale: 1,          // GPU-accelerated
      y: 0,              // GPU-accelerated
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        end: 'bottom 70%',
        toggleActions: 'play none none reverse',
      },
    });

    ScrollTrigger.refresh();

    return () => {
      gsap.killTweensOf(elements);
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      {/Items with will-change hint for GPU acceleration/}
      <div className="gpu-item will-change-transform">Item 1</div>
      <div className="gpu-item will-change-transform">Item 2</div>
      <div className="gpu-item will-change-transform">Item 3</div>
    </div>
  );
}

// ============================================================================
// TAILWIND CSS UTILITY CLASSES
// ============================================================================

// Add will-change via Tailwind utilities:
// - will-change-transform
// - will-change-opacity
// - will-change-transform,opacity

// Force GPU layer (use sparingly):
// - transform-gpu (translateZ(0))
// - translate-z-0
`;

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

          {/* Code content */}
          <pre className="p-6 pt-8 overflow-x-auto">
            <code className="text-sm font-mono leading-relaxed">
              <span className="text-zinc-500">{`// ============================================================================`}</span>
              <span className="text-zinc-500 block">{`// GSAP PERFORMANCE OPTIMIZATION PATTERN`}</span>
              <span className="text-zinc-500 block">{`// ============================================================================`}</span>
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
              <span className="text-purple-400">{`export`}</span>
              <span className="text-purple-400">{` function`}</span>
              <span className="text-yellow-300">{` OptimizedAnimation`}</span>
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
              <span className="text-white">{` elements `}</span>
              <span className="text-purple-400">{`= containerRef.current?.querySelectorAll`}</span>
              <span className="text-cyan-400">{`('.gpu-item')`}</span>
              <span className="text-white">;</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`if`}</span>
              <span className="text-white"> (!elements) </span>
              <span className="text-purple-400">{`return`}</span>
              <span className="text-white">;</span>
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">{`// Use only GPU-accelerated properties`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">{`gsap.set`}</span>
              <span className="text-white">(elements, {`{`}</span>
              <span className="text-white">{` opacity: 0, scale: 0.8, y: 50 `}</span><span className="text-white">{`}`});</span>
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">{`gsap.to`}</span>
              <span className="text-white">(elements, {`{`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`opacity: 1, scale: 1, y: 0,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`duration: 0.6,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`stagger: 0.1,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`ease: 'power2.out',`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`scrollTrigger: { trigger: containerRef.current, start: 'top 80%' }`}</span>
              <span className="text-white">{`}`}</span><span className="text-white">{`},`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`}`});</span>
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`return`}</span>
              <span className="text-white"> () {`=>`} {`{`}</span>
              <span className="text-blue-400">{` gsap.killTweensOf(elements)`}</span><span className="text-white">{`; }`}</span>
              <br />
              &nbsp;&nbsp;<span className="text-white">{`}`}</span>, <span className="text-white">{`{ scope: containerRef `}</span><span className="text-white">{`}`});</span>
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
      title: 'GPU-ACCELERATED PROPERTIES',
      description: 'Transform (translate, scale, rotate), opacity, and filter run on the GPU. These avoid layout recalculations and paint operations, enabling 60fps animations even with many elements.',
      icon: '⚡',
    },
    {
      title: 'WILL-CHANGE HINT',
      description: 'The will-change CSS property tells the browser which properties will animate, allowing it to optimize in advance. Use sparingly on elements that will actually animate.',
      icon: '🎯',
    },
    {
      title: 'AVOID LAYOUT PROPERTIES',
      description: 'Never animate width, height, top, left, margin, or padding. These trigger layout recalculation and are CPU-bound. Use transform for position changes instead.',
      icon: '⚠️',
    },
    {
      title: 'FORCE GPU LAYER',
      description: 'transform: translateZ(0) or transform-gpu in Tailwind forces a GPU layer. Use sparingly as each layer consumes GPU memory. Only apply to animating elements.',
      icon: '🚀',
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
              {/* Icon badge */}
              <div className="absolute -top-3 -left-3 w-10 h-10 bg-orange-500 text-black text-lg flex items-center justify-center rounded">
                {note.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-black text-white uppercase tracking-tight mb-3 pl-7">
                {note.title}
              </h3>

              {/* Description */}
              <p className="text-zinc-400 text-sm leading-relaxed pl-7">
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
// PERFORMANCE TIPS SECTION
// ============================================================================

function PerformanceTips() {
  const tips = [
    {
      good: 'transform: translateY(100px)',
      bad: 'top: 100px',
      reason: 'Transform is GPU-accelerated, top triggers layout',
    },
    {
      good: 'opacity: 0',
      bad: 'visibility: hidden',
      reason: 'Opacity is GPU-accelerated, visibility is not',
    },
    {
      good: 'scale: 0.8',
      bad: 'width: 80%; height: 80%',
      reason: 'Scale uses transform, width/height trigger layout',
    },
    {
      good: 'will-change: transform',
      bad: 'will-change: all',
      reason: 'Be specific - will-change: all wastes resources',
    },
  ];

  return (
    <section className="relative border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Section header */}
        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight flex items-center gap-4 mb-12">
          <span className="w-3 h-8 bg-orange-500" />
          Do's and Don'ts
        </h2>

        {/* Tips grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden"
            >
              <div className="grid grid-cols-2 divide-x divide-zinc-800">
                {/* Good */}
                <div className="p-4">
                  <div className="text-[10px] text-green-500 font-bold uppercase tracking-wider mb-2">
                    ✓ Do
                  </div>
                  <code className="text-xs font-mono text-green-400 block">
                    {tip.good}
                  </code>
                </div>

                {/* Bad */}
                <div className="p-4">
                  <div className="text-[10px] text-red-500 font-bold uppercase tracking-wider mb-2">
                    ✗ Don't
                  </div>
                  <code className="text-xs font-mono text-red-400 block">
                    {tip.bad}
                  </code>
                </div>
              </div>

              {/* Reason */}
              <div className="px-4 py-3 bg-zinc-950/50 border-t border-zinc-800">
                <p className="text-xs text-zinc-500">{tip.reason}</p>
              </div>
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

export function PerformanceOptimizationPattern() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <PatternHeader />
      <LiveDemo />
      <CodeViewer />
      <PatternNotes />
      <PerformanceTips />

      {/* Related Patterns */}
      <RelatedPatterns currentPatternId="performance-optimization" />

      {/* Pattern Navigation */}
      <PatternNavigation currentPatternId="performance-optimization" />

      {/* Footer CTA */}
      <section className="relative border-t border-orange-500/20 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
            Build <span className="text-orange-500">Smooth</span> Animations
          </h2>
          <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
            Performance optimization is critical for delivering buttery smooth 60fps experiences.
            Your users will notice the difference.
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
