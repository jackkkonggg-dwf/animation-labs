/**
 * Portfolio Logo Component
 *
 * Displays a portfolio company logo with fallback support.
 * Uses locally cached SVG logos from /dwf-logos/{id}.svg.
 */

'use client';

import { useState, useRef } from 'react';

interface PortfolioLogoProps {
  /** Company ID (e.g., 'tron', 'algorand') */
  id: string;
  /** Company name for fallback display */
  name: string;
  /** Additional CSS classes */
  className?: string;
}

export function PortfolioLogo({ id, name, className = '' }: PortfolioLogoProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  // Get the first 2 letters for fallback display
  const fallbackText = name.slice(0, 2);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  // Show fallback if there was an error loading the image
  if (hasError) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <span className="text-xs font-bold text-zinc-600">{fallbackText}</span>
      </div>
    );
  }

  // Show loading state or the actual image
  return (
    <>
      {/* SVG logo - loaded via img tag to handle errors gracefully */}
      <img
        ref={imgRef}
        src={`/dwf-logos/${id}.svg`}
        alt={name}
        className={`w-full h-full object-contain ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200 ${className}`}
        onError={handleError}
        onLoad={handleLoad}
      />

      {/* Loading placeholder */}
      {isLoading && (
        <div className={`absolute inset-0 flex items-center justify-center bg-zinc-800 rounded-lg ${className}`}>
          <span className="text-xs font-bold text-zinc-600">{fallbackText}</span>
        </div>
      )}
    </>
  );
}
