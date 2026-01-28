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
            Advanced Scroll
          </span>
          <span className="w-8 h-px bg-orange-500/50" />
          <span className="text-zinc-500 text-xs font-bold tracking-[0.2em] uppercase">
            Intermediate
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase mb-6">
          Count <span className="text-orange-500">Up</span>
        </h1>

        {/* Description */}
        <p className="text-zinc-400 text-lg md:text-xl max-w-3xl font-light leading-relaxed">
          Numbers animate from zero to their final value when elements enter the viewport. Perfect for statistics,
          metrics, and data visualizations that need to capture attention and create impact.
        </p>

        {/* Key features */}
        <div className="flex flex-wrap gap-4 mt-8">
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-zinc-300 text-sm font-mono">0 → target value</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-zinc-300 text-sm font-mono">onUpdate callback</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-zinc-300 text-sm font-mono">duration control</span>
          </div>
        </div>
      </div>
    </header>
  );
}

// ============================================================================
// COUNT UP CARD COMPONENT
// ============================================================================

interface CountUpCardProps {
  label: string;
  value: number;
  suffix?: string;
  icon: string;
  gradient: string;
  decimals?: number;
}

function CountUpCard({ label, value, suffix = '', icon, gradient, decimals = 0 }: CountUpCardProps) {
  const displayRef = useRef<HTMLSpanElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const card = cardRef.current;
    const display = displayRef.current;
    if (!card || !display) return;

    // Create a proxy object to animate
    const proxy = { value: 0 };

    gsap.to(proxy, {
      value: value,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      onUpdate: () => {
        display.textContent = proxy.value.toFixed(decimals) + suffix;
      },
    });

    return () => {
      gsap.killTweensOf(proxy);
    };
  }, { scope: cardRef });

  return (
    <div ref={cardRef} className="relative bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-lg overflow-hidden hover:border-orange-500/50 transition-colors duration-300">
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 hover:opacity-10 transition-opacity duration-300`} />

      {/* Scan line effect on hover */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500">
        <div className="w-full h-px bg-white/20 absolute top-1/2 animate-scan" />
      </div>

      {/* Card content */}
      <div className="relative p-6">
        {/* Icon */}
        <div className="text-4xl mb-4">{icon}</div>

        {/* Count value */}
        <div className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2">
          <span ref={displayRef} className="tabular-nums">
            0{suffix}
          </span>
        </div>

        {/* Label */}
        <p className="text-zinc-400 text-sm font-bold uppercase tracking-wider">
          {label}
        </p>

        {/* Corner accent */}
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-orange-500/50 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
}

// ============================================================================
// LIVE DEMO SECTION
// ============================================================================

function LiveDemo() {
  const stats = [
    {
      label: 'Active Users',
      value: 50000,
      suffix: '+',
      icon: '👥',
      gradient: 'from-orange-500 to-red-500',
      decimals: 0,
    },
    {
      label: 'Success Rate',
      value: 98.5,
      suffix: '%',
      icon: '📈',
      gradient: 'from-emerald-500 to-green-500',
      decimals: 1,
    },
    {
      label: 'Projects Completed',
      value: 1250,
      suffix: '',
      icon: '✅',
      gradient: 'from-cyan-500 to-blue-500',
      decimals: 0,
    },
    {
      label: 'Hours Saved',
      value: 7500,
      suffix: '+',
      icon: '⏱️',
      gradient: 'from-purple-500 to-pink-500',
      decimals: 0,
    },
    {
      label: 'Revenue Growth',
      value: 340,
      suffix: '%',
      icon: '💰',
      gradient: 'from-yellow-500 to-orange-500',
      decimals: 0,
    },
    {
      label: 'Countries Served',
      value: 85,
      suffix: '',
      icon: '🌍',
      gradient: 'from-rose-500 to-pink-500',
      decimals: 0,
    },
  ];

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
        <p className="text-zinc-500 mt-3 ml-7">Scroll down to see numbers count up when entering viewport</p>
      </div>

      {/* Demo cards grid */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <CountUpCard key={index} {...stat} />
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
// GSAP COUNT UP ANIMATION PATTERN
// ============================================================================

'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

export function CountUpComponent() {
  const displayRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    const display = displayRef.current;
    if (!container || !display) return;

    // Create a proxy object to animate
    const proxy = { value: 0 };

    gsap.to(proxy, {
      value: 1000,  // Target value
      duration: 2,  // Animation duration in seconds
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',  // Trigger when entering viewport
        toggleActions: 'play none none reverse',
      },
      onUpdate: () => {
        // Update display on each frame
        display.textContent = Math.floor(proxy.value).toLocaleString();
      },
    });

    return () => {
      gsap.killTweensOf(proxy);
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-zinc-800 p-8 rounded">
      <span ref={displayRef} className="text-5xl font-black tabular-nums">
        0
      </span>
      <p className="text-zinc-400 mt-2">Active Users</p>
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
              {'\n'}
              <span className="text-zinc-500">{`// GSAP COUNT UP ANIMATION PATTERN`}</span>
              {'\n'}
              <span className="text-zinc-500">{`// ============================================================================`}</span>
              {'\n'}
              {'\n'}
              <span className="text-purple-400">{`'use client'`}</span>
              <span className="text-white">;</span>
              {'\n'}
              {'\n'}
              <span className="text-purple-400">{`import`}</span>
              <span className="text-white">{` { useRef } `}</span>
              <span className="text-purple-400">{`from`}</span>
              <span className="text-cyan-400">{` 'react'`}</span>
              <span className="text-white">;</span>
              {'\n'}
              <span className="text-purple-400">{`import`}</span>
              <span className="text-white">{` { useGSAP } `}</span>
              <span className="text-purple-400">{`from`}</span>
              <span className="text-cyan-400">{` '@gsap/react'`}</span>
              <span className="text-white">;</span>
              {'\n'}
              <span className="text-purple-400">{`import`}</span>
              <span className="text-white">{` { gsap, ScrollTrigger } `}</span>
              <span className="text-purple-400">{`from`}</span>
              <span className="text-cyan-400">{` '@/lib/gsap-config'`}</span>
              <span className="text-white">;</span>
              {'\n'}
              {'\n'}
              <span className="text-purple-400">{`export`}</span>
              <span className="text-purple-400">{` function`}</span>
              <span className="text-yellow-300">{` CountUpComponent`}</span>
              <span className="text-white">() {`{`}</span>
              {'\n'}
              &nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` displayRef `}</span>
              <span className="text-purple-400">{`= useRef`}</span>
              <span className="text-orange-400">{`&lt;HTMLSpanElement&gt;`}</span>
              <span className="text-white">(null);</span>
              {'\n'}
              &nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` containerRef `}</span>
              <span className="text-purple-400">{`= useRef`}</span>
              <span className="text-orange-400">{`&lt;HTMLDivElement&gt;`}</span>
              <span className="text-white">(null);</span>
              {'\n'}
              {'\n'}
              &nbsp;&nbsp;<span className="text-blue-400">{`useGSAP`}</span>
              <span className="text-white">(() {`=>`} {`{`}</span>
              {'\n'}
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` container `}</span>
              <span className="text-purple-400">{`= containerRef.current`}</span>
              <span className="text-white">;</span>
              {'\n'}
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` display `}</span>
              <span className="text-purple-400">{`= displayRef.current`}</span>
              <span className="text-white">;</span>
              {'\n'}
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`if`}</span>
              <span className="text-white"> (!container || !display) </span>
              <span className="text-purple-400">{`return`}</span>
              <span className="text-white">;</span>
              {'\n'}
              {'\n'}
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">{`// Create a proxy object to animate`}</span>
              {'\n'}
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` proxy `}</span>
              <span className="text-purple-400">{`= { value: 0 }`}</span>
              <span className="text-white">;</span>
              {'\n'}
              {'\n'}
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">{`gsap.to`}</span>
              <span className="text-white">(proxy, {`{`}</span>
              {'\n'}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`value: 1000,`}</span>
              <span className="text-zinc-500">{`  // Target value`}</span>
              {'\n'}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`duration: 2,`}</span>
              <span className="text-zinc-500">{`  // Animation duration`}</span>
              {'\n'}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`ease: 'power2.out',`}</span>
              {'\n'}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`scrollTrigger: {`}</span>
              {'\n'}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`trigger: container,`}</span>
              {'\n'}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`start: 'top 85%',`}</span>
              {'\n'}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`toggleActions: 'play none none reverse',`}</span>
              {'\n'}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`},`}</span>
              {'\n'}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`onUpdate: () {`}</span><span className="text-white">{` => {`}</span>
              {'\n'}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">{`// Update display on each frame`}</span>
              {'\n'}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`display.textContent = Math.floor(proxy.value).toLocaleString();`}</span>
              {'\n'}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`},`}</span>
              {'\n'}
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`}`});</span>
              {'\n'}
              {'\n'}
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`return`}</span>
              <span className="text-white"> () {`=>`}</span><span className="text-white">{` {`}</span>
              {'\n'}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">{`gsap.killTweensOf`}</span>
              <span className="text-white">(proxy);</span>
              {'\n'}
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`}`});</span>
              {'\n'}
              &nbsp;&nbsp;<span className="text-white">{`}`}</span>, <span className="text-white">{`{ scope: containerRef `}</span><span className="text-white">{`}`});</span>
              {'\n'}
              {'\n'}
              &nbsp;&nbsp;<span className="text-purple-400">{`return`}</span>
              <span className="text-white"> (</span>
              {'\n'}
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`&lt;div`}</span>
              <span className="text-white">{` ref={containerRef} `}</span>
              <span className="text-cyan-400">{`className="bg-zinc-800 p-8 rounded"`}</span>
              <span className="text-purple-400">{`&gt;`}</span>
              {'\n'}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`&lt;span`}</span>
              <span className="text-white">{` ref={displayRef} `}</span>
              <span className="text-cyan-400">{`className="text-5xl font-black tabular-nums"`}</span>
              <span className="text-purple-400">{`&gt;`}</span>
              {'\n'}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">0</span>
              {'\n'}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`&lt;/span&gt;`}</span>
              {'\n'}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`&lt;p`}</span>
              <span className="text-white">{` className="text-zinc-400 mt-2" `}</span>
              <span className="text-purple-400">{`&gt;`}</span>
              <span className="text-white">{`Active Users`}</span>
              <span className="text-purple-400">{`&lt;/p&gt;`}</span>
              {'\n'}
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`&lt;/div&gt;`}</span>
              {'\n'}
              &nbsp;&nbsp;<span className="text-white">{`);`}</span>
              {'\n'}
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
      title: 'PROXY OBJECT',
      description: 'Create a plain JavaScript object { value: 0 } to animate. GSAP animates this numeric value, and we use onUpdate to sync it to the DOM.',
    },
    {
      title: 'ONUPDATE CALLBACK',
      description: 'The onUpdate function runs on every animation frame. Use it to update the display with the current value from the proxy object.',
    },
    {
      title: 'DURATION CONTROL',
      description: 'Longer durations (2-3s) create dramatic reveals for large numbers. Shorter durations (0.5-1s) feel snappy for smaller values.',
    },
    {
      title: 'FORMATTING',
      description: 'Use Math.floor() for integers, toFixed(decimals) for decimals, or toLocaleString() for comma-separated thousands formatting.',
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

export function CountUpPattern() {
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
