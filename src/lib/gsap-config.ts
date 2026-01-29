'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Only register plugins that are actively used in the application
// This significantly reduces bundle size
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // Set global defaults for animations
  gsap.defaults({
    ease: 'power3.out',
    duration: 0.5,
  });
}

export { gsap, ScrollTrigger };

// Lazy load additional plugins only when needed
export const loadDraggable = async () => {
  const Draggable = (await import('gsap/src/Draggable')).default;
  gsap.registerPlugin(Draggable);
  return Draggable;
};

export const loadSplitText = async () => {
  const { SplitText } = await import('gsap/SplitText');
  gsap.registerPlugin(SplitText);
  return SplitText;
};

// Add other plugin loaders as needed
