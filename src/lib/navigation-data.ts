import type { NavigationData } from '@/types/navigation';

/**
 * Navigation data for all GSAP animation patterns
 *
 * Each pattern includes:
 * - id: Unique identifier (kebab-case)
 * - title: Display name
 * - description: Brief explanation of the pattern
 * - path: Route path for the pattern page
 * - category: Pattern category (e.g., 'ScrollTrigger Basics', 'Text Animations')
 * - difficulty: 'beginner' | 'intermediate' | 'advanced'
 */
export const NAVIGATION_DATA: NavigationData = {
  homeRoute: {
    id: 'home',
    title: 'Home',
    description: 'Animation demos showcase',
    path: '/',
  },
  routes: [
    // Legacy routes (existing demos)
    {
      id: 'horizontal-scroll',
      title: 'Horizontal Scroll',
      description: 'GSAP horizontal scroll animation with artist cards',
      path: '/horizontal-scroll',
      category: 'Showcase',
    },
    {
      id: 'text-effects',
      title: 'Text Effects',
      description: 'Kinetic typography with scroll-triggered animations',
      path: '/text-effects',
      category: 'Showcase',
    },
    // ScrollTrigger Basics
    {
      id: 'fade-reveal',
      title: 'Fade Reveal',
      description: 'Basic fade-in animation with vertical movement triggered on scroll',
      path: '/patterns/fade-reveal',
      category: 'ScrollTrigger Basics',
      difficulty: 'beginner',
    },
    {
      id: 'scale-reveal',
      title: 'Scale Reveal',
      description: 'Elements scale up from small to normal size with elastic bounce easing',
      path: '/patterns/scale-reveal',
      category: 'ScrollTrigger Basics',
      difficulty: 'beginner',
    },
    {
      id: 'staggered-reveal',
      title: 'Staggered Reveal',
      description: 'Multiple elements animate in sequence with cascading delay timing',
      path: '/patterns/staggered-reveal',
      category: 'ScrollTrigger Basics',
      difficulty: 'beginner',
    },
    {
      id: 'batch-reveal',
      title: 'Batch Reveal',
      description: 'Efficient animation for large grids using GPU-accelerated transforms',
      path: '/patterns/batch-reveal',
      category: 'ScrollTrigger Basics',
      difficulty: 'beginner',
    },
    // Text Animations
    {
      id: 'char-text-reveal',
      title: 'Character Text Reveal',
      description: 'Text animates character-by-character with kinetic typography effect',
      path: '/patterns/char-text-reveal',
      category: 'Text Animations',
      difficulty: 'intermediate',
    },
    {
      id: 'word-text-reveal',
      title: 'Word Text Reveal',
      description: 'Text animates word-by-word for dramatic headline reveals',
      path: '/patterns/word-text-reveal',
      category: 'Text Animations',
      difficulty: 'beginner',
    },
    {
      id: 'text-fill',
      title: 'Text Fill Animation',
      description: 'Gradient fill effect that follows scroll progress',
      path: '/patterns/text-fill',
      category: 'Text Animations',
      difficulty: 'intermediate',
    },
    // Parallax & Depth
    {
      id: 'simple-parallax',
      title: 'Simple Parallax',
      description: 'Background moves at different speed than foreground for depth effect',
      path: '/patterns/simple-parallax',
      category: 'Parallax & Depth',
      difficulty: 'beginner',
    },
    {
      id: 'multi-layer-parallax',
      title: 'Multi-Layer Parallax',
      description: 'Three layers move at progressive speeds for immersive 3D depth',
      path: '/patterns/multi-layer-parallax',
      category: 'Parallax & Depth',
      difficulty: 'intermediate',
    },
    // Micro-interactions
    {
      id: 'button-hover',
      title: 'Button Hover Effects',
      description: 'Interactive button animations: scale+shadow, magnetic, icon animations',
      path: '/patterns/button-hover',
      category: 'Micro-interactions',
      difficulty: 'beginner',
    },
    {
      id: 'card-tilt',
      title: 'Card 3D Tilt',
      description: 'Interactive card tilts based on mouse position with shine effect',
      path: '/patterns/card-tilt',
      category: 'Micro-interactions',
      difficulty: 'intermediate',
    },
    // Timelines
    {
      id: 'sequential-timeline',
      title: 'Sequential Timeline',
      description: 'Animations play in sequence with position parameter control',
      path: '/patterns/sequential-timeline',
      category: 'Timelines',
      difficulty: 'beginner',
    },
    {
      id: 'scrub-timeline',
      title: 'Scrub Timeline',
      description: 'Timeline controlled by scroll position with smooth catch-up',
      path: '/patterns/scrub-timeline',
      category: 'Timelines',
      difficulty: 'intermediate',
    },
    // SVG Animations
    {
      id: 'svg-draw',
      title: 'SVG Path Drawing',
      description: 'SVG paths draw themselves on scroll using stroke-dashoffset',
      path: '/patterns/svg-draw',
      category: 'SVG Animations',
      difficulty: 'intermediate',
    },
    // Draggable
    {
      id: 'basic-draggable',
      title: 'Basic Draggable',
      description: 'Interactive drag with type constraints and bounds options',
      path: '/patterns/basic-draggable',
      category: 'Draggable',
      difficulty: 'intermediate',
    },
    {
      id: 'draggable-momentum',
      title: 'Draggable with Momentum',
      description: 'Physics-based throw effects with velocity tracking',
      path: '/patterns/draggable-momentum',
      category: 'Draggable',
      difficulty: 'advanced',
    },
    // Advanced Scroll
    {
      id: 'pinned-sequence',
      title: 'Pinned Section Sequence',
      description: 'Section pins while timeline plays, then releases',
      path: '/patterns/pinned-sequence',
      category: 'Advanced Scroll',
      difficulty: 'advanced',
    },
    {
      id: 'count-up',
      title: 'Count Up Animation',
      description: 'Numbers animate from zero to target value on scroll',
      path: '/patterns/count-up',
      category: 'Advanced Scroll',
      difficulty: 'intermediate',
    },
    // Performance
    {
      id: 'performance-optimization',
      title: 'Performance Optimization',
      description: 'GPU acceleration techniques and will-change best practices',
      path: '/patterns/performance-optimization',
      category: 'Performance',
      difficulty: 'advanced',
    },
    {
      id: 'reduced-motion',
      title: 'Reduced Motion Support',
      description: 'Accessibility pattern for prefers-reduced-motion with matchMedia',
      path: '/patterns/reduced-motion',
      category: 'Performance',
      difficulty: 'advanced',
    },
  ],
};
