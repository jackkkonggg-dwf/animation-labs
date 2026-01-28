'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { PatternHeader, CodeViewer, ReplayButton } from '@/components/patterns';
import { RelatedPatterns } from '@/components/patterns/related-patterns';
import { PatternNavigation } from '@/components/patterns/pattern-navigation';
import { splitTextToChars } from '@/lib/text-split-utils-react';

// ============================================================================
// CODE EXAMPLE
// ============================================================================

const CODE_EXAMPLE = `// ============================================================================
// CHARACTER TEXT REVEAL PATTERN
// ============================================================================

'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

export function CharTextReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Select all character spans
    const chars = container.querySelectorAll('.char-reveal');

    // Set initial state - invisible and offset
    gsap.set(chars, { opacity: 0, y: 100 });

    // Animate with stagger
    gsap.to(chars, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.03,  // 30ms per character
      ease: 'back.out(1.7)',  // Creates spring-like overshoot
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        end: 'bottom 70%',
        toggleActions: 'play none none reverse',
      },
    });

    ScrollTrigger.refresh();

    return () => {
      gsap.killTweensOf(chars);
    };
  }, { scope: containerRef });

  // Helper to split text into spans
  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char-reveal inline-block">
        {char === ' ' ? '\\u00A0' : char}
      </span>
    ));
  };

  return (
    <div ref={containerRef}>
      <h1 className="text-6xl font-black">
        {splitText('KINETIC TYPE')}
      </h1>
    </div>
  );
}`;

// ============================================================================
// LIVE DEMO SECTION
// ============================================================================

function LiveDemo() {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleReplay = () => {
    const container = containerRef.current;
    if (!container) return;

    const chars = container.querySelectorAll('.char-reveal');

    // Reset to initial state
    gsap.set(chars, { opacity: 0, y: 100 });

    // Replay the animation
    gsap.to(chars, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.03,
      ease: 'back.out(1.7)',
    });
  };

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Select all character spans
    const chars = container.querySelectorAll('.char-reveal');

    // Set initial state - invisible and offset downward
    gsap.set(chars, { opacity: 0, y: 100 });

    // Create staggered character reveal animation
    gsap.to(chars, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.03,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
      },
    });

    ScrollTrigger.refresh();

    return () => {
      gsap.killTweensOf(chars);
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
        <p className="text-zinc-500 mt-3 ml-7">Scroll down to see character-by-character animation</p>
      </div>

      {/* Demo content */}
      <div ref={containerRef} className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        {/* Hero headline */}
        <div className="mb-16">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tighter">
            {splitTextToChars('KINETIC', 'char-reveal')}
          </h2>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 leading-none tracking-tighter mt-2">
            {splitTextToChars('TYPOGRAPHY', 'char-reveal')}
          </h2>
        </div>

        {/* Subheadline */}
        <div className="mb-16">
          <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed">
            {splitTextToChars('Each character animates independently with precise timing control.', 'char-reveal')}
          </p>
        </div>

        {/* Multiple text examples */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-lg">
            <p className="text-sm text-orange-500 font-black tracking-[0.2em] uppercase mb-4">
              Fast Stagger
            </p>
            <h3 className="text-2xl md:text-3xl font-black text-white uppercase">
              {splitTextToChars('Quick Reveal', 'char-reveal')}
            </h3>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-lg">
            <p className="text-sm text-orange-500 font-black tracking-[0.2em] uppercase mb-4">
              With Bounce
            </p>
            <h3 className="text-2xl md:text-3xl font-black text-white uppercase">
              {splitTextToChars('Spring Effect', 'char-reveal')}
            </h3>
          </div>
        </div>

        {/* Replay button */}
        <ReplayButton onReplay={handleReplay} />
      </div>
    </section>
  );
}

export function CharTextRevealPattern() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <PatternHeader
        category="Text Effects"
        difficulty="Advanced"
        title="Reveal"
        titleHighlight="Char Text"
        description="Animate text character by character for dramatic reveals. Split text into individual elements and stagger their entrance."
        features={[
          { label: 'Split text' },
          { label: 'Char stagger' },
          { label: 'Custom ease' }]}
      />
      <LiveDemo />
      <CodeViewer code={CODE_EXAMPLE} language="tsx" filename="tsx" />

      {/* Related Patterns */}
      <RelatedPatterns currentPatternId="char-text-reveal" />

      {/* Pattern Navigation */}
      <PatternNavigation currentPatternId="char-text-reveal" />

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
