'use client';

import { useState, useEffect } from 'react';

export function Header() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Listen for scroll progress updates from HorizontalScroll component
    const handleProgressUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<number>;
      setScrollProgress(customEvent.detail);
    };

    window.addEventListener('horizontal-scroll-progress', handleProgressUpdate);

    return () => {
      window.removeEventListener('horizontal-scroll-progress', handleProgressUpdate);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      {/* Progress bar */}
      <div className="h-1 bg-white/10">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 to-magenta-500 transition-transform duration-75 ease-out"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      {/* Header content */}
      <div className="px-8 py-4">
        <h1 className="text-xl font-bold text-white tracking-wide">
          GSAP Animations <span className="text-cyan-400">Showcase</span>
        </h1>
      </div>
    </header>
  );
}
