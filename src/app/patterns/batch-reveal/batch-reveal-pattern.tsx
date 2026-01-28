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
            Intermediate
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase mb-6">
          <span className="text-orange-500">Batch</span> Reveal
        </h1>

        {/* Description */}
        <p className="text-zinc-400 text-lg md:text-xl max-w-3xl font-light leading-relaxed">
          Efficiently animate large collections of elements (20+) using batch techniques that optimize performance.
          Perfect for grids, galleries, and data-heavy interfaces where smooth animation is critical.
        </p>

        {/* Key features */}
        <div className="flex flex-wrap gap-4 mt-8">
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-zinc-300 text-sm font-mono">24 Items</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-zinc-300 text-sm font-mono">fast stagger</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-zinc-300 text-sm font-mono">GPU Accelerated</span>
          </div>
        </div>
      </div>
    </header>
  );
}

// ============================================================================
// LIVE DEMO SECTION
// ============================================================================

function LiveDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [itemCount] = useState(24);

  // Generate demo items
  const demoItems = Array.from({ length: itemCount }, (_, i) => ({
    id: i + 1,
    number: i + 1,
  }));

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll('.batch-item');

    // Set initial state - all invisible with slight scale
    gsap.set(items, { opacity: 0, scale: 0.9 });

    // Create fast batch animation with small stagger
    // For 24 items with 0.05s stagger, total animation time is ~1.2s
    gsap.to(items, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      stagger: {
        amount: 0.8, // Total time for all staggered animations to complete
        from: 'center', // Start from center
        grid: [4, 6], // 4 rows, 6 columns
      },
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    ScrollTrigger.refresh();

    return () => {
      gsap.killTweensOf(items);
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
        <p className="text-zinc-500 mt-3 ml-7">
          Scroll to see 24 items animate from center with optimized batch stagger
        </p>
      </div>

      {/* Demo grid */}
      <div ref={containerRef} className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {demoItems.map((item) => (
            <div
              key={item.id}
              className="batch-item group relative aspect-square bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-lg overflow-hidden hover:border-orange-500/50 transition-colors duration-300"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Scan line effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-full h-px bg-white/20 absolute top-1/2 animate-scan" />
              </div>

              {/* Content */}
              <div className="relative p-4 h-full flex flex-col items-center justify-center">
                {/* Item number */}
                <span className="text-3xl font-black text-white/20 group-hover:text-orange-500/40 transition-colors duration-300">
                  {item.number.toString().padStart(2, '0')}
                </span>

                {/* Corner accent */}
                <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-orange-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Performance indicator */}
        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-4 px-6 py-3 bg-zinc-900/50 border border-zinc-800 rounded">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-zinc-400 text-sm font-mono">
              Optimized for <span className="text-orange-500 font-bold">GPU Acceleration</span>
            </span>
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
// BATCH REVEAL PATTERN - Performance Optimized
// ============================================================================

'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { RelatedPatterns } from '@/components/patterns/related-patterns';

export function BatchRevealComponent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Select all batch items
    const items = container.querySelectorAll('.batch-item');

    // Set initial state - use scale for GPU acceleration
    gsap.set(items, { opacity: 0, scale: 0.9 });

    // Fast batch animation with grid-based stagger
    gsap.to(items, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      stagger: {
        amount: 0.8,     // Total time for all animations
        from: 'center',  // Start from center of grid
        grid: [4, 6],    // 4 rows, 6 columns
      },
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    ScrollTrigger.refresh();

    return () => {
      gsap.killTweensOf(items);
    };
  }, { scope: containerRef });

  // Render 24 items in a grid
  return (
    <div ref={containerRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {Array.from({ length: 24 }).map((_, i) => (
        <div key={i} className="batch-item bg-zinc-900 aspect-square rounded-lg border border-zinc-800">
          {i + 1}
        </div>
      ))}
    </div>
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

          {/* Code content */}
          <pre className="p-6 pt-8 overflow-x-auto">
            <code className="text-sm font-mono leading-relaxed">
              <span className="text-zinc-500">{`// ============================================================================`}</span>
              <span className="text-zinc-500">{`// BATCH REVEAL PATTERN - Performance Optimized`}</span>
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
              <span className="text-purple-400">{`export`}</span>
              <span className="text-purple-400">{` function`}</span>
              <span className="text-yellow-300">{` BatchRevealComponent`}</span>
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
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">{`// Select all batch items`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` items `}</span>
              <span className="text-purple-400">{`= container.querySelectorAll`}</span>
              <span className="text-cyan-400">{`('.batch-item')`}</span>
              <span className="text-white">;</span>
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">{`// Set initial state - use scale for GPU acceleration`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">{`gsap.set`}</span>
              <span className="text-white">(items, {`{`}</span><span className="text-white">{` opacity: 0, scale: 0.9 `}</span><span className="text-white">{`}`});</span>
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">{`// Fast batch animation with grid-based stagger`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">{`gsap.to`}</span>
              <span className="text-white">(items, {`{`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`opacity: 1,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`scale: 1,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`duration: 0.4,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`stagger: {`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`amount: 0.8,`}</span>
              <span className="text-zinc-500">{`    // Total time for all animations`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`from: 'center',`}</span>
              <span className="text-zinc-500">{` // Start from center of grid`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`grid: [4, 6],`}</span>
              <span className="text-zinc-500">{`   // 4 rows, 6 columns`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`},`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`ease: 'power2.out',`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`scrollTrigger: {`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`trigger: container,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`start: 'top 80%',`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`toggleActions: 'play none none reverse',`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`}`}</span><span className="text-white">{`},`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`}`});</span>
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">{`// Cleanup`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`return`}</span>
              <span className="text-white"> () {`=>`}</span><span className="text-white">{` {`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">{`gsap.killTweensOf`}</span>
              <span className="text-white">(items);</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`}`});</span>
              <br />
              &nbsp;&nbsp;<span className="text-white">{`}`}</span>, <span className="text-white">{`{ scope: containerRef `}</span><span className="text-white">{`}`});</span>
              <br />
              <br />
              &nbsp;&nbsp;<span className="text-zinc-500">{`// Render 24 items in a grid`}</span>
              <br />
              &nbsp;&nbsp;<span className="text-purple-400">{`return`}</span>
              <span className="text-white"> (</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`&lt;div`}</span>
              <span className="text-white">{` ref={containerRef} `}</span>
              <span className="text-cyan-400">{`className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"`}</span>
              <span className="text-purple-400">{`&gt;`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`{Array.from({ length: 24 }).map((_, i) `}</span><span className="text-purple-400">{`=&gt;`}</span>
              <span className="text-white"> (</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`&lt;div`}</span>
              <span className="text-white">{` key={i} `}</span>
              <span className="text-cyan-400">{`className="batch-item bg-zinc-900 aspect-square rounded-lg"`}</span>
              <span className="text-purple-400">{`&gt;`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`i + 1`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`&lt;/div&gt;`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`)})`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`&lt;/div&gt;`}</span>
              <br />
              &nbsp;&nbsp;<span className="text-white">);</span>
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
      title: 'GRID-BASED STAGGER',
      description: 'The grid: [rows, cols] option tells GSAP about your layout, enabling "from: center" and other spatial stagger patterns that animate outward from a specific point.',
    },
    {
      title: 'AMOUNT VS EACH',
      description: 'stagger: { amount: 0.8 } distributes the total time across all items, ensuring consistent timing regardless of item count. Use "each" for fixed per-item delays.',
    },
    {
      title: 'GPU ACCELERATION',
      description: 'Scale and opacity transforms are GPU-accelerated properties. Using them instead of layout properties like width, height, or margin ensures smooth 60fps animations.',
    },
    {
      title: 'PERFORMANCE TIP',
      description: 'For 50+ items, consider batch animations with smaller amounts (0.3-0.5s). You can also use will-change CSS property or stagger by rows/cols for different effects.',
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

export function BatchRevealPattern() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <PatternHeader />
      <LiveDemo />
      <CodeViewer />
      <PatternNotes />

      {/* Related Patterns */}
      <RelatedPatterns currentPatternId="batch-reveal" />

      {/* Pattern Navigation */}
      <PatternNavigation currentPatternId="batch-reveal" />

      {/* Footer CTA */}
      <section className="relative border-t border-orange-500/20 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
            Ready to <span className="text-orange-500">Optimize</span>?
          </h2>
          <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
            Master performance techniques for smooth, professional animations that scale.
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
