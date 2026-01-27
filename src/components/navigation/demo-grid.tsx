'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { NAVIGATION_DATA } from '@/lib/navigation-data';

export function DemoGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const routes = NAVIGATION_DATA.routes;

  useGSAP(() => {
    const container = containerRef.current;
    const cards = cardsRef.current?.querySelectorAll('.demo-card');

    if (!container || !cards || cards.length === 0) return;

    // Track ScrollTriggers for cleanup
    const triggers: ScrollTrigger[] = [];

    // Set initial state for cards
    gsap.set(cards, { opacity: 0, y: 50 });

    // Create staggered entrance animation
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: 'top center',
        toggleActions: 'play none none reverse',
      },
    });

    // Refresh after animations are created
    ScrollTrigger.refresh();

    // Cleanup function
    return () => {
      triggers.forEach((trigger) => trigger.kill());
      gsap.killTweensOf(cards);
    };
  }, {});

  return (
    <section ref={containerRef} className="min-h-screen bg-black pt-24 pb-16 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Animation <span className="text-cyan-400">Demos</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl">
            Explore our collection of GSAP-powered animations. Click on any demo to see it in action.
          </p>
        </div>

        {/* Demo cards grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {routes.map((route) => (
            <Link key={route.id} href={route.path}>
              <div className="demo-card group relative h-72 bg-gradient-to-br from-zinc-900 to-black rounded-3xl border border-white/10 overflow-hidden transition-all duration-500 hover:scale-105 hover:border-cyan-400/50 hover:shadow-[0_0_40px_rgba(0,255,255,0.2)]">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-magenta-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="relative z-10 h-full p-8 flex flex-col">
                  {/* Category badge */}
                  {route.category && (
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-cyan-400/10 border border-cyan-400/30 rounded-full text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                        {route.category}
                      </span>
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                    {route.title}
                  </h3>

                  {/* Description */}
                  <p className="text-zinc-400 text-sm leading-relaxed flex-1">
                    {route.description}
                  </p>

                  {/* Arrow indicator */}
                  <div className="flex items-center gap-2 text-cyan-400">
                    <span className="text-sm font-semibold">View Demo</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyan-400/20 to-transparent rounded-bl-full" />
              </div>
            </Link>
          ))}
        </div>

        {/* Empty state when no demos */}
        {routes.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-500 text-xl">No demos available yet. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
}
