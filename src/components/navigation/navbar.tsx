'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MobileMenu } from './mobile-menu';

export function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Extract route ID from pathname (remove leading slash)
  const routeId = pathname.slice(1) || 'home';

  useEffect(() => {
    // Listen for scroll progress updates
    const handleProgressUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<number>;
      setScrollProgress(customEvent.detail);
    };

    window.addEventListener(`${routeId}-scroll-progress`, handleProgressUpdate);

    return () => {
      window.removeEventListener(`${routeId}-scroll-progress`, handleProgressUpdate);
    };
  }, [routeId]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        {/* Progress bar */}
        <div className="h-1 bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-magenta-500 transition-transform duration-75 ease-out origin-left"
            style={{ transform: `scaleX(${scrollProgress})` }}
          />
        </div>

        {/* Header content */}
        <div className="px-6 md:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="group">
            <h1 className="text-lg md:text-xl font-bold text-white tracking-wide group-hover:text-cyan-400 transition-colors duration-300">
              GSAP <span className="text-cyan-400 group-hover:text-white transition-colors duration-300">Showcase</span>
            </h1>
          </Link>

          <MobileMenu isOpen={isMenuOpen} onToggle={() => setIsMenuOpen(!isMenuOpen)} />
        </div>
      </header>
    </>
  );
}
