// ============================================================================
// PERFORMANCE METRICS COMPONENT
// ============================================================================

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

// ============================================================================
// FPS UTILITY (Inline - will be extracted to utils in US-005)
// ============================================================================

interface FPSState {
  current: number;
  average: number;
  frameCount: number;
  lastTime: number;
  fpsValues: number[];
}

function useFPSCounter() {
  const fpsRef = useRef<FPSState>({
    current: 60,
    average: 60,
    frameCount: 0,
    lastTime: performance.now(),
    fpsValues: [],
  });

  const [fps, setFps] = useState({ current: 60, average: 60 });

  useEffect(() => {
    let animationFrameId: number;

    const updateFPS = () => {
      const now = performance.now();
      const delta = now - fpsRef.current.lastTime;

      fpsRef.current.frameCount++;

      // Update every 500ms for stable readings
      if (delta >= 500) {
        const currentFps = Math.round((fpsRef.current.frameCount * 1000) / delta);

        // Keep last 10 values for average
        fpsRef.current.fpsValues.push(currentFps);
        if (fpsRef.current.fpsValues.length > 10) {
          fpsRef.current.fpsValues.shift();
        }

        const averageFps = Math.round(
          fpsRef.current.fpsValues.reduce((a, b) => a + b, 0) / fpsRef.current.fpsValues.length
        );

        fpsRef.current.current = currentFps;
        fpsRef.current.average = averageFps;
        fpsRef.current.frameCount = 0;
        fpsRef.current.lastTime = now;

        setFps({ current: currentFps, average: averageFps });
      }

      animationFrameId = requestAnimationFrame(updateFPS);
    };

    animationFrameId = requestAnimationFrame(updateFPS);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return fps;
}

// ============================================================================
// GSAP METRICS TRACKING
// ============================================================================

interface GSMAPMetrics {
  activeTimelines: number;
  scrollTriggerCount: number;
  totalDuration: number;
}

function useGSAPMetrics() {
  const [metrics, setMetrics] = useState<GSMAPMetrics>({
    activeTimelines: 0,
    scrollTriggerCount: 0,
    totalDuration: 0,
  });

  const updateMetrics = useCallback(() => {
    // Get all active timelines from gsap.globalTimeline
    const globalTimeline = gsap.globalTimeline;
    const activeTimelines = globalTimeline.getChildren
      ? globalTimeline.getChildren().filter((tl: any) => tl.isActive()).length
      : 0;

    // Count ScrollTrigger instances
    const scrollTriggerCount = ScrollTrigger?.getAll?.().length ?? 0;

    // Calculate total duration of active animations
    const activeTweens = gsap.globalTimeline.getChildren
      ? gsap.globalTimeline.getChildren().filter((t: any) => t.isActive())
      : [];
    const totalDuration = activeTweens.reduce((sum: number, tween: any) => {
      return sum + (tween.duration?.() || 0);
    }, 0);

    setMetrics({
      activeTimelines,
      scrollTriggerCount,
      totalDuration: Math.round(totalDuration * 1000) / 1000,
    });
  }, []);

  useEffect(() => {
    // Update metrics every second
    const interval = setInterval(updateMetrics, 1000);
    return () => clearInterval(interval);
  }, [updateMetrics]);

  return metrics;
}

// ============================================================================
// COLOR CODING
// ============================================================================

function getFPSColor(fps: number): string {
  if (fps >= 50) return 'text-green-500';
  if (fps >= 30) return 'text-yellow-500';
  return 'text-red-500';
}

function getFPSStatus(fps: number): { text: string; pulse: boolean } {
  if (fps >= 50) return { text: 'EXCELLENT', pulse: false };
  if (fps >= 30) return { text: 'GOOD', pulse: true };
  return { text: 'POOR', pulse: true };
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

interface PerformanceMetricsProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export function PerformanceMetrics({ position = 'top-right' }: PerformanceMetricsProps) {
  const [isVisible, setIsVisible] = useState(true);
  const fps = useFPSCounter();
  const gsapMetrics = useGSAPMetrics();

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  };

  const currentFPSColor = getFPSColor(fps.current);
  const averageFPSColor = getFPSColor(fps.average);
  const currentStatus = getFPSStatus(fps.current);

  if (!isVisible) {
    // Show toggle button when collapsed
    return (
      <button
        onClick={() => setIsVisible(true)}
        className={`fixed ${positionClasses[position]} z-50 p-2 bg-zinc-900/90 backdrop-blur border border-zinc-700 rounded hover:border-orange-500 transition-colors duration-300`}
        aria-label="Show performance metrics"
      >
        <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </button>
    );
  }

  return (
    <div
      className={`fixed ${positionClasses[position]} z-50 w-64 bg-zinc-900/95 backdrop-blur border border-zinc-700 rounded-lg shadow-2xl overflow-hidden`}
    >
      {/* Header with toggle */}
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-800/50 border-b border-zinc-700">
        <div className="flex items-center gap-2">
          <svg
            className={`w-4 h-4 ${currentFPSColor} ${currentStatus.pulse ? 'animate-pulse' : ''}`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="text-xs font-black text-white uppercase tracking-wider">
            Performance
          </span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="p-1 text-zinc-500 hover:text-zinc-300 transition-colors"
          aria-label="Hide performance metrics"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Metrics */}
      <div className="p-4 space-y-4">
        {/* Current FPS */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-zinc-500 uppercase">FPS</span>
          <span className={`text-xl font-black font-mono ${currentFPSColor}`}>
            {fps.current}
          </span>
        </div>

        {/* FPS Bar */}
        <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${currentFPSColor.replace('text-', 'bg-')}`}
            style={{ width: `${Math.min(fps.current, 60) / 60 * 100}%` }}
          />
        </div>

        {/* Average FPS */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-zinc-500 uppercase">Avg FPS</span>
          <span className={`text-sm font-mono ${averageFPSColor}`}>
            {fps.average}
          </span>
        </div>

        {/* Status indicator */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-zinc-500 uppercase">Status</span>
          <span className={`text-xs font-black uppercase ${currentFPSColor}`}>
            {currentStatus.text}
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-zinc-800" />

        {/* GSAP Metrics */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-500 uppercase">Timelines</span>
            <span className="text-sm font-mono text-orange-500">
              {gsapMetrics.activeTimelines}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-500 uppercase">ScrollTriggers</span>
            <span className="text-sm font-mono text-orange-500">
              {gsapMetrics.scrollTriggerCount}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-500 uppercase">Duration</span>
            <span className="text-sm font-mono text-orange-500">
              {gsapMetrics.totalDuration}s
            </span>
          </div>
        </div>
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-orange-500/50" />
    </div>
  );
}
