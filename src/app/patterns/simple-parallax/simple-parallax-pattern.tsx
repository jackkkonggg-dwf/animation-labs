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

const CODE_EXAMPLE = `
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

export function SimpleParallaxPattern() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <PatternHeader
        category="ScrollTrigger"
        difficulty="Beginner"
        title="Parallax"
        titleHighlight="Simple"
        description="Create depth and movement by animating elements at different speeds as the user scrolls. A classic effect that adds sophistication to any page."
        features={[
          { label: 'scrub: true' },
          { label: 'y-offset' },
          { label: 'Smooth' }]}
      />
      <LiveDemo />
      <CodeViewer code={CODE_EXAMPLE} language="tsx" filename="tsx" />

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
