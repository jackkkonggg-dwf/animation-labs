'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

export function MorphingJourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Get the morphing shape (the visible one)
    const morphShape = container.querySelector('#morph-shape-active') as SVGPathElement;

    // Get target shapes (hidden, used as morph references)
    const targetCircle = container.querySelector('#target-circle') as SVGPathElement;
    const targetSquare = container.querySelector('#target-square') as SVGPathElement;
    const targetTriangle = container.querySelector('#target-triangle') as SVGPathElement;
    const targetStar = container.querySelector('#target-star') as SVGPathElement;

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

    // Validate all required elements exist
    if (!morphShape || !targetCircle || !targetSquare || !targetTriangle || !targetStar) {
      console.warn('MorphSVG: Required SVG elements not found');
      return;
    }

    // Create scroll-triggered morph progression
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=2500',
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (labels.progress) {
            labels.progress.textContent = `Progress: ${Math.round(self.progress * 100)}%`;
          }
        },
      },
    });

    // Set initial state - morph shape starts with circle path
    gsap.set(morphShape, {
      attr: { d: targetCircle.getAttribute('d') || '' },
      opacity: 1,
    });

    // Morph 1: Circle to Square
    tl.to(morphShape, {
      morphSVG: {
        shape: targetSquare,
        type: 'rotational',
      },
      duration: 1,
      ease: 'power2.inOut',
      onStart: () => {
        if (labels.state) labels.state.textContent = 'Morphing: Circle → Square';
      },
    }, 0);

    // Animate filter blur during first morph
    tl.to(filters.blur, {
      attr: { stdDeviation: 3 },
      duration: 0.5,
      yoyo: true,
      repeat: 1,
    }, 0);

    // Morph 2: Square to Triangle
    tl.to(morphShape, {
      morphSVG: {
        shape: targetTriangle,
        type: 'rotational',
      },
      duration: 1,
      ease: 'power2.inOut',
      onStart: () => {
        if (labels.state) labels.state.textContent = 'Morphing: Square → Triangle';
      },
    }, 1);

    // Animate filter glow during second morph
    tl.to(filters.glow, {
      attr: { stdDeviation: 8 },
      duration: 0.5,
      yoyo: true,
      repeat: 1,
    }, 1);

    // Morph 3: Triangle to Star
    tl.to(morphShape, {
      morphSVG: {
        shape: targetStar,
        type: 'rotational',
      },
      duration: 1,
      ease: 'power2.inOut',
      onStart: () => {
        if (labels.state) labels.state.textContent = 'Morphing: Triangle → Star';
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

    // Track the specific ScrollTrigger for cleanup (not all triggers globally)
    const scrollTrigger = tl.scrollTrigger;

    // Refresh ScrollTrigger after setup
    ScrollTrigger.refresh();

    return () => {
      // Only kill the ScrollTrigger we created, not all global triggers
      if (scrollTrigger) {
        scrollTrigger.kill();
      }
      tl.kill();
      if (morphShape) gsap.killTweensOf(morphShape);
      if (filters.blur) gsap.killTweensOf(filters.blur);
      if (filters.glow) gsap.killTweensOf(filters.glow);
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
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Target shapes (hidden, used as morph references) */}
          <path
            id="target-circle"
            d="M 100 30 A 70 70 0 1 1 100 170 A 70 70 0 1 1 100 30 Z"
            fill="none"
            stroke="none"
            opacity="0"
          />

          <path
            id="target-square"
            d="M 40 40 L 160 40 L 160 160 L 40 160 Z"
            fill="none"
            stroke="none"
            opacity="0"
          />

          <path
            id="target-triangle"
            d="M 100 30 L 170 160 L 30 160 Z"
            fill="none"
            stroke="none"
            opacity="0"
          />

          <path
            id="target-star"
            d="M 100 20 L 115 75 L 175 75 L 125 110 L 145 170 L 100 135 L 55 170 L 75 110 L 25 75 L 85 75 Z"
            fill="none"
            stroke="none"
            opacity="0"
          />

          {/* Active morphing shape (visible element that changes) */}
          <path
            id="morph-shape-active"
            d="M 100 30 A 70 70 0 1 1 100 170 A 70 70 0 1 1 100 30 Z"
            fill="rgba(249, 115, 22, 0.2)"
            stroke="#f97316"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
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
