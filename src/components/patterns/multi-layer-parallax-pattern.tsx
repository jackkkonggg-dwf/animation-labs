'use client';

import { useRef } from 'react';
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
            Parallax &amp; Depth
          </span>
          <span className="w-8 h-px bg-orange-500/50" />
          <span className="text-zinc-500 text-xs font-bold tracking-[0.2em] uppercase">
            Intermediate
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 tracking-tight uppercase mb-6">
          Multi-Layer Parallax
        </h1>

        {/* Description */}
        <p className="text-zinc-400 text-lg md:text-xl max-w-3xl font-light leading-relaxed">
          Multiple layers moving at different speeds create a rich, immersive 3D depth effect.
          The background crawls slowly, mid-ground moves moderately, and foreground responds normally.
        </p>

        {/* Key features */}
        <div className="flex flex-wrap gap-4 mt-8">
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-zinc-300 text-sm font-mono">z-index layering</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-zinc-300 text-sm font-mono">speed gradients</span>
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

    // Background layer - slowest movement (20% speed)
    const background = container.querySelector('.parallax-layer-bg') as HTMLElement;
    // Mid-ground layer - medium movement (50% speed)
    const midground = container.querySelector('.parallax-layer-mid') as HTMLElement;
    // Foreground layer - normal movement (100% speed)
    const foreground = container.querySelector('.parallax-layer-fg') as HTMLElement;

    // Background - very slow for distant feel
    gsap.to(background, {
      y: -100,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Mid-ground - medium speed
    gsap.to(midground, {
      y: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Foreground - normal speed
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
      gsap.killTweensOf(midground);
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
        <p className="text-zinc-500 mt-3 ml-7">Scroll to experience multi-layer depth</p>
      </div>

      {/* Demo content */}
      <div ref={containerRef} className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        {/* Parallax demo container */}
        <div className="relative h-[700px] overflow-hidden rounded-xl border border-zinc-800">
          {/* Layer 1: Background - slowest (z-index: 10) */}
          <div className="parallax-layer-bg absolute inset-0 flex items-center justify-center" style={{ zIndex: 10 }}>
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900" />
            {/* Large background pattern */}
            <div className="relative z-10 text-center opacity-10">
              <div className="text-[280px] font-black text-zinc-500 select-none leading-none">
                FAR
              </div>
            </div>
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: `
                linear-gradient(to right, #ffffff 1px, transparent 1px),
                linear-gradient(to bottom, #ffffff 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px'
            }} />
          </div>

          {/* Layer 2: Mid-ground - medium speed (z-index: 20) */}
          <div className="parallax-layer-mid absolute inset-0 flex items-center justify-center" style={{ zIndex: 20 }}>
            {/* Floating mid-ground elements */}
            <div className="absolute top-20 left-20 w-32 h-32 border-2 border-zinc-700 rounded-lg opacity-20 rotate-12" />
            <div className="absolute bottom-32 right-16 w-24 h-24 border-2 border-zinc-700 rounded-full opacity-20 -rotate-6" />
            <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-zinc-700/10 rounded opacity-30 rotate-45" />
            <div className="text-center">
              <div className="text-[180px] font-black text-zinc-600/30 select-none leading-none">
                MID
              </div>
              <div className="text-sm text-zinc-600/50 tracking-[0.3em] uppercase mt-2">
                Mid-Ground Layer (50% Speed)
              </div>
            </div>
          </div>

          {/* Layer 3: Foreground - normal speed (z-index: 30) */}
          <div className="parallax-layer-fg absolute inset-0 flex items-center justify-center" style={{ zIndex: 30 }}>
            {/* Foreground card */}
            <div className="relative bg-zinc-950/95 backdrop-blur border-2 border-orange-500 rounded-2xl p-10 shadow-2xl max-w-md mx-4">
              {/* Corner accents */}
              <div className="absolute -top-1 -left-1 w-6 h-6 border-l-4 border-t-4 border-orange-500 rounded-tl" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-r-4 border-b-4 border-orange-500 rounded-br" />

              {/* Content */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full mb-6">
                  <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                  <span className="text-orange-500 text-xs font-black tracking-[0.2em] uppercase">
                    Foreground Layer
                  </span>
                </div>
                <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-4">
                  DEPTH
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  Three layers moving at different speeds create a convincing 3D environment.
                  The background crawls, mid-ground moves steadily, foreground responds normally.
                </p>
                {/* Layer indicators */}
                <div className="flex justify-center gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-zinc-700 rounded" />
                    <span className="text-zinc-500">20%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-zinc-600 rounded" />
                    <span className="text-zinc-500">50%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-orange-500 rounded" />
                    <span className="text-zinc-500">100%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Speed comparison cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-4 h-4 bg-zinc-700 rounded" />
              <div className="text-orange-500 text-xs font-black tracking-[0.2em] uppercase">
                Background
              </div>
            </div>
            <div className="text-4xl font-black text-white mb-2">0.2x</div>
            <p className="text-zinc-500 text-sm">Slowest movement for distant depth</p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-4 h-4 bg-zinc-600 rounded" />
              <div className="text-orange-500 text-xs font-black tracking-[0.2em] uppercase">
                Mid-Ground
              </div>
            </div>
            <div className="text-4xl font-black text-white mb-2">0.5x</div>
            <p className="text-zinc-500 text-sm">Medium speed for middle depth</p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-4 h-4 bg-orange-500 rounded" />
              <div className="text-orange-500 text-xs font-black tracking-[0.2em] uppercase">
                Foreground
              </div>
            </div>
            <div className="text-4xl font-black text-white mb-2">1.0x</div>
            <p className="text-zinc-500 text-sm">Normal speed for close elements</p>
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
  const [copied, setCopied] = React.useState(false);

  const code = `// ============================================================================
// MULTI-LAYER PARALLAX PATTERN
// ============================================================================

'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

export function MultiLayerParallax() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Layer 1: Background - slowest
    const background = container.querySelector('.parallax-layer-bg');
    // Layer 2: Mid-ground - medium speed
    const midground = container.querySelector('.parallax-layer-mid');
    // Layer 3: Foreground - normal speed
    const foreground = container.querySelector('.parallax-layer-fg');

    // Background at 20% speed (distant)
    gsap.to(background, {
      y: -100,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Mid-ground at 50% speed
    gsap.to(midground, {
      y: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Foreground at 100% speed (closest)
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

    return () => {
      gsap.killTweensOf(background);
      gsap.killTweensOf(midground);
      gsap.killTweensOf(foreground);
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative h-[700px]">
      {/* Layer 1: Background (z-index: 10) */}
      <div className="parallax-layer-bg absolute inset-0" style={{ zIndex: 10 }}>
        <div className="text-[200px] opacity-10">FAR</div>
      </div>

      {/* Layer 2: Mid-ground (z-index: 20) */}
      <div className="parallax-layer-mid absolute inset-0" style={{ zIndex: 20 }}>
        <div className="text-[150px] opacity-20">MID</div>
      </div>

      {/* Layer 3: Foreground (z-index: 30) */}
      <div className="parallax-layer-fg absolute inset-0" style={{ zIndex: 30 }}>
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
              <span className="text-zinc-500">{`// MULTI-LAYER PARALLAX PATTERN`}</span>
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
              <span className="text-yellow-300">{` MultiLayerParallax`}</span>
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
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">{`// Layer 1: Background - slowest`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` background `}</span>
              <span className="text-purple-400">{`= container.querySelector`}</span>
              <span className="text-cyan-400">{`('.parallax-layer-bg')`}</span>
              <span className="text-white">;</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">{`// Layer 2: Mid-ground - medium`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` midground `}</span>
              <span className="text-purple-400">{`= container.querySelector`}</span>
              <span className="text-cyan-400">{`('.parallax-layer-mid')`}</span>
              <span className="text-white">;</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">{`// Layer 3: Foreground - normal`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` foreground `}</span>
              <span className="text-purple-400">{`= container.querySelector`}</span>
              <span className="text-cyan-400">{`('.parallax-layer-fg')`}</span>
              <span className="text-white">;</span>
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">{`// Background at 20% speed`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">{`gsap.to`}</span>
              <span className="text-white">(background, {`{`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`y: -100,`}</span>
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
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">{`// Mid-ground at 50% speed`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">{`gsap.to`}</span>
              <span className="text-white">(midground, {`{`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`y: -50,`}</span>
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
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">{`// Foreground at 100% speed`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">{`gsap.to`}</span>
              <span className="text-white">(foreground, {`{`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`y: 50,`}</span>
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
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`return`}</span>
              <span className="text-white"> () {`=>`}</span><span className="text-white">{` {`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">{`gsap.killTweensOf`}</span>
              <span className="text-white">(background);</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">{`gsap.killTweensOf`}</span>
              <span className="text-white">(midground);</span>
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
      title: 'Z-INDEX LAYERING',
      description: 'Proper z-index stacking is crucial for multi-layer parallax. Background gets lowest z-index (10), mid-ground gets medium (20), foreground gets highest (30). This ensures correct visual ordering.',
    },
    {
      title: 'SPEED GRADIENTS',
      description: 'Create depth by using progressive speed differences: background at 0.2x, mid-ground at 0.5x, foreground at 1.0x. The larger the speed gap between layers, the more pronounced the 3D effect.',
    },
    {
      title: 'OPACITY VARIATIONS',
      description: 'Distant layers should have lower opacity (10-20%) while closer layers are more opaque (40-60%). This mimics atmospheric perspective and enhances the depth illusion.',
    },
    {
      title: 'MOVEMENT DIRECTION',
      description: 'Background and mid-ground typically move upward (negative y) while scrolling down, creating the illusion of distance. Foreground can move slightly downward (positive y) or stay stable for contrast.',
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

import React from 'react';

export function MultiLayerParallaxPattern() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <PatternHeader />
      <LiveDemo />
      <CodeViewer />
      <PatternNotes />

      {/* Related Patterns */}
      <RelatedPatterns currentPatternId="multi-layer-parallax" />

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
