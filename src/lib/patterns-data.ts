/**
 * GSAP Pattern Categories and Patterns Data
 *
 * Centralized data source for all pattern categories and their metadata.
 * This file defines the 12 main categories for organizing GSAP animation patterns.
 */

import type { PatternCategory } from '@/types/pattern';

/**
 * Pattern categories organized by type and difficulty
 *
 * Categories use kebab-case IDs for consistency with URL routing.
 * Icons use emoji for simplicity and visual clarity.
 */
export const PATTERN_CATEGORIES: PatternCategory[] = [
  // ScrollTrigger Basics
  {
    id: 'scrolltrigger-basics',
    title: 'ScrollTrigger Basics',
    icon: '📜',
    description: 'Fundamental scroll-triggered animations including fade reveals, scale effects, and staggered entries.',
  },

  // Horizontal Scroll
  {
    id: 'horizontal-scroll',
    title: 'Horizontal Scroll',
    icon: '↔️',
    description: 'Horizontal scrolling sections, pinned containers, and sideways navigation patterns.',
  },

  // Text Animations
  {
    id: 'text-animations',
    title: 'Text Animations',
    icon: '✨',
    description: 'Kinetic typography effects including character-by-character reveals, word splits, and text fill animations.',
  },

  // Parallax & Depth
  {
    id: 'parallax-depth',
    title: 'Parallax & Depth',
    icon: '🏔️',
    description: 'Multi-layer parallax effects, depth simulation, and perspective-based animations.',
  },

  // Page Transitions
  {
    id: 'page-transitions',
    title: 'Page Transitions',
    icon: '🚪',
    description: 'Smooth page-to-page transitions, overlay effects, and route change animations.',
  },

  // Micro-interactions
  {
    id: 'micro-interactions',
    title: 'Micro-interactions',
    icon: '👆',
    description: 'Button hover effects, card tilts, magnetic elements, and subtle UI feedback animations.',
  },

  // Timelines
  {
    id: 'timelines',
    title: 'Timelines',
    icon: '🎬',
    description: 'Sequential animations, scrub-linked timelines, and choreographed multi-step effects.',
  },

  // SVG Animations
  {
    id: 'svg-animations',
    title: 'SVG Animations',
    icon: '🎨',
    description: 'SVG path drawing, shape morphing, stroke animations, and vector graphics effects.',
  },

  // Draggable
  {
    id: 'draggable',
    title: 'Draggable',
    icon: '🖱️',
    description: 'Interactive draggable elements, momentum-based throws, inertia effects, and drag constraints.',
  },

  // Advanced Scroll
  {
    id: 'advanced-scroll',
    title: 'Advanced Scroll',
    icon: '📍',
    description: 'Pinned sections, scrub-linked sequences, scroll-position-based reveals, and complex trigger patterns.',
  },

  // Performance
  {
    id: 'performance',
    title: 'Performance',
    icon: '⚡',
    description: 'GPU acceleration techniques, will-change optimization, batch animations, and reduced motion support.',
  },

  // Real-world Examples
  {
    id: 'real-world-examples',
    title: 'Real-world Examples',
    icon: '🌍',
    description: 'Production-ready patterns combining multiple techniques for practical implementation scenarios.',
  },
];

/**
 * Helper to get a category by ID
 */
export function getCategoryById(id: string): PatternCategory | undefined {
  return PATTERN_CATEGORIES.find((category) => category.id === id);
}

/**
 * Helper to get categories by difficulty level
 * Note: Categories themselves don't have difficulty, but this groups them logically
 */
export const CATEGORY_GROUPS = {
  beginner: ['scrolltrigger-basics', 'micro-interactions', 'performance'],
  intermediate: [
    'horizontal-scroll',
    'text-animations',
    'parallax-depth',
    'timelines',
    'svg-animations',
  ],
  advanced: [
    'page-transitions',
    'draggable',
    'advanced-scroll',
    'real-world-examples',
  ],
} as const;

/**
 * Category count for stats display
 */
export const CATEGORY_COUNT = PATTERN_CATEGORIES.length;
