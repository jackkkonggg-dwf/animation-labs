'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import Draggable from 'gsap/src/Draggable';

// Register plugins - GSAP handles duplicate registration gracefully
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, Draggable);
}

export { gsap, ScrollTrigger, MotionPathPlugin, Draggable };
