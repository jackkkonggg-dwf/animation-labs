# GSAP Components

## GSAP Stagger Animation Pattern

When creating staggered entry animations with ScrollTrigger:
- Use `gsap.set()` to set initial state before animation
- Query elements using `container.querySelectorAll('.class-name')`
- Use `stagger` option with delay value (e.g., 0.15 for 150ms between elements)
- Set initial state: `opacity: 0, x: 100` (invisible and offset)
- Animate to: `opacity: 1, x: 0` (visible and natural position)
- Use `scrollTrigger.start: 'top center'` to trigger when section enters viewport
- Use `toggleActions: 'play none none reverse'` for proper enter/exit behavior

Example:
```typescript
// Set initial state
gsap.set(cards, { opacity: 0, x: 100 });

// Create staggered entry animation
gsap.to(cards, {
  opacity: 1,
  x: 0,
  duration: 0.8,
  stagger: 0.15,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: container,
    start: 'top center',
    toggleActions: 'play none none reverse',
  },
});
```

## GSAP Plugin Registration Pattern

When using GSAP with Next.js App Router and TypeScript:
- Import GSAP plugins dynamically with `.default` for the main gsap import
- Pattern: `const gsap = (await import('gsap')).default;`
- Pattern: `const { ScrollTrigger } = await import('gsap/ScrollTrigger');`
- Must use 'use client' directive in components that use GSAP
- Register plugins before use with `gsap.registerPlugin(PluginName)`

Example:
```typescript
'use client';

import { useEffect } from 'react';

export function GSAPProvider() {
  useEffect(() => {
    const registerPlugins = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
    };
    registerPlugins();
  }, []);

  return null;
}
```
