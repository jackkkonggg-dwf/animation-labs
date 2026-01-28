// ============================================================================
// ADVANCED DEMO INDICATOR COMPONENT
// ============================================================================

'use client';

import { useState, useEffect, useRef, createContext, useContext } from 'react';
import type { ReactElement } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

// ============================================================================
// GSAP PLUGIN TYPES
// ============================================================================

export type GSAPPlugin =
  | 'Core'
  | 'ScrollTrigger'
  | 'Draggable'
  | 'SplitText'
  | 'MorphSVG'
  | 'MotionPath'
  | 'DrawSVG'
  | 'ScrambleText'
  | 'ScrollTo'
  | 'Observer'
  | 'Inertia'
  | 'ScrollSmoother';

export type AnimationState = 'playing' | 'paused' | 'reversed' | 'idle';

// ============================================================================
// ACTIVE PLUGINS CONTEXT
// ============================================================================

interface ActivePluginsContextValue {
  activePlugins: Set<GSAPPlugin>;
  registerPlugin: (plugin: GSAPPlugin) => void;
  unregisterPlugin: (plugin: GSAPPlugin) => void;
  getAnimationState: () => AnimationState;
}

const ActivePluginsContext = createContext<ActivePluginsContextValue | undefined>(undefined);

export function useActivePlugins(): ActivePluginsContextValue {
  const context = useContext(ActivePluginsContext);
  if (!context) {
    throw new Error('useActivePlugins must be used within ActivePluginsProvider');
  }
  return context;
}

interface ActivePluginsProviderProps {
  children: React.ReactNode;
}

export function ActivePluginsProvider({ children }: ActivePluginsProviderProps) {
  const [activePlugins, setActivePlugins] = useState<Set<GSAPPlugin>>(new Set());
  const animationStateRef = useRef<AnimationState>('idle');

  const registerPlugin = (plugin: GSAPPlugin) => {
    setActivePlugins((prev) => new Set(prev).add(plugin));
  };

  const unregisterPlugin = (plugin: GSAPPlugin) => {
    setActivePlugins((prev) => {
      const next = new Set(prev);
      next.delete(plugin);
      return next;
    });
  };

  const getAnimationState = () => {
    const globalTimeline = gsap.globalTimeline;
    const isPaused = globalTimeline.paused();
    const isReversed = globalTimeline.reversed();
    const hasActiveAnimations = globalTimeline.getChildren
      ? globalTimeline.getChildren().some((t: any) => t.isActive())
      : false;

    if (!hasActiveAnimations) return 'idle';
    if (isPaused) return 'paused';
    if (isReversed) return 'reversed';
    return 'playing';
  };

  return (
    <ActivePluginsContext.Provider
      value={{ activePlugins, registerPlugin, unregisterPlugin, getAnimationState }}
    >
      {children}
    </ActivePluginsContext.Provider>
  );
}

// ============================================================================
// PLUGIN ICONS
// ============================================================================

interface PluginIconProps {
  plugin: GSAPPlugin;
  isActive: boolean;
  size?: 'sm' | 'md';
}

function PluginIcon({ plugin, isActive, size = 'md' }: PluginIconProps) {
  const sizeClasses = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  const activeClasses = isActive ? 'text-orange-500' : 'text-zinc-600';

  const icons: Record<GSAPPlugin, ReactElement> = {
    Core: (
      <svg className={`${sizeClasses} ${activeClasses}`} fill="currentColor" viewBox="0 0 24 24">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    ScrollTrigger: (
      <svg className={`${sizeClasses} ${activeClasses}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    ),
    Draggable: (
      <svg className={`${sizeClasses} ${activeClasses}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16M8 4v16M16 4v16" />
      </svg>
    ),
    SplitText: (
      <svg className={`${sizeClasses} ${activeClasses}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h10M4 18h16" />
      </svg>
    ),
    MorphSVG: (
      <svg className={`${sizeClasses} ${activeClasses}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12c0-4 4-8 8-8s8 4 8 8-4 8-8 8-8-4-8-8z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12c0-2 2-4 4-4s4 2 4 4-2 4-4 4-4-2-4-4z" />
      </svg>
    ),
    MotionPath: (
      <svg className={`${sizeClasses} ${activeClasses}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    DrawSVG: (
      <svg className={`${sizeClasses} ${activeClasses}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    ScrambleText: (
      <svg className={`${sizeClasses} ${activeClasses}`} fill="currentColor" viewBox="0 0 24 24">
        <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z" />
      </svg>
    ),
    ScrollTo: (
      <svg className={`${sizeClasses} ${activeClasses}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    ),
    Observer: (
      <svg className={`${sizeClasses} ${activeClasses}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    Inertia: (
      <svg className={`${sizeClasses} ${activeClasses}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h2m14 0h2M12 3v2m0 14v2" />
      </svg>
    ),
    ScrollSmoother: (
      <svg className={`${sizeClasses} ${activeClasses}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
      </svg>
    ),
  };

  return icons[plugin] || icons.Core;
}

// ============================================================================
// PATTERN TYPE COLORS
// ============================================================================

type PatternType = 'scroll-based' | 'interactive' | 'timeline-heavy' | 'text-animation';

interface PatternTypeConfig {
  label: string;
  color: string;
  bgColor: string;
}

const patternTypeConfigs: Record<PatternType, PatternTypeConfig> = {
  'scroll-based': { label: 'Scroll', color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
  'interactive': { label: 'Interactive', color: 'text-purple-400', bgColor: 'bg-purple-500/10' },
  'timeline-heavy': { label: 'Timeline', color: 'text-orange-400', bgColor: 'bg-orange-500/10' },
  'text-animation': { label: 'Text', color: 'text-green-400', bgColor: 'bg-green-500/10' },
};

// ============================================================================
// ANIMATION STATE INDICATOR
// ============================================================================

interface AnimationStateIndicatorProps {
  state: AnimationState;
}

function AnimationStateIndicator({ state }: AnimationStateIndicatorProps) {
  const stateConfig = {
    playing: { label: 'PLAYING', color: 'text-green-500', pulse: true },
    paused: { label: 'PAUSED', color: 'text-yellow-500', pulse: false },
    reversed: { label: 'REVERSED', color: 'text-orange-500', pulse: true },
    idle: { label: 'IDLE', color: 'text-zinc-500', pulse: false },
  };

  const config = stateConfig[state];
  const icon = {
    playing: <path d="M8 5v14l11-7z" />,
    paused: <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />,
    reversed: <path d="M4 12l8-8v16l-8-8z" />,
    idle: <circle cx="12" cy="12" r="2" />,
  };

  return (
    <div className="flex items-center gap-2">
      <svg
        className={`w-4 h-4 ${config.color} ${config.pulse ? 'animate-pulse' : ''}`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        {icon[state]}
      </svg>
      <span className={`text-xs font-black uppercase ${config.color}`}>{config.label}</span>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

interface AdvancedDemoIndicatorProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  patternTypes?: PatternType[];
}

// All available plugins that can be tracked
const ALL_PLUGINS: GSAPPlugin[] = [
  'Core',
  'ScrollTrigger',
  'Draggable',
  'SplitText',
  'MorphSVG',
  'MotionPath',
  'DrawSVG',
  'ScrambleText',
  'ScrollTo',
  'Observer',
  'Inertia',
  'ScrollSmoother',
];

export function AdvancedDemoIndicator({
  position = 'top-left',
  patternTypes = ['scroll-based', 'interactive', 'timeline-heavy', 'text-animation'],
}: AdvancedDemoIndicatorProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animationState, setAnimationState] = useState<AnimationState>('idle');
  const { activePlugins, getAnimationState } = useActivePlugins();
  const updateIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Update animation state periodically
  useEffect(() => {
    updateIntervalRef.current = setInterval(() => {
      setAnimationState(getAnimationState());
    }, 200);

    return () => {
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
      }
    };
  }, [getAnimationState]);

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  };

  const expansionOrigin = {
    'top-left': 'origin-top-left',
    'top-right': 'origin-top-right',
    'bottom-left': 'origin-bottom-left',
    'bottom-right': 'origin-bottom-right',
  };

  const activePluginCount = activePlugins.size;

  // Collapsed state - show active count
  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className={`fixed ${positionClasses[position]} z-50 p-3 bg-zinc-900/90 backdrop-blur border border-zinc-700 rounded hover:border-orange-500 transition-all duration-300 group`}
        aria-label="Open plugin indicator"
      >
        <div className="flex items-center gap-2">
          <PluginIcon plugin="Core" isActive={activePluginCount > 0} size="sm" />
          <span className="text-xs font-mono text-zinc-400 group-hover:text-orange-500 transition-colors">
            {activePluginCount} active
          </span>
          {activePluginCount > 0 && (
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
          )}
        </div>
      </button>
    );
  }

  return (
    <div
      className={`fixed ${positionClasses[position]} ${expansionOrigin[position]} z-50 w-72 bg-zinc-900/95 backdrop-blur border border-zinc-700 rounded-lg shadow-2xl overflow-hidden transition-all duration-300`}
    >
      {/* Header with close */}
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-800/50 border-b border-zinc-700">
        <div className="flex items-center gap-2">
          <PluginIcon plugin="Core" isActive={activePluginCount > 0} size="sm" />
          <span className="text-xs font-black text-white uppercase tracking-wider">
            Active Plugins
          </span>
          <span className="px-1.5 py-0.5 bg-orange-500/20 rounded text-xs font-mono text-orange-500">
            {activePluginCount}
          </span>
        </div>
        <button
          onClick={() => setIsExpanded(false)}
          className="p-1 text-zinc-500 hover:text-zinc-300 transition-colors"
          aria-label="Close plugin indicator"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Animation State */}
        <div className="flex items-center justify-between p-2 bg-zinc-800/50 rounded border border-zinc-700">
          <span className="text-xs font-mono text-zinc-500 uppercase">State</span>
          <AnimationStateIndicator state={animationState} />
        </div>

        {/* Divider */}
        <div className="h-px bg-zinc-800" />

        {/* Active Plugins Grid */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-zinc-500 uppercase">GSAP Features</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {ALL_PLUGINS.map((plugin) => {
              const isActive = activePlugins.has(plugin);
              return (
                <div
                  key={plugin}
                  className={`flex flex-col items-center gap-1 p-2 rounded transition-all ${
                    isActive
                      ? 'bg-orange-500/20 border border-orange-500/50'
                      : 'bg-zinc-800/50 border border-zinc-700 opacity-50'
                  }`}
                  title={plugin}
                >
                  <PluginIcon plugin={plugin} isActive={isActive} size="sm" />
                  <span className="text-[9px] font-mono text-zinc-400 truncate w-full text-center">
                    {plugin.slice(0, 6)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-zinc-800" />

        {/* Legend */}
        <div>
          <span className="text-xs font-mono text-zinc-500 uppercase block mb-2">Pattern Types</span>
          <div className="flex flex-wrap gap-2">
            {patternTypes.map((type) => {
              const config = patternTypeConfigs[type];
              return (
                <div
                  key={type}
                  className={`px-2 py-1 rounded ${config.bgColor} border border-${config.color.split('-')[1]}-500/30`}
                >
                  <span className={`text-[10px] font-black uppercase ${config.color}`}>
                    {config.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* GSAP Info */}
        <div className="pt-2 border-t border-zinc-800">
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-600">
            <span>ScrollTriggers:</span>
            <span className="text-orange-500">{ScrollTrigger.getAll().length}</span>
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-600 mt-1">
            <span>Global Timeline:</span>
            <span className={animationState === 'playing' ? 'text-green-500' : 'text-zinc-500'}>
              {gsap.globalTimeline.paused() ? 'Paused' : gsap.globalTimeline.reversed() ? 'Reversed' : 'Active'}
            </span>
          </div>
        </div>
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-orange-500/50" />
    </div>
  );
}
