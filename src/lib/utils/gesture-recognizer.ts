// ============================================================================
// GESTURE RECOGNIZER UTILITY
// ============================================================================
// Provides swipe and pinch gesture recognition for touch and mouse interactions
// ============================================================================

// ============================================================================
// TYPES
// ============================================================================

export type SwipeDirection = 'up' | 'down' | 'left' | 'right' | 'none';

export interface SwipeGesture {
  direction: SwipeDirection;
  velocity: number;
  distance: number;
  duration: number;
}

export interface PinchGesture {
  scale: number;
  centerX: number;
  centerY: number;
  velocity: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface GestureRecognizerOptions {
  /** Minimum distance for swipe to register (default: 50px) */
  swipeThreshold?: number;
  /** Minimum velocity for swipe to register (default: 0.3 px/ms) */
  swipeVelocityThreshold?: number;
  /** Maximum duration for swipe gesture (default: 500ms) */
  swipeMaxDuration?: number;
  /** Minimum scale change for pinch to register (default: 0.1) */
  pinchThreshold?: number;
  /** Callback when swipe is detected */
  onSwipe?: (gesture: SwipeGesture) => void;
  /** Callback when pinch is detected */
  onPinch?: (gesture: PinchGesture) => void;
  /** Callback when pinch starts */
  onPinchStart?: (center: Point) => void;
  /** Callback when pinch ends */
  onPinchEnd?: () => void;
}

// ============================================================================
// GESTURE RECOGNIZER CLASS
// ============================================================================

/**
 * GestureRecognizer handles swipe and pinch gestures for touch and mouse
 *
 * @example
 * ```ts
 * const recognizer = new GestureRecognizer(element, {
 *   onSwipe: (gesture) => console.log('Swiped', gesture.direction),
 *   onPinch: (gesture) => console.log('Pinched', gesture.scale),
 * });
 * ```
 */
export class GestureRecognizer {
  private element: HTMLElement | Document;
  private options: Required<GestureRecognizerOptions>;
  private isTracking: boolean = false;

  // Swipe tracking state
  private startPoint: Point = { x: 0, y: 0 };
  private startTime: number = 0;
  private endPoint: Point = { x: 0, y: 0 };

  // Pinch tracking state
  private initialPinchDistance: number = 0;
  private lastPinchDistance: number = 0;
  private lastPinchTime: number = 0;
  private isPinching: boolean = false;

  // Touch tracking
  private activeTouches: Map<number, Point> = new Map();

  constructor(
    element: HTMLElement | Document,
    options: GestureRecognizerOptions = {}
  ) {
    this.element = element;
    this.options = {
      swipeThreshold: options.swipeThreshold ?? 50,
      swipeVelocityThreshold: options.swipeVelocityThreshold ?? 0.3,
      swipeMaxDuration: options.swipeMaxDuration ?? 500,
      pinchThreshold: options.pinchThreshold ?? 0.1,
      onSwipe: options.onSwipe ?? (() => {}),
      onPinch: options.onPinch ?? (() => {}),
      onPinchStart: options.onPinchStart ?? (() => {}),
      onPinchEnd: options.onPinchEnd ?? (() => {}),
    };
  }

  /**
   * Start listening for gestures
   */
  start(): void {
    if (this.isTracking) return;

    this.isTracking = true;

    // Touch events
    this.element.addEventListener('touchstart', this.handleTouchStart, { passive: false });
    this.element.addEventListener('touchmove', this.handleTouchMove, { passive: false });
    this.element.addEventListener('touchend', this.handleTouchEnd, { passive: false });
    this.element.addEventListener('touchcancel', this.handleTouchEnd, { passive: false });

    // Mouse events (for single-finger swipe emulation)
    this.element.addEventListener('mousedown', this.handleMouseDown);
    this.element.addEventListener('mousemove', this.handleMouseMove);
    this.element.addEventListener('mouseup', this.handleMouseUp);
    this.element.addEventListener('mouseleave', this.handleMouseUp);

    // Wheel event (for two-finger pinch emulation with trackpad)
    this.element.addEventListener('wheel', this.handleWheel, { passive: false });
  }

  /**
   * Stop listening for gestures
   */
  stop(): void {
    if (!this.isTracking) return;

    this.isTracking = false;

    this.element.removeEventListener('touchstart', this.handleTouchStart);
    this.element.removeEventListener('touchmove', this.handleTouchMove);
    this.element.removeEventListener('touchend', this.handleTouchEnd);
    this.element.removeEventListener('touchcancel', this.handleTouchEnd);

    this.element.removeEventListener('mousedown', this.handleMouseDown);
    this.element.removeEventListener('mousemove', this.handleMouseMove);
    this.element.removeEventListener('mouseup', this.handleMouseUp);
    this.element.removeEventListener('mouseleave', this.handleMouseUp);

    this.element.removeEventListener('wheel', this.handleWheel);

    // Reset state
    this.activeTouches.clear();
    this.isPinching = false;
  }

  /**
   * Check if recognizer is currently tracking
   */
  isActive(): boolean {
    return this.isTracking;
  }

  // ============================================================================
  // TOUCH HANDLERS
  // ============================================================================

  private handleTouchStart = (e: Event): void => {
    const touchEvent = e as TouchEvent;
    for (const touch of touchEvent.changedTouches) {
      this.activeTouches.set(touch.identifier, { x: touch.clientX, y: touch.clientY });
    }

    const touches = Array.from(this.activeTouches.values());

    if (touches.length === 1) {
      // Start tracking potential swipe
      this.startPoint = touches[0];
      this.startPoint = { x: touchEvent.touches[0].clientX, y: touchEvent.touches[0].clientY };
      this.startTime = performance.now();
    } else if (touches.length === 2) {
      // Start tracking pinch
      this.initialPinchDistance = this.getDistance(touches[0], touches[1]);
      this.lastPinchDistance = this.initialPinchDistance;
      this.lastPinchTime = performance.now();
      this.isPinching = true;
      this.options.onPinchStart(this.getCenter(touches[0], touches[1]));
    }
  };

  private handleTouchMove = (e: Event): void => {
    const touchEvent = e as TouchEvent;
    // Update active touches
    for (const touch of touchEvent.changedTouches) {
      this.activeTouches.set(touch.identifier, { x: touch.clientX, y: touch.clientY });
    }

    const touches = Array.from(this.activeTouches.values());

    if (touches.length === 2 && this.isPinching) {
      touchEvent.preventDefault();

      const currentDistance = this.getDistance(touches[0], touches[1]);
      const now = performance.now();
      const deltaTime = now - this.lastPinchTime;

      const scale = currentDistance / this.initialPinchDistance;
      const velocity =
        deltaTime > 0
          ? Math.abs((currentDistance - this.lastPinchDistance) / deltaTime)
          : 0;

      if (Math.abs(scale - 1) > this.options.pinchThreshold) {
        this.options.onPinch({
          scale,
          centerX: (touches[0].x + touches[1].x) / 2,
          centerY: (touches[0].y + touches[1].y) / 2,
          velocity: Math.round(velocity * 100) / 100,
        });
      }

      this.lastPinchDistance = currentDistance;
      this.lastPinchTime = now;
    }
  };

  private handleTouchEnd = (e: Event): void => {
    const touchEvent = e as TouchEvent;
    // Remove ended touches
    for (const touch of touchEvent.changedTouches) {
      this.activeTouches.delete(touch.identifier);
    }

    const touches = Array.from(this.activeTouches.values());

    // Check for swipe on touch end
    if (touchEvent.changedTouches.length > 0 && touches.length === 0) {
      const touch = touchEvent.changedTouches[0];
      this.endPoint = { x: touch.clientX, y: touch.clientY };
      this.checkSwipe();
    }

    // End pinch if less than 2 touches
    if (touches.length < 2 && this.isPinching) {
      this.isPinching = false;
      this.options.onPinchEnd();
    }
  };

  // ============================================================================
  // MOUSE HANDLERS (for swipe emulation)
  // ============================================================================

  private handleMouseDown = (e: Event): void => {
    const mouseEvent = e as MouseEvent;
    this.startPoint = { x: mouseEvent.clientX, y: mouseEvent.clientY };
    this.startTime = performance.now();
  };

  private handleMouseMove = (e: Event): void => {
    const mouseEvent = e as MouseEvent;
    // Just track current position
    this.endPoint = { x: mouseEvent.clientX, y: mouseEvent.clientY };
  };

  private handleMouseUp = (e: Event): void => {
    const mouseEvent = e as MouseEvent;
    this.endPoint = { x: mouseEvent.clientX, y: mouseEvent.clientY };
    this.checkSwipe();
  };

  // ============================================================================
  // WHEEL HANDLER (for trackpad pinch emulation)
  // ============================================================================

  private wheelScaleStart: number = 1;
  private wheelLastScale: number = 1;

  private handleWheel = (e: Event): void => {
    const wheelEvent = e as WheelEvent;
    if (wheelEvent.ctrlKey || wheelEvent.metaKey) {
      // Pinch zoom gesture
      wheelEvent.preventDefault();

      const delta = -wheelEvent.deltaY * 0.01;
      const newScale = this.wheelLastScale + delta;

      if (Math.abs(newScale - this.wheelScaleStart) > this.options.pinchThreshold) {
        const scale = newScale / this.wheelScaleStart;

        this.options.onPinch({
          scale,
          centerX: wheelEvent.clientX,
          centerY: wheelEvent.clientY,
          velocity: Math.abs(delta),
        });
      }

      this.wheelLastScale = newScale;
    }
  };

  // ============================================================================
  // SWIPE DETECTION
  // ============================================================================

  private checkSwipe(): void {
    const now = performance.now();
    const deltaX = this.endPoint.x - this.startPoint.x;
    const deltaY = this.endPoint.y - this.startPoint.y;
    const deltaTime = now - this.startTime;

    // Check duration threshold
    if (deltaTime > this.options.swipeMaxDuration) return;

    // Calculate absolute distance and velocity
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const velocity = deltaTime > 0 ? distance / deltaTime : 0;

    // Check if swipe meets threshold criteria
    if (
      distance >= this.options.swipeThreshold &&
      velocity >= this.options.swipeVelocityThreshold
    ) {
      // Determine direction (horizontal vs vertical)
      let direction: SwipeDirection;

      if (absX > absY) {
        direction = deltaX > 0 ? 'right' : 'left';
      } else {
        direction = deltaY > 0 ? 'down' : 'up';
      }

      this.options.onSwipe({
        direction,
        velocity: Math.round(velocity * 100) / 100,
        distance: Math.round(distance),
        duration: Math.round(deltaTime),
      });
    }
  }

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================

  private getDistance(p1: Point, p2: Point): number {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  private getCenter(p1: Point, p2: Point): Point {
    return {
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2,
    };
  }
}

// ============================================================================
// SWIPE HELPERS
// ============================================================================

/**
 * Check if swipe is horizontal (left or right)
 */
export function isHorizontalSwipe(direction: SwipeDirection): boolean {
  return direction === 'left' || direction === 'right';
}

/**
 * Check if swipe is vertical (up or down)
 */
export function isVerticalSwipe(direction: SwipeDirection): boolean {
  return direction === 'up' || direction === 'down';
}

/**
 * Get opposite direction
 */
export function getOppositeDirection(direction: SwipeDirection): SwipeDirection {
  switch (direction) {
    case 'up':
      return 'down';
    case 'down':
      return 'up';
    case 'left':
      return 'right';
    case 'right':
      return 'left';
    default:
      return 'none';
  }
}

/**
 * Get direction vector
 */
export function getSwipeDirectionVector(direction: SwipeDirection): Point {
  switch (direction) {
    case 'up':
      return { x: 0, y: -1 };
    case 'down':
      return { x: 0, y: 1 };
    case 'left':
      return { x: -1, y: 0 };
    case 'right':
      return { x: 1, y: 0 };
    default:
      return { x: 0, y: 0 };
  }
}

// ============================================================================
// REACT HOOK
// ============================================================================

import { useEffect, useRef } from 'react';

/**
 * React hook for gesture recognition
 * Automatically manages lifecycle of GestureRecognizer
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const containerRef = useRef<HTMLDivElement>(null);
 *
 *   useGestureRecognizer(containerRef, {
 *     onSwipe: (gesture) => console.log('Swiped', gesture),
 *     onPinch: (gesture) => console.log('Pinched', gesture.scale),
 *   });
 *
 *   return <div ref={containerRef}>Gesture area</div>;
 * }
 * ```
 */
export function useGestureRecognizer(
  elementRef: React.RefObject<HTMLElement>,
  options: GestureRecognizerOptions = {}
): void {
  const recognizerRef = useRef<GestureRecognizer | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const recognizer = new GestureRecognizer(element, options);
    recognizerRef.current = recognizer;
    recognizer.start();

    return () => {
      recognizer.stop();
    };
  }, [elementRef, options]);
}

/**
 * React hook that returns callback refs for gesture recognition
 * Useful when you don't have a stable element ref
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const swipeRef = useSwipeCallback({
 *     onSwipe: (gesture) => console.log('Swiped', gesture),
 *   });
 *
 *   return <div ref={swipeRef}>Swipe me</div>;
 * }
 * ```
 */
export function useSwipeCallback(
  options: Omit<GestureRecognizerOptions, 'onPinch' | 'onPinchStart' | 'onPinchEnd'> = {}
): (element: HTMLElement | null) => void {
  const recognizerRef = useRef<GestureRecognizer | null>(null);

  return (element) => {
    if (recognizerRef.current) {
      recognizerRef.current.stop();
    }

    if (element) {
      const recognizer = new GestureRecognizer(element, options);
      recognizerRef.current = recognizer;
      recognizer.start();
    }
  };
}
