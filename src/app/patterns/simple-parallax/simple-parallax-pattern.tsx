'use client';

import { useRef } from 'react';
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
            Parallax &amp; Depth
          </span>
          <span className="w-8 h-px bg-orange-500/50" />
          <span className="text-zinc-500 text-xs font-bold tracking-[0.2em] uppercase">
            Beginner
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 tracking-tight uppercase mb-6">
          Simple Parallax
        </h1>

        {/* Description */}
        <p className="text-zinc-400 text-lg md:text-xl max-w-3xl font-light leading-relaxed">
          Background elements move slower than foreground elements as you scroll, creating a convincing
          sense of depth and dimension. A foundational technique for immersive web experiences.
        </p>

        {/* Key features */}
        <div className="flex flex-wrap gap-4 mt-8">
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-zinc-300 text-sm font-mono">y-axis translation</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-zinc-300 text-sm font-mono">speed ratio</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-zinc-300 text-sm font-mono">depth perception</span>
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

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Parallax background - moves at 50% speed
    const background = container.querySelector('.parallax-bg') as HTMLElement;
    // Foreground - moves at normal speed (100%)
    const foreground = container.querySelector('.parallax-fg') as HTMLElement;

    // Calculate parallax movement based on scroll position
    // Background moves slower (0.5 = 50% speed)
    gsap.to(background, {
      y: -200,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Foreground moves normally (or can move faster for more depth)
    gsap.to(foreground, {
      y: 50,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    ScrollTrigger.refresh();

    return () => {
      gsap.killTweensOf(background);
      gsap.killTweensOf(foreground);
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
        <p className="text-zinc-500 mt-3 ml-7">Scroll to see parallax depth effect</p>
      </div>

      {/* Demo content */}
      <div ref={containerRef} className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        {/* Parallax demo container */}
        <div className="relative h-[600px] overflow-hidden rounded-xl border border-zinc-800">
          {/* Background layer - moves slower */}
          <div className="parallax-bg absolute inset-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900" />
            {/* Decorative background elements */}
            <div className="relative z-10 text-center">
              <div className="text-[200px] font-black text-zinc-700/20 select-none">
                BG
              </div>
              <div className="text-sm text-zinc-600 tracking-[0.3em] uppercase mt-4">
                Background Layer (50% Speed)
              </div>
            </div>
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `
                linear-gradient(to right, #ffffff 1px, transparent 1px),
                linear-gradient(to bottom, #ffffff 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }} />
          </div>

          {/* Foreground layer - moves normal speed */}
          <div className="parallax-fg absolute inset-0 flex items-center justify-center">
            {/* Foreground card */}
            <div className="relative bg-zinc-950/90 backdrop-blur border-2 border-orange-500 rounded-2xl p-12 shadow-2xl max-w-lg">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-orange-500 rounded-tl-lg" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-orange-500 rounded-br-lg" />

              {/* Content */}
              <div className="text-center">
                <div className="inline-block px-4 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full mb-6">
                  <span className="text-orange-500 text-xs font-black tracking-[0.2em] uppercase">
                    Foreground Layer
                  </span>
                </div>
                <h3 className="text-4xl font-black text-white uppercase tracking-tight mb-4">
                  PARALLAX
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  The background moves at 50% speed while this card moves at 100% speed.
                  The difference creates depth perception.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Speed comparison cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-lg">
            <div className="text-orange-500 text-xs font-black tracking-[0.2em] uppercase mb-3">
              Speed Ratio
            </div>
            <div className="text-4xl font-black text-white mb-2">0.5</div>
            <p className="text-zinc-500 text-sm">Background moves at 50% of scroll speed</p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-lg">
            <div className="text-orange-500 text-xs font-black tracking-[0.2em] uppercase mb-3">
              Y-Translation
            </div>
            <div className="text-4xl font-black text-white mb-2">-200px</div>
            <p className="text-zinc-500 text-sm">Background moves upward 200 pixels</p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-lg">
            <div className="text-orange-500 text-xs font-black tracking-[0.2em] uppercase mb-3">
              Scrub Mode
            </div>
            <div className="text-4xl font-black text-white mb-2">true</div>
            <p className="text-zinc-500 text-sm">Animation is directly linked to scroll</p>
          </div>
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
// SIMPLE PARALLAX PATTERN
// ============================================================================

'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

export function SimpleParallax() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Background element - moves slower
    const background = container.querySelector('.parallax-bg');
    // Foreground element - moves normal speed
    const foreground = container.querySelector('.parallax-fg');

    // Parallax formula: y = distance * speedRatio
    // Background at 50% speed
    gsap.to(background, {
      y: -200,  // Moves upward 200px
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,  // Links to scroll position
      },
    });

    // Foreground at 100% speed (or faster for more depth)
    gsap.to(foreground, {
      y: 50,  // Moves downward 50px
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      gsap.killTweensOf(background);
      gsap.killTweensOf(foreground);
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative h-[600px]">
      {/* Background layer */}
      <div className="parallax-bg absolute inset-0">
        <div className="text-[200px] opacity-20">BG</div>
      </div>

      {/* Foreground layer */}
      <div className="parallax-fg absolute inset-0 flex items-center justify-center">
        <div className="bg-zinc-900 p-8 rounded-xl border">
          <h2>Foreground Content</h2>
        </div>
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
              <span className="text-zinc-500">{`// SIMPLE PARALLAX PATTERN`}</span>
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
              <span className="text-yellow-300">{` SimpleParallax`}</span>
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
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">{`// Background - moves slower`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` background `}</span>
              <span className="text-purple-400">{`= container.querySelector`}</span>
              <span className="text-cyan-400">{`('.parallax-bg')`}</span>
              <span className="text-white">;</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">{`// Foreground - moves normal`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` foreground `}</span>
              <span className="text-purple-400">{`= container.querySelector`}</span>
              <span className="text-cyan-400">{`('.parallax-fg')`}</span>
              <span className="text-white">;</span>
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">{`// Background at 50% speed`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">{`gsap.to`}</span>
              <span className="text-white">(background, {`{`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`y: -200,`}</span>
              <span className="text-zinc-500">{`  // Upward movement`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`ease: 'none',`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`scrollTrigger: {`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`trigger: container,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`start: 'top bottom',`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`end: 'bottom top',`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`scrub: true,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`}`}</span><span className="text-white">{`},`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`}`});</span>
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">{`// Foreground at normal speed`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">{`gsap.to`}</span>
              <span className="text-white">(foreground, {`{`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`y: 50,`}</span>
              <span className="text-zinc-500">{`   // Slight down movement`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`ease: 'none',`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`scrollTrigger: {`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`trigger: container,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`start: 'top bottom',`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`end: 'bottom top',`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`scrub: true,`}</span>
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
              <span className="text-white">(background);</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">{`gsap.killTweensOf`}</span>
              <span className="text-white">(foreground);</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`}`});</span>
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
      title: 'SPEED RATIO',
      description: 'The key to parallax is moving layers at different speeds. A 0.5 speed ratio means the background moves 50% as fast as the scroll. Lower values create more depth, but can cause dizziness if too extreme.',
    },
    {
      title: 'SCRUB: TRUE',
      description: 'Using scrub: true links the animation directly to scroll position. As you scroll back up, the animation reverses smoothly. This creates the interactive, feel-connected-to-your-scroll effect.',
    },
    {
      title: 'Y-AXIS MOVEMENT',
      description: 'Parallax typically moves elements vertically (y-axis). Background moves in the opposite direction of scroll (negative y) while foreground moves with the scroll or stays relatively stable.',
    },
    {
      title: 'EASE: NONE',
      description: 'For parallax, always use ease: "none". Easing would cause the animation to "catch up" to the scroll position, breaking the direct 1:1 relationship that makes parallax feel realistic.',
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

import { useState } from 'react';

export function SimpleParallaxPattern() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <PatternHeader />
      <LiveDemo />
      <CodeViewer />
      <PatternNotes />

      {/* Related Patterns */}
      <RelatedPatterns currentPatternId="simple-parallax" />

      {/* Pattern Navigation */}
      <PatternNavigation currentPatternId="simple-parallax" />

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
