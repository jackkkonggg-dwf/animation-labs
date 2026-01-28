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
            Text Animations
          </span>
          <span className="w-8 h-px bg-orange-500/50" />
          <span className="text-zinc-500 text-xs font-bold tracking-[0.2em] uppercase">
            Beginner
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase mb-6">
          Word <span className="text-orange-500">Reveal</span>
        </h1>

        {/* Description */}
        <p className="text-zinc-400 text-lg md:text-xl max-w-3xl font-light leading-relaxed">
          Kinetic typography that reveals text word by word. Split text into individual word spans,
          then animate each with staggered delays for dramatic headlines and call-to-action text.
        </p>

        {/* Key features */}
        <div className="flex flex-wrap gap-4 mt-8">
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-zinc-300 text-sm font-mono">split text to words</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-zinc-300 text-sm font-mono">stagger: 0.15s</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-zinc-300 text-sm font-mono">y: 50 + opacity</span>
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

  const handleReplay = () => {
    const container = containerRef.current;
    if (!container) return;

    const words = container.querySelectorAll('.word-reveal');

    // Reset to initial state
    gsap.set(words, { opacity: 0, y: 50 });

    // Replay the animation
    gsap.to(words, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out',
    });
  };

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Select all word spans
    const words = container.querySelectorAll('.word-reveal');

    // Set initial state - invisible and offset upward
    gsap.set(words, { opacity: 0, y: 50 });

    // Create staggered word reveal animation
    gsap.to(words, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
      },
    });

    ScrollTrigger.refresh();

    return () => {
      gsap.killTweensOf(words);
    };
  }, { scope: containerRef });

  // Helper function to split text into word spans
  const splitText = (text: string) => {
    return text.split(' ').map((word, index) => (
      <span key={index} className="word-reveal inline-block whitespace-nowrap">
        {word}{index < text.split(' ').length - 1 && ' '}
      </span>
    ));
  };

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
        <p className="text-zinc-500 mt-3 ml-7">Scroll down to see word-by-word animation</p>
      </div>

      {/* Demo content */}
      <div ref={containerRef} className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        {/* Hero headline */}
        <div className="mb-16">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight tracking-tighter">
            {splitText('WORD BY WORD REVEAL ANIMATION')}
          </h2>
        </div>

        {/* Subheadline */}
        <div className="mb-16">
          <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed">
            {splitText('Each word animates independently with dramatic timing for maximum impact.')}
          </p>
        </div>

        {/* Multiple text examples */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-lg">
            <p className="text-sm text-orange-500 font-black tracking-[0.2em] uppercase mb-4">
              Dramatic
            </p>
            <h3 className="text-2xl md:text-3xl font-black text-white uppercase">
              {splitText('Capture Attention')}
            </h3>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-lg">
            <p className="text-sm text-orange-500 font-black tracking-[0.2em] uppercase mb-4">
              Balanced
            </p>
            <h3 className="text-2xl md:text-3xl font-black text-white uppercase">
              {splitText('Create Impact')}
            </h3>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-lg">
            <p className="text-sm text-orange-500 font-black tracking-[0.2em] uppercase mb-4">
              Expressive
            </p>
            <h3 className="text-2xl md:text-3xl font-black text-white uppercase">
              {splitText('Tell Your Story')}
            </h3>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-lg">
            <p className="text-sm text-orange-500 font-black tracking-[0.2em] uppercase mb-4">
              Dynamic
            </p>
            <h3 className="text-2xl md:text-3xl font-black text-white uppercase">
              {splitText('Engage Users')}
            </h3>
          </div>
        </div>

        {/* Replay button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={handleReplay}
            className="group relative px-8 py-3 bg-zinc-800 border border-zinc-700 hover:border-orange-500 rounded transition-all duration-300 flex items-center gap-3"
          >
            <svg
              className="w-5 h-5 text-zinc-500 group-hover:text-orange-500 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="text-zinc-400 group-hover:text-orange-500 transition-colors text-sm font-bold uppercase tracking-wider">
              Replay Animation
            </span>
            <div className="absolute inset-0 overflow-hidden rounded">
              <div className="w-1 h-full bg-white/10 skew-x-[-12deg] translate-x-[-100%] group-hover:translate-x-[400%] transition-transform duration-700 ease-in-out" />
            </div>
          </button>
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
// WORD-BY-WORD TEXT REVEAL PATTERN
// ============================================================================

'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

export function WordTextReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Select all word spans
    const words = container.querySelectorAll('.word-reveal');

    // Set initial state - invisible and offset
    gsap.set(words, { opacity: 0, y: 50 });

    // Animate with stagger
    gsap.to(words, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15,  // 150ms per word
      ease: 'power2.out',  // Smooth deceleration
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        end: 'bottom 70%',
        toggleActions: 'play none none reverse',
      },
    });

    ScrollTrigger.refresh();

    return () => {
      gsap.killTweensOf(words);
    };
  }, { scope: containerRef });

  // Helper to split text into word spans
  const splitText = (text: string) => {
    return text.split(' ').map((word, i, arr) => (
      <span key={i} className="word-reveal inline-block whitespace-nowrap">
        {word}{i < arr.length - 1 && ' '}
      </span>
    ));
  };

  return (
    <div ref={containerRef}>
      <h1 className="text-6xl font-black">
        {splitText('WORD BY WORD REVEAL')}
      </h1>
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
              <span className="text-zinc-500">{`// WORD-BY-WORD TEXT REVEAL PATTERN`}</span>
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
              <span className="text-yellow-300">{` WordTextReveal`}</span>
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
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">{`// Select all word spans`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` words `}</span>
              <span className="text-purple-400">{`= container.querySelectorAll`}</span>
              <span className="text-cyan-400">{`('.word-reveal')`}</span>
              <span className="text-white">;</span>
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">{`// Set initial state - invisible and offset`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">{`gsap.set`}</span>
              <span className="text-white">(words, {`{`}</span><span className="text-white">{` opacity: 0, y: 50 `}</span><span className="text-white">{`}`});</span>
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">{`// Animate with stagger`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">{`gsap.to`}</span>
              <span className="text-white">(words, {`{`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`opacity: 1,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`y: 0,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`duration: 0.6,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`stagger: 0.15,`}</span>
              <span className="text-zinc-500">{`  // 150ms per word`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`ease: 'power2.out',`}</span>
              <span className="text-zinc-500">{`  // Smooth deceleration`}</span>
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
              <span className="text-white">(words);</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`}`});</span>
              <br />
              &nbsp;&nbsp;<span className="text-white">{`}`}</span>, <span className="text-white">{`{ scope: containerRef `}</span><span className="text-white">{`}`});</span>
              <br />
              <br />
              &nbsp;&nbsp;<span className="text-zinc-500">{`// Helper to split text into word spans`}</span>
              <br />
              &nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` splitText `}</span>
              <span className="text-purple-400">{`= (text: string) `}</span>
              <span className="text-purple-400">{`=>`}</span>
              <span className="text-white"> {`{`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`return`}</span>
              <span className="text-white">{` text.split(`}</span><span className="text-cyan-400">{`' '`}</span><span className="text-white">{`).map((word, i, arr) `}</span>
              <span className="text-purple-400">{`=>`}</span>
              <span className="text-white"> (</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`&lt;span`}</span>
              <span className="text-white">{` key={i} `}</span>
              <span className="text-cyan-400">{`className="word-reveal inline-block whitespace-nowrap"`}</span>
              <span className="text-purple-400">{`&gt;`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`{word}{i &lt; arr.length - 1 &amp;&amp; ' '}`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`&lt;/span&gt;`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`));`}</span>
              <br />
              &nbsp;&nbsp;<span className="text-white">{`}`});</span>
              <br />
              <br />
              &nbsp;&nbsp;<span className="text-purple-400">{`return`}</span>
              <span className="text-white"> (</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`&lt;div`}</span>
              <span className="text-white">{` ref={containerRef} `}</span>
              <span className="text-purple-400">{`&gt;`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`&lt;h1`}</span>
              <span className="text-white">{` className="text-6xl font-black" `}</span>
              <span className="text-purple-400">{`&gt;`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`{splitText('WORD BY WORD REVEAL')}`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`&lt;/h1&gt;`}</span>
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
      title: 'WORD-LEVEL SPLITTING',
      description: 'Split text by spaces (text.split(" ")) to create word spans. Each word becomes an independent animatable element.',
    },
    {
      title: 'STAGGER VALUE',
      description: 'Use larger stagger values (0.15-0.25s) for word reveals compared to character reveals. Fewer elements mean more dramatic timing works better.',
    },
    {
      title: 'WHITESPACE PRESERVATION',
      description: 'The split() method removes spaces. Add spaces back with {i < arr.length - 1 && " "} to preserve natural text spacing.',
    },
    {
      title: 'POWER2.OUT EASING',
      description: 'power2.out provides smooth deceleration that feels natural for word animations. Creates a polished, professional feel.',
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

export function WordTextRevealPattern() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <PatternHeader />
      <LiveDemo />
      <CodeViewer />
      <PatternNotes />

      {/* Related Patterns */}
      <RelatedPatterns currentPatternId="word-text-reveal" />

      {/* Pattern Navigation */}
      <PatternNavigation currentPatternId="word-text-reveal" />

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
