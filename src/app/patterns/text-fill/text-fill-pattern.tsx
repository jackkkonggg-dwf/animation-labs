'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { PatternHeader, CodeViewer, ReplayButton } from '@/components/patterns';
import { RelatedPatterns } from '@/components/patterns/related-patterns';
import { PatternNavigation } from '@/components/patterns/pattern-navigation';

// ============================================================================
// CODE EXAMPLE
// ============================================================================

const CODE_EXAMPLE = `// ============================================================================
// TEXT FILL ANIMATION PATTERN
// ============================================================================

'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

export function TextFill() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Select all text fill elements
    const textFills = container.querySelectorAll('.text-fill');

    // Set initial state - no fill
    gsap.set(textFills, { backgroundPosition: '0% 50%' });

    // Animate to full fill
    gsap.to(textFills, {
      backgroundPosition: '100% 50%',
      duration: 1.5,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1,  // Smooth scroll-linked animation
        toggleActions: 'play none none reverse',
      },
    });

    ScrollTrigger.refresh();

    return () => {
      gsap.killTweensOf(textFills);
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      {/* Gradient background 200% wide for fill effect */}
      <h1 className="text-6xl font-black text-transparent bg-clip-text
        bg-gradient-to-r from-zinc-600 via-orange-500 to-amber-500
        bg-[length:200%_auto] text-fill"
        style={{ backgroundPosition: '0% 50%' }}
      >
        SCROLL TO FILL
      </h1>
    </div>
  );
}`;

// ============================================================================
// LIVE DEMO SECTION
// ============================================================================

function LiveDemo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Select all text fill elements
    const textFills = container.querySelectorAll('.text-fill');

    // Set initial state - background position at 0% (no fill)
    gsap.set(textFills, { backgroundPosition: '0% 50%' });

    // Animate background position to 100% (full fill)
    gsap.to(textFills, {
      backgroundPosition: '100% 50%',
      duration: 1.5,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1,
        toggleActions: 'play none none reverse',
      },
    });

    ScrollTrigger.refresh();

    return () => {
      gsap.killTweensOf(textFills);
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
        <p className="text-zinc-500 mt-3 ml-7">Scroll to see text fill with color</p>
      </div>

      {/* Demo content */}
      <div ref={containerRef} className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        {/* Hero headline */}
        <div className="mb-20">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none">
            <span
              className="text-fill text-transparent bg-clip-text bg-gradient-to-r from-zinc-600 via-orange-500 to-amber-500 bg-[length:200%_auto]"
              style={{ backgroundPosition: '0% 50%' }}
            >
              SCROLL TO FILL
            </span>
          </h2>
        </div>

        {/* Subheadline */}
        <div className="mb-16">
          <p className="text-xl md:text-2xl leading-relaxed">
            <span
              className="text-fill text-transparent bg-clip-text bg-gradient-to-r from-zinc-600 via-white to-zinc-100 bg-[length:200%_auto]"
              style={{ backgroundPosition: '0% 50%' }}
            >
              Watch the color flow through each letter as you scroll down the page
            </span>
          </p>
        </div>

        {/* Multiple text examples */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-lg">
            <p className="text-sm text-orange-500 font-black tracking-[0.2em] uppercase mb-4">
              Orange Gradient
            </p>
            <h3 className="text-3xl md:text-4xl font-black uppercase leading-tight">
              <span
                className="text-fill text-transparent bg-clip-text bg-gradient-to-r from-zinc-700 via-orange-500 to-orange-400 bg-[length:200%_auto]"
                style={{ backgroundPosition: '0% 50%' }}
              >
                Vibrant Energy
              </span>
            </h3>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-lg">
            <p className="text-sm text-orange-500 font-black tracking-[0.2em] uppercase mb-4">
              Fire Gradient
            </p>
            <h3 className="text-3xl md:text-4xl font-black uppercase leading-tight">
              <span
                className="text-fill text-transparent bg-clip-text bg-gradient-to-r from-zinc-700 via-orange-500 via-amber-500 to-yellow-500 bg-[length:200%_auto]"
                style={{ backgroundPosition: '0% 50%' }}
              >
                Bold Impact
              </span>
            </h3>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-lg">
            <p className="text-sm text-orange-500 font-black tracking-[0.2em] uppercase mb-4">
              Cool Gradient
            </p>
            <h3 className="text-3xl md:text-4xl font-black uppercase leading-tight">
              <span
                className="text-fill text-transparent bg-clip-text bg-gradient-to-r from-zinc-700 via-cyan-400 to-blue-500 bg-[length:200%_auto]"
                style={{ backgroundPosition: '0% 50%' }}
              >
                Cool Tones
              </span>
            </h3>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-lg">
            <p className="text-sm text-orange-500 font-black tracking-[0.2em] uppercase mb-4">
              Sunset Gradient
            </p>
            <h3 className="text-3xl md:text-4xl font-black uppercase leading-tight">
              <span
                className="text-fill text-transparent bg-clip-text bg-gradient-to-r from-zinc-700 via-pink-500 via-purple-500 to-indigo-500 bg-[length:200%_auto]"
                style={{ backgroundPosition: '0% 50%' }}
              >
                Sunset Vibes
              </span>
            </h3>
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

export function TextFillPattern() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <PatternHeader
        category="Text Effects"
        difficulty="Intermediate"
        title="Fill"
        titleHighlight="Text"
        description="Animate text filling with color or gradient on scroll. Creates a striking reveal effect perfect for headlines and important messages."
        features={[
          { label: 'background-clip' },
          { label: 'SVG mask' },
          { label: 'scrub: true' }]}
      />
      <LiveDemo />
      <CodeViewer code={CODE_EXAMPLE} language="tsx" filename="tsx" />

      {/* Related Patterns */}
      <RelatedPatterns currentPatternId="text-fill" />

      {/* Pattern Navigation */}
      <PatternNavigation currentPatternId="text-fill" />

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
