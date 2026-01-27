'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { NAVIGATION_DATA } from '@/lib/navigation-data';

export function DemoGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const routes = NAVIGATION_DATA.routes;

  useGSAP(() => {
    const container = containerRef.current;
    const cards = cardsRef.current?.querySelectorAll('.demo-card');

    if (!container || !cards || cards.length === 0) return;

    // Animate title with aggressive entrance
    gsap.fromTo(
      titleRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    );

    // Set initial state for cards - more aggressive offset
    gsap.set(cards, { opacity: 0, y: 60, scale: 0.95 });

    // Create staggered entrance animation with snappy easing
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      stagger: 0.08,
      ease: 'back.out(1.2)',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    // Refresh after animations are created
    ScrollTrigger.refresh();

    // Cleanup function
    return () => {
      gsap.killTweensOf(cards);
    };
  }, {});

  return (
    <section ref={containerRef} className="min-h-screen bg-zinc-950 pt-32 md:pt-40 pb-16 px-4 md:px-6 relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-[0.02] grid-pattern-overlay-lg" />

      {/* Diagonal accent stripe */}
      <div className="absolute top-0 right-0 w-[1px] h-96 bg-gradient-to-b from-orange-500/50 via-orange-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with industrial design */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-end gap-4 mb-4">
            <div className="h-12 w-1 bg-orange-500" />
            <div>
              <span className="text-[10px] text-orange-500 uppercase tracking-[0.3em] block mb-2">
                Experiments
              </span>
              <h2
                ref={titleRef}
                className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-none"
              >
                Animation
                <span className="block text-orange-500">Labs</span>
              </h2>
            </div>
          </div>
          <div className="ml-5">
            <p className="text-sm md:text-base text-zinc-400 max-w-xl border-l-2 border-orange-500/20 pl-4">
              GSAP-powered interaction experiments. Click to explore each demo.
            </p>
          </div>
        </div>

        {/* Demo cards grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
        >
          {routes.map((route, index) => (
            <Link key={route.id} href={route.path}>
              <div
                className="demo-card group relative h-72 bg-zinc-900/50 border border-white/5 overflow-hidden
                  hover:border-orange-500/50 transition-all duration-300"
              >
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500/0 group-hover:border-orange-500/50 transition-colors duration-300" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-orange-500/0 group-hover:border-orange-500/50 transition-colors duration-300" />

                {/* Number indicator */}
                <div className="absolute top-4 right-4 text-[10px] text-zinc-600 font-mono">
                  {(index + 1).toString().padStart(2, '0')}
                </div>

                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative z-10 h-full p-6 flex flex-col">
                  {/* Title */}
                  <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight group-hover:text-orange-500 transition-colors duration-300">
                    {route.title}
                  </h3>

                  {/* Description */}
                  <p className="text-zinc-500 text-xs leading-relaxed flex-1">
                    {route.description}
                  </p>

                  {/* Arrow indicator with aggressive animation */}
                  <div className="flex items-center gap-2 text-orange-500 mt-4">
                    <span className="text-xs font-black uppercase tracking-wider">Launch</span>
                    <div className="w-8 h-8 bg-orange-500 flex items-center justify-center group-hover:w-12 group-hover:bg-orange-400 transition-all duration-300">
                      <svg
                        className="w-4 h-4 text-black transform group-hover:translate-x-0.5 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Scan line effect on hover */}
                <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-white/20 skew-x-[-12deg] animate-scan" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty state when no demos */}
        {routes.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-zinc-800">
            <p className="text-zinc-600 text-sm uppercase tracking-wider">No demos available</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
