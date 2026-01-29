'use client';

/**
 * Utilities for handling scroll restoration with GSAP animations
 *
 * When navigating back in Next.js, GSAP animations often replay from the beginning,
 * causing a "flash" or black screen while animations restart. These utilities help
 * detect back navigation and conditionally skip entrance animations.
 */

/**
 * Check if the current page load was from a back/forward navigation
 * Uses Navigation Timing API Level 2 for better accuracy
 */
export function isBackNavigation(): boolean {
  if (typeof window === 'undefined') return false;

  // Check Navigation Timing API
  const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  if (navEntry) {
    return navEntry.type === 'back_forward';
  }

  // Fallback to checking performance navigation (deprecated API)
  // Use ts-ignore since we're accessing a deprecated property
  // @ts-ignore - performance.navigation is deprecated but still exists
  const navType = performance.navigation?.type;
  if (typeof navType === 'number') {
    return navType === 2; // TYPE_BACK_FORWARD = 2
  }

  // Final fallback: check session storage
  const wasBackNav = sessionStorage.getItem('wasBackNavigation');
  if (wasBackNav === 'true') {
    sessionStorage.removeItem('wasBackNavigation');
    return true;
  }

  return false;
}

/**
 * Set a flag in session storage to mark back navigation
 * Call this before navigation if you can intercept it
 */
export function markBackNavigation(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('wasBackNavigation', 'true');
  }
}

/**
 * Check if animations should be skipped (back navigation or prefers-reduced-motion)
 */
export function shouldSkipAnimations(): boolean {
  if (typeof window === 'undefined') return false;

  // Skip on back navigation
  if (isBackNavigation()) return true;

  // Skip if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;

  return false;
}

/**
 * Get the saved scroll position for a specific key
 */
export function getSavedScrollPosition(key: string): number | null {
  if (typeof window === 'undefined') return null;
  const saved = sessionStorage.getItem(`scroll-pos-${key}`);
  return saved ? parseInt(saved, 10) : null;
}

/**
 * Save scroll position for a specific key
 */
export function saveScrollPosition(key: string, position: number): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(`scroll-pos-${key}`, position.toString());
  }
}

/**
 * Restore scroll position with smooth behavior if it was saved
 */
export function restoreScrollPosition(key: string): void {
  if (typeof window === 'undefined') return;

  const savedPosition = getSavedScrollPosition(key);
  if (savedPosition !== null) {
    window.scrollTo({ top: savedPosition, behavior: 'instant' });
  }
}

/**
 * GSAP animation helper that skips animation if it should be skipped
 * Returns true if animation was skipped, false otherwise
 */
export function skipAnimationIfNeeded(): boolean {
  if (shouldSkipAnimations()) {
    // Set a document class that CSS can use to skip animations
    document.documentElement.classList.add('skip-animations');
    return true;
  }
  return false;
}

/**
 * Clear the skip animations class (call when you want to re-enable animations)
 */
export function clearSkipAnimations(): void {
  if (typeof window !== 'undefined') {
    document.documentElement.classList.remove('skip-animations');
  }
}

/**
 * Listen for popstate events (back/forward button) and mark them
 */
export function setupBackNavigationListener(): () => void {
  if (typeof window === 'undefined') return () => {};

  const handlePopState = () => {
    markBackNavigation();
  };

  window.addEventListener('popstate', handlePopState);

  return () => {
    window.removeEventListener('popstate', handlePopState);
  };
}
