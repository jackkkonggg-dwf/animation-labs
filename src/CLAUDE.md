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

## GSAP with Next.js Navigation (Cleanup Pattern)

**Critical for SPA navigation**: ScrollTrigger instances persist across route changes in Next.js. Proper cleanup is essential.

### Centralized GSAP Config (`src/lib/gsap-config.ts`)

Create a single source of truth for GSAP to prevent duplicate registrations:

```typescript
'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger - GSAP handles duplicate registration gracefully
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
```

### Component Cleanup Pattern

Always track ScrollTriggers and return a cleanup function from `useGSAP`:

```typescript
'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

export function MyComponent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Track all ScrollTriggers for cleanup
    const triggers: ScrollTrigger[] = [];

    const elements = container.querySelectorAll('.item');
    gsap.set(elements, { opacity: 0 });

    gsap.to(elements, {
      opacity: 1,
      scrollTrigger: {
        trigger: container,
        start: 'top center',
      },
    });

    // Important: Refresh after creating animations
    ScrollTrigger.refresh();

    // Cleanup - kill only what we created
    return () => {
      triggers.forEach((t) => t.kill());
      gsap.killTweensOf(elements);
    };
  }, { scope: containerRef });

  return <div ref={containerRef}>...</div>;
}
```

### Key Points

| Issue | Solution |
|-------|----------|
| ScrollTriggers persist across routes | Return cleanup function from `useGSAP` |
| Duplicate plugin registration | Use centralized `gsap-config.ts` |
| Pinned elements leave artifacts | Call `.kill()` on each ScrollTrigger |
| Scroll positions misaligned | Call `ScrollTrigger.refresh()` after init |
| Event listeners leak | Remove listeners in cleanup |

### Resources
- [Optimizing GSAP in Next.js 15](https://medium.com/@thomasaugot/optimizing-gsap-animations-in-next-js-15-best-practices-for-initialization-and-cleanup-2ebaba7d0232)
- [ScrollTrigger.kill() docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/#kill)

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

**Note**: For new code, prefer the centralized config pattern above over dynamic imports.

## Orphaned Next.js Dev Processes

**Issue**: When using background tasks or running dev servers, orphaned `next-server` and build processes can accumulate and consume memory/CPU.

### Finding Orphaned Processes

```bash
# Find all Next.js processes
ps aux | grep -E "(next-server|next dev)" | grep -v grep

# Find related build processes
ps aux | grep -E "\.next/dev" | grep -v grep
```

### Cleaning Up Orphaned Processes

```bash
# Kill all next-server processes
pkill -f "next-server"

# Kill all Next.js dev servers
pkill -f "next dev"

# Kill related build processes
pkill -f "webpack-loaders.*animations"
pkill -f "postcss.*animations"

# Force kill by PID if needed
kill -9 <PID>
```

### Prevention

When running background dev servers with Bash tool using `run_in_background=true`:
- Store the returned `shell_id` or `task_id`
- Use `TaskStop` with the ID to terminate when done
- Or manually kill the process group after completion

Example cleanup command:
```bash
# Clean up all Next.js processes from this project
ps aux | grep -E "next-server" | grep animations | awk '{print $2}' | xargs kill -9 2>/dev/null
```
