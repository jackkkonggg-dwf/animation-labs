# GSAP Animation Showcase - Guidelines

## Tech Stack
React 19.2.3 | Next.js 16.1.5 | Tailwind 4.x | GSAP 3.14.2 | @gsap/react 2.1.2 | TypeScript 5.x

## GSAP Plugin Availability
**ALL GSAP plugins are now FREE** (as of 2025). This includes previously premium/club plugins:
- ScrollTrigger, Draggable, Flip, Observer, MotionPathPlugin, MorphSVGPlugin
- ScrollToPlugin, ScrollSmoother, SplitText, ScrambleTextPlugin, DrawSVGPlugin
- InertiaPlugin, Physics2DPlugin, PhysicsPropsPlugin, GSDevTools
No club membership or licensing required. Source: [gsap.com/pricing](https://gsap.com/pricing/)

## Rules
- **Package manager**: Always use `pnpm` (never npm/yarn)
- **GSAP docs**: Always consult latest GSAP docs via Context7 before implementing new patterns or plugins
- **Design decisions**: Use `/frontend-design` skill before UI/UX changes
- **Browser testing**: Use `/agent-browser` skill for visual verification
- **File naming**: All files must use `kebab-case.ts` (never PascalCase.ts or camelCase.ts)
- **Folder naming**: Colocated folders use underscore prefix: `_components/`, `_lib/`, `_data/`

## File Structure Style Guide

```
src/
├── app/                          # Page routes only (Next.js App Router)
│   ├── (themes)/                 # Theme route groups
│   │   └── dwf-labs/
│   │       ├── page.tsx
│   │       ├── _components/      # Theme-specific components (colocated)
│   │       │   ├── hero-section.tsx
│   │       │   └── news-section.tsx
│   │       └── _lib/             # Theme-specific utilities (colocated)
│   │           └── news-data.ts
│   └── patterns/                 # Pattern route pages
│       └── basic-draggable/
│           ├── page.tsx
│           └── basic-draggable-pattern.tsx
│
├── components/                   # Shared/reusable UI components only
│   ├── patterns/
│   │   ├── pattern-header.tsx    # Direct imports (NO barrel files)
│   │   └── code-viewer.tsx
│   └── advanced-demo-indicator.tsx
│
├── lib/                          # Framework-agnostic utilities
│   ├── gsap-config.ts
│   └── utils/
│       └── performance-monitor.ts
│
└── types/                        # TypeScript definitions
    └── navigation.ts
```

### Key Conventions
- **Files**: `kebab-case.ts` (e.g., `hero-section.tsx`, `pattern-header.tsx`)
- **Components**: PascalCase exports (e.g., `export function HeroSection()`)
- **Colocated folders**: Underscore prefix (`_components/`, `_lib/`, `_data/`)
- **Imports**: Use absolute paths with `@/` alias
- **No barrel files**: Import directly from source files (Vercel best practice)

## Design System
- **Theme**: Industrial orange (`orange-500`) + dark zinc (`zinc-950/900/800`)
- **Typography**: Uppercase headers, tight tracking, Geist Mono
- **Motifs**: Corner accents, diagonal stripes, scan lines, grid patterns
- **Easing**: `back.out`, `power4.out`, `power3.out`
- **Timing**: 0.2s-0.6s durations with stagger delays

---

# GSAP Patterns

## Stagger Animation
```typescript
gsap.set(cards, { opacity: 0, x: 100 });
gsap.to(cards, {
  opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out',
  scrollTrigger: { trigger: container, start: 'top center', toggleActions: 'play none none reverse' }
});
```

## Centralized Config (`src/lib/gsap-config.ts`)
```typescript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);
export { gsap, ScrollTrigger };
```

## Cleanup Pattern (Critical)
```typescript
const scrollTrigger = tl.scrollTrigger; // Track before cleanup
return () => {
  if (scrollTrigger) scrollTrigger.kill(); // Only kill what you created
  tl.kill();
};
// NEVER: ScrollTrigger.getAll().forEach((t) => t.kill()) - kills ALL triggers globally
```

## Chrome Performance
- **Never** use inline `will-change` styles on animated elements
- GSAP's `force3D: 'auto'` handles GPU optimization
- Use `scrub: true` for direct linkage (best performance)
- Use `scrub: 1` only for smooth catch-up in pinned storytelling

## Pin Configuration (Required for multiple pinned sections)
```typescript
scrollTrigger: {
  trigger: container,
  start: 'top top',
  end: '+=2500',
  scrub: 1,
  pin: true,
  pinSpacing: true,         // Prevents overlap
  anticipatePin: 1,         // Prevents blank flash
  invalidateOnRefresh: true // Fixes resize breaks
}
```
