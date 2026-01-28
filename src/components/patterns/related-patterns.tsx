'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { NAVIGATION_DATA } from '@/lib/navigation-data';
import type { NavigationRoute } from '@/types/navigation';

// ============================================================================
// RELATED PATTERNS COMPONENT
// ============================================================================

interface RelatedPatternsProps {
  /**
   * The current pattern ID to exclude from related patterns
   */
  currentPatternId: string;
}

/**
 * Finds related patterns based on the current pattern's category and difficulty
 * Prioritizes:
 * 1. Same category patterns
 * 2. Same difficulty patterns (if needed to fill 4 slots)
 */
function findRelatedPatterns(
  currentPattern: NavigationRoute,
  allPatterns: NavigationRoute[]
): NavigationRoute[] {
  // Filter out current pattern and non-pattern routes (like legacy routes)
  const otherPatterns = allPatterns.filter(
    (p) => p.id !== currentPattern.id && p.difficulty !== undefined
  );

  // Get patterns from same category
  const sameCategoryPatterns = otherPatterns.filter(
    (p) => p.category === currentPattern.category
  );

  // Get patterns with same difficulty
  const sameDifficultyPatterns = otherPatterns.filter(
    (p) => p.difficulty === currentPattern.difficulty && p.category !== currentPattern.category
  );

  // Combine: prioritizing same category, then same difficulty
  let relatedPatterns = [...sameCategoryPatterns];

  // If we have fewer than 4 patterns from same category, add from same difficulty
  if (relatedPatterns.length < 4) {
    const needed = 4 - relatedPatterns.length;
    relatedPatterns = [
      ...relatedPatterns,
      ...sameDifficultyPatterns.slice(0, needed)
    ];
  }

  // Limit to 4 patterns
  return relatedPatterns.slice(0, 4);
}

/**
 * Difficulty badge styles
 */
function getDifficultyBadgeStyles(difficulty?: string) {
  switch (difficulty) {
    case 'beginner':
      return {
        bg: 'bg-emerald-400/10',
        text: 'text-emerald-400',
        border: 'border-emerald-400/30',
        label: 'Beginner'
      };
    case 'intermediate':
      return {
        bg: 'bg-yellow-400/10',
        text: 'text-yellow-400',
        border: 'border-yellow-400/30',
        label: 'Intermediate'
      };
    case 'advanced':
      return {
        bg: 'bg-orange-400/10',
        text: 'text-orange-400',
        border: 'border-orange-400/30',
        label: 'Advanced'
      };
    default:
      return null;
  }
}

/**
 * RelatedPatterns Component
 *
 * Displays 3-4 related patterns at the bottom of pattern pages
 * Related patterns are based on:
 * 1. Same category (primary)
 * 2. Same difficulty (secondary, to fill remaining slots)
 */
export function RelatedPatterns({ currentPatternId }: RelatedPatternsProps) {
  // Find related patterns using useMemo to avoid recalculation on re-renders
  const relatedPatterns = useMemo(() => {
    const currentPattern = NAVIGATION_DATA.routes.find(
      (p) => p.id === currentPatternId
    );

    if (!currentPattern || !currentPattern.difficulty) {
      return [];
    }

    return findRelatedPatterns(currentPattern, NAVIGATION_DATA.routes);
  }, [currentPatternId]);

  // Don't render if no related patterns found
  if (relatedPatterns.length === 0) {
    return null;
  }

  return (
    <section className="relative border-t border-zinc-800 bg-zinc-900/20">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5 grid-pattern-overlay" />

      {/* Diagonal stripe decoration */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-orange-500 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-4">
            Related <span className="text-orange-500">Patterns</span>
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto">
            Continue learning with these related GSAP animation patterns
          </p>
        </div>

        {/* Related patterns grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedPatterns.map((pattern) => {
            const badgeStyles = getDifficultyBadgeStyles(pattern.difficulty);

            return (
              <Link
                key={pattern.id}
                href={pattern.path}
                className="group relative bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-lg overflow-hidden hover:border-orange-500/50 transition-all duration-300"
              >
                {/* Corner accent - top left */}
                <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-orange-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Scan line effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-full h-px bg-white/10 absolute top-1/2 animate-scan" />
                </div>

                {/* Card content */}
                <div className="relative p-6">
                  {/* Category badge */}
                  <div className="mb-4">
                    <span className="text-orange-500 text-[10px] font-black tracking-[0.3em] uppercase">
                      {pattern.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-black text-white uppercase tracking-tight mb-3 group-hover:text-orange-500 transition-colors duration-300">
                    {pattern.title}
                  </h3>

                  {/* Description */}
                  <p className="text-zinc-400 text-sm leading-relaxed mb-4 line-clamp-3">
                    {pattern.description}
                  </p>

                  {/* Difficulty badge */}
                  {badgeStyles && (
                    <div className={`inline-flex items-center px-2 py-1 ${badgeStyles.bg} ${badgeStyles.border} border rounded`}>
                      <span className={`${badgeStyles.text} text-[10px] font-bold uppercase tracking-wider`}>
                        {badgeStyles.label}
                      </span>
                    </div>
                  )}

                  {/* Arrow indicator on hover */}
                  <div className="absolute bottom-4 right-4 w-8 h-8 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-zinc-600 group-hover:text-orange-500 transition-all duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>

                {/* Bottom scan line */}
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
