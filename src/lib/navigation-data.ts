import type { NavigationData } from '@/types/navigation';

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
      id: 'dwf-ocean-theme',
      title: 'DWF Ocean Theme',
      description: 'Wave-themed GSAP animations - Digital Wave Finance showcase',
      path: '/dwf-ocean-theme',
      category: 'Showcase',
    },
  ],
};
