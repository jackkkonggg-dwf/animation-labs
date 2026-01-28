'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-config';

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
            Micro-interactions
          </span>
          <span className="w-8 h-px bg-orange-500/50" />
          <span className="text-zinc-500 text-xs font-bold tracking-[0.2em] uppercase">
            Beginner
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase mb-6">
          Button <span className="text-orange-500">Hover</span>
        </h1>

        {/* Description */}
        <p className="text-zinc-400 text-lg md:text-xl max-w-3xl font-light leading-relaxed">
          Transform static buttons into engaging interactive elements. Hover animations provide immediate feedback,
          guide user attention, and add polish to your interface with smooth, responsive micro-interactions.
        </p>

        {/* Key features */}
        <div className="flex flex-wrap gap-4 mt-8">
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-zinc-300 text-sm font-mono">mouseenter/mouseleave</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-zinc-300 text-sm font-mono">scale transforms</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-zinc-300 text-sm font-mono">shadow effects</span>
          </div>
        </div>
      </div>
    </header>
  );
}

// ============================================================================
// LIVE DEMO SECTION - BUTTON 1: SCALE + SHADOW
// ============================================================================

function ScaleShadowButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    const button = buttonRef.current;
    if (!button) return;

    // Hover enter animation
    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.05,
        boxShadow: '0 20px 40px rgba(249, 115, 22, 0.4)',
        duration: 0.3,
        ease: 'back.out(1.7)',
      });
    };

    // Hover leave animation
    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        duration: 0.2,
        ease: 'power2.out',
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(button);
    };
  }, { scope: buttonRef });

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        ref={buttonRef}
        className="px-8 py-4 bg-orange-500 text-black font-black text-sm uppercase tracking-wider rounded transition-colors"
        style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
      >
        Scale + Shadow
      </button>
      <span className="text-zinc-500 text-xs font-mono">back.out(1.7) elastic easing</span>
    </div>
  );
}

// ============================================================================
// LIVE DEMO SECTION - BUTTON 2: MAGNETIC EFFECT
// ============================================================================

function MagneticButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const button = buttonRef.current;
    const area = areaRef.current;
    if (!button || !area) return;

    let xTo = gsap.quickTo(button, 'x', { duration: 0.4, ease: 'power3.out' });
    let yTo = gsap.quickTo(button, 'y', { duration: 0.4, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = area.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      xTo(x * 0.3);
      yTo(y * 0.3);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    area.addEventListener('mousemove', handleMouseMove);
    area.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      area.removeEventListener('mousemove', handleMouseMove);
      area.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(button);
    };
  }, { scope: buttonRef });

  return (
    <div className="flex flex-col items-center gap-4">
      <div ref={areaRef} className="relative inline-block">
        <button
          ref={buttonRef}
          className="px-8 py-4 bg-cyan-500 text-black font-black text-sm uppercase tracking-wider rounded"
        >
          Magnetic
        </button>
      </div>
      <span className="text-zinc-500 text-xs font-mono">follows cursor with quickTo()</span>
    </div>
  );
}

// ============================================================================
// LIVE DEMO SECTION - BUTTON 3: ICON ANIMATION
// ============================================================================

function IconAnimationButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    const button = buttonRef.current;
    const icon = iconRef.current;
    if (!button || !icon) return;

    const handleMouseEnter = () => {
      // Button scale
      gsap.to(button, {
        scale: 1.02,
        duration: 0.2,
        ease: 'power2.out',
      });

      // Icon animation - fly out and back
      gsap.fromTo(
        icon,
        { x: 0, rotate: 0 },
        {
          x: 8,
          rotate: 45,
          duration: 0.3,
          ease: 'back.out(1.7)',
        }
      );
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.2,
        ease: 'power2.out',
      });

      gsap.to(icon, {
        x: 0,
        rotate: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(button);
      gsap.killTweensOf(icon);
    };
  }, { scope: buttonRef });

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        ref={buttonRef}
        className="px-8 py-4 bg-emerald-500 text-black font-black text-sm uppercase tracking-wider rounded flex items-center gap-3"
      >
        Get Started
        <svg
          ref={iconRef}
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </button>
      <span className="text-zinc-500 text-xs font-mono">icon translates and rotates</span>
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
        <p className="text-zinc-500 mt-3 ml-7">Hover over each button to see the micro-interaction</p>
      </div>

      {/* Demo buttons grid */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Scale + Shadow Card */}
          <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-lg p-8 flex flex-col items-center justify-center min-h-[240px]">
            <div className="text-4xl mb-6">📏</div>
            <h3 className="text-lg font-black text-white uppercase tracking-tight mb-6 text-center">
              Scale + Shadow
            </h3>
            <ScaleShadowButton />
          </div>

          {/* Magnetic Effect Card */}
          <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-lg p-8 flex flex-col items-center justify-center min-h-[240px]">
            <div className="text-4xl mb-6">🧲</div>
            <h3 className="text-lg font-black text-white uppercase tracking-tight mb-6 text-center">
              Magnetic
            </h3>
            <MagneticButton />
          </div>

          {/* Icon Animation Card */}
          <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-lg p-8 flex flex-col items-center justify-center min-h-[240px]">
            <div className="text-4xl mb-6">✨</div>
            <h3 className="text-lg font-black text-white uppercase tracking-tight mb-6 text-center">
              Icon Animation
            </h3>
            <IconAnimationButton />
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
// BUTTON HOVER MICRO-INTERACTION PATTERNS
// ============================================================================

'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-config';

// ----------------------------------------------------------------------------
// PATTERN 1: SCALE + SHADOW (Elastic Easing)
// ----------------------------------------------------------------------------

export function ScaleShadowButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.05,
        boxShadow: '0 20px 40px rgba(249, 115, 22, 0.4)',
        duration: 0.3,
        ease: 'back.out(1.7)',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        duration: 0.2,
        ease: 'power2.out',
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(button);
    };
  }, { scope: buttonRef });

  return (
    <button ref={buttonRef} className="px-8 py-4 bg-orange-500 ...">
      Scale + Shadow
    </button>
  );
}

// ----------------------------------------------------------------------------
// PATTERN 2: MAGNETIC EFFECT (Follows Cursor)
// ----------------------------------------------------------------------------

export function MagneticButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const button = buttonRef.current;
    const area = areaRef.current;
    if (!button || !area) return;

    // quickTo() creates performant, cached tweens
    let xTo = gsap.quickTo(button, 'x', { duration: 0.4, ease: 'power3.out' });
    let yTo = gsap.quickTo(button, 'y', { duration: 0.4, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = area.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Move button towards cursor (0.3 = magnetic strength)
      xTo(x * 0.3);
      yTo(y * 0.3);
    };

    const handleMouseLeave = () => {
      xTo(0);  // Return to center
      yTo(0);
    };

    area.addEventListener('mousemove', handleMouseMove);
    area.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      area.removeEventListener('mousemove', handleMouseMove);
      area.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(button);
    };
  });

  return (
    <div ref={areaRef}>
      <button ref={buttonRef} className="px-8 py-4 bg-cyan-500 ...">
        Magnetic
      </button>
    </div>
  );
}

// ----------------------------------------------------------------------------
// PATTERN 3: ICON ANIMATION (Translate + Rotate)
// ----------------------------------------------------------------------------

export function IconAnimationButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    const button = buttonRef.current;
    const icon = iconRef.current;
    if (!button || !icon) return;

    const handleMouseEnter = () => {
      // Subtle button scale
      gsap.to(button, {
        scale: 1.02,
        duration: 0.2,
        ease: 'power2.out',
      });

      // Icon flies out with rotation
      gsap.fromTo(icon,
        { x: 0, rotate: 0 },
        {
          x: 8,
          rotate: 45,
          duration: 0.3,
          ease: 'back.out(1.7)',
        }
      );
    };

    const handleMouseLeave = () => {
      gsap.to(button, { scale: 1, duration: 0.2, ease: 'power2.out' });
      gsap.to(icon, {
        x: 0,
        rotate: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(button);
      gsap.killTweensOf(icon);
    };
  });

  return (
    <button ref={buttonRef} className="flex items-center gap-3 ...">
      Get Started
      <svg ref={iconRef} className="w-5 h-5">...</svg>
    </button>
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
              <span className="text-zinc-500">{`// BUTTON HOVER MICRO-INTERACTION PATTERNS`}</span>
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
              <span className="text-zinc-500">{`// ----------------------------------------------------------------------------`}</span>
              <br />
              <span className="text-zinc-500">{`// PATTERN 1: SCALE + SHADOW (Elastic Easing)`}</span>
              <br />
              <span className="text-zinc-500">{`// ----------------------------------------------------------------------------`}</span>
              <br />
              <br />
              <span className="text-purple-400">{`export`}</span>
              <span className="text-purple-400">{` function`}</span>
              <span className="text-yellow-300">{` ScaleShadowButton`}</span>
              <span className="text-white">() {`{`}</span>
              <br />
              &nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` buttonRef `}</span>
              <span className="text-purple-400">{`= useRef`}</span>
              <span className="text-orange-400">{`&lt;HTMLButtonElement&gt;`}</span>
              <span className="text-white">(null);</span>
              <br />
              <br />
              &nbsp;&nbsp;<span className="text-blue-400">{`useGSAP`}</span>
              <span className="text-white">(() {`=>`} {`{`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` button `}</span>
              <span className="text-purple-400">{`= buttonRef.current`}</span>
              <span className="text-white">;</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`if`}</span>
              <span className="text-white"> (!button) </span>
              <span className="text-purple-400">{`return`}</span>
              <span className="text-white">;</span>
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` handleMouseEnter `}</span>
              <span className="text-purple-400">{`= () `}</span>
              <span className="text-purple-400">{`=>`}</span>
              <span className="text-white">{` {`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">{`gsap.to`}</span>
              <span className="text-white">(button, {`{`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`scale: 1.05,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`boxShadow: '0 20px 40px rgba(249, 115, 22, 0.4)',`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`duration: 0.3,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`ease: 'back.out(1.7)',`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`}`});</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`}`});</span>
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` handleMouseLeave `}</span>
              <span className="text-purple-400">{`= () `}</span>
              <span className="text-purple-400">{`=>`}</span>
              <span className="text-white">{` {`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">{`gsap.to`}</span>
              <span className="text-white">(button, {`{`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`scale: 1,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`duration: 0.2,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`ease: 'power2.out',`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`}`});</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`}`});</span>
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`button.addEventListener('mouseenter', handleMouseEnter);`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`button.addEventListener('mouseleave', handleMouseLeave);`}</span>
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`return`}</span>
              <span className="text-white"> () {`=>`}</span>
              <span className="text-white">{` {`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`button.removeEventListener('mouseenter', handleMouseEnter);`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`button.removeEventListener('mouseleave', handleMouseLeave);`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">{`gsap.killTweensOf`}</span>
              <span className="text-white">(button);</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`}`});</span>
              <br />
              &nbsp;&nbsp;<span className="text-white">{`}`}</span>, <span className="text-white">{`{ scope: buttonRef `}</span><span className="text-white">{`}`});</span>
              <br />
              <br />
              &nbsp;&nbsp;<span className="text-purple-400">{`return`}</span>
              <span className="text-white"> (</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`&lt;button`}</span>
              <span className="text-white">{` ref={buttonRef} `}</span>
              <span className="text-cyan-400">{`className="px-8 py-4 bg-orange-500 ..."`}</span>
              <span className="text-purple-400">{`&gt;`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`Scale + Shadow`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`&lt;/button&gt;`}</span>
              <br />
              &nbsp;&nbsp;<span className="text-white">{`);`}</span>
              <br />
              <span className="text-white">{`}`}</span>
            </code>
          </pre>

          {/* Bottom scan line */}
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50" />
        </div>

        {/* Note about magnetic pattern */}
        <div className="mt-6 p-4 bg-zinc-800/50 border border-zinc-700/50 rounded">
          <p className="text-zinc-400 text-sm">
            <span className="text-orange-500 font-bold">Note:</span> The code above shows the Scale + Shadow pattern.
            The Magnetic pattern uses <code className="text-cyan-400">gsap.quickTo()</code> for high-performance cursor tracking.
            See the full code block for all three patterns.
          </p>
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
      title: 'HOVER EVENTS',
      description: 'Use mouseenter/mouseleave instead of mouseover/mouseout. These events don\'t bubble, preventing unwanted animations when hovering over child elements.',
    },
    {
      title: 'QUICKTO PERFORMANCE',
      description: 'For magnetic effects, gsap.quickTo() creates cached, performant tweens perfect for high-frequency updates like mouse tracking. Much faster than creating new tweens.',
    },
    {
      title: 'CLEANUP CRITICAL',
      description: 'Always remove event listeners and kill tweens in the cleanup function. Forgotten listeners cause memory leaks and zombie animations.',
    },
    {
      title: 'EASING CHOICE',
      description: 'back.out(1.7) creates playful overshoot for CTAs. power2.out is professional and smooth. Elastic creates bounce but needs more time (0.5s+).',
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

export function ButtonHoverPattern() {
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
