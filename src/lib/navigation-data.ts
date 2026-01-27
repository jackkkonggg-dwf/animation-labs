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
  ],
};
