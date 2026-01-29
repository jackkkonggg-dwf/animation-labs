'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, loadMotionPathPlugin, loadDrawSVGPlugin } from '@/lib/gsap-config';

export function MotionPathJourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(async () => {
    const container = containerRef.current;
    if (!container) return;

    // Load plugins dynamically
    await Promise.all([loadMotionPathPlugin(), loadDrawSVGPlugin()]);

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
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
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

    // Refresh ScrollTrigger after setup
    ScrollTrigger.refresh();

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
