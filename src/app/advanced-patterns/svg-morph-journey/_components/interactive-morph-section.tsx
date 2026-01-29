'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-config';

interface MorphShape {
  id: string;
  label: string;
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

export function InteractiveMorphSection() {
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
