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
            ScrollTrigger Basics
          </span>
          <span className="w-8 h-px bg-orange-500/50" />
          <span className="text-zinc-500 text-xs font-bold tracking-[0.2em] uppercase">
            Beginner
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase mb-6">
          <span className="text-orange-500">Staggered</span> Reveal
        </h1>

        {/* Description */}
        <p className="text-zinc-400 text-lg md:text-xl max-w-3xl font-light leading-relaxed">
          Elements animate in sequence with cascading delays, creating a rhythmic and polished entrance effect.
          Perfect for grids, lists, or any collection of items that need to appear one after another.
        </p>

        {/* Key features */}
        <div className="flex flex-wrap gap-4 mt-8">
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-zinc-300 text-sm font-mono">x: -100 → 0</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-zinc-300 text-sm font-mono">opacity: 0 → 1</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-zinc-300 text-sm font-mono">stagger: 0.15s</span>
          </div>
        </div>
      </div>
    </header>
  );
}

// ============================================================================
// LIVE DEMO SECTION
// ============================================================================

interface DemoCard {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const DEMO_CARDS: DemoCard[] = [
  {
    id: 1,
    title: 'STAGGER DELAY',
    description: 'The stagger option adds a delay between each element, creating a cascade effect',
    icon: '⏱️',
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 2,
    title: 'SEQUENCE ORDER',
    description: 'Elements animate in DOM order by default - first to last, left to right',
    icon: '🔢',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    id: 3,
    title: 'SLIDE DIRECTION',
    description: 'x-axis movement creates a slide-in effect from the left side',
    icon: '➡️',
    color: 'from-emerald-500 to-green-500',
  },
  {
    id: 4,
    title: 'FADE COMBINATION',
    description: 'Combining x-movement with opacity creates depth and smoothness',
    icon: '👁️',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 5,
    title: 'EASING CHOICE',
    description: 'Power2.out provides a smooth deceleration that feels natural',
    icon: '📈',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 6,
    title: 'GRID LAYOUTS',
    description: 'Stagger works perfectly with CSS Grid for responsive card layouts',
    icon: '📐',
    color: 'from-rose-500 to-pink-500',
  },
  {
    id: 7,
    title: 'TIMING CONTROL',
    description: 'Adjust stagger value for faster (0.1s) or slower (0.3s) cascade effects',
    icon: '⚙️',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    id: 8,
    title: 'LARGE COLLECTIONS',
    description: 'Stagger efficiently handles dozens of elements with consistent timing',
    icon: '📦',
    color: 'from-teal-500 to-cyan-500',
  },
];

function LiveDemo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.demo-card');

    // Set initial state - offset from left and invisible
    gsap.set(cards, { x: -100, opacity: 0 });

    // Create staggered slide-in animation
    gsap.to(cards, {
      x: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
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
        <p className="text-zinc-500 mt-3 ml-7">Scroll down to see the staggered reveal animation</p>
      </div>

      {/* Demo cards grid */}
      <div ref={containerRef} className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEMO_CARDS.map((card) => (
            <div
              key={card.id}
              className="demo-card group relative bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-lg overflow-hidden hover:border-orange-500/50 transition-colors duration-300"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

              {/* Scan line effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-full h-px bg-white/20 absolute top-1/2 animate-scan" />
              </div>

              {/* Card content */}
              <div className="relative p-6">
                {/* Icon */}
                <div className="text-4xl mb-4">{card.icon}</div>

                {/* Title */}
                <h3 className="text-lg font-black text-white uppercase tracking-tight mb-3">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {card.description}
                </p>

                {/* Corner accent */}
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-orange-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center gap-3 text-zinc-600 text-sm">
            <span className="w-16 h-px bg-zinc-700" />
            <span className="uppercase tracking-[0.2em]">Scroll to replay</span>
            <span className="w-16 h-px bg-zinc-700" />
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
// SCROLLTRIGGER STAGGERED REVEAL PATTERN
// ============================================================================

'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

export function StaggeredRevealComponent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Select elements to animate
    const elements = container.querySelectorAll('.animate-item');

    // Set initial state - offset from left and invisible
    gsap.set(elements, { x: -100, opacity: 0 });

    // Create staggered slide-in animation
    gsap.to(elements, {
      x: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.15,  // 150ms delay between each element
      ease: 'power2.out',  // Smooth deceleration
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',  // Start when top of container hits 80% of viewport
        toggleActions: 'play none none reverse',  // Play on enter, reverse on exit
      },
    });

    // Refresh ScrollTrigger after setup
    ScrollTrigger.refresh();

    // Cleanup - kill tweens and triggers
    return () => {
      gsap.killTweensOf(elements);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="animate-item bg-zinc-800 p-6 rounded-lg">
        <h3>Item 1</h3>
      </div>
      <div className="animate-item bg-zinc-800 p-6 rounded-lg">
        <h3>Item 2</h3>
      </div>
      <div className="animate-item bg-zinc-800 p-6 rounded-lg">
        <h3>Item 3</h3>
      </div>
      <div className="animate-item bg-zinc-800 p-6 rounded-lg">
        <h3>Item 4</h3>
      </div>
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
              <span className="text-zinc-500">{`// SCROLLTRIGGER STAGGERED REVEAL PATTERN`}</span>
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
              <span className="text-yellow-300">{` StaggeredRevealComponent`}</span>
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
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">{`// Select elements to animate`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` elements `}</span>
              <span className="text-purple-400">{`= container.querySelectorAll`}</span>
              <span className="text-cyan-400">{`('.animate-item')`}</span>
              <span className="text-white">;</span>
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">{`// Set initial state - offset from left and invisible`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">{`gsap.set`}</span>
              <span className="text-white">(elements, {`{`}</span><span className="text-white">{` x: -100, opacity: 0 `}</span><span className="text-white">{`}`});</span>
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">{`// Create staggered slide-in animation`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">{`gsap.to`}</span>
              <span className="text-white">(elements, {`{`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`x: 0,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`opacity: 1,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`duration: 0.6,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`stagger: 0.15,`}</span>
              <span className="text-zinc-500">{`  // 150ms delay between each element`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`ease: 'power2.out',`}</span>
              <span className="text-zinc-500">{`  // Smooth deceleration`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`scrollTrigger: {`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`trigger: container,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`start: 'top 80%',`}</span>
              <span className="text-zinc-500">{`  // Start when top hits 80% viewport`}</span>
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
              <span className="text-white">(elements);</span>
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
              <span className="text-white">{` ref={containerRef} `}</span>
              <span className="text-cyan-400">{`className="grid grid-cols-1 md:grid-cols-4 gap-6"`}</span>
              <span className="text-purple-400">{`&gt;`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`&lt;div`}</span>
              <span className="text-white">{` className="animate-item bg-zinc-800 p-6 rounded-lg" `}</span>
              <span className="text-purple-400">{`&gt;`}</span>
              <span className="text-white">{`Item 1`}</span>
              <span className="text-purple-400">{`&lt;/div&gt;`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`&lt;div`}</span>
              <span className="text-white">{` className="animate-item bg-zinc-800 p-6 rounded-lg" `}</span>
              <span className="text-purple-400">{`&gt;`}</span>
              <span className="text-white">{`Item 2`}</span>
              <span className="text-purple-400">{`&lt;/div&gt;`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`&lt;div`}</span>
              <span className="text-white">{` className="animate-item bg-zinc-800 p-6 rounded-lg" `}</span>
              <span className="text-purple-400">{`&gt;`}</span>
              <span className="text-white">{`Item 3`}</span>
              <span className="text-purple-400">{`&lt;/div&gt;`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`&lt;div`}</span>
              <span className="text-white">{` className="animate-item bg-zinc-800 p-6 rounded-lg" `}</span>
              <span className="text-purple-400">{`&gt;`}</span>
              <span className="text-white">{`Item 4`}</span>
              <span className="text-purple-400">{`&lt;/div&gt;`}</span>
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
      title: 'STAGGER VALUE',
      description: 'The stagger: 0.15 option adds 150ms delay between each element. Lower values (0.1) create faster cascades, higher values (0.3) create slower, more dramatic sequences.',
    },
    {
      title: 'DIRECTION CONTROL',
      description: 'Use x: -100 to slide from left, x: 100 to slide from right, or y for vertical movement. Positive values push elements away from their starting position.',
    },
    {
      title: 'GRID LAYOUTS',
      description: 'Stagger works naturally with CSS Grid. Elements animate in DOM order - left to right, top to bottom. For different patterns, use stagger\'s object form with "from" property.',
    },
    {
      title: 'ADVANCED STAGGER',
      description: 'For complex patterns, use stagger: { each: 0.15, from: "center" } or { from: "edges", grid: [rows, cols] } to control animation origin and grid-based staggering.',
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

export function StaggeredRevealPattern() {
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
            Ready to <span className="text-orange-500">Animate</span>?
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
