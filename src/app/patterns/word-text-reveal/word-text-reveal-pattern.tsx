'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { PatternHeader, CodeViewer, ReplayButton } from '@/components/patterns';
import { RelatedPatterns } from '@/components/patterns/related-patterns';
import { PatternNavigation } from '@/components/patterns/pattern-navigation';
import { splitTextToWords } from '@/lib/text-split-utils-react';

// ============================================================================
// CODE EXAMPLE
// ============================================================================

const CODE_EXAMPLE = `// ============================================================================
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
            {splitTextToWords('WORD BY WORD REVEAL ANIMATION', 'word-reveal')}
          </h2>
        </div>

        {/* Subheadline */}
        <div className="mb-16">
          <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed">
            {splitTextToWords('Each word animates independently with dramatic timing for maximum impact.', 'word-reveal')}
          </p>
        </div>

        {/* Multiple text examples */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-lg">
            <p className="text-sm text-orange-500 font-black tracking-[0.2em] uppercase mb-4">
              Dramatic
            </p>
            <h3 className="text-2xl md:text-3xl font-black text-white uppercase">
              {splitTextToWords('Capture Attention', 'word-reveal')}
            </h3>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-lg">
            <p className="text-sm text-orange-500 font-black tracking-[0.2em] uppercase mb-4">
              Balanced
            </p>
            <h3 className="text-2xl md:text-3xl font-black text-white uppercase">
              {splitTextToWords('Create Impact', 'word-reveal')}
            </h3>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-lg">
            <p className="text-sm text-orange-500 font-black tracking-[0.2em] uppercase mb-4">
              Expressive
            </p>
            <h3 className="text-2xl md:text-3xl font-black text-white uppercase">
              {splitTextToWords('Tell Your Story', 'word-reveal')}
            </h3>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-lg">
            <p className="text-sm text-orange-500 font-black tracking-[0.2em] uppercase mb-4">
              Dynamic
            </p>
            <h3 className="text-2xl md:text-3xl font-black text-white uppercase">
              {splitTextToWords('Engage Users', 'word-reveal')}
            </h3>
          </div>
        </div>

        {/* Replay button */}
        <ReplayButton onReplay={handleReplay} />
      </div>
    </section>
  );
}

export function WordTextRevealPattern() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <PatternHeader
        category="Text Effects"
        difficulty="Intermediate"
        title="Reveal"
        titleHighlight="Word Text"
        description="Animate text word by word for readable and elegant reveals. Balance visual impact with legibility."
        features=[{"{ label: 'Word split' },
          { label: 'stagger: 0.1' },
          { label: 'Readable' }"}]
      />
      <LiveDemo />
      <CodeViewer code={CODE_EXAMPLE} language="tsx" filename="tsx" />
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
