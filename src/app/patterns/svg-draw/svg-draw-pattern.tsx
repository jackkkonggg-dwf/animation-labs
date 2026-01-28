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
// SVG PATH DRAWING PATTERN
// ============================================================================

'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

export function SvgDrawComponent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    const svg = svgRef.current;
    if (!container || !svg) return;

    const paths = svg.querySelectorAll('.draw-path');

    // Get the length of each path and set initial state
    paths.forEach((path) => {
      const svgPath = path as SVGPathElement;
      const length = svgPath.getTotalLength();

      // Set stroke-dasharray to the path length
      gsap.set(svgPath, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
    });

    // Animate strokeDashoffset from length to 0 to "draw" the path
    gsap.to(paths, {
      strokeDashoffset: 0,
      duration: 2,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: container,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
      },
    });

    ScrollTrigger.refresh();

    return () => {
      gsap.killTweensOf(paths);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      <svg ref={svgRef} viewBox="0 0 400 300" fill="none">
        <path
          className="draw-path"
          d="M 200 20 L 140 140 L 190 140 L 180 200 L 260 80 L 200 80 L 220 20 Z"
          stroke="#f97316"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}`;

// ============================================================================
// LIVE DEMO SECTION
// ============================================================================

function LiveDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    const svg = svgRef.current;
    if (!container || !svg) return;

    const paths = svg.querySelectorAll('.draw-path');

    // Get the length of each path and set initial state
    paths.forEach((path) => {
      const svgPath = path as SVGPathElement;
      const length = svgPath.getTotalLength();

      // Set stroke-dasharray to the path length
      gsap.set(svgPath, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
    });

    // Animate strokeDashoffset from length to 0 to "draw" the path
    gsap.to(paths, {
      strokeDashoffset: 0,
      duration: 2,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: container,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
      },
    });

    ScrollTrigger.refresh();

    return () => {
      gsap.killTweensOf(paths);
      ScrollTrigger.getAll().forEach(t => t.kill());
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
        <p className="text-zinc-500 mt-3 ml-7">Scroll to see the SVG paths draw themselves</p>
      </div>

      {/* Demo SVG */}
      <div ref={containerRef} className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-lg overflow-hidden">
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-orange-500 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-orange-500 pointer-events-none" />

          <div className="relative p-12 h-[600px] flex items-center justify-center">
            <svg
              ref={svgRef}
              viewBox="0 0 400 300"
              className="w-full max-w-2xl h-auto"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Lightning bolt */}
              <path
                className="draw-path"
                d="M 200 20 L 140 140 L 190 140 L 180 200 L 260 80 L 200 80 L 220 20 Z"
                stroke="url(#gradient1)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Star shape */}
              <path
                className="draw-path"
                d="M 330 150 L 345 180 L 378 180 L 352 200 L 362 230 L 330 210 L 298 230 L 308 200 L 282 180 L 315 180 Z"
                stroke="url(#gradient2)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Spiral */}
              <path
                className="draw-path"
                d="M 70 150 Q 70 100, 100 100 Q 140 100, 140 150 Q 140 210, 80 210 Q 30 210, 30 150 Q 30 70, 100 70 Q 180 70, 180 150 Q 180 240, 80 240 Q 10 240, 10 150"
                stroke="url(#gradient3)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Arrow */}
              <path
                className="draw-path"
                d="M 280 270 L 320 270 L 320 260 L 345 280 L 320 300 L 320 290 L 280 290 Z"
                stroke="url(#gradient4)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Gradients */}
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
                <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#14b8a6" />
                </linearGradient>
              </defs>
            </svg>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 text-zinc-600 text-sm">
              <span className="w-12 h-px bg-zinc-700" />
              <span className="uppercase tracking-[0.2em]">Scroll</span>
              <span className="w-12 h-px bg-zinc-700" />
            </div>
          </div>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded">
            <div className="text-orange-500 text-xs font-black tracking-[0.2em] uppercase mb-2">4 PATHS</div>
            <div className="text-zinc-400 text-sm">Multiple shapes animate simultaneously</div>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded">
            <div className="text-orange-500 text-xs font-black tracking-[0.2em] uppercase mb-2">SCRUB: 1</div>
            <div className="text-zinc-400 text-sm">1-second catch-up for smooth feel</div>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded">
            <div className="text-orange-500 text-xs font-black tracking-[0.2em] uppercase mb-2">GRADIENTS</div>
            <div className="text-zinc-400 text-sm">Linear gradients add depth</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SvgDrawPattern() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <PatternHeader
        category="SVG Animation"
        difficulty="Intermediate"
        title="Draw"
        titleHighlight="SVG"
        description="Animate SVG paths drawing themselves on scroll. Perfect for illustrations, icons, and decorative elements."
        features={[
          { label: 'stroke-dashoffset' },
          { label: 'path length' },
          { label: 'scrub animation' }]}
      />
      <LiveDemo />
      <CodeViewer code={CODE_EXAMPLE} language="tsx" filename="tsx" />

      {/* Related Patterns */}
      <RelatedPatterns currentPatternId="svg-draw" />

      {/* Pattern Navigation */}
      <PatternNavigation currentPatternId="svg-draw" />

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
