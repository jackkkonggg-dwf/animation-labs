'use client';

/**
 * Wave Utility Functions for DWF Homepage V2
 * DWF = Digital Wave Finance - wave-themed animations throughout
 */

// ============================================================================
// SVG WAVE PATH GENERATORS
// ============================================================================

/**
 * Generate a sine wave SVG path string
 * @param width - Width of the wave in pixels
 * @param height - Height amplitude of the wave in pixels
 * @param frequency - Number of complete waves across the width
 * @param phase - Starting phase offset (0-1)
 * @param yBase - Base Y position (vertical center)
 * @returns SVG path data string
 */
export function generateSineWavePath(
  width: number,
  height: number,
  frequency: number,
  phase: number = 0,
  yBase: number = 50
): string {
  const points: string[] = [];
  const steps = Math.ceil(width / 2); // 2px precision

  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * width;
    const normalizedX = i / steps;
    const yOffset = Math.sin((normalizedX * frequency * Math.PI * 2) + (phase * Math.PI * 2));
    const y = yBase + (yOffset * height);
    points.push(`${x},${y}`);
  }

  return `M ${points.join(' L ')}`;
}

/**
 * Generate a layered wave SVG with multiple overlapping waves
 * @param width - Width of the SVG
 * @param height - Height of the SVG
 * @param layers - Array of wave layer configurations
 * @returns Array of SVG path elements as strings
 */
export interface WaveLayer {
  amplitude: number;
  frequency: number;
  phase: number;
  yOffset: number;
  color: string;
  opacity: number;
  speed?: number; // Animation speed multiplier
}

export function generateLayeredWaves(
  width: number,
  height: number,
  layers: WaveLayer[]
): string[] {
  return layers.map((layer) => {
    const pathData = generateSineWavePath(
      width,
      layer.amplitude,
      layer.frequency,
      layer.phase,
      layer.yOffset
    );
    return pathData;
  });
}

/**
 * Create an SVG wave element with the given path
 */
export function createWaveSVG(
  pathData: string,
  width: number,
  height: number,
  fill = 'none',
  stroke = 'currentColor',
  strokeWidth = 2,
  id?: string
): string {
  const idAttr = id ? ` id="${id}"` : '';
  return `<path${idAttr} d="${pathData}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" />`;
}

// ============================================================================
// ANIMATION WAVE PATHS FOR MOTIONPATHPLUGIN
// ============================================================================

/**
 * Generate a wave path suitable for GSAP MotionPathPlugin
 * Creates a closed loop or flowing wave path for elements to follow
 */
export function createMotionPathWave(
  width: number,
  height: number,
  cycles: number = 3,
  amplitude: number = 50,
  closed = false
): string {
  const points: string[] = [];
  const steps = 100;

  // Generate wave points
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = t * width;
    const y = (height / 2) + Math.sin(t * cycles * Math.PI * 2) * amplitude;
    points.push(`${x},${y}`);
  }

  let path = `M ${points.join(' L ')}`;

  if (closed) {
    // Return path along bottom to close the loop
    path += ` L ${width},${height} L 0,${height} Z`;
  }

  return path;
}

// ============================================================================
// SINE WAVE TEXT REVEAL UTILITIES
// ============================================================================

/**
 * Calculate Y offset for a character in a wave reveal animation
 * @param index - Character index in the text
 * @param total - Total number of characters
 * @param amplitude - Wave height
 * @param frequency - Number of waves across the text
 * @returns Y offset value
 */
export function calculateWaveYOffset(
  index: number,
  total: number,
  amplitude: number = 30,
  frequency: number = 0.5
): number {
  const normalized = index / Math.max(total - 1, 1);
  return Math.sin(normalized * frequency * Math.PI * 2) * amplitude;
}

/**
 * Calculate stagger delay for wave pattern animation
 * @param index - Element index
 * @param total - Total elements
 * @param baseDelay - Base delay between elements
 * @param waveFrequency - How many wave cycles
 * @returns Delay value in seconds
 */
export function calculateWaveStagger(
  index: number,
  total: number,
  baseDelay: number = 0.05,
  waveFrequency: number = 0.3
): number {
  const normalized = index / Math.max(total - 1, 1);
  const waveOffset = Math.sin(normalized * waveFrequency * Math.PI * 2) * baseDelay;
  return (index * baseDelay) + waveOffset;
}

// ============================================================================
// WAVE RIPPLE EFFECT UTILITIES
// ============================================================================

/**
 * Calculate ripple expansion for wave hover effect
 * @param progress - Animation progress (0-1)
 * @param maxScale - Maximum scale of the ripple
 * @returns Current scale value
 */
export function calculateRippleScale(progress: number, maxScale: number = 4): number {
  return progress * maxScale;
}

/**
 * Calculate ripple opacity fade-out
 * @param progress - Animation progress (0-1)
 * @param startOpacity - Starting opacity
 * @returns Current opacity value
 */
export function calculateRippleOpacity(progress: number, startOpacity: number = 0.5): number {
  return startOpacity * (1 - progress);
}

// ============================================================================
// WAVE COUNTER UTILITIES
// ============================================================================

/**
 * Calculate oscillating value for counter animation
 * Adds a sine wave oscillation to the base value
 * @param baseValue - The actual counter value
 * @param progress - Animation progress (0-1)
 * @param amplitude - Oscillation amplitude
 * @returns Oscillated value
 */
export function calculateOscillatingValue(
  baseValue: number,
  progress: number,
  amplitude: number = 2
): number {
  // Oscillation decreases as progress approaches 1
  const decreasingAmplitude = amplitude * (1 - progress);
  const oscillation = Math.sin(progress * Math.PI * 4) * decreasingAmplitude;
  return baseValue + oscillation;
}

/**
 * Format number with commas and optional suffix
 */
export function formatCounterValue(value: number, suffix?: string): string {
  const rounded = Math.round(value);
  const withCommas = rounded.toLocaleString('en-US');
  return suffix ? `${withCommas}${suffix}` : withCommas;
}

// ============================================================================
// PRE-DEFINED WAVE CONFIGURATIONS
// ============================================================================

export const WAVE_PRESETS = {
  // Hero overlay waves - large, flowing
  heroOverlay: {
    layers: [
      { amplitude: 30, frequency: 1.5, phase: 0, yOffset: 50, opacity: 0.1, speed: 0.5 },
      { amplitude: 25, frequency: 2, phase: 0.33, yOffset: 50, opacity: 0.08, speed: 0.7 },
      { amplitude: 20, frequency: 2.5, phase: 0.66, yOffset: 50, opacity: 0.06, speed: 0.9 },
    ],
  },

  // Stats section waves - subtle background
  statsBackground: {
    layers: [
      { amplitude: 15, frequency: 2, phase: 0, yOffset: 50, opacity: 0.05, speed: 0.3 },
      { amplitude: 10, frequency: 3, phase: 0.5, yOffset: 50, opacity: 0.03, speed: 0.4 },
    ],
  },

  // Footer waves - decorative bottom border
  footer: {
    layers: [
      { amplitude: 20, frequency: 1, phase: 0, yOffset: 50, opacity: 0.15, speed: 0.4 },
    ],
  },

  // Cursor trail wave path
  cursorTrail: {
    pathWidth: 200,
    pathHeight: 100,
    cycles: 2,
    amplitude: 30,
  },
} as const;

// ============================================================================
// WAVE ANIMATION TIMING
// ============================================================================

/**
 * Calculate animation duration based on wave speed
 */
export function calculateWaveDuration(baseDuration: number, speed: number = 1): number {
  return baseDuration / speed;
}

/**
 * Easing function for wave animations
 */
export const WAVE_EASE = 'sine.inOut';

/**
 * Default animation durations for different wave types
 */
export const WAVE_DURATIONS = {
  textReveal: 0.8,
  overlay: 3,
  ripple: 1,
  counter: 2,
  cursorTrail: 0.3,
} as const;
