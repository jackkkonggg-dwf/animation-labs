'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import Draggable from 'gsap/src/Draggable';

// Bonus plugins (free with GSAP 3.13+)
import { SplitText } from 'gsap/SplitText';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Observer } from 'gsap/Observer';

// Register plugins - GSAP handles duplicate registration gracefully
if (typeof window !== 'undefined') {
  gsap.registerPlugin(
    ScrollTrigger,
    MotionPathPlugin,
    Draggable,
    SplitText,
    ScrollSmoother,
    InertiaPlugin,
    MorphSVGPlugin,
    DrawSVGPlugin,
    ScrambleTextPlugin,
    ScrollToPlugin,
    Observer
  );
}

export {
  gsap,
  ScrollTrigger,
  MotionPathPlugin,
  Draggable,
  SplitText,
  ScrollSmoother,
  InertiaPlugin,
  MorphSVGPlugin,
  DrawSVGPlugin,
  ScrambleTextPlugin,
  ScrollToPlugin,
  Observer,
};
