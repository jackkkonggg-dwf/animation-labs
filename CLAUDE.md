# GSAP Animation Showcase - Development Guidelines

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 19.2.3 | UI framework with Server Components |
| Next.js | 16.1.5 | App Router with React Server Components |
| Tailwind CSS | 4.x | Utility-first styling |
| GSAP | 3.14.2 | Animation library with all plugins (100% free) |
| @gsap/react | 2.1.2 | React integration with useGSAP hook |
| TypeScript | 5.x | Type safety |

## Package Management Rule

> **ALWAYS use `pnpm` for package management. Never use `npm` or `yarn`.**
>
> - Use `pnpm install` instead of `npm install`
> - Use `pnpm add` instead of `npm install <package>`
> - Use `pnpm dlx` instead of `npx` for executing packages
> - Use `pnpm run <script>` instead of `npm run <script>`
>
> This ensures consistent dependency resolution and prevents package manager conflicts.

## Critical Design Rule

> **ALWAYS use the `frontend-design` skill when making ANY type of design decision.**
>
> Before implementing any UI/UX changes, launch the frontend design skill to ensure:
> - Production-grade visual quality
> - Distinctive, non-generic aesthetics
> - Consistency with the industrial orange design system
> - Accessibility best practices
>
> To invoke: `/frontend-design` or use the Skill tool with `frontend-design`

## Browser Testing Rule

> **Use the `agent-browser` skill for any browser-based checks or testing.**
>
> When you need to verify visual output, test interactions, capture screenshots, or validate animations in a browser:
> - Use the agent-browser skill for automated browser interactions
> - Captures screenshots, videos, and traces for debugging
> - Essential for verifying GSAP animations and scroll behaviors
>
> To invoke: `/agent-browser` or use the Skill tool with `agent-browser`

## Design System

- **Theme**: Industrial orange with dark zinc backgrounds
- **Primary accent**: `orange-500` (#f97316)
- **Backgrounds**: `zinc-950` (main), `zinc-900` (cards), `zinc-800` (elevated)
- **Typography**: Uppercase headers with tight tracking, Geist Mono font
- **Visual motifs**: Corner accents, diagonal stripes, scan line effects, grid patterns
- **Easing**: Aggressive, snappy (back.out, power4.out, power3.out)
- **Animations**: Fast durations (0.2s - 0.6s) with stagger delays

---

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

## GSAP ScrollTrigger Pin Configuration Pattern

**Critical for multiple pinned sections**: When using `pin: true` with multiple sequential sections, proper configuration is essential to prevent blank sections, premature triggers, and overlapping animations.

### Required Configuration for Pinned Sections

```typescript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: container,
    start: 'top top',
    end: '+=2500',
    scrub: 1,
    pin: true,
    pinSpacing: true,        // Required: Explicitly adds spacing for pinned element
    anticipatePin: 1,         // Required: Prepares pin 1s before trigger (prevents jumping)
    invalidateOnRefresh: true, // Required: Recalculates positions on refresh/resize
  },
});
```

### Why Each Property Is Required

| Property | Purpose | What Happens Without It |
|----------|---------|------------------------|
| `pinSpacing: true` | Adds scroll distance for pinned element | Next section starts early, overlap occurs |
| `anticipatePin: 1` | Prepares pin before trigger point | Blank flash, jumping on scroll start |
| `invalidateOnRefresh: true` | Recalculates on window resize/refresh | Positions break after resize |

### Common Issues

1. **Section goes blank when scroll starts** → Add `anticipatePin: 1`
2. **Next section starts during current animation** → Add `pinSpacing: true`
3. **Animations overlap or trigger early** → Ensure ALL pinned sections have these 3 properties
4. **Positions break after resize** → Add `invalidateOnRefresh: true`

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
