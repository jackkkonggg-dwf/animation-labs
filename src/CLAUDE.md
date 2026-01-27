# GSAP Components

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
