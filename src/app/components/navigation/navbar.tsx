'use client';

import { memo, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HamburgerButton } from './hamburger-button';

/**
 * NavbarProgress - Memoized progress bar component
 * Only re-renders when scrollProgress actually changes
 */
const NavbarProgress = memo(function NavbarProgress({ scrollProgress }: { scrollProgress: number }) {
  return (
    <div className="h-0.5 bg-zinc-900 relative overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 transition-transform duration-100 ease-out origin-left"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
      {/* Diagonal scan line effect */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white/60 skew-x-[-12deg]"
        style={{ left: `${scrollProgress * 100}%`, transition: 'left 0.1s ease-out' }}
      />
    </div>
  );
});

/**
 * Navbar - Memoized navigation header
 * Prevents unnecessary re-renders during scroll events
 *
 * Navigation state is managed by NavigationProvider context.
 */
export const Navbar = memo(function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

  // Extract route ID from pathname (remove leading slash)
  const routeId = pathname.slice(1) || 'home';

  // Memoize event handler to prevent re-creating on every render
  const handleProgressUpdate = useCallback((event: Event) => {
    const customEvent = event as CustomEvent<number>;
    setScrollProgress(customEvent.detail);
  }, []);

  useEffect(() => {
    // Listen for scroll progress updates
    window.addEventListener(`${routeId}-scroll-progress`, handleProgressUpdate);

    return () => {
      window.removeEventListener(`${routeId}-scroll-progress`, handleProgressUpdate);
    };
  }, [routeId, handleProgressUpdate]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b-2 border-orange-500/30">
        {/* Progress bar - isolated to prevent navbar re-renders on scroll */}
        <NavbarProgress scrollProgress={scrollProgress} />

        {/* Header content with industrial design */}
        <div className="px-4 md:px-6 py-3 flex items-center justify-between">
          <Link href="/" className="group">
            <div className="flex items-center gap-2">
              {/* Angular logo mark */}
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-orange-500 transform rotate-45 group-hover:rotate-[225deg] transition-transform duration-500" />
                <span className="relative z-10 text-black font-black text-sm">G</span>
              </div>
              <div className="flex flex-row items-baseline gap-2">
                <h1 className="text-sm md:text-base font-black text-white tracking-tight uppercase leading-none">
                  GSAP<span className="text-orange-500">.</span>
                </h1>
                <span className="text-xs text-zinc-500 uppercase tracking-[0.2em]">Showcase</span>
              </div>
            </div>
          </Link>

          {/* Hamburger button for mobile menu */}
          <HamburgerButton />
        </div>
      </header>
    </>
  );
});
