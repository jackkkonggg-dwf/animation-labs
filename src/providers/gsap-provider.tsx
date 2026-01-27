'use client';

import { useEffect } from 'react';

export function GSAPProvider() {
  useEffect(() => {
    // Register ScrollTrigger plugin
    const registerPlugins = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

      gsap.registerPlugin(ScrollTrigger);
    };

    registerPlugins();
  }, []);

  return null;
}
