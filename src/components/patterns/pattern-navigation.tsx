'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { NAVIGATION_DATA } from '@/lib/navigation-data';
import type { NavigationRoute } from '@/types/navigation';

// ============================================================================
// PATTERN NAVIGATION COMPONENT
// ============================================================================

interface PatternNavigationProps {
  currentPatternId: string;
}

export function PatternNavigation({ currentPatternId }: PatternNavigationProps) {
  const { previousPattern, nextPattern } = useMemo(() => {
    // Filter to only pattern routes (exclude legacy routes and home)
    const patternRoutes = NAVIGATION_DATA.routes.filter(
      (route): route is NavigationRoute & { difficulty: string } =>
        route.difficulty !== undefined && route.path.startsWith('/patterns/')
    );

    const currentIndex = patternRoutes.findIndex((p) => p.id === currentPatternId);

    return {
      previousPattern: currentIndex > 0 ? patternRoutes[currentIndex - 1] : null,
      nextPattern: currentIndex < patternRoutes.length - 1 ? patternRoutes[currentIndex + 1] : null,
    };
  }, [currentPatternId]);

  // Don't render if there are no adjacent patterns
  if (!previousPattern && !nextPattern) {
    return null;
  }

  return (
    <section className="relative border-t border-zinc-800 bg-zinc-900/30">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Previous Pattern */}
          {previousPattern ? (
            <Link
              href={previousPattern.path}
              className="group relative bg-zinc-900/50 border border-zinc-800 hover:border-orange-500/50 rounded p-6 transition-all duration-300"
            >
              {/* Arrow indicator */}
              <div className="flex items-center gap-3 mb-3">
                <svg
                  className="w-5 h-5 text-orange-500 group-hover:-translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-zinc-500 text-xs font-black tracking-[0.2em] uppercase">Previous</span>
              </div>

              {/* Title */}
              <h3 className="text-white font-black text-lg uppercase tracking-tight group-hover:text-orange-500 transition-colors">
                {previousPattern.title}
              </h3>

              {/* Description */}
              <p className="text-zinc-400 text-sm mt-2 line-clamp-2">{previousPattern.description}</p>

              {/* Corner accent */}
              <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-orange-500/0 group-hover:border-orange-500/50 transition-colors duration-300" />
            </Link>
          ) : (
            <div /> // Empty spacer
          )}

          {/* Next Pattern */}
          {nextPattern ? (
            <Link
              href={nextPattern.path}
              className="group relative bg-zinc-900/50 border border-zinc-800 hover:border-orange-500/50 rounded p-6 transition-all duration-300"
            >
              {/* Arrow indicator */}
              <div className="flex items-center justify-end gap-3 mb-3">
                <span className="text-zinc-500 text-xs font-black tracking-[0.2em] uppercase">Next</span>
                <svg
                  className="w-5 h-5 text-orange-500 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Title */}
              <h3 className="text-white font-black text-lg uppercase tracking-tight text-right group-hover:text-orange-500 transition-colors">
                {nextPattern.title}
              </h3>

              {/* Description */}
              <p className="text-zinc-400 text-sm mt-2 text-right line-clamp-2">{nextPattern.description}</p>

              {/* Corner accent */}
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-orange-500/0 group-hover:border-orange-500/50 transition-colors duration-300" />
            </Link>
          ) : (
            <div /> // Empty spacer
          )}
        </div>
      </div>
    </section>
  );
}
