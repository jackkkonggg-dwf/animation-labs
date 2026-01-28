'use client';

import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { generateSineWavePath, WAVE_PRESETS } from '@/app/lib/wave-utils';

interface WaveBackgroundProps {
  variant?: 'heroOverlay' | 'statsBackground' | 'footer';
  className?: string;
  opacity?: number;
  animated?: boolean;
}

/**
 * Reusable animated wave SVG background component
 * Generates sine wave SVGs programmatically and animates them with GSAP
 */
export function WaveBackground({
  variant = 'heroOverlay',
  className = '',
  opacity = 1,
  animated = true,
}: WaveBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [mounted, setMounted] = useState(false);

  // Get wave configuration based on variant
  const waveConfig = WAVE_PRESETS[variant];
  const layers = waveConfig.layers;

  // Only run on client
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const svg = svgRef.current;
    if (!svg) return;

    // Clear existing paths
    const existingPaths = svg.querySelectorAll('path');
    existingPaths.forEach((path) => path.remove());

    // Generate wave paths
    const width = (typeof window !== 'undefined' ? window.innerWidth : 1440) * 1.5;

    layers.forEach((layer: { amplitude: number; frequency: number; phase: number; yOffset: number; opacity: number; speed?: number }, index: number) => {
      const pathData = generateSineWavePath(
        width,
        layer.amplitude,
        layer.frequency,
        layer.phase,
        layer.yOffset
      );

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', pathData);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', 'rgba(255, 107, 0, 0.3)');
      path.setAttribute('stroke-width', '2');
      path.setAttribute('class', `wave-layer wave-layer-${index}`);
      path.style.opacity = layer.opacity.toString();

      svg.appendChild(path);
    });
  }, [layers, mounted]);

  useGSAP(
    () => {
      if (!mounted || !animated) return;

      const svg = svgRef.current;
      if (!svg) return;

      const triggers: ScrollTrigger[] = [];
      const wavePaths = svg.querySelectorAll('path');

      // Animate each wave layer with different speeds
      wavePaths.forEach((path, index) => {
        const layer = layers[index];
        const duration = 3 / (layer.speed || 1);

        // Continuous wave animation
        gsap.to(path, {
          attr: {
            d: () => {
              // Generate new path with shifted phase
              const width = (typeof window !== 'undefined' ? window.innerWidth : 1440) * 1.5;
              return generateSineWavePath(
                width,
                layer.amplitude,
                layer.frequency,
                layer.phase + 1,
                layer.yOffset
              );
            },
          },
          duration,
          repeat: -1,
          ease: 'none',
        });
      });

      ScrollTrigger.refresh();

      return () => {
        triggers.forEach((t) => t.kill());
        gsap.killTweensOf(wavePaths);
      };
    },
    { scope: containerRef, dependencies: [mounted, animated] }
  );

  // Default viewBox for SSR
  const viewBoxWidth = typeof window !== 'undefined' ? window.innerWidth * 1.5 : 2160;

  return (
    <div
      ref={containerRef}
      className={`wave-background-container absolute inset-0 pointer-events-none ${className}`}
      style={{ opacity }}
    >
      <svg
        ref={svgRef}
        className="w-full h-full"
        viewBox={`0 0 ${viewBoxWidth} 200`}
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      />
    </div>
  );
}
