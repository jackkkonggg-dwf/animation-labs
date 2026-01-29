'use client';

/**
 * GSAP Provider
 *
 * Centralized GSAP plugin registration for the entire app.
 * Imports only the plugins actively used to minimize bundle size.
 */

import { useEffect } from 'react';
import { gsap } from '@/lib/gsap-config';

export function GSAPProvider() {
  useEffect(() => {
    // Plugins are already registered in gsap-config.ts
    // This component just ensures the config is imported when the app starts

    // Debug: Log that GSAP is ready (remove in production)
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      console.log('[GSAP Provider] Initialized with ScrollTrigger');
    }

    return () => {
      // CRITICAL: Clean up all ScrollTriggers on app unmount (HMR, etc.)
      if (typeof window !== 'undefined') {
        const { ScrollTrigger } = require('@/lib/gsap-config');
        ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill(true));
      }
    };
  }, []);

  return null;
}
