'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { Draggable } from 'gsap/Draggable';
import { SplitText } from 'gsap/SplitText';
import { Observer } from 'gsap/Observer';

// Register all GSAP plugins upfront on client side
// This eliminates async timing issues with ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(
    ScrollTrigger,
    MorphSVGPlugin,
    MotionPathPlugin,
    DrawSVGPlugin,
    Draggable,
    SplitText,
    Observer
  );

  // Helps avoid iOS Safari address-bar "resize" refresh jitter with pinned sections
  ScrollTrigger.config({ ignoreMobileResize: true });

  // Set global defaults for animations
  gsap.defaults({
    ease: 'power3.out',
    duration: 0.5,
  });

  // Normalize scroll to prevent flickering on many mobile browsers (esp. iOS Safari).
  // Keep it touch-only to avoid changing desktop scroll feel.
  if (ScrollTrigger.isTouch) {
    ScrollTrigger.normalizeScroll(true);
  }
}

// Export GSAP and plugins for use in components
export { gsap, ScrollTrigger };
export { Draggable } from 'gsap/Draggable';
export { SplitText } from 'gsap/SplitText';
export { Observer } from 'gsap/Observer';
export { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
export { MotionPathPlugin } from 'gsap/MotionPathPlugin';
export { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
