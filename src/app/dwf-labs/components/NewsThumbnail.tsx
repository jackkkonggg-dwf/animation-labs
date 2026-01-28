/**
 * NewsThumbnail Component
 *
 * Displays news article thumbnails with:
 * - Lazy loading below the fold
 * - Orange/zinc styled placeholder while loading
 * - Graceful error handling with fallback
 * - WebP format support (if external URL provided)
 */

'use client';

import { useRef, useState, useEffect } from 'react';
import { NewsArticle } from '../lib/news-data';

interface NewsThumbnailProps {
  article: NewsArticle;
  className?: string;
}

export function NewsThumbnail({ article, className = '' }: NewsThumbnailProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Lazy load: only load image when in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '50px' }, // Start loading 50px before entering viewport
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true); // Still mark as loaded to show fallback
  };

  // If no external thumbnail URL, always show styled placeholder
  if (!article.thumbnail) {
    return (
      <div
        ref={containerRef}
        className={`news-thumbnail aspect-video bg-gradient-to-br ${article.gradient} flex items-center justify-center overflow-hidden ${className}`}
      >
        <div className="w-12 h-12 bg-zinc-800/80 rounded-lg flex items-center justify-center text-zinc-500 backdrop-blur-sm">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
      </div>
    );
  }

  // With external URL: lazy load with placeholder
  return (
    <div
      ref={containerRef}
      className={`news-thumbnail aspect-video relative bg-gradient-to-br ${article.gradient} flex items-center justify-center overflow-hidden ${className}`}
    >
      {/* Placeholder - visible while loading or on error */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-zinc-800/80 rounded-lg flex items-center justify-center text-zinc-500 backdrop-blur-sm animate-pulse">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      )}

      {/* Actual image - lazy loaded */}
      {isInView && (
        <img
          ref={imgRef}
          src={article.thumbnail}
          alt={article.title}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
        />
      )}

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-800/50">
          <div className="w-12 h-12 bg-zinc-700 rounded-lg flex items-center justify-center text-zinc-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
