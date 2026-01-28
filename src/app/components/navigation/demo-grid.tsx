'use client';

import { useRef, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { NAVIGATION_DATA } from '@/lib/navigation-data';
import type { Difficulty } from '@/types/pattern';

// Difficulty badge styles
const getDifficultyStyles = (difficulty: Difficulty) => {
  switch (difficulty) {
    case 'beginner':
      return {
        bg: 'bg-emerald-500/20',
        text: 'text-emerald-400',
        border: 'border-emerald-500/30',
        label: 'BEGINNER',
      };
    case 'intermediate':
      return {
        bg: 'bg-yellow-500/20',
        text: 'text-yellow-400',
        border: 'border-yellow-500/30',
        label: 'INTERMEDIATE',
      };
    case 'advanced':
      return {
        bg: 'bg-orange-500/20',
        text: 'text-orange-400',
        border: 'border-orange-500/30',
        label: 'ADVANCED',
      };
  }
};

export function DemoGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  // Get filter values from URL params
  const searchQuery = searchParams.get('search') || '';
  const categoryFilter = searchParams.get('category') || '';
  const difficultyFilter = searchParams.get('difficulty') || '';

  // Update URL params when filters change
  const updateFilters = (updates: { search?: string; category?: string; difficulty?: string }) => {
    const params = new URLSearchParams(searchParams.toString());

    if (updates.search !== undefined) {
      if (updates.search) {
        params.set('search', updates.search);
      } else {
        params.delete('search');
      }
    }
    if (updates.category !== undefined) {
      if (updates.category) {
        params.set('category', updates.category);
      } else {
        params.delete('category');
      }
    }
    if (updates.difficulty !== undefined) {
      if (updates.difficulty) {
        params.set('difficulty', updates.difficulty);
      } else {
        params.delete('difficulty');
      }
    }

    router.push(`/?${params.toString()}`, { scroll: false });
  };

  // Clear all filters
  const clearAllFilters = () => {
    router.push('/', { scroll: false });
  };

  // Get unique categories from routes
  const categories = useMemo(() => {
    const uniqueCategories = new Set(
      NAVIGATION_DATA.routes
        .map((route) => route.category)
        .filter((cat): cat is string => cat !== undefined)
    );
    return Array.from(uniqueCategories).sort();
  }, []);

  // Filter routes based on search, category, and difficulty
  const filteredRoutes = useMemo(() => {
    return NAVIGATION_DATA.routes.filter((route) => {
      // Search filter: check title and description (case-insensitive)
      const matchesSearch =
        !searchQuery ||
        route.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        route.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory =
        !categoryFilter || route.category === categoryFilter;

      // Difficulty filter
      const matchesDifficulty =
        !difficultyFilter || route.difficulty === difficultyFilter;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchQuery, categoryFilter, difficultyFilter]);

  // Check if any filters are active
  const hasActiveFilters = searchQuery || categoryFilter || difficultyFilter;

  const allRoutes = NAVIGATION_DATA.routes;

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

    // Set initial state for cards - opacity is handled by CSS class
    gsap.set(cards, { y: 60, scale: 0.95 });

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
  }, [filteredRoutes.length]); // Re-run animation when filtered routes change

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

        {/* Search and Filter Controls */}
        <div className="mb-8 space-y-4">
          {/* Search Input */}
          <div className="relative">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => updateFilters({ search: e.target.value })}
              placeholder="Search patterns..."
              className="w-full bg-zinc-900/50 border border-white/10 text-white placeholder-zinc-500
                px-4 py-3 pr-10 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50
                transition-all duration-200 uppercase tracking-wider text-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap gap-3">
            {/* Category Filter */}
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => updateFilters({ category: e.target.value })}
                className="appearance-none bg-zinc-900/50 border border-white/10 text-white px-4 py-2 pr-10
                  focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50
                  transition-all duration-200 uppercase tracking-wider text-xs cursor-pointer
                  hover:border-orange-500/30"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Difficulty Filter */}
            <div className="relative">
              <select
                value={difficultyFilter}
                onChange={(e) => updateFilters({ difficulty: e.target.value })}
                className="appearance-none bg-zinc-900/50 border border-white/10 text-white px-4 py-2 pr-10
                  focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50
                  transition-all duration-200 uppercase tracking-wider text-xs cursor-pointer
                  hover:border-orange-500/30"
              >
                <option value="">All Difficulties</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center text-zinc-500 text-xs uppercase tracking-wider ml-auto">
              <span>{filteredRoutes.length}</span>
              <span className="mx-1">/</span>
              <span>{allRoutes.length}</span>
              <span className="ml-1">patterns</span>
            </div>
          </div>

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-zinc-500 text-xs uppercase tracking-wider">Active:</span>

              {searchQuery && (
                <button
                  onClick={() => updateFilters({ search: '' })}
                  className="inline-flex items-center gap-1 bg-orange-500/20 border border-orange-500/30
                    text-orange-400 px-2 py-1 text-[10px] font-black uppercase tracking-wider
                    hover:bg-orange-500/30 transition-colors duration-200"
                >
                  <span>Search: "{searchQuery}"</span>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}

              {categoryFilter && (
                <button
                  onClick={() => updateFilters({ category: '' })}
                  className="inline-flex items-center gap-1 bg-cyan-500/20 border border-cyan-500/30
                    text-cyan-400 px-2 py-1 text-[10px] font-black uppercase tracking-wider
                    hover:bg-cyan-500/30 transition-colors duration-200"
                >
                  <span>{categoryFilter}</span>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}

              {difficultyFilter && (
                <button
                  onClick={() => updateFilters({ difficulty: '' })}
                  className="inline-flex items-center gap-1 bg-yellow-500/20 border border-yellow-500/30
                    text-yellow-400 px-2 py-1 text-[10px] font-black uppercase tracking-wider
                    hover:bg-yellow-500/30 transition-colors duration-200"
                >
                  <span>{difficultyFilter}</span>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}

              <button
                onClick={clearAllFilters}
                className="text-zinc-500 hover:text-white text-[10px] uppercase tracking-wider
                  underline underline-offset-2 hover:underline-offset-4 transition-all duration-200 ml-2"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Demo cards grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
        >
          {filteredRoutes.map((route, index) => (
            <Link key={route.id} href={route.path}>
              <div
                className="demo-card group relative h-72 bg-zinc-900/50 border border-white/5 overflow-hidden
                  hover:border-orange-500/50 transition-all duration-300 opacity-0"
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
                  {/* Difficulty badge */}
                  {route.difficulty && (
                    <div className="mb-3">
                      <span
                        className={`inline-block px-2 py-1 text-[10px] font-black uppercase tracking-wider border ${getDifficultyStyles(route.difficulty).bg} ${getDifficultyStyles(route.difficulty).text} ${getDifficultyStyles(route.difficulty).border}`}
                      >
                        {getDifficultyStyles(route.difficulty).label}
                      </span>
                    </div>
                  )}

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

        {/* Empty state when no results */}
        {filteredRoutes.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-zinc-800">
            <p className="text-zinc-600 text-sm uppercase tracking-wider mb-2">No patterns found</p>
            {hasActiveFilters && (
              <p className="text-zinc-700 text-xs uppercase tracking-wider">Try adjusting your filters</p>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}
