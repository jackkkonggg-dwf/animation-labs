// ============================================================================
// DEBUG MODE TOGGLE COMPONENT
// ============================================================================

'use client';

import { useState, useEffect, useRef, createContext, useContext } from 'react';
import { ScrollTrigger } from '@/lib/gsap-config';

// ============================================================================
// DEBUG MODE CONTEXT
// ============================================================================

interface DebugModeContextValue {
  isEnabled: boolean;
  toggle: () => void;
  enable: () => void;
  disable: () => void;
}

const DebugModeContext = createContext<DebugModeContextValue | undefined>(undefined);

export function useDebugMode(): DebugModeContextValue {
  const context = useContext(DebugModeContext);
  if (!context) {
    throw new Error('useDebugMode must be used within DebugModeProvider');
  }
  return context;
}

interface DebugModeProviderProps {
  children: React.ReactNode;
}

export function DebugModeProvider({ children }: DebugModeProviderProps) {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Set ScrollTrigger defaults based on debug mode
    if (isEnabled) {
      ScrollTrigger.defaults({ markers: true });
      // Refresh to show markers on existing triggers
      ScrollTrigger.refresh();
    } else {
      ScrollTrigger.defaults({ markers: false });
      // Refresh to hide markers
      ScrollTrigger.refresh();
    }
  }, [isEnabled]);

  const toggle = () => setIsEnabled((prev) => !prev);
  const enable = () => setIsEnabled(true);
  const disable = () => setIsEnabled(false);

  return (
    <DebugModeContext.Provider value={{ isEnabled, toggle, enable, disable }}>
      {children}
    </DebugModeContext.Provider>
  );
}

// ============================================================================
// SCROLL STATE TRACKING
// ============================================================================

interface ScrollState {
  position: number;
  maxScroll: number;
  velocity: number;
  direction: 'up' | 'down' | 'none';
}

function useScrollState() {
  const [scrollState, setScrollState] = useState<ScrollState>({
    position: 0,
    maxScroll: 0,
    velocity: 0,
    direction: 'none',
  });

  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(0);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      const now = performance.now();
      const currentScrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      const deltaY = currentScrollY - lastScrollY.current;
      const deltaTime = now - lastScrollTime.current;

      // Calculate velocity (pixels per millisecond)
      const velocity = deltaTime > 0 ? Math.abs(deltaY / deltaTime) : 0;
      const direction = deltaY > 0 ? 'down' : deltaY < 0 ? 'up' : 'none';

      lastScrollY.current = currentScrollY;
      lastScrollTime.current = now;

      setScrollState({
        position: Math.round(currentScrollY),
        maxScroll: Math.round(maxScroll),
        velocity: Math.round(velocity * 100) / 100, // Convert to px/ms with 2 decimals
        direction,
      });

      rafId = requestAnimationFrame(handleScroll);
    };

    rafId = requestAnimationFrame(handleScroll);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  return scrollState;
}

// ============================================================================
// SCROLLTRIGGER DEBUG INFO
// ============================================================================

interface ScrollTriggerInfo {
  id: string;
  trigger: string;
  start: string;
  end: string;
  scrub: boolean | number;
  progress: number;
  isActive: boolean;
}

function useScrollTriggerDebug() {
  const [triggers, setTriggers] = useState<ScrollTriggerInfo[]>([]);

  useEffect(() => {
    const updateTriggers = () => {
      const allTriggers = ScrollTrigger.getAll();

      // Accessing internal ScrollTrigger properties that aren't fully typed
      const triggerInfos: ScrollTriggerInfo[] = allTriggers.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (st: any, index) => ({
          id: st.id || `st-${index}`,
          trigger: st.trigger?.className || st.trigger?.id || st.trigger?.tagName || 'unknown',
          start: st.start || 'N/A',
          end: st.end || 'N/A',
          scrub: st.scrub || false,
          progress: st.progress || 0,
          isActive: st.isActive || false,
        })
      );

      setTriggers(triggerInfos);
    };

    // Update triggers periodically
    const interval = setInterval(updateTriggers, 500);

    // Initial update
    updateTriggers();

    return () => clearInterval(interval);
  }, []);

  return triggers;
}

// ============================================================================
// TOGGLE SWITCH COMPONENT
// ============================================================================

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: () => void;
  label: string;
}

function ToggleSwitch({ enabled, onChange, label }: ToggleSwitchProps) {
  return (
    <button
      onClick={onChange}
      className="flex items-center gap-3 w-full group"
      role="switch"
      aria-checked={enabled}
    >
      <div className="relative">
        <div
          className={`w-12 h-6 rounded-full transition-colors duration-300 ${
            enabled ? 'bg-orange-500' : 'bg-zinc-700'
          }`}
        />
        <div
          className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 ${
            enabled ? 'translate-x-7' : 'translate-x-1'
          }`}
        />
      </div>
      <span className="text-xs font-mono text-zinc-400 uppercase group-hover:text-zinc-300 transition-colors">
        {label}
      </span>
    </button>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

interface DebugModeToggleProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export function DebugModeToggle({ position = 'bottom-right' }: DebugModeToggleProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isEnabled, toggle } = useDebugMode();
  const scrollState = useScrollState();
  const triggers = useScrollTriggerDebug();

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

  // Collapsed state - just the debug icon
  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className={`fixed ${positionClasses[position]} z-50 p-2 bg-zinc-900/90 backdrop-blur border border-zinc-700 rounded hover:border-orange-500 transition-colors duration-300`}
        aria-label="Open debug panel"
      >
        <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
    );
  }

  // Expanded state - full debug panel
  return (
    <div
      className={`fixed ${positionClasses[position]} ${expansionOrigin[position]} z-50 w-80 bg-zinc-900/95 backdrop-blur border border-zinc-700 rounded-lg shadow-2xl overflow-hidden transition-all duration-300`}
    >
      {/* Header with toggle and close */}
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-800/50 border-b border-zinc-700">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-xs font-black text-white uppercase tracking-wider">
            Debug Mode
          </span>
        </div>
        <button
          onClick={() => setIsExpanded(false)}
          className="p-1 text-zinc-500 hover:text-zinc-300 transition-colors"
          aria-label="Close debug panel"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
        {/* Debug mode toggle */}
        <ToggleSwitch enabled={isEnabled} onChange={toggle} label="Show ScrollTrigger Markers" />

        {isEnabled && (
          <>
            {/* Divider */}
            <div className="h-px bg-zinc-800" />

            {/* Scroll State */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-500 uppercase">Scroll Position</span>
                <span className="text-sm font-mono text-zinc-300">
                  {scrollState.position}px / {scrollState.maxScroll}px
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-500 uppercase">Velocity</span>
                <div className="flex items-center gap-2">
                  <svg
                    className={`w-3 h-3 ${
                      scrollState.direction === 'down'
                        ? 'text-green-500'
                        : scrollState.direction === 'up'
                        ? 'text-orange-500'
                        : 'text-zinc-600'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {scrollState.direction === 'down' ? (
                      <path d="M12 16l-6-6h12l-6 6z" />
                    ) : scrollState.direction === 'up' ? (
                      <path d="M12 8l6 6H6l6-6z" />
                    ) : (
                      <circle cx="12" cy="12" r="2" />
                    )}
                  </svg>
                  <span className="text-sm font-mono text-orange-500">
                    {scrollState.velocity} px/ms
                  </span>
                </div>
              </div>

              {/* Scroll progress bar */}
              <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500 transition-all duration-75"
                  style={{
                    width: `${Math.min((scrollState.position / scrollState.maxScroll) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-zinc-800" />

            {/* ScrollTrigger Info */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-zinc-500 uppercase">ScrollTriggers</span>
                <span className="text-xs font-black text-orange-500">{triggers.length}</span>
              </div>

              <div className="space-y-2 max-h-40 overflow-y-auto">
                {triggers.length === 0 ? (
                  <p className="text-xs text-zinc-600 font-mono">No ScrollTriggers found</p>
                ) : (
                  triggers.map((trigger, _index) => (
                    <div
                      key={trigger.id}
                      className={`p-2 rounded border transition-all ${
                        trigger.isActive
                          ? 'bg-orange-500/10 border-orange-500/30'
                          : 'bg-zinc-800/50 border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-mono text-zinc-400 truncate max-w-[120px]">
                          {trigger.trigger}
                        </span>
                        <div
                          className={`w-2 h-2 rounded-full ${
                            trigger.isActive ? 'bg-orange-500 animate-pulse' : 'bg-zinc-600'
                          }`}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-1 text-[10px] font-mono">
                        <span className="text-zinc-500">Start: {trigger.start}</span>
                        <span className="text-zinc-500">End: {trigger.end}</span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[10px] font-mono text-zinc-500">
                          Scrub: {trigger.scrub === true ? 'true' : trigger.scrub || 'false'}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500">
                          {Math.round(trigger.progress * 100)}%
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-orange-500/50" />
    </div>
  );
}
