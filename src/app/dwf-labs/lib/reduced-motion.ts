/**
 * Reduced Motion Helper
 *
 * US-026: Helper to set final state immediately when reduced motion is preferred
 */

import { gsap } from '@/lib/gsap-config';

export function setFinalStateIfReducedMotion() {
  // Check if user prefers reduced motion
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!mediaQuery.matches) return false;

  // Set all animated elements to their final visible state
  // Hero elements
  const titleChars = document.querySelectorAll('.hero-title span');
  const taglineWords = document.querySelectorAll('.hero-tagline span');
  const cornerPaths = document.querySelectorAll('.corner-draw-path');
  gsap.set([...titleChars, ...taglineWords], { opacity: 1, clearProps: 'all' });
  gsap.set(cornerPaths, { strokeDashoffset: 0, clearProps: 'all' });

  // Services elements
  const serviceCards = document.querySelectorAll('.service-card');
  const serviceIcons = document.querySelectorAll('.service-icon svg');
  gsap.set(serviceCards, { opacity: 1, scale: 1, clearProps: 'all' });
  gsap.set(serviceIcons, { scale: 1, rotation: 0, clearProps: 'all' });

  // Stats elements
  const statValues = document.querySelectorAll('.stat-value');
  const progressCircles = document.querySelectorAll('.stat-progress-circle');
  const statIcons = document.querySelectorAll('.stat-icon svg');
  statValues.forEach((statValue) => {
    const target = (statValue as HTMLElement).dataset.target || '0';
    (statValue as HTMLElement).textContent = target;
  });
  gsap.set(progressCircles, { strokeDashoffset: 0, clearProps: 'all' });
  gsap.set(statIcons, { clearProps: 'all' });

  // Portfolio elements
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  gsap.set(portfolioCards, { opacity: 1, scale: 1, clearProps: 'all' });

  // News elements
  const newsCards = document.querySelectorAll('.news-card');
  gsap.set(newsCards, { opacity: 1, clearProps: 'all' });

  // Marquee - stop animation, show static content
  const marqueeRow = document.querySelector('.marquee-row');
  if (marqueeRow) {
    gsap.set(marqueeRow, { xPercent: 0, clearProps: 'all' });
  }

  return true; // Reduced motion is active, skip animations
}
