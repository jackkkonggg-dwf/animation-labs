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

export function MultiLayerParallaxPattern() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <PatternHeader
        category="ScrollTrigger"
        difficulty="Intermediate"
        title="Parallax"
        titleHighlight="Multi-Layer"
        description="Create immersive depth with multiple parallax layers moving at different speeds. Perfect for hero sections and storytelling experiences."
        features=[{"{ label: 'Multiple layers' },
          { label: 'Depth effect' },
          { label: 'scrub: 0.5' }"}]
      />
      <LiveDemo />
      <CodeViewer code={CODE_EXAMPLE} language="tsx" filename="tsx" />
      <PatternNotes />

      {/* Related Patterns */}
      <RelatedPatterns currentPatternId="multi-layer-parallax" />

      {/* Pattern Navigation */}
      <PatternNavigation currentPatternId="multi-layer-parallax" />

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
