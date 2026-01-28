'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-config';
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
            Micro-interactions
          </span>
          <span className="w-8 h-px bg-orange-500/50" />
          <span className="text-zinc-500 text-xs font-bold tracking-[0.2em] uppercase">
            Intermediate
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase mb-6">
          Card 3D <span className="text-orange-500">Tilt</span>
        </h1>

        {/* Description */}
        <p className="text-zinc-400 text-lg md:text-xl max-w-3xl font-light leading-relaxed">
          Add depth and dimension to your UI with interactive 3D card tilt effects. Track mouse position to calculate
          rotation transforms, creating an engaging tactile experience that responds to user movement.
        </p>

        {/* Key features */}
        <div className="flex flex-wrap gap-4 mt-8">
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-zinc-300 text-sm font-mono">mousemove tracking</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-zinc-300 text-sm font-mono">rotateX/rotateY</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-zinc-300 text-sm font-mono">perspective 1000px</span>
          </div>
        </div>
      </div>
    </header>
  );
}

// ============================================================================
// 3D TILT CARD COMPONENT
// ============================================================================

interface TiltCardProps {
  title: string;
  emoji: string;
  gradient: string;
  maxTilt?: number;
}

function TiltCard({ title, emoji, gradient, maxTilt = 15 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const card = cardRef.current;
    const inner = innerRef.current;
    if (!card || !inner) return;

    // Calculate tilt based on mouse position
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate mouse distance from center (-1 to 1)
      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);

      // Calculate rotation (inverted for natural tilt)
      const rotateY = deltaX * maxTilt;
      const rotateX = -deltaY * maxTilt;

      // Animate the inner card with 3D transform
      gsap.to(inner, {
        rotateX,
        rotateY,
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out',
      });

      // Animate shine effect based on mouse position
      const shineX = 50 + deltaX * 50;
      const shineY = 50 + deltaY * 50;
      gsap.to(card, {
        background: `radial-gradient(circle at ${shineX}% ${shineY}%, ${gradient} 0%, rgba(0,0,0,0.4) 50%)`,
        duration: 0.2,
        ease: 'power1.out',
      });
    };

    // Reset to flat position
    const handleMouseLeave = () => {
      gsap.to(inner, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });

      // Reset shine
      gsap.to(card, {
        background: `radial-gradient(circle at 50% 50%, ${gradient} 0%, rgba(0,0,0,0.4) 50%)`,
        duration: 0.5,
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(inner);
      gsap.killTweensOf(card);
    };
  }, { scope: cardRef });

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={cardRef}
        className="relative w-72 h-96 rounded-2xl cursor-pointer"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${gradient} 0%, rgba(0,0,0,0.4) 50%)`,
          perspective: '1000px',
        }}
      >
        {/* Inner card for 3D transform */}
        <div
          ref={innerRef}
          className="absolute inset-0 bg-zinc-900/80 backdrop-blur-sm rounded-2xl border border-zinc-700/50 flex flex-col items-center justify-center p-8"
          style={{
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Content with 3D translation */}
          <div className="transform translate-z-[20px]">
            <div className="text-6xl mb-6">{emoji}</div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight text-center">
              {title}
            </h3>
            <div className="mt-4 px-4 py-2 bg-zinc-800/50 rounded-full">
              <span className="text-orange-500 text-xs font-mono">HOVER ME</span>
            </div>
          </div>

          {/* Corner accents */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-orange-500/50" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-orange-500/50" />
        </div>
      </div>
      <span className="text-zinc-500 text-xs font-mono">max tilt: ±{maxTilt}°</span>
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
        <p className="text-zinc-500 mt-3 ml-7">Move your mouse over each card to see the 3D tilt effect</p>
      </div>

      {/* Demo cards grid */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Card 1: Orange gradient */}
          <TiltCard
            title="Product"
            emoji="📦"
            gradient="rgba(249, 115, 22, 0.15)"
            maxTilt={15}
          />

          {/* Card 2: Cyan gradient */}
          <TiltCard
            title="Profile"
            emoji="👤"
            gradient="rgba(6, 182, 212, 0.15)"
            maxTilt={20}
          />

          {/* Card 3: Purple gradient */}
          <TiltCard
            title="Settings"
            emoji="⚙️"
            gradient="rgba(168, 85, 247, 0.15)"
            maxTilt={10}
          />
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

  const code = `'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-config';

// ============================================================================
// 3D TILT CARD COMPONENT
// ============================================================================

interface TiltCardProps {
  title: string;
  emoji: string;
  maxTilt?: number;
}

export function TiltCard({ title, emoji, maxTilt = 15 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const card = cardRef.current;
    const inner = innerRef.current;
    if (!card || !inner) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate mouse position from center (-1 to 1)
      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);

      // Calculate rotation (inverted for natural tilt)
      const rotateY = deltaX * maxTilt;  // Horizontal rotation
      const rotateX = -deltaY * maxTilt; // Vertical rotation (inverted)

      // Animate with 3D transform
      gsap.to(inner, {
        rotateX,
        rotateY,
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(inner, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)', // Bouncy reset
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(inner);
    };
  });

  return (
    <div
      ref={cardRef}
      style={{ perspective: '1000px' }}
    >
      <div
        ref={innerRef}
        style={{
          transformStyle: 'preserve-3d',
        }}
        className="bg-zinc-900 rounded-2xl p-8"
      >
        {/* Card content */}
        <div className="text-4xl">{emoji}</div>
        <h3 className="text-white font-bold">{title}</h3>
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

          {/* Code content with syntax highlighting */}
          <pre className="p-6 pt-8 overflow-x-auto">
            <code className="text-sm font-mono leading-relaxed">
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
              <span className="text-purple-400">{`export`}</span>
              <span className="text-purple-400">{` function`}</span>
              <span className="text-yellow-300">{` TiltCard`}</span>
              <span className="text-white">({`{ title, emoji, maxTilt = 15 }`}) {`{`}</span>
              <br />
              &nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` cardRef `}</span>
              <span className="text-purple-400">{`= useRef`}</span>
              <span className="text-orange-400">{`&lt;HTMLDivElement&gt;`}</span>
              <span className="text-white">(null);</span>
              <br />
              &nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` innerRef `}</span>
              <span className="text-purple-400">{`= useRef`}</span>
              <span className="text-orange-400">{`&lt;HTMLDivElement&gt;`}</span>
              <span className="text-white">(null);</span>
              <br />
              <br />
              &nbsp;&nbsp;<span className="text-blue-400">{`useGSAP`}</span>
              <span className="text-white">(() {`=>`} {`{`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` card `}</span>
              <span className="text-purple-400">{`= cardRef.current`}</span>
              <span className="text-white">;</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` inner `}</span>
              <span className="text-purple-400">{`= innerRef.current`}</span>
              <span className="text-white">;</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`if`}</span>
              <span className="text-white"> (!card || !inner) </span>
              <span className="text-purple-400">{`return`}</span>
              <span className="text-white">;</span>
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` handleMouseMove `}</span>
              <span className="text-purple-400">{`= (e: MouseEvent) `}</span>
              <span className="text-purple-400">{`=>`}</span>
              <span className="text-white">{` {`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` rect `}</span>
              <span className="text-purple-400">{`= card.getBoundingClientRect`}</span>
              <span className="text-white">();</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` centerX `}</span>
              <span className="text-purple-400">{`= rect.left + rect.width / 2`}</span>
              <span className="text-white">;</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` centerY `}</span>
              <span className="text-purple-400">{`= rect.top + rect.height / 2`}</span>
              <span className="text-white">;</span>
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">// Mouse position from center (-1 to 1)</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` deltaX `}</span>
              <span className="text-purple-400">{`= (e.clientX - centerX) / (rect.width / 2)`}</span>
              <span className="text-white">;</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` deltaY `}</span>
              <span className="text-purple-400">{`= (e.clientY - centerY) / (rect.height / 2)`}</span>
              <span className="text-white">;</span>
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">// Calculate rotation</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` rotateY `}</span>
              <span className="text-purple-400">{`= deltaX * maxTilt`}</span>
              <span className="text-white">;</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` rotateX `}</span>
              <span className="text-purple-400">{`= -deltaY * maxTilt`}</span>
              <span className="text-white">;</span>
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">{`gsap.to`}</span>
              <span className="text-white">(inner, {`{`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`rotateX, rotateY, scale: 1.02,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`duration: 0.3, ease: 'power2.out'`}</span>
              <span className="text-white">,</span>
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
              <span className="text-white">(inner, {`{`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`rotateX: 0, rotateY: 0, scale: 1,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`duration: 0.5, ease: 'elastic.out(1, 0.5)'`}</span>
              <span className="text-white">,</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`}`});</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`}`});</span>
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`card.addEventListener('mousemove', handleMouseMove);`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`card.addEventListener('mouseleave', handleMouseLeave);`}</span>
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`return`}</span>
              <span className="text-white"> () {`=>`}</span>
              <span className="text-white">{` {`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`card.removeEventListener('mousemove', handleMouseMove);`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`card.removeEventListener('mouseleave', handleMouseLeave);`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">{`gsap.killTweensOf`}</span>
              <span className="text-white">(inner);</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`}`});</span>
              <br />
              &nbsp;&nbsp;<span className="text-white">{`}`}</span>, <span className="text-white">{`{ scope: cardRef `}</span><span className="text-white">{`}`});</span>
              <br />
              <br />
              &nbsp;&nbsp;<span className="text-purple-400">{`return`}</span>
              <span className="text-white"> (</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`&lt;div ref={cardRef} style={{ perspective: '1000px' }}&gt;`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`&lt;div ref={innerRef} style={{ transformStyle: 'preserve-3d' }}&gt;`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{'{/* content */}'}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`&lt;/div&gt;`}</span>
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
      title: 'PERSPECTIVE',
      description: 'The container needs perspective (1000px) to create the 3D effect. Lower values = more dramatic 3D, higher values = more subtle.',
    },
    {
      title: 'ROTATION AXES',
      description: 'rotateY tilts horizontally based on mouse X position. rotateX tilts vertically based on mouse Y position (inverted sign for natural feel).',
    },
    {
      title: 'PRESERVE-3D',
      description: 'transformStyle: preserve-3d on the inner element enables child elements to have their own 3D transforms (translateZ for layered depth).',
    },
    {
      title: 'ELASTIC RESET',
      description: 'elastic.out(1, 0.5) on mouseleave creates a satisfying bounce-back effect. The first value controls amplitude, second controls decay.',
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

export function CardTiltPattern() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <PatternHeader />
      <LiveDemo />
      <CodeViewer />
      <PatternNotes />

      {/* Related Patterns */}
      <RelatedPatterns currentPatternId="card-tilt" />

      {/* Pattern Navigation */}
      <PatternNavigation currentPatternId="card-tilt" />

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
