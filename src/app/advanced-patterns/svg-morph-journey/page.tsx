'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, MorphSVGPlugin, MotionPathPlugin, DrawSVGPlugin } from '@/lib/gsap-config';

// ============================================================================
// SECTION 1 - Morphing Shapes Journey
// ============================================================================

interface MorphShape {
  id: string;
  label: string;
}

function MorphingJourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const shapes = {
      circle: container.querySelector('#morph-circle') as SVGPathElement,
      square: container.querySelector('#morph-square') as SVGPathElement,
      triangle: container.querySelector('#morph-triangle') as SVGPathElement,
      star: container.querySelector('#morph-star') as SVGPathElement,
    };

    const labels = {
      state: container.querySelector('.state-label') as HTMLElement,
      progress: container.querySelector('.progress-label') as HTMLElement,
    };

    // Filter elements for glow animation
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filters = {
      blur: container.querySelector('#morph-blur') as any,
      glow: container.querySelector('#morph-glow') as any,
    };

    // Create scroll-triggered morph progression
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=2500',
        scrub: 1,
        pin: true,
        onUpdate: (self) => {
          if (labels.progress) {
            labels.progress.textContent = `Progress: ${Math.round(self.progress * 100)}%`;
          }
        },
      },
    });

    // Initial state - only circle visible, all target shapes hidden
    gsap.set(shapes.circle, { opacity: 1 });
    gsap.set([shapes.square, shapes.triangle, shapes.star], { opacity: 0, visibility: 'hidden' });

    // Morph circle to square with rotational type for smoother transition
    tl.to(shapes.circle, {
      morphSVG: {
        shape: shapes.square,
        type: 'rotational',
      },
      opacity: 1,
      duration: 1,
      ease: 'power2.inOut',
      onStart: () => {
        if (labels.state) labels.state.textContent = 'Morphing: Circle → Square';
        // Ensure target is hidden during morph
        gsap.set(shapes.square, { visibility: 'hidden' });
      },
    }, 0);

    // Animate filter blur during first morph
    tl.to(filters.blur, {
      attr: { stdDeviation: 3 },
      duration: 0.5,
      yoyo: true,
      repeat: 1,
    }, 0);

    // Morph square to triangle (continuing from circle which is now square-shaped)
    tl.to(shapes.circle, {
      morphSVG: {
        shape: shapes.triangle,
        type: 'rotational',
      },
      opacity: 1,
      duration: 1,
      ease: 'power2.inOut',
      onStart: () => {
        if (labels.state) labels.state.textContent = 'Morphing: Square → Triangle';
        gsap.set(shapes.triangle, { visibility: 'hidden' });
      },
    }, 1);

    // Animate filter glow during second morph
    tl.to(filters.glow, {
      attr: { stdDeviation: 8 },
      duration: 0.5,
      yoyo: true,
      repeat: 1,
    }, 1);

    // Morph triangle to star
    tl.to(shapes.circle, {
      morphSVG: {
        shape: shapes.star,
        type: 'rotational',
      },
      opacity: 1,
      duration: 1,
      ease: 'power2.inOut',
      onStart: () => {
        if (labels.state) labels.state.textContent = 'Morphing: Triangle → Star';
        gsap.set(shapes.star, { visibility: 'hidden' });
      },
    }, 2);

    // Combined filter animation for finale
    tl.to([filters.blur, filters.glow], {
      attr: { stdDeviation: 5 },
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
      onStart: () => {
        if (labels.state) labels.state.textContent = 'Final State: Star';
      },
    }, 2.5);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      tl.kill();
      gsap.killTweensOf(Object.values(shapes));
      gsap.killTweensOf(Object.values(filters));
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden bg-zinc-950">
      {/* SVG Filters Definition */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="morph-blur-filter">
            <feGaussianBlur id="morph-blur" in="SourceGraphic" stdDeviation="0" />
          </filter>
          <filter id="morph-glow-filter">
            <feGaussianBlur id="morph-glow" in="SourceGraphic" stdDeviation="0" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        {/* State labels */}
        <div className="mb-8 text-center">
          <p className="state-label text-orange-500 text-lg font-mono uppercase tracking-widest mb-2">
            Initial State: Circle
          </p>
          <p className="progress-label text-zinc-500 text-sm font-mono">
            Progress: 0%
          </p>
        </div>

        {/* SVG Morphing Shapes */}
        <svg
          className="w-80 h-80"
          viewBox="-10 -10 220 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Target shapes (hidden, used for morphing reference only) */}
          <path
            id="morph-square-target"
            d="M 40 40 L 160 40 L 160 160 L 40 160 Z"
            fill="none"
            stroke="none"
          />

          <path
            id="morph-triangle-target"
            d="M 100 30 L 170 160 L 30 160 Z"
            fill="none"
            stroke="none"
          />

          <path
            id="morph-star-target"
            d="M 100 20 L 115 75 L 175 75 L 125 110 L 145 170 L 100 135 L 55 170 L 75 110 L 25 75 L 85 75 Z"
            fill="none"
            stroke="none"
          />

          {/* Circle (initial and morphing shape - single visible element) */}
          <path
            id="morph-circle"
            d="M 100 30 A 70 70 0 1 1 100 170 A 70 70 0 1 1 100 30 Z"
            fill="rgba(249, 115, 22, 0.2)"
            stroke="#f97316"
            strokeWidth="2"
          />

          {/* Square (morphing target, initially hidden) */}
          <path
            id="morph-square"
            d="M 40 40 L 160 40 L 160 160 L 40 160 Z"
            fill="rgba(249, 115, 22, 0.2)"
            stroke="#f97316"
            strokeWidth="2"
            opacity="0"
          />

          {/* Triangle (morphing target, initially hidden) */}
          <path
            id="morph-triangle"
            d="M 100 30 L 170 160 L 30 160 Z"
            fill="rgba(249, 115, 22, 0.2)"
            stroke="#f97316"
            strokeWidth="2"
            opacity="0"
          />

          {/* Star (morphing target, initially hidden) */}
          <path
            id="morph-star"
            d="M 100 20 L 115 75 L 175 75 L 125 110 L 145 170 L 100 135 L 55 170 L 75 110 L 25 75 L 85 75 Z"
            fill="rgba(249, 115, 22, 0.2)"
            stroke="#f97316"
            strokeWidth="2"
            opacity="0"
          />
        </svg>

        {/* Info overlay */}
        <div className="absolute bottom-8 left-8 bg-zinc-900/90 backdrop-blur border border-zinc-700 rounded-lg p-4 max-w-xs">
          <h3 className="text-orange-500 text-xs font-black uppercase tracking-wider mb-2">
            MorphSVG Features
          </h3>
          <ul className="space-y-1 text-xs text-zinc-400 font-mono">
            <li>• Shape transitions (4 states)</li>
            <li>• Rotational morph type</li>
            <li>• Filter animations (blur, glow)</li>
            <li>• Scroll-triggered progression</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 2 - MotionPath Journey
// ============================================================================

function MotionPathJourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const traveler = container.querySelector('.motion-traveler') as HTMLElement;
    const path = container.querySelector('.motion-path') as SVGPathElement;

    // Scroll-triggered motion path animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=2000',
        scrub: 1,
        pin: true,
      },
    });

    // Animate element along the path
    tl.to(traveler, {
      motionPath: {
        path: path,
        align: path,
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
      },
      transformOrigin: '50% 50%',
      ease: 'none',
      duration: 2,
    }, 0);

    // Draw the path as the element moves
    tl.from(path, {
      drawSVG: 0,
      ease: 'none',
      duration: 2,
    }, 0);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      tl.kill();
      gsap.killTweensOf([traveler, path]);
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-orange-950">
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-12 text-center">
          MotionPath
          <span className="block text-orange-500">Journey</span>
        </h2>

        {/* SVG MotionPath */}
        <svg
          className="w-full max-w-2xl h-80"
          viewBox="0 0 800 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background path trace */}
          <path
            className="motion-path"
            d="M 50 150 C 150 50, 250 250, 400 150 C 550 50, 650 250, 750 150"
            stroke="#f97316"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="10 10"
            opacity="0.3"
          />

          {/* Active motion path (for drawSVG) */}
          <path
            className="motion-path-active"
            d="M 50 150 C 150 50, 250 250, 400 150 C 550 50, 650 250, 750 150"
            stroke="#f97316"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />

          {/* Traveling element */}
          <g className="motion-traveler">
            <circle cx="0" cy="0" r="20" fill="#f97316" />
            <circle cx="0" cy="0" r="12" fill="#18181b" />
            <circle cx="0" cy="0" r="6" fill="#f97316" />
          </g>
        </svg>

        {/* Info overlay */}
        <div className="absolute bottom-8 left-8 bg-zinc-900/90 backdrop-blur border border-zinc-700 rounded-lg p-4 max-w-xs">
          <h3 className="text-orange-500 text-xs font-black uppercase tracking-wider mb-2">
            MotionPath Features
          </h3>
          <ul className="space-y-1 text-xs text-zinc-400 font-mono">
            <li>• Path following animation</li>
            <li>• Auto-rotation alignment</li>
            <li>• DrawSVG path reveal</li>
            <li>• Scroll-linked scrub</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 3 - Interactive Morph Playground
// ============================================================================

interface MorphPlaygroundState {
  currentShape: number;
}

const SHAPES: MorphShape[] = [
  { id: 'hexagon', label: 'Hexagon' },
  { id: 'diamond', label: 'Diamond' },
  { id: 'cross', label: 'Cross' },
  { id: 'heart', label: 'Heart' },
];

const SHAPE_PATHS = {
  hexagon: 'M 100 20 L 170 60 L 170 140 L 100 180 L 30 140 L 30 60 Z',
  diamond: 'M 100 20 L 170 100 L 100 180 L 30 100 Z',
  cross: 'M 40 40 L 80 40 L 80 80 L 120 80 L 120 40 L 160 40 L 160 80 L 200 80 L 200 120 L 160 120 L 160 160 L 120 160 L 120 120 L 80 120 L 80 160 L 40 160 L 40 120 L 0 120 L 0 80 L 40 80 Z',
  heart: 'M 100 170 C 100 170, 30 120, 30 80 C 30 50, 60 40, 100 70 C 140 40, 170 50, 170 80 C 170 120, 100 170, 100 170 Z',
};

function InteractiveMorphSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const morphShape = container.querySelector('.interactive-morph') as SVGPathElement;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const glowFilter = container.querySelector('#interactive-glow') as any;

    // Hover interaction triggers independent morph
    const handleMouseEnter = (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      const shapeIndex = parseInt(target.dataset.shape || '0');
      const targetShape = container.querySelector(`#shape-${SHAPES[shapeIndex].id}`) as SVGPathElement;

      if (morphShape && targetShape) {
        // Morph to target shape with elastic easing
        gsap.to(morphShape, {
          morphSVG: {
            shape: targetShape,
            type: 'rotational',
          },
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)',
        });

        // Animate glow filter
        gsap.to(glowFilter, {
          attr: { stdDeviation: 10 },
          duration: 0.3,
          yoyo: true,
          repeat: 1,
          ease: 'power2.inOut',
        });

        // Scale animation
        gsap.fromTo(morphShape,
          { scale: 1 },
          { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1, ease: 'power2.out' }
        );
      }
    };

    // Attach hover listeners to all shape buttons
    const shapeButtons = container.querySelectorAll('.shape-button');
    shapeButtons.forEach((button) => {
      button.addEventListener('mouseenter', handleMouseEnter);
    });

    return () => {
      shapeButtons.forEach((button) => {
        button.removeEventListener('mouseenter', handleMouseEnter);
      });
      gsap.killTweensOf(morphShape);
      gsap.killTweensOf(glowFilter);
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden bg-zinc-950">
      {/* SVG Filters Definition */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="interactive-glow-filter">
            <feGaussianBlur id="interactive-glow" in="SourceGraphic" stdDeviation="0" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-8 text-center">
          Interactive
          <span className="block text-orange-500">Morphing</span>
        </h2>
        <p className="text-zinc-400 text-sm font-mono uppercase tracking-widest mb-12">
          Hover over buttons to morph the shape
        </p>

        {/* Interactive morph shape */}
        <svg
          className="w-72 h-72 mb-12"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Target shapes (hidden, used for morphing) */}
          <path id="shape-hexagon" d={SHAPE_PATHS.hexagon} opacity="0" />
          <path id="shape-diamond" d={SHAPE_PATHS.diamond} opacity="0" />
          <path id="shape-cross" d={SHAPE_PATHS.cross} opacity="0" />
          <path id="shape-heart" d={SHAPE_PATHS.heart} opacity="0" />

          {/* Interactive morph shape */}
          <path
            className="interactive-morph"
            d={SHAPE_PATHS.hexagon}
            fill="rgba(249, 115, 22, 0.3)"
            stroke="#f97316"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transformOrigin: '100px 100px' }}
          />
        </svg>

        {/* Shape buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          {SHAPES.map((shape, index) => (
            <button
              key={shape.id}
              className="shape-button px-6 py-3 bg-zinc-800 border-2 border-zinc-700 rounded-lg text-white font-mono text-sm uppercase tracking-wider hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300"
              data-shape={index}
            >
              {shape.label}
            </button>
          ))}
        </div>

        {/* Info overlay */}
        <div className="absolute bottom-8 left-8 bg-zinc-900/90 backdrop-blur border border-zinc-700 rounded-lg p-4 max-w-xs">
          <h3 className="text-orange-500 text-xs font-black uppercase tracking-wider mb-2">
            Interactive Features
          </h3>
          <ul className="space-y-1 text-xs text-zinc-400 font-mono">
            <li>• Hover-triggered morphing</li>
            <li>• Independent animations</li>
            <li>• Filter glow effects</li>
            <li>• Scale bounce feedback</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 4 - Combined Pattern Showcase
// ============================================================================

function CombinedShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const morphPath = container.querySelector('.showcase-morph-path') as SVGPathElement;
    const follower = container.querySelector('.showcase-follower') as HTMLElement;
    const particles = container.querySelectorAll('.showcase-particle');

    // Complex timeline combining morph, motion path, and draw effects
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=3000',
        scrub: 1,
        pin: true,
      },
    });

    // Morph the path as the element moves
    const pathStates = [
      'M 100 50 Q 150 100, 100 150 Q 50 100, 100 50', // Circle-ish
      'M 50 50 L 150 50 L 150 150 L 50 150 Z', // Square
      'M 100 30 L 170 130 L 30 130 Z', // Triangle
      'M 100 20 L 120 70 L 175 70 L 130 110 L 150 165 L 100 130 L 50 165 L 70 110 L 25 70 L 80 70 Z', // Star
    ];

    // Animate path morphing
    tl.to(morphPath, {
      morphSVG: {
        shape: pathStates[1],
        type: 'rotational',
      },
      duration: 1,
      ease: 'power2.inOut',
    }, 0);

    tl.to(morphPath, {
      morphSVG: {
        shape: pathStates[2],
        type: 'rotational',
      },
      duration: 1,
      ease: 'power2.inOut',
    }, 1);

    tl.to(morphPath, {
      morphSVG: {
        shape: pathStates[3],
        type: 'rotational',
      },
      duration: 1,
      ease: 'power2.inOut',
    }, 2);

    // Follower element follows the morphing path
    tl.to(follower, {
      motionPath: {
        path: morphPath,
        align: morphPath,
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
      },
      transformOrigin: '50% 50%',
      duration: 3,
      ease: 'none',
    }, 0);

    // Draw the path stroke
    tl.fromTo(morphPath,
      { strokeDasharray: 1000, strokeDashoffset: 1000 },
      { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out' },
      0
    );

    // Particle explosion effects
    tl.from(particles, {
      scale: 0,
      opacity: 0,
      stagger: { each: 0.05, from: 'center' },
      duration: 0.8,
      ease: 'back.out(2)',
    }, 2.5);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      tl.kill();
      gsap.killTweensOf([morphPath, follower, ...particles]);
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden bg-gradient-to-br from-orange-950 via-zinc-950 to-zinc-900">
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-8 text-center">
          Combined
          <span className="block text-orange-500">Patterns</span>
        </h2>

        {/* Combined animation SVG */}
        <svg
          className="w-full max-w-2xl h-96"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background grid */}
          <defs>
            <pattern id="showcase-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f97316" strokeWidth="0.5" opacity="0.1"/>
            </pattern>
          </defs>
          <rect width="200" height="200" fill="url(#showcase-grid)" />

          {/* Morphing motion path */}
          <path
            className="showcase-morph-path"
            d="M 100 50 Q 150 100, 100 150 Q 50 100, 100 50"
            stroke="#f97316"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />

          {/* Following element */}
          <g className="showcase-follower">
            <circle cx="0" cy="0" r="15" fill="#f97316" opacity="0.8" />
            <circle cx="0" cy="0" r="8" fill="#18181b" />
          </g>

          {/* Particles */}
          {[...Array(16)].map((_, i) => (
            <circle
              key={i}
              className="showcase-particle"
              cx={50 + (i % 4) * 33}
              cy={50 + Math.floor(i / 4) * 33}
              r="4"
              fill="#f97316"
              opacity="0.6"
            />
          ))}
        </svg>

        {/* Info overlay */}
        <div className="absolute bottom-8 left-8 bg-zinc-900/90 backdrop-blur border border-zinc-700 rounded-lg p-4 max-w-xs">
          <h3 className="text-orange-500 text-xs font-black uppercase tracking-wider mb-2">
            Combined Features
          </h3>
          <ul className="space-y-1 text-xs text-zinc-400 font-mono">
            <li>• MorphSVG + MotionPath</li>
            <li>• DrawSVG stroke reveal</li>
            <li>• Particle burst effects</li>
            <li>• Multi-stage progression</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function SVGMorphJourneyPage() {
  return (
    <main className="min-h-screen">
      {/* Info banner */}
      <div className="sticky top-[72px] z-40 bg-zinc-900/95 backdrop-blur border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-orange-500 text-xs font-black tracking-[0.2em] uppercase">
              Advanced Pattern
            </span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400 text-sm">SVG Morph & MotionPath</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            <span className="text-zinc-500 text-xs font-mono">MORPHSVG + MOTIONPATH</span>
          </div>
        </div>
      </div>

      {/* Journey sections */}
      <MorphingJourneySection />
      <MotionPathJourneySection />
      <InteractiveMorphSection />
      <CombinedShowcaseSection />

      {/* Footer */}
      <footer className="bg-zinc-900/50 border-t border-zinc-800 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-zinc-500 text-sm font-mono">
            Featuring: MorphSVGPlugin, MotionPathPlugin, DrawSVGPlugin, SVG filters, scroll-triggered morphing
          </p>
        </div>
      </footer>
    </main>
  );
}
