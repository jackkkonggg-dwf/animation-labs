'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, Observer } from '@/lib/gsap-config';
import { useScrollState } from '@/lib/utils/scroll-velocity';
import { useSwipeCallback, useGestureRecognizer, type SwipeDirection } from '@/lib/utils/gesture-recognizer';

// ============================================================================
// SECTION 1: Cursor Trail with quickTo()
// ============================================================================

function CursorTrailSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const cursors = cursorRefs.current.filter(Boolean) as HTMLDivElement[];
    const quickTos: Array<(x: number) => void> = [];
    const quickToYs: Array<(y: number) => void> = [];

    // Create quickTo functions for each cursor trail element
    // quickTo is optimized for high-frequency updates like mouse tracking
    cursors.forEach((cursor, i) => {
      const lag = 0.1 + (i * 0.08); // Increasing lag for each trail element
      const xTo = gsap.quickTo(cursor, 'x', { duration: lag, ease: 'power2.out' });
      const yTo = gsap.quickTo(cursor, 'y', { duration: lag, ease: 'power2.out' });
      quickTos.push(xTo);
      quickToYs.push(yTo);

      // Set initial position off-screen
      gsap.set(cursor, { x: -100, y: -100, scale: 1 - (i * 0.15), opacity: 1 - (i * 0.15) });
    });

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update all cursor trails with cascading delay
      quickTos.forEach((xTo, i) => {
        setTimeout(() => xTo(x - 20), i * 30); // 20 is half of cursor width
      });
      quickToYs.forEach((yTo, i) => {
        setTimeout(() => yTo(y - 20), i * 30);
      });

      setMousePos({ x, y });
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Entry animation
    gsap.from(cursors, {
      scale: 0,
      opacity: 0,
      stagger: 0.05,
      duration: 0.5,
      ease: 'back.out(1.7)',
    });

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      // quickTo tweens are cleaned up automatically when component unmounts
      gsap.killTweensOf(cursors);
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden bg-zinc-950">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, #f97316 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      {/* Cursor trails */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            ref={(el) => { cursorRefs.current[i] = el; }}
            className="absolute w-10 h-10 rounded-full border-2 border-orange-500"
            style={{ left: 0, top: 0 }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <p className="text-orange-500 text-sm font-mono uppercase tracking-[0.3em] mb-4">
          gsap.quickTo()
        </p>
        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight text-center mb-6">
          Cursor
          <span className="block text-orange-500">Trail Effect</span>
        </h2>
        <p className="text-zinc-400 text-lg max-w-2xl text-center">
          Move your mouse to see the cascading trail effect. Each element follows with increasing lag for a fluid, organic feel.
        </p>
        <div className="mt-8 font-mono text-sm text-zinc-500">
          Position: ({Math.round(mousePos.x)}, {Math.round(mousePos.y)})
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-orange-500" />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-orange-500" />
    </section>
  );
}

// ============================================================================
// SECTION 2: Scroll Velocity Dynamic Speed
// ============================================================================

function VelocityScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollState = useScrollState({ updateInterval: 16 });
  const [displayVelocity, setDisplayVelocity] = useState(0);
  const smoothedVelocityRef = useRef({ value: 0 });
  // Ref to track current scroll velocity for ticker callback
  const currentVelocityRef = useRef(0);

  // Keep the ref in sync with scrollState
  currentVelocityRef.current = scrollState.velocity;

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = {
      title: container.querySelector('.velocity-title') as HTMLElement,
      cards: container.querySelectorAll('.velocity-card'),
      meter: container.querySelector('.velocity-meter') as HTMLElement,
      meterText: container.querySelector('.velocity-meter-text') as HTMLElement,
    };

    // ScrollTrigger with dynamic speed based on velocity
    gsap.from(elements.cards, {
      y: 100,
      opacity: 0,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: 'top center',
        toggleActions: 'play none none reverse',
      },
    });

    // Continuous smooth velocity following using ticker
    // This avoids creating multiple tweens and provides smooth lag/decay
    const updateVelocity = () => {
      const targetVelocity = currentVelocityRef.current;
      const current = smoothedVelocityRef.current.value;

      // Lerp (linear interpolation) towards target velocity
      // The 0.05 factor controls the lag - lower = more lag
      const lerpFactor = 0.05;
      const smoothedVelocity = current + (targetVelocity - current) * lerpFactor;

      smoothedVelocityRef.current.value = smoothedVelocity;
      setDisplayVelocity(smoothedVelocity);

      const isFast = targetVelocity > 1.5;

      // Update meter (convert px/ms to px/s by multiplying by 1000)
      const velocityInPxPerSecond = smoothedVelocity * 1000;
      const meterPercent = Math.min(velocityInPxPerSecond / 20, 100); // Scale: 1000px/s = 100%
      gsap.set(elements.meter, {
        width: `${meterPercent}%`,
        backgroundColor: isFast ? '#ef4444' : velocityInPxPerSecond > 700 ? '#f59e0b' : '#22c55e',
      });

      if (elements.meterText) {
        elements.meterText.textContent = `${velocityInPxPerSecond.toFixed(0)} px/s`;
      }

      // Scale cards based on smoothed velocity
      const scale = 1 + Math.min(velocityInPxPerSecond * 0.0001, 0.3);
      gsap.set(elements.cards, { scale });
    };

    gsap.ticker.add(updateVelocity);

    return () => {
      gsap.ticker.remove(updateVelocity);
      gsap.killTweensOf([...elements.cards, elements.meter, elements.meterText]);
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-32 bg-gradient-to-br from-zinc-900 via-zinc-950 to-orange-950">
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <p className="text-orange-500 text-sm font-mono uppercase tracking-[0.3em] mb-4">
          useScrollVelocity()
        </p>
        <h2 className="velocity-title text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-12">
          Scroll Speed
          <span className="block text-orange-500">Detection</span>
        </h2>

        {/* Velocity meter */}
        <div className="mb-12 bg-zinc-800 rounded-full h-6 overflow-hidden border border-zinc-700">
          <div
            className="velocity-meter h-full bg-green-500 transition-colors duration-200"
            style={{ width: `0%` }}
          />
        </div>
        <p className="velocity-meter-text text-zinc-400 font-mono text-sm mb-12">
          {(displayVelocity * 1000).toFixed(0)} px/s
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="velocity-card bg-zinc-800/80 backdrop-blur border-2 border-zinc-700 rounded-2xl p-6"
            >
              <div className="text-4xl font-black text-orange-500 mb-2">0{i + 1}</div>
              <div className="text-zinc-400 text-sm uppercase tracking-wider">
                Card reacts to velocity
              </div>
            </div>
          ))}
        </div>

        <p className="mt-12 text-zinc-500 text-sm">
          Scroll at different speeds to see the cards scale dynamically.
        </p>
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 3: Scroll Direction Awareness
// ============================================================================

function DirectionScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<'up' | 'down' | 'none'>('none');
  const scrollState = useScrollState();
  // Ref to track current direction for ScrollTrigger callback
  const currentDirectionRef = useRef<'up' | 'down' | 'none'>('none');

  // Keep the ref in sync with scrollState
  currentDirectionRef.current = scrollState.direction;

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = {
      circle: container.querySelector('.direction-circle') as HTMLElement,
      arrow: container.querySelector('.direction-arrow') as HTMLElement,
      cards: container.querySelectorAll('.direction-card'),
    };

    let lastDirection: 'up' | 'down' | 'none' = 'none';

    // Create ScrollTrigger for direction detection
    const directionTrigger = ScrollTrigger.create({
      trigger: container,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: () => {
        const currentDirection = currentDirectionRef.current;

        if (currentDirection !== lastDirection && currentDirection !== 'none') {
          lastDirection = currentDirection;
          setDirection(currentDirection);

          // Animate circle based on direction
          if (currentDirection === 'down') {
            gsap.to(elements.circle, {
              rotation: 180,
              scale: 1.2,
              backgroundColor: '#f97316',
              duration: 0.4,
              ease: 'back.out(1.7)',
            });
            gsap.to(elements.arrow, {
              y: 10,
              duration: 0.4,
            });
          } else if (currentDirection === 'up') {
            gsap.to(elements.circle, {
              rotation: 0,
              scale: 0.8,
              backgroundColor: '#3b82f6',
              duration: 0.4,
              ease: 'back.out(1.7)',
            });
            gsap.to(elements.arrow, {
              y: -10,
              duration: 0.4,
            });
          }

          // Different animations for cards based on direction
          if (currentDirection === 'down') {
            gsap.to(elements.cards, {
              x: (i) => (i % 2 === 0 ? 20 : -20),
              duration: 0.3,
              stagger: 0.05,
            });
          } else {
            gsap.to(elements.cards, {
              x: (i) => (i % 2 === 0 ? -20 : 20),
              duration: 0.3,
              stagger: 0.05,
            });
          }
        }
      },
    });

    return () => {
      directionTrigger.kill();
      gsap.killTweensOf([elements.circle, elements.arrow, ...elements.cards]);
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-32 bg-zinc-950">
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <p className="text-orange-500 text-sm font-mono uppercase tracking-[0.3em] mb-4">
          Scroll Direction Detection
        </p>
        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-12">
          Direction
          <span className="block text-orange-500">Awareness</span>
        </h2>

        {/* Direction indicator */}
        <div className="flex items-center justify-center mb-12">
          <div className="direction-circle w-32 h-32 bg-zinc-800 rounded-full flex items-center justify-center border-4 border-zinc-700">
            <div className="direction-arrow text-4xl">
              {direction === 'down' ? '↓' : direction === 'up' ? '↑' : '↕'}
            </div>
          </div>
        </div>

        <p className="text-center text-zinc-400 mb-12">
          Current direction: <span className="font-mono text-orange-500">{direction.toUpperCase()}</span>
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="direction-card bg-zinc-800/80 backdrop-blur border border-zinc-700 rounded-xl p-4 transition-colors"
            >
              <div className="text-center">
                <div className="text-2xl font-black text-zinc-400 mb-1">0{i + 1}</div>
                <div className="text-xs text-zinc-500 uppercase">
                  {direction === 'down' ? 'Slides right' : direction === 'up' ? 'Slides left' : 'Waiting'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 4: Swipe Gesture Animations
// ============================================================================

function SwipeGestureSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lastSwipe, setLastSwipe] = useState<SwipeDirection>('none');
  const [swipeCount, setSwipeCount] = useState(0);

  const swipeRef = useSwipeCallback({
    onSwipe: (gesture) => {
      setLastSwipe(gesture.direction);
      setSwipeCount(prev => prev + 1);

      const container = containerRef.current;
      if (!container) return;

      const box = container.querySelector('.swipe-box') as HTMLElement;
      if (!box) return;

      // Animate based on swipe direction
      switch (gesture.direction) {
        case 'left':
          gsap.to(box, { x: -100, rotation: -15, duration: 0.4, ease: 'power2.out' });
          break;
        case 'right':
          gsap.to(box, { x: 100, rotation: 15, duration: 0.4, ease: 'power2.out' });
          break;
        case 'up':
          gsap.to(box, { y: -100, scale: 1.2, duration: 0.4, ease: 'power2.out' });
          break;
        case 'down':
          gsap.to(box, { y: 100, scale: 0.8, duration: 0.4, ease: 'power2.out' });
          break;
      }

      // Reset after animation
      gsap.to(box, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        delay: 0.6,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });
    },
  });

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const box = container.querySelector('.swipe-box') as HTMLElement;
    if (!box) return;

    // Entry animation
    gsap.from(box, {
      scale: 0,
      rotation: -180,
      duration: 0.8,
      ease: 'back.out(1.7)',
    });

    return () => {
      gsap.killTweensOf(box);
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-32 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950">
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <p className="text-blue-500 text-sm font-mono uppercase tracking-[0.3em] mb-4">
          useSwipeCallback()
        </p>
        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-12">
          Swipe Gesture
          <span className="block text-blue-500">Recognition</span>
        </h2>

        {/* Swipe area */}
        <div
          ref={swipeRef}
          className="relative bg-zinc-800/50 backdrop-blur border-2 border-zinc-700 rounded-3xl p-12 min-h-[400px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
        >
          <div className="swipe-box w-48 h-48 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-2xl">
            <div className="text-center text-white">
              <div className="text-4xl mb-2">👆</div>
              <div className="text-sm font-mono uppercase">Swipe me!</div>
            </div>
          </div>

          {/* Direction indicators */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-zinc-500 text-sm">
            ↑ Swipe Up
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-zinc-500 text-sm">
            ↓ Swipe Down
          </div>
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">
            ← Swipe Left
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">
            Swipe Right →
          </div>
        </div>

        {/* Status */}
        <div className="mt-8 text-center">
          <p className="text-zinc-400 mb-2">
            Last swipe: <span className="font-mono text-blue-500">{lastSwipe.toUpperCase()}</span>
          </p>
          <p className="text-zinc-500 text-sm">
            Total swipes: <span className="font-mono">{swipeCount}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 5: Pinch Zoom on Images
// ============================================================================

function PinchZoomSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gestureAreaRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Use useGestureRecognizer for pinch support
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useGestureRecognizer(gestureAreaRef as any, {
    onPinchStart: () => {
      const box = containerRef.current?.querySelector('.pinch-box') as HTMLElement;
      if (box) {
        gsap.to(box, { borderColor: '#f97316', duration: 0.2 });
      }
    },
    onPinch: (gesture) => {
      setScale(gesture.scale);
      const container = containerRef.current;
      if (!container) return;

      const box = container.querySelector('.pinch-box') as HTMLElement;
      if (!box) return;

      gsap.to(box, {
        scale: Math.min(Math.max(gesture.scale, 0.5), 3),
        duration: 0.1,
        ease: 'power1.out',
      });
    },
    onPinchEnd: () => {
      const box = containerRef.current?.querySelector('.pinch-box') as HTMLElement;
      if (box) {
        gsap.to(box, {
          scale: 1,
          borderColor: '#3f3f46',
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
        });
        setTimeout(() => setScale(1), 500);
      }
    },
  });

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const box = container.querySelector('.pinch-box') as HTMLElement;
    if (!box) return;

    gsap.from(box, {
      scale: 0,
      rotation: -90,
      duration: 0.8,
      ease: 'back.out(1.7)',
    });

    return () => {
      gsap.killTweensOf(box);
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-32 bg-zinc-950">
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <p className="text-orange-500 text-sm font-mono uppercase tracking-[0.3em] mb-4">
          Pinch Gesture Recognition
        </p>
        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-12">
          Pinch to
          <span className="block text-orange-500">Zoom</span>
        </h2>

        {/* Pinch area */}
        <div
          ref={gestureAreaRef}
          className="relative bg-zinc-800/50 backdrop-blur border-2 border-zinc-700 rounded-3xl p-12 min-h-[400px] flex items-center justify-center touch-none"
        >
          <div className="pinch-box w-64 h-64 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl flex items-center justify-center shadow-2xl border-4 border-zinc-600">
            <div className="text-center text-white">
              <div className="text-4xl mb-2">🤏</div>
              <div className="text-sm font-mono uppercase">Pinch me!</div>
              <div className="text-xs mt-2 opacity-70">Or Ctrl+Scroll</div>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="mt-8 text-center">
          <p className="text-zinc-400">
            Current scale: <span className="font-mono text-orange-500">{scale.toFixed(2)}x</span>
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 6: Hover Interrupts Scroll Animation
// ============================================================================

function HoverInterruptSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = {
      circle: container.querySelector('.interrupt-circle') as HTMLElement,
      text: container.querySelector('.interrupt-text') as HTMLElement,
    };

    // Continuous rotation animation
    const rotationTween = gsap.to(elements.circle, {
      rotation: 360,
      duration: 10,
      repeat: -1,
      ease: 'none',
    });

    // Pulse animation
    const pulseTween = gsap.to(elements.circle, {
      scale: 1.1,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    // Color cycle animation
    const colorTween = gsap.to(elements.circle, {
      backgroundColor: '#3b82f6',
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    // Hover interrupt handler
    const handleMouseEnter = () => {
      setIsHovering(true);

      // Pause all animations on hover
      rotationTween.pause();
      pulseTween.pause();
      colorTween.pause();

      // Apply hover effect
      gsap.to(elements.circle, {
        scale: 1.3,
        rotation: '+=45',
        backgroundColor: '#f97316',
        duration: 0.3,
        ease: 'back.out(1.7)',
      });

      gsap.to(elements.text, {
        scale: 1.1,
        color: '#f97316',
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      setIsHovering(false);

      // Resume all animations
      rotationTween.resume();
      pulseTween.resume();
      colorTween.resume();

      // Return to normal state
      gsap.to(elements.circle, {
        scale: 1,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });

      gsap.to(elements.text, {
        scale: 1,
        color: '#ffffff',
        duration: 0.3,
      });
    };

    // Attach event listeners to the circle, not the container
    elements.circle.addEventListener('mouseenter', handleMouseEnter);
    elements.circle.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      elements.circle.removeEventListener('mouseenter', handleMouseEnter);
      elements.circle.removeEventListener('mouseleave', handleMouseLeave);
      rotationTween.kill();
      pulseTween.kill();
      colorTween.kill();
      gsap.killTweensOf([elements.circle, elements.text]);
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-32 bg-gradient-to-br from-zinc-950 via-zinc-900 to-purple-950">
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <p className="text-purple-500 text-sm font-mono uppercase tracking-[0.3em] mb-4">
          Animation Interruption
        </p>
        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-12">
          Hover to
          <span className="block text-purple-500">Interrupt</span>
        </h2>

        {/* Interactive area */}
        <div className="flex flex-col items-center justify-center py-12">
          <div className="interrupt-circle w-48 h-48 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl cursor-pointer transition-all">
            <div className="interrupt-text text-white text-center">
              <div className="text-4xl mb-2">{isHovering ? '⏸️' : '▶️'}</div>
              <div className="text-sm font-mono uppercase">
                {isHovering ? 'Paused' : 'Animating'}
              </div>
            </div>
          </div>

          <p className="mt-12 text-zinc-400 text-center max-w-md">
            Hover over the circle to interrupt the continuous rotation, pulse, and color cycle animations.
            The animations will resume when you mouse out.
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 7: Observer Plugin Intersection Detection
// ============================================================================

function ObserverSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredBox, setHoveredBox] = useState<number | null>(null);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  // Ref to track hovered box for Observer callback (avoids closure + prevents re-runs)
  const hoveredBoxRef = useRef<number | null>(null);

  // Keep ref in sync with state
  hoveredBoxRef.current = hoveredBox;

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const boxes = boxRefs.current.filter(Boolean) as HTMLDivElement[];

    // Observer for scroll direction tracking
    const scrollObserver = Observer.create({
      target: window,
      type: 'scroll',
      onUp: () => setScrollDirection('up'),
      onDown: () => setScrollDirection('down'),
    });

    // Observer for efficient pointer move tracking on boxes
    const boxObservers: Array<ReturnType<typeof Observer.create>> = [];
    boxes.forEach((box, i) => {
      // Observer for pointer tracking (3D tilt effect)
      const observer = Observer.create({
        target: box,
        type: 'pointer',
        onMove: (self) => {
          // Only apply tilt when this box is hovered
          if (hoveredBoxRef.current !== i) return;

          if (self.x === undefined || self.y === undefined) return;

          const rect = box.getBoundingClientRect();
          const x = ((self.x - rect.left) / rect.width - 0.5) * 50; // -25 to 25 (increased sensitivity)
          const y = ((self.y - rect.top) / rect.height - 0.5) * 50;

          gsap.to(box, {
            rotationX: -y,
            rotationY: x,
            duration: 0.3,
            ease: 'power1.out',
          });
        },
      });
      boxObservers.push(observer);

      // Entry animation
      gsap.from(box, {
        y: 100,
        opacity: 0,
        delay: i * 0.1,
        duration: 0.6,
        ease: 'power2.out',
      });
    });

    return () => {
      scrollObserver.kill();
      boxObservers.forEach(obs => obs.kill());
      gsap.killTweensOf(boxes);
    };
  }, { scope: containerRef }); // Removed hoveredBox from dependencies

  return (
    <section ref={containerRef} className="relative py-32 bg-zinc-950">
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <p className="text-orange-500 text-sm font-mono uppercase tracking-[0.3em] mb-4">
          GSAP Observer Plugin
        </p>
        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-12">
          Observer
          <span className="block text-orange-500">Detection</span>
        </h2>

        {/* Grid of boxes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              ref={(el) => { boxRefs.current[i] = el; }}
              className="observer-box aspect-square bg-zinc-800 border-2 border-zinc-700 rounded-xl flex items-center justify-center cursor-pointer"
              style={{ perspective: '500px' }}
              onMouseEnter={() => {
                setHoveredBox(i);
                const box = boxRefs.current[i];
                if (box) {
                  gsap.to(box, {
                    scale: 1.05,
                    backgroundColor: '#f97316',
                    duration: 0.3,
                    ease: 'power2.out',
                  });
                }
              }}
              onMouseLeave={() => {
                setHoveredBox(null);
                const box = boxRefs.current[i];
                if (box) {
                  gsap.to(box, {
                    scale: 1,
                    rotationX: 0,
                    rotationY: 0,
                    backgroundColor: '#27272a',
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.5)',
                  });
                }
              }}
            >
              <div className="text-center">
                <div className="text-3xl font-black text-white mb-1">0{i + 1}</div>
                <div className={`text-xs uppercase ${hoveredBox === i ? 'text-white' : 'text-zinc-500'}`}>
                  {hoveredBox === i ? '3D Tilt!' : 'Hover me'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Status */}
        <div className="text-center">
          <p className="text-zinc-400">
            Scrolling: <span className="font-mono text-orange-500">{scrollDirection?.toUpperCase() || 'NONE'}</span>
          </p>
          <p className="text-zinc-400 mt-2">
            Hovered box: <span className="font-mono text-orange-500">{hoveredBox !== null ? `0${hoveredBox + 1}` : 'None'}</span>
          </p>
          <p className="text-zinc-500 text-sm mt-2">
            Observer tracks scroll direction and 3D tilt on hover
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function GestureScrollPage() {
  return (
    <main className="min-h-screen">
      {/* Info banner */}
      <div className="sticky top-[72px] z-40 bg-zinc-900/95 backdrop-blur border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-orange-500 text-xs font-black tracking-[0.2em] uppercase">
              Advanced Pattern
            </span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400 text-sm">Gesture + Scroll Hybrid</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-zinc-500 text-xs font-mono">7 SECTIONS</span>
          </div>
        </div>
      </div>

      {/* Gesture scroll sections */}
      <CursorTrailSection />
      <VelocityScrollSection />
      <DirectionScrollSection />
      <SwipeGestureSection />
      <PinchZoomSection />
      <HoverInterruptSection />
      <ObserverSection />

      {/* Footer */}
      <footer className="bg-zinc-900/50 border-t border-zinc-800 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-zinc-500 text-sm font-mono">
            Featuring: quickTo(), useScrollVelocity(), useSwipeCallback(), Observer, hover interrupt
          </p>
        </div>
      </footer>
    </main>
  );
}
