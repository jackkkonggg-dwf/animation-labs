'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { PATTERN_CATEGORIES } from '@/lib/patterns-data';
import { NAVIGATION_DATA } from '@/lib/navigation-data';

// Featured patterns to highlight
const FEATURED_PATTERNS = [
  {
    id: 'fade-reveal',
    title: 'Fade Reveal',
    description: 'The essential ScrollTrigger pattern for smooth entry animations',
    category: 'ScrollTrigger Basics',
    difficulty: 'beginner' as const,
    gradient: 'from-orange-500 via-amber-500 to-yellow-500',
    icon: '📜',
  },
  {
    id: 'char-text-reveal',
    title: 'Character Text Reveal',
    description: 'Kinetic typography showcase with spring-loaded character animations',
    category: 'Text Animations',
    difficulty: 'intermediate' as const,
    gradient: 'from-cyan-500 via-blue-500 to-purple-500',
    icon: '✨',
  },
  {
    id: 'pinned-sequence',
    title: 'Pinned Section Sequence',
    description: 'Advanced scroll-controlled storytelling with timeline choreography',
    category: 'Advanced Scroll',
    difficulty: 'advanced' as const,
    gradient: 'from-rose-500 via-pink-500 to-fuchsia-500',
    icon: '📍',
  },
];

export function CategoryGrid() {
  const searchParams = useSearchParams();

  // Calculate pattern count per category
  const categoryPatternCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    NAVIGATION_DATA.routes.forEach((route) => {
      if (route.category) {
        counts[route.category] = (counts[route.category] || 0) + 1;
      }
    });
    return counts;
  }, []);

  // Filter to only categories that have patterns
  const categoriesWithPatterns = useMemo(() => {
    return PATTERN_CATEGORIES.filter((cat) => {
      const patternCount = categoryPatternCounts[cat.title] || 0;
      return patternCount > 0;
    });
  }, [categoryPatternCounts]);

  // Set category filter and navigate to home
  const handleCategoryClick = (categoryTitle: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', categoryTitle);
    window.location.href = `/?${params.toString()}`;
  };

  useGSAP(() => {
    // Animate featured patterns
    gsap.fromTo(
      '.featured-pattern-card',
      {
        opacity: 0,
        y: 40,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: '.featured-patterns-grid',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Animate category cards
    gsap.fromTo(
      '.category-card',
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.categories-grid',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    ScrollTrigger.refresh();

    return () => {
      gsap.killTweensOf('.featured-pattern-card');
      gsap.killTweensOf('.category-card');
    };
  }, []);

  return (
    <section className="min-h-screen bg-zinc-950 pt-32 md:pt-40 pb-16 px-4 md:px-6 relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-[0.02] grid-pattern-overlay-xl" />

      {/* Diagonal accent stripes */}
      <div className="absolute top-0 left-1/4 w-[1px] h-64 bg-gradient-to-b from-orange-500/30 via-transparent to-transparent" />
      <div className="absolute top-0 right-1/4 w-[1px] h-48 bg-gradient-to-b from-orange-500/20 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero header */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-end gap-4 mb-6">
            <div className="h-16 w-1 bg-orange-500" />
            <div>
              <span className="text-[10px] text-orange-500 uppercase tracking-[0.3em] block mb-3">
                Pattern Library
              </span>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-tighter leading-none">
                GSAP
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500">
                  Showcase
                </span>
              </h1>
            </div>
          </div>
          <div className="ml-5 max-w-2xl">
            <p className="text-base md:text-lg text-zinc-400 leading-relaxed border-l-2 border-orange-500/20 pl-4">
              A comprehensive collection of 20+ GSAP animation patterns organized by category and difficulty.
              Explore production-ready examples with live demos, code snippets, and React/Next.js best practices.
            </p>
          </div>
        </div>

        {/* Featured Patterns Section */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-[2px] bg-gradient-to-b from-orange-500 to-amber-500" />
            <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">
              Featured Patterns
            </h2>
            <span className="text-zinc-600 text-sm uppercase tracking-wider">•</span>
            <span className="text-zinc-500 text-xs uppercase tracking-wider">Start Here</span>
          </div>

          <div className="featured-patterns-grid grid grid-cols-1 md:grid-cols-3 gap-5">
            {FEATURED_PATTERNS.map((pattern) => (
              <Link key={pattern.id} href={`/patterns/${pattern.id}`}>
                <div className="featured-pattern-card group relative h-64 bg-zinc-900 border border-white/5 overflow-hidden hover:border-orange-500/50 transition-all duration-300">
                  {/* Gradient background overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${pattern.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-orange-500/0 group-hover:border-orange-500/60 transition-colors duration-300" />
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-orange-500/0 group-hover:border-orange-500/60 transition-colors duration-300" />

                  {/* Featured badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 bg-orange-500/20 border border-orange-500/30 text-orange-400 px-3 py-1 text-[10px] font-black uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
                      Featured
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="absolute top-4 right-4 text-4xl opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-300">
                    {pattern.icon}
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full p-6 flex flex-col justify-end">
                    {/* Difficulty badge */}
                    <div className="mb-3">
                      <span
                        className={`inline-block px-2 py-1 text-[10px] font-black uppercase tracking-wider border ${
                          pattern.difficulty === 'beginner'
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                            : pattern.difficulty === 'intermediate'
                            ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                            : 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                        }`}
                      >
                        {pattern.difficulty}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight group-hover:text-orange-500 transition-colors duration-300">
                      {pattern.title}
                    </h3>

                    {/* Description */}
                    <p className="text-zinc-500 text-xs leading-relaxed mb-4">
                      {pattern.description}
                    </p>

                    {/* Launch indicator */}
                    <div className="flex items-center gap-2 text-orange-500">
                      <span className="text-xs font-black uppercase tracking-wider">Explore</span>
                      <div className="w-8 h-8 bg-orange-500 flex items-center justify-center group-hover:w-12 group-hover:bg-orange-400 transition-all duration-300">
                        <svg
                          className="w-4 h-4 text-black transform group-hover:translate-x-0.5 transition-transform duration-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Scan line effect */}
                  <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-white/20 skew-x-[-12deg] animate-scan" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Categories Grid Section */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-[2px] bg-gradient-to-b from-orange-500 to-amber-500" />
            <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">
              Browse by Category
            </h2>
            <span className="text-zinc-600 text-sm uppercase tracking-wider">•</span>
            <span className="text-zinc-500 text-xs uppercase tracking-wider">
              {categoriesWithPatterns.length} Categories
            </span>
          </div>

          <div className="categories-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoriesWithPatterns.map((category) => {
              const patternCount = categoryPatternCounts[category.title] || 0;
              const hasPatterns = patternCount > 0;

              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.title)}
                  disabled={!hasPatterns}
                  className={`category-card group relative h-40 bg-zinc-900/50 border overflow-hidden text-left transition-all duration-300 ${
                    hasPatterns
                      ? 'border-white/5 hover:border-orange-500/50 cursor-pointer'
                      : 'border-white/5 opacity-40 cursor-not-allowed'
                  }`}
                >
                  {/* Hover gradient */}
                  {hasPatterns && (
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}

                  {/* Corner accents */}
                  {hasPatterns && (
                    <>
                      <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-orange-500/0 group-hover:border-orange-500/40 transition-colors duration-300" />
                      <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-orange-500/0 group-hover:border-orange-500/40 transition-colors duration-300" />
                    </>
                  )}

                  {/* Content */}
                  <div className="relative z-10 h-full p-5 flex flex-col">
                    {/* Icon and count */}
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                        {category.icon}
                      </span>
                      <span
                        className={`text-xs font-mono ${
                          hasPatterns ? 'text-orange-500' : 'text-zinc-600'
                        }`}
                      >
                        {patternCount}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className={`text-sm font-black uppercase tracking-tight mb-1.5 ${
                        hasPatterns ? 'text-white group-hover:text-orange-500' : 'text-zinc-600'
                      } transition-colors duration-300`}
                    >
                      {category.title}
                    </h3>

                    {/* Description */}
                    <p className="text-zinc-600 text-[10px] leading-relaxed line-clamp-2 flex-1">
                      {category.description}
                    </p>

                    {/* Pattern count label */}
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className={`text-[10px] uppercase tracking-wider ${hasPatterns ? 'text-zinc-500 group-hover:text-orange-500' : 'text-zinc-700'} transition-colors duration-300`}>
                        {patternCount} {patternCount === 1 ? 'pattern' : 'patterns'}
                      </span>
                      {hasPatterns && (
                        <svg
                          className="w-3 h-3 text-zinc-600 group-hover:text-orange-500 transform group-hover:translate-x-0.5 transition-all duration-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Scan line effect */}
                  {hasPatterns && (
                    <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-white/10 skew-x-[-12deg] animate-scan" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Empty categories notice */}
          <p className="text-zinc-600 text-xs uppercase tracking-wider mt-6 text-center">
            More patterns coming soon • Check back for updates
          </p>
        </div>
      </div>
    </section>
  );
}
