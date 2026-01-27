import type { NavigationData } from '@/app/types/navigation';

export const NAVIGATION_DATA: NavigationData = {
  homeRoute: {
    id: 'home',
    title: 'Home',
    description: 'Animation demos showcase',
    path: '/',
  },
  routes: [
    {
      id: 'horizontal-scroll',
      title: 'Horizontal Scroll',
      description: 'GSAP horizontal scroll animation with artist cards',
      path: '/horizontal-scroll',
      category: 'Scroll',
    },
    {
      id: 'text-effects',
      title: 'Text Effects',
      description: 'Kinetic typography with scroll-triggered animations',
      path: '/text-effects',
      category: 'Scroll',
    },
    {
      id: 'dwf-professional-theme',
      title: 'DWF Professional',
      description: 'Finance-inspired professional design with institutional elegance',
      path: '/dwf-professional-theme',
      category: 'Showcase',
    },
    {
      id: 'dwf-ocean-theme',
      title: 'DWF Ocean Theme',
      description: 'Wave-themed GSAP animations - Digital Wave Finance showcase',
      path: '/dwf-ocean-theme',
      category: 'Showcase',
    },
    {
      id: 'dwf-futuristic-theme',
      title: 'DWF Futuristic',
      description: 'Cyberpunk theme with glitch effects, matrix rain, and holographic UI',
      path: '/dwf-futuristic-theme',
      category: 'Showcase',
    },
  ],
};
