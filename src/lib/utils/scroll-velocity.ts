// ============================================================================
// SCROLL VELOCITY UTILITY
// ============================================================================
// Provides scroll position, velocity, and direction tracking
// ============================================================================

// ============================================================================
// TYPES
// ============================================================================

export type ScrollDirection = 'up' | 'down' | 'none';

export interface ScrollState {
  /** Current scroll position in pixels */
  position: number;
  /** Maximum scrollable distance in pixels */
  maxScroll: number;
  /** Scroll velocity in pixels per millisecond */
  velocity: number;
  /** Current scroll direction */
  direction: ScrollDirection;
  /** Scroll progress as percentage (0-1) */
  progress: number;
}

export interface ScrollVelocityOptions {
  /** Update interval in milliseconds (default: 16ms ~ 60fps) */
  updateInterval?: number;
  /** Minimum velocity threshold to consider as scrolling (default: 0.01 px/ms) */
  velocityThreshold?: number;
  /** Enable smooth velocity averaging (default: true) */
  smoothVelocity?: boolean;
}

// ============================================================================
// SCROLL VELOCITY TRACKER CLASS
// ============================================================================

/**
 * ScrollVelocityTracker monitors scroll position, velocity, and direction
 * using requestAnimationFrame for smooth, real-time updates.
 *
 * @example
 * ```ts
 * const tracker = new ScrollVelocityTracker();
 * tracker.start();
 * const state = tracker.getState(); // { position, velocity, direction, ... }
 * tracker.stop();
 * ```
 */
export class ScrollVelocityTracker {
  private state: ScrollState;
  private animationFrameId: number | null = null;
  private lastScrollY: number = 0;
  private lastScrollTime: number = 0;
  private velocityHistory: number[] = [];
  private isRunning: boolean = false;
  private updateInterval: number;
  private velocityThreshold: number;
  private smoothVelocity: boolean;
  private lastUpdateTime: number = 0;

  constructor(options: ScrollVelocityOptions = {}) {
    this.updateInterval = options.updateInterval ?? 16;
    this.velocityThreshold = options.velocityThreshold ?? 0.01;
    this.smoothVelocity = options.smoothVelocity ?? true;

    this.state = {
      position: 0,
      maxScroll: 0,
      velocity: 0,
      direction: 'none',
      progress: 0,
    };

    this.lastScrollY = window.scrollY;
    this.lastScrollTime = performance.now();
    this.lastUpdateTime = performance.now();
  }

  /**
   * Get current scroll state
   */
  getState(): Readonly<ScrollState> {
    return { ...this.state };
  }

  /**
   * Get just the velocity value
   */
  getVelocity(): number {
    return this.state.velocity;
  }

  /**
   * Get just the direction
   */
  getDirection(): ScrollDirection {
    return this.state.direction;
  }

  /**
   * Check if currently scrolling (above threshold)
   */
  isScrolling(): boolean {
    return this.state.velocity > this.velocityThreshold;
  }

  /**
   * Start tracking scroll
   */
  start(): void {
    if (this.isRunning) return;

    this.isRunning = true;
    this.lastScrollY = window.scrollY;
    this.lastScrollTime = performance.now();
    this.lastUpdateTime = performance.now();
    this.tick();
  }

  /**
   * Stop tracking scroll
   */
  stop(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.isRunning = false;
    // Reset velocity to 0 when stopped
    this.state.velocity = 0;
    this.state.direction = 'none';
  }

  /**
   * Reset all state
   */
  reset(): void {
    this.state = {
      position: 0,
      maxScroll: 0,
      velocity: 0,
      direction: 'none',
      progress: 0,
    };
    this.velocityHistory = [];
    this.lastScrollY = window.scrollY;
    this.lastScrollTime = performance.now();
  }

  /**
   * Check if tracker is currently running
   */
  isActive(): boolean {
    return this.isRunning;
  }

  /**
   * Main update loop
   */
  private tick = (): void => {
    if (!this.isRunning) return;

    const now = performance.now();
    const timeSinceLastUpdate = now - this.lastUpdateTime;

    // Throttle updates to specified interval
    if (timeSinceLastUpdate >= this.updateInterval) {
      const currentScrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      const deltaY = currentScrollY - this.lastScrollY;
      const deltaTime = now - this.lastScrollTime;

      // Calculate velocity (pixels per millisecond)
      const rawVelocity = deltaTime > 0 ? Math.abs(deltaY / deltaTime) : 0;

      // Smooth velocity using moving average
      let velocity = rawVelocity;
      if (this.smoothVelocity) {
        this.velocityHistory.push(rawVelocity);
        if (this.velocityHistory.length > 5) {
          this.velocityHistory.shift();
        }
        velocity =
          this.velocityHistory.reduce((a, b) => a + b, 0) / this.velocityHistory.length;
      }

      // Determine direction
      const direction: ScrollDirection =
        Math.abs(deltaY) < 1 ? 'none' : deltaY > 0 ? 'down' : 'up';

      // Calculate progress
      const progress = maxScroll > 0 ? currentScrollY / maxScroll : 0;

      this.state = {
        position: Math.round(currentScrollY),
        maxScroll: Math.round(maxScroll),
        velocity: Math.round(velocity * 100) / 100, // 2 decimal places
        direction,
        progress: Math.min(Math.max(progress, 0), 1),
      };

      this.lastScrollY = currentScrollY;
      this.lastScrollTime = now;
      this.lastUpdateTime = now;
    }

    this.animationFrameId = requestAnimationFrame(this.tick);
  };
}

// ============================================================================
// SCROLL STATE HELPERS
// ============================================================================

/**
 * Get scroll position as percentage
 * @param position - Current scroll position in pixels
 * @param maxScroll - Maximum scrollable distance in pixels
 * @returns Progress as percentage (0-100)
 */
export function getScrollProgress(position: number, maxScroll: number): number {
  if (maxScroll <= 0) return 0;
  return Math.min(Math.max((position / maxScroll) * 100, 0), 100);
}

/**
 * Check if scroll direction is active
 * @param direction - Direction to check
 * @returns True if direction is 'up' or 'down' (not 'none')
 */
export function isDirectionActive(direction: ScrollDirection): boolean {
  return direction === 'up' || direction === 'down';
}

/**
 * Get direction vector for scroll direction
 * @param direction - Scroll direction
 * @returns -1 for up, 1 for down, 0 for none
 */
export function getDirectionVector(direction: ScrollDirection): number {
  switch (direction) {
    case 'up':
      return -1;
    case 'down':
      return 1;
    default:
      return 0;
  }
}

// ============================================================================
// REACT HOOK
// ============================================================================

import { useState, useEffect, useRef } from 'react';

/**
 * React hook for scroll state tracking
 * Automatically manages lifecycle and returns current scroll state
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const scrollState = useScrollState();
 *   return (
 *     <div>
 *       <p>Position: {scrollState.position}px</p>
 *       <p>Velocity: {scrollState.velocity} px/ms</p>
 *       <p>Direction: {scrollState.direction}</p>
 *     </div>
 *   );
 * }
 * ```
 */
export function useScrollState(options: ScrollVelocityOptions = {}): ScrollState {
  const trackerRef = useRef<ScrollVelocityTracker | null>(null);
  const [state, setState] = useState<ScrollState>({
    position: 0,
    maxScroll: 0,
    velocity: 0,
    direction: 'none',
    progress: 0,
  });

  useEffect(() => {
    const tracker = new ScrollVelocityTracker(options);
    trackerRef.current = tracker;

    // Set up interval to sync state to React
    const interval = setInterval(() => {
      setState(tracker.getState());
    }, options.updateInterval ?? 16);

    tracker.start();

    return () => {
      tracker.stop();
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // Options properties are destructured above - only re-run when those specific values change
  }, [options.updateInterval, options.velocityThreshold, options.smoothVelocity]);

  return state;
}

/**
 * React hook that only returns scroll velocity
 * Useful for performance-sensitive components that only need velocity
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const velocity = useScrollVelocity();
 *   const isFastScroll = velocity > 2;
 *   return <div className={isFastScroll ? 'fast' : 'slow'}>Content</div>;
 * }
 * ```
 */
export function useScrollVelocity(options: ScrollVelocityOptions = {}): number {
  const state = useScrollState(options);
  return state.velocity;
}
