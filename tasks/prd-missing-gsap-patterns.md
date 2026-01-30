# PRD: Missing GSAP Animation Patterns

## Introduction

This PRD outlines the implementation of 10 missing GSAP animation patterns to complete the animation showcase. All GSAP plugins are now free (as of 2025), including previously premium plugins like SplitText, MorphSVG, MotionPath, ScrollSmoother, and ScrambleText.

These patterns will be implemented both as standalone demo pages and integrated into the existing theme showcases for real-world context.

## Goals

- Complete the GSAP animation showcase with comprehensive coverage of all major GSAP plugins
- Provide both standalone pattern demos and themed showcase examples
- Maintain consistency with existing design system (industrial orange + dark zinc theme)
- Follow established GSAP patterns (cleanup, performance, configuration)

## User Stories

### US-001: Add Flip plugin pattern (Layout Transitions)
**Description:** As a developer, I want a Flip animation demo so I can learn how to animate layout changes smoothly.

**Acceptance Criteria:**
- [ ] Create `/patterns/flip-transitions/page.tsx` with flip-transitions-pattern.tsx
- [ ] Demonstrate FLIP technique: record state → mutate DOM → animate from state
- [ ] Show 3 examples: reorder list items, expand/collapse cards, toggle grid positions
- [ ] Use industrial orange accent colors for animated elements
- [ ] Follow cleanup pattern: track Flip state, kill on unmount
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-002: Add ScrambleText plugin pattern (Text Cypher)
**Description:** As a developer, I want a ScrambleText animation demo so I can create tech-style text reveals.

**Acceptance Criteria:**
- [ ] Create `/patterns/scramble-text/page.tsx` with scramble-text-pattern.tsx
- [ ] Demonstrate cypher effect with customizable character sets
- [ ] Show 3 variants: random characters, numbers-only, binary-style
- [ ] Include speed and reveal delay controls
- [ ] Use Geist Mono typography for cyberpunk aesthetic
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-003: Add MotionPath plugin pattern (Path Following)
**Description:** As a developer, I want a MotionPath animation demo so I can animate elements along SVG paths.

**Acceptance Criteria:**
- [ ] Create `/patterns/motion-path/page.tsx` with motion-path-pattern.tsx
- [ ] Demonstrate element following SVG curve path
- [ ] Show auto-rotate option (element follows path direction)
- [ ] Include 3 path examples: simple curve, figure-8, spiral
- [ ] Visualize the path with stroke animation
- [ ] Follow cleanup pattern for motionPath tweens
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-004: Add MorphSVG plugin pattern (Shape Morphing)
**Description:** As a developer, I want a MorphSVG animation demo so I can transform between SVG shapes.

**Acceptance Criteria:**
- [ ] Create `/patterns/morph-svg/page.tsx` with morph-svg-pattern.tsx
- [ ] Demonstrate shape morphing between 3+ SVG shapes
- [ ] Show morph options: smooth points, shapeIndex control
- [ ] Include examples: circle→triangle→square, icon transitions, blob morphing
- [ ] Use orange-500 for morphed shapes
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-005: Add ScrollSmoother pattern (Smooth Scrolling)
**Description:** As a developer, I want a ScrollSmoother demo so I can implement buttery smooth page scrolling.

**Acceptance Criteria:**
- [ ] Create `/patterns/scroll-smoother/page.tsx` with scroll-smoother-pattern.tsx
- [ ] Initialize ScrollSmoother with smooth: 1 configuration
- [ ] Demonstrate data-speed and data-lag parallax effects
- [ ] Show smooth scrollTo button examples
- [ ] Include touch device configuration (smoothTouch: 0.1)
- [ ] Follow cleanup pattern: smoother.kill() on unmount
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-006: Add Observer pattern (Universal Input)
**Description:** As a developer, I want an Observer demo so I can handle multiple input types uniformly.

**Acceptance Criteria:**
- [ ] Create `/patterns/observer/page.tsx` with observer-pattern.tsx
- [ ] Demonstrate unified handling of: pointer, scroll, touch, key events
- [ ] Show debounce/throttle configuration
- [ ] Include examples: scroll direction detection, pinch-to-zoom, arrow key navigation
- [ ] Visual feedback with orange accent indicators
- [ ] Follow cleanup pattern: observer.kill() on unmount
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-007: Add Inertia plugin pattern (Momentum Physics)
**Description:** As a developer, I want an Inertia demo beyond Draggable so I can create natural momentum animations.

**Acceptance Criteria:**
- [ ] Create `/patterns/inertia-physics/page.tsx` with inertia-physics-pattern.tsx
- [ ] Demonstrate inertia with velocity, min/max boundaries
- [ ] Show 3 examples: sliding panel, spinning wheel, bouncing element
- [ ] Include snap points configuration
- [ ] Use industrial theme for interactive elements
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-008: Add Physics2D plugin pattern (2D Physics)
**Description:** As a developer, I want a Physics2D demo so I can create gravity and velocity simulations.

**Acceptance Criteria:**
- [ ] Create `/patterns/physics2d/page.tsx` with physics2d-pattern.tsx
- [ ] Demonstrate physics with velocity, angle, gravity
- [ ] Show 3 examples: projectile motion, bouncing ball, falling elements
- [ ] Include friction and acceleration controls
- [ ] Visual trajectory paths with SVG
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-009: Add ScrollTo plugin pattern (Smooth Scroll Navigation)
**Description:** As a developer, I want a ScrollTo demo so I can implement smooth scroll-to-section navigation.

**Acceptance Criteria:**
- [ ] Create `/patterns/scroll-to/page.tsx` with scroll-to-pattern.tsx
- [ ] Demonstrate scrollTo with: element selector, y-offset, duration
- [ ] Show navigation menu with smooth scroll to sections
- [ ] Include autoKill: true for interruptible scrolls
- [ ] Add progress indicator during scroll animation
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-010: Add Advanced ScrollTrigger patterns (View/Marker)
**Description:** As a developer, I want advanced ScrollTrigger demos so I can implement complex scroll-based reveals.

**Acceptance Criteria:**
- [ ] Create `/patterns/advanced-scrolltrigger/page.tsx` with advanced-scrolltrigger-pattern.tsx
- [ ] Demonstrate view-based triggering (onEnter, onLeave, onEnterBack, onLeaveBack)
- [ ] Show callback-based animations using toggleActions
- [ ] Include class toggling examples
- [ ] Demonstrate nested pin scenarios
- [ ] Follow established ScrollTrigger cleanup pattern
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-011: Integrate patterns into theme showcases
**Description:** As a user, I want to see these patterns used in real-world themed contexts.

**Acceptance Criteria:**
- [ ] Update `dwf-futuristic-theme`: Add ScrambleText to terminal-section
- [ ] Update `dwf-futuristic-theme`: Add MotionPath to stats-section (data flow animation)
- [ ] Update `dwf-brutalist-theme`: Add MorphSVG to logo/marquee transitions
- [ ] Update `dwf-brutalist-theme`: Add Flip to portfolio grid reordering
- [ ] Update `dwf-zen-theme`: Add ScrollSmoother for smooth parallax scrolling
- [ ] Update `dwf-ocean-theme`: Add Physics2D for floating bubble effects
- [ ] Update navigation: Add ScrollTo for smooth section navigation
- [ ] Add Observer to hero sections for scroll direction detection
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-012: Update patterns data and navigation
**Description:** As a developer, I want the new patterns categorized and navigable.

**Acceptance Criteria:**
- [ ] Update `src/lib/patterns-data.ts` with new categories if needed
- [ ] Add new patterns to navigation menu
- [ ] Ensure all patterns have proper metadata (title, description, difficulty)
- [ ] Update pattern count stats
- [ ] Typecheck passes

## Functional Requirements

- FR-1: All new patterns must use existing GSAP config from `src/lib/gsap-config.ts`
- FR-2: All plugins must be registered in client-side only (typeof window !== 'undefined')
- FR-3: All ScrollTrigger variants must follow the cleanup pattern: track trigger, kill on unmount
- FR-4: All patterns must use industrial orange (orange-500) + dark zinc (zinc-950/900/800) theme
- FR-5: All patterns must use Geist Mono typography with uppercase headers
- FR-6: All patterns must support reduced motion (prefers-reduced-motion)
- FR-7: Each pattern page must include replay button for re-triggering animations
- FR-8: Each pattern must include code viewer showing the implementation
- FR-9: Theme integrations must match existing theme aesthetic
- FR-10: No inline `will-change` styles - let GSAP handle GPU optimization

## Non-Goals (Out of Scope)

- No 3D/WebGL animations (PixiPlugin, EaselPlugin)
- No GSDevTools integration
- No custom easing functions beyond GSAP's built-in eases
- No audio/reaction animations
- No mobile-specific gestures (beyond basic Observer touch)

## Design Considerations

### Theme Integration Points
- **Futuristic Theme**: ScrambleText (terminal), MotionPath (data flow), Observer (gesture controls)
- **Brutalist Theme**: MorphSVG (shape transitions), Flip (grid reorders), Inertia (sliding panels)
- **Zen Theme**: ScrollSmoother (smooth scroll), Physics2D (floating elements)
- **Ocean Theme**: Physics2D (bubbles), ScrollTo (section nav)
- **Professional Theme**: View-based ScrollTrigger (section reveals)

### Visual Style
- All animated elements use orange-500 accent
- Dark backgrounds: zinc-950 (main), zinc-900 (cards), zinc-800 (borders)
- Corner accents, diagonal stripes, scan lines for industrial feel
- Easing: back.out, power4.out, power3.out
- Duration: 0.2s-0.6s with stagger delays

## Technical Considerations

### Plugin Registration
All new plugins must be registered in `src/lib/gsap-config.ts`:
```typescript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { Flip } from 'gsap/Flip';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { Observer } from 'gsap/Observer';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { Physics2DPlugin } from 'gsap/Physics2DPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(
    ScrollTrigger,
    ScrollToPlugin,
    ScrollSmoother,
    Flip,
    MotionPathPlugin,
    MorphSVGPlugin,
    ScrambleTextPlugin,
    Observer,
    InertiaPlugin,
    Physics2DPlugin
  );
}
```

### Package Installation
Required packages to install:
```bash
pnpm add gsap
```
(Note: All plugins are now included in the base gsap package as of v3.13+)

### Performance Considerations
- ScrollSmoother: Use `smoothTouch: 0.1` for touch devices
- MotionPath: Cache path calculations where possible
- MorphSVG: Use `shapeIndex` for predictable morphing
- Flip: Batch DOM mutations before Flip.from()
- Observer: Use debounce/throttle for high-frequency events

### Cleanup Patterns
Each pattern type has specific cleanup needs:
```typescript
// Flip cleanup
const state = Flip.getState(element);
// ... mutations and animation
return () => state.kill();

// ScrollSmoother cleanup
const smoother = ScrollSmoother.create({...});
return () => smoother.kill();

// Observer cleanup
const observer = Observer.create({...});
return () => observer.kill();
```

## Success Metrics

- All 10 new patterns implemented with consistent design
- Zero TypeScript errors
- All patterns pass browser visual verification
- Theme integrations enhance existing showcases without breaking them
- Page load performance not degraded (Lighthouse score maintained)
- All animations respect reduced motion preference

## Open Questions

- Should ScrollSmoother be opt-in per page or global? (Recommend: per-pattern demo only)
- Should we add pattern difficulty ratings (beginner/intermediate/advanced)?
- Should patterns be sortable/filterable by plugin or category?
- Should we add interactive controls (sliders, toggles) to adjust animation parameters?

---

## Sources

- [GSAP Pricing - All Plugins Now Free](https://gsap.com/pricing/)
- [GSAP Documentation](https://gsap.com/docs/v3/index)
- [Webflow: GSAP Becomes Free](https://webflow.com/blog/gsap-becomes-free)
- [CSS-Tricks: GSAP Now Completely Free](https://css-tricks.com/gsap-is-now-completely-free-even-for-commercial-use/)
