'use client';

import { useRef, useMemo, useState } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

// ============================================================================
// DEMO DATA
// ============================================================================

type DemoCategory = 'Scroll-based' | 'Interactive' | 'Timeline-heavy' | 'Mixed';

interface AdvancedDemo {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: DemoCategory;
  features: string[];
  color: string;
}

const ADVANCED_DEMOS: AdvancedDemo[] = [
  {
    id: 'cinematic-scroll',
    slug: 'cinematic-scroll',
    title: 'Cinematic Scroll',
    description: 'Pinned scroll sequences with nested timelines, parallax backgrounds, and advanced easing',
    category: 'Scroll-based',
    features: ['ScrollTrigger', 'pin: true', 'Nested timelines', 'back.out', 'elastic.out', 'expo.inOut'],
    color: '#f97316',
  },
  {
    id: 'physics-playground',
    slug: 'physics-playground',
    title: 'Physics Playground',
    description: 'Draggable elements with InertiaPlugin momentum physics, snap-to-grid, and collision detection',
    category: 'Interactive',
    features: ['Draggable', 'InertiaPlugin', 'liveSnap', 'hitTest()', 'edgeResistance'],
    color: '#3b82f6',
  },
  {
    id: 'svg-morph-journey',
    slug: 'svg-morph-journey',
    title: 'SVG Morph Journey',
    description: 'MorphSVGPlugin shape transitions, MotionPathPlugin animations, and SVG filter effects',
    category: 'Scroll-based',
    features: ['MorphSVGPlugin', 'MotionPathPlugin', 'SVG filters', 'Hover interactions'],
    color: '#a855f7',
  },
  {
    id: 'text-symphony',
    slug: 'text-symphony',
    title: 'Text Symphony',
    description: 'Advanced SplitText animations with character cascades, word reveals, and scroll scrub effects',
    category: 'Scroll-based',
    features: ['SplitText', 'Character stagger', 'Word reveals', '3D rotation', 'Reduced motion'],
    color: '#22c55e',
  },
  {
    id: 'gesture-scroll',
    slug: 'gesture-scroll',
    title: 'Gesture Scroll Hybrid',
    description: 'Mouse-follow cursor trails, scroll velocity detection, swipe gestures, and pinch-zoom',
    category: 'Mixed',
    features: ['Observer', 'Gesture recognition', 'Scroll velocity', 'Hover interrupt', 'quickTo()'],
    color: '#ec4899',
  },
  {
    id: 'timeline-orchestration',
    slug: 'timeline-orchestration',
    title: 'Timeline Orchestration',
    description: 'Complex timeline composition with labels, callbacks, progress scrubber, and nested control',
    category: 'Timeline-heavy',
    features: ['Timeline labels', 'onUpdate/onStart', 'Nested timelines', 'Scrubber control', 'Position: ">"'],
    color: '#eab308',
  },
];

const CATEGORIES: DemoCategory[] = ['Scroll-based', 'Interactive', 'Timeline-heavy', 'Mixed'];

// ============================================================================
// CATEGORY BADGE STYLES
// ============================================================================

const getCategoryStyles = (category: DemoCategory) => {
  switch (category) {
    case 'Scroll-based':
      return {
        bg: 'bg-blue-500/20',
        text: 'text-blue-400',
        border: 'border-blue-500/30',
      };
    case 'Interactive':
      return {
        bg: 'bg-purple-500/20',
        text: 'text-purple-400',
        border: 'border-purple-500/30',
      };
    case 'Timeline-heavy':
      return {
        bg: 'bg-orange-500/20',
        text: 'text-orange-400',
        border: 'border-orange-500/30',
      };
    case 'Mixed':
      return {
        bg: 'bg-pink-500/20',
        text: 'text-pink-400',
        border: 'border-pink-500/30',
      };
  }
};

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function AdvancedPatternsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const [selectedCategory, setSelectedCategory] = useState<DemoCategory | ''>('');

  // Filter demos by category
  const filteredDemos = useMemo(() => {
    if (!selectedCategory) return ADVANCED_DEMOS;
    return ADVANCED_DEMOS.filter((demo) => demo.category === selectedCategory);
  }, [selectedCategory]);

  // Clear category filter
  const clearFilter = () => setSelectedCategory('');

  // Animate cards on mount and filter change
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

    // Set initial state for cards
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
  }, [filteredDemos.length]); // Re-run animation when filtered demos change

  return (
    <main className="min-h-screen bg-zinc-950">
      {/* Info banner */}
      <div className="sticky top-0 z-50 bg-zinc-900/95 backdrop-blur border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-orange-500 text-xs font-black tracking-[0.2em] uppercase">
              Advanced Patterns
            </span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400 text-sm">Expert-level GSAP demos</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-zinc-500 text-xs font-mono">{ADVANCED_DEMOS.length} DEMOS</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <section ref={containerRef} className="pt-32 md:pt-40 pb-16 px-4 md:px-6 relative overflow-hidden">
        {/* Background grid pattern */}
        <div className="absolute inset-0 opacity-[0.02] grid-pattern-overlay-lg" />

        {/* Diagonal accent stripe */}
        <div className="absolute top-0 right-0 w-[1px] h-96 bg-gradient-to-b from-orange-500/50 via-orange-500/20 to-transparent" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-end gap-4 mb-4">
              <div className="h-12 w-1 bg-orange-500" />
              <div>
                <span className="text-[10px] text-orange-500 uppercase tracking-[0.3em] block mb-2">
                  Gallery
                </span>
                <h2
                  ref={titleRef}
                  className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-none"
                >
                  Advanced
                  <span className="block text-orange-500">Patterns</span>
                </h2>
              </div>
            </div>
            <div className="ml-5">
              <p className="text-sm md:text-base text-zinc-400 max-w-xl border-l-2 border-orange-500/20 pl-4">
                Expert-level GSAP animations combining multiple techniques. Each demo showcases complex
                composition of ScrollTrigger, timelines, physics, and interactive elements.
              </p>
            </div>
          </div>

          {/* Category filter chips */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-zinc-500 text-xs uppercase tracking-wider">Filter by:</span>

              {/* All button */}
              <button
                onClick={clearFilter}
                className={`px-4 py-2 text-xs font-black uppercase tracking-wider border transition-all duration-200 ${
                  !selectedCategory
                    ? 'bg-orange-500 border-orange-500 text-black'
                    : 'bg-zinc-900/50 border-white/10 text-zinc-400 hover:border-orange-500/30 hover:text-white'
                }`}
              >
                All ({ADVANCED_DEMOS.length})
              </button>

              {/* Category buttons */}
              {CATEGORIES.map((category) => {
                const count = ADVANCED_DEMOS.filter((d) => d.category === category).length;
                const styles = getCategoryStyles(category);
                const isActive = selectedCategory === category;

                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(isActive ? '' : category)}
                    className={`px-4 py-2 text-xs font-black uppercase tracking-wider border transition-all duration-200 ${
                      isActive
                        ? `${styles.bg} ${styles.border} ${styles.text}`
                        : 'bg-zinc-900/50 border-white/10 text-zinc-400 hover:border-orange-500/30 hover:text-white'
                    }`}
                  >
                    {category} ({count})
                  </button>
                );
              })}

              {/* Results count */}
              <div className="ml-auto flex items-center text-zinc-500 text-xs uppercase tracking-wider">
                <span>{filteredDemos.length}</span>
                <span className="mx-1">/</span>
                <span>{ADVANCED_DEMOS.length}</span>
              </div>
            </div>

            {/* Active filter chip */}
            {selectedCategory && (
              <div className="flex items-center gap-2 pt-2">
                <span className="text-zinc-500 text-xs uppercase tracking-wider">Active:</span>
                <button
                  onClick={clearFilter}
                  className={`inline-flex items-center gap-1 px-3 py-1 text-[10px] font-black uppercase tracking-wider border transition-colors duration-200 ${getCategoryStyles(selectedCategory as DemoCategory).bg} ${getCategoryStyles(selectedCategory as DemoCategory).border} ${getCategoryStyles(selectedCategory as DemoCategory).text}`}
                >
                  <span>{selectedCategory}</span>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Demo cards grid */}
          <div
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
          >
            {filteredDemos.map((demo, index) => (
              <Link key={demo.id} href={`/advanced-patterns/${demo.slug}`}>
                <div
                  className="demo-card group relative h-80 bg-zinc-900/50 border border-white/5 overflow-hidden
                    hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10
                    transition-all duration-300"
                >
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500/0 group-hover:border-orange-500/50 transition-colors duration-300" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-orange-500/0 group-hover:border-orange-500/50 transition-colors duration-300" />

                  {/* Number indicator */}
                  <div className="absolute top-4 right-4 text-[10px] text-zinc-600 font-mono">
                    {(index + 1).toString().padStart(2, '0')}
                  </div>

                  {/* Background gradient on hover */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${demo.color}10 0%, transparent 50%, ${demo.color}05 100%)`,
                    }}
                  />

                  {/* Preview thumbnail placeholder */}
                  <div
                    className="absolute top-16 left-1/2 -translate-x-1/2 w-20 h-20 rounded-xl opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${demo.color} 0%, ${demo.color}66 100%)`,
                    }}
                  >
                    {/* Simple icon based on category */}
                    <div className="w-full h-full flex items-center justify-center">
                      {demo.category === 'Scroll-based' && (
                        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      )}
                      {demo.category === 'Interactive' && (
                        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                        </svg>
                      )}
                      {demo.category === 'Timeline-heavy' && (
                        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {demo.category === 'Mixed' && (
                        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full p-6 flex flex-col">
                    {/* Category badge */}
                    <div className="mb-3">
                      <span
                        className={`inline-block px-2 py-1 text-[10px] font-black uppercase tracking-wider border ${getCategoryStyles(demo.category).bg} ${getCategoryStyles(demo.category).text} ${getCategoryStyles(demo.category).border}`}
                      >
                        {demo.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight group-hover:text-orange-500 transition-colors duration-300">
                      {demo.title}
                    </h3>

                    {/* Description */}
                    <p className="text-zinc-500 text-xs leading-relaxed mb-4 line-clamp-2">
                      {demo.description}
                    </p>

                    {/* GSAP features */}
                    <div className="flex-1 flex items-end">
                      <div className="flex flex-wrap gap-1.5">
                        {demo.features.slice(0, 4).map((feature) => (
                          <span
                            key={feature}
                            className="px-2 py-0.5 text-[9px] font-mono text-zinc-600 bg-zinc-800/50 border border-zinc-700/50 rounded"
                          >
                            {feature}
                          </span>
                        ))}
                        {demo.features.length > 4 && (
                          <span className="px-2 py-0.5 text-[9px] font-mono text-zinc-600 bg-zinc-800/50 border border-zinc-700/50 rounded">
                            +{demo.features.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Arrow indicator */}
                    <div className="flex items-center gap-2 mt-4">
                      <span className="text-xs font-black uppercase tracking-wider text-orange-500">Explore</span>
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

          {/* Empty state when no results */}
          {filteredDemos.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-zinc-800">
              <p className="text-zinc-600 text-sm uppercase tracking-wider mb-2">No demos found</p>
              <p className="text-zinc-700 text-xs uppercase tracking-wider">Try a different filter</p>
            </div>
          ) : null}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-900/50 border-t border-zinc-800 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-zinc-500 text-sm font-mono">
            Expert-level GSAP patterns featuring: ScrollTrigger, Draggable, SplitText, MorphSVG, MotionPath, Observer, InertiaPlugin
          </p>
        </div>
      </footer>
    </main>
  );
}
