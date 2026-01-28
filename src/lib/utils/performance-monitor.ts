// ============================================================================
// PERFORMANCE MONITOR UTILITY
// ============================================================================
// Provides real-time FPS tracking with rolling average for performance monitoring
// ============================================================================

// ============================================================================
// TYPES
// ============================================================================

export interface FPSState {
  current: number;
  average: number;
  frameCount: number;
  lastTime: number;
  fpsValues: number[];
}

export interface PerformanceMetrics {
  current: number;
  average: number;
}

export interface PerformanceMonitorOptions {
  /** Update interval in milliseconds (default: 500ms) */
  updateInterval?: number;
  /** Number of samples to keep for average calculation (default: 10) */
  sampleSize?: number;
}

// ============================================================================
// FPS MONITOR CLASS
// ============================================================================

/**
 * PerformanceMonitor tracks real-time FPS using requestAnimationFrame
 * with rolling average calculation for stable readings.
 *
 * @example
 * ```ts
 * const monitor = new PerformanceMonitor();
 * const metrics = monitor.getMetrics(); // { current: 60, average: 58 }
 * monitor.start();
 * // ... later
 * monitor.stop();
 * ```
 */
export class PerformanceMonitor {
  private state: FPSState;
  private animationFrameId: number | null = null;
  private updateInterval: number;
  private sampleSize: number;
  private isRunning: boolean = false;

  constructor(options: PerformanceMonitorOptions = {}) {
    this.updateInterval = options.updateInterval ?? 500;
    this.sampleSize = options.sampleSize ?? 10;

    this.state = {
      current: 60,
      average: 60,
      frameCount: 0,
      lastTime: performance.now(),
      fpsValues: [],
    };
  }

  /**
   * Get current FPS metrics without starting the monitor
   */
  getMetrics(): PerformanceMetrics {
    return {
      current: this.state.current,
      average: this.state.average,
    };
  }

  /**
   * Get raw state including frame count and history
   */
  getState(): Readonly<FPSState> {
    return { ...this.state };
  }

  /**
   * Start monitoring FPS
   */
  start(): void {
    if (this.isRunning) return;

    this.isRunning = true;
    this.state.lastTime = performance.now();
    this.state.frameCount = 0;
    this.tick();
  }

  /**
   * Stop monitoring FPS
   */
  stop(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.isRunning = false;
  }

  /**
   * Reset all metrics
   */
  reset(): void {
    this.state = {
      current: 60,
      average: 60,
      frameCount: 0,
      lastTime: performance.now(),
      fpsValues: [],
    };
  }

  /**
   * Check if monitor is currently running
   */
  isActive(): boolean {
    return this.isRunning;
  }

  /**
   * Main update loop called via requestAnimationFrame
   */
  private tick = (): void => {
    if (!this.isRunning) return;

    const now = performance.now();
    const delta = now - this.state.lastTime;

    this.state.frameCount++;

    // Update metrics at specified interval
    if (delta >= this.updateInterval) {
      const currentFps = Math.round((this.state.frameCount * 1000) / delta);

      // Maintain rolling average of specified sample size
      this.state.fpsValues.push(currentFps);
      if (this.state.fpsValues.length > this.sampleSize) {
        this.state.fpsValues.shift();
      }

      const averageFps = Math.round(
        this.state.fpsValues.reduce((a, b) => a + b, 0) / this.state.fpsValues.length
      );

      this.state.current = currentFps;
      this.state.average = averageFps;
      this.state.frameCount = 0;
      this.state.lastTime = now;
    }

    this.animationFrameId = requestAnimationFrame(this.tick);
  };
}

// ============================================================================
// FPS COLOR/STATUS HELPERS
// ============================================================================

/**
 * Get Tailwind color class for FPS value
 * @param fps - FPS value to evaluate
 * @returns Tailwind color class name (text-green-500, text-yellow-500, text-red-500)
 */
export function getFPSColor(fps: number): string {
  if (fps >= 50) return 'text-green-500';
  if (fps >= 30) return 'text-yellow-500';
  return 'text-red-500';
}

/**
 * Get background color class for FPS value
 * @param fps - FPS value to evaluate
 * @returns Tailwind background color class name
 */
export function getFPSBgColor(fps: number): string {
  if (fps >= 50) return 'bg-green-500';
  if (fps >= 30) return 'bg-yellow-500';
  return 'bg-red-500';
}

/**
 * Get performance status text and pulse indication
 * @param fps - FPS value to evaluate
 * @returns Status object with text and whether to pulse
 */
export function getFPSStatus(fps: number): { text: string; pulse: boolean } {
  if (fps >= 50) return { text: 'EXCELLENT', pulse: false };
  if (fps >= 30) return { text: 'GOOD', pulse: true };
  return { text: 'POOR', pulse: true };
}

// ============================================================================
// REACT HOOK
// ============================================================================

import { useState, useEffect, useRef } from 'react';

/**
 * React hook for FPS monitoring
 * Automatically manages lifecycle and returns current metrics
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const fps = useFPSCounter({ updateInterval: 500 });
 *   return <div>FPS: {fps.current} (avg: {fps.average})</div>;
 * }
 * ```
 */
export function useFPSCounter(options: PerformanceMonitorOptions = {}): PerformanceMetrics {
  const monitorRef = useRef<PerformanceMonitor | null>(null);
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    current: 60,
    average: 60,
  });

  useEffect(() => {
    const monitor = new PerformanceMonitor(options);
    monitorRef.current = monitor;

    // Set up interval to sync metrics to React state
    const interval = setInterval(() => {
      setMetrics(monitor.getMetrics());
    }, options.updateInterval ?? 500);

    monitor.start();

    return () => {
      monitor.stop();
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // Options properties are destructured above - only re-run when those specific values change
  }, [options.updateInterval, options.sampleSize]);

  return metrics;
}
