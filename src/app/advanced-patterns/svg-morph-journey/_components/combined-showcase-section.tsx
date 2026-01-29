'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, loadMorphSVGPlugin, loadMotionPathPlugin } from '@/lib/gsap-config';

export function CombinedShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(async () => {
    const container = containerRef.current;
    if (!container) return;

    // Load plugins dynamically
    await Promise.all([loadMorphSVGPlugin(), loadMotionPathPlugin()]);

    // Get the morphing path (visible element)
    const morphPath = container.querySelector('#showcase-morph-path') as SVGPathElement;

    // Get target shapes (hidden paths for morphing reference)
    const targetCircle = container.querySelector('#target-circle-shape') as SVGPathElement;
    const targetSquare = container.querySelector('#target-square-shape') as SVGPathElement;
    const targetTriangle = container.querySelector('#target-triangle-shape') as SVGPathElement;
    const targetStar = container.querySelector('#target-star-shape') as SVGPathElement;

    const follower = container.querySelector('.showcase-follower') as HTMLElement;
    const particles = container.querySelectorAll('.showcase-particle');

    // Validate required elements
    if (!morphPath || !targetCircle || !targetSquare || !targetTriangle || !targetStar || !follower) {
      console.warn('CombinedShowcase: Required elements not found');
      return;
    }

    // Complex timeline combining morph, motion path, and draw effects
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=3000',
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Animate path morphing from circle to square
    tl.to(morphPath, {
      morphSVG: {
        shape: targetSquare,
        type: 'rotational',
      },
      duration: 1,
      ease: 'power2.inOut',
    }, 0);

    // Square to triangle
    tl.to(morphPath, {
      morphSVG: {
        shape: targetTriangle,
        type: 'rotational',
      },
      duration: 1,
      ease: 'power2.inOut',
    }, 1);

    // Triangle to star
    tl.to(morphPath, {
      morphSVG: {
        shape: targetStar,
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

    ScrollTrigger.refresh();

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

          {/* Target shapes (hidden, used as morph references) */}
          <path
            id="target-circle-shape"
            d="M 100 50 Q 150 100, 100 150 Q 50 100, 100 50"
            fill="none"
            stroke="none"
            opacity="0"
          />
          <path
            id="target-square-shape"
            d="M 50 50 L 150 50 L 150 150 L 50 150 Z"
            fill="none"
            stroke="none"
            opacity="0"
          />
          <path
            id="target-triangle-shape"
            d="M 100 30 L 170 130 L 30 130 Z"
            fill="none"
            stroke="none"
            opacity="0"
          />
          <path
            id="target-star-shape"
            d="M 100 20 L 120 70 L 175 70 L 130 110 L 150 165 L 100 130 L 50 165 L 70 110 L 25 70 L 80 70 Z"
            fill="none"
            stroke="none"
            opacity="0"
          />

          {/* Morphing motion path (visible element) */}
          <path
            id="showcase-morph-path"
            d="M 100 50 Q 150 100, 100 150 Q 50 100, 100 50"
            stroke="#f97316"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
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
