# PRD: GSAP Animation Pattern Showcase

## Introduction

Create a comprehensive showcase of the most popular and commonly used GSAP animation patterns as of 2024-2025. This will be an educational resource, inspiration gallery, and component library combined, demonstrating modern GSAP techniques through production-quality React/Next.js demos. Each pattern will be implemented as a separate showcase page with reusable code, following the existing project structure and design system.

## Goals

- Document and demonstrate the most popular GSAP animation patterns used in modern web development
- Provide copy-pasteable React components that developers can use in their own projects
- Create visually impressive demos that showcase the full capabilities of GSAP
- Organize patterns by difficulty level (Beginner → Intermediate → Advanced)
- Maintain consistency with the existing industrial orange design system
- Ensure all demos are performant and follow Next.js 15 best practices

## User Stories

### US-001: Create navigation structure for animation categories
**Description:** As a user, I want to browse animations by category and difficulty level so I can find relevant patterns quickly.

**Acceptance Criteria:**
- [ ] Navigation organized by categories: Scroll, Text, Transitions, Micro-interactions, Advanced
- [ ] Each category shows the number of patterns within it
- [ ] Mobile menu supports category filtering
- [ ] URL params persist when filtering by category/difficulty
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-002: Implement basic ScrollTrigger reveal patterns
**Description:** As a developer, I want to see common scroll-triggered reveal animations so I can understand the fundamental ScrollTrigger patterns.

**Acceptance Criteria:**
- [ ] Fade-in reveal pattern with y-axis movement
- [ ] Scale-up reveal pattern with elastic easing
- [ ] Staggered reveal for multiple elements
- [ ] Batch reveal for grids of items
- [ ] Each pattern has code example displayed
- [ ] Demo area shows live animation
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-003: Implement horizontal scroll section patterns
**Description:** As a developer, I want to see horizontal scrolling animations so I can learn how to break the vertical scroll mold.

**Acceptance Criteria:**
- [ ] Basic horizontal scroll (pin + translate-x)
- [ ] Parallax horizontal scroll layers
- [ ] Horizontal scroll with vertical indicators
- [ ] Horizontal scroll with snap points
- [ ] Each pattern explains the pin/scrub configuration
- [ ] Code examples included
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-004: Implement text animation patterns
**Description:** As a developer, I want to see text reveal and animation patterns so I can create engaging kinetic typography.

**Acceptance Criteria:**
- [ ] Character-by-character reveal (staggered)
- [ ] Word-by-word reveal with splitting
- [ ] Line-by-line reveal for multi-line text
- [ ] Text fill/color transition on scroll
- [ ] Text highlight/reveal combo
- [ ] Scramble text effect
- [ ] Wavy text animation
- [ ] Each pattern includes text splitting logic
- [ ] Code examples provided
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-005: Implement parallax and depth patterns
**Description:** As a developer, I want to see parallax effects so I can create depth and dimension in scroll experiences.

**Acceptance Criteria:**
- [ ] Simple parallax (background moves slower than foreground)
- [ ] Multi-layer parallax with different speeds
- [ ] Parallax with rotation/scale combo
- [ ] Parallax image reveal (clip-path based)
- [ ] 3D transform parallax with perspective
- [ ] Each pattern explains speed ratios and scrub settings
- [ ] Code examples included
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-006: Implement page transition patterns
**Description:** As a developer, I want to see seamless page transition animations so I can create smooth navigation experiences.

**Acceptance Criteria:**
- [ ] Fade + slide transition
- [ ] Wipe/reveal transition (using clip-path)
- [ ] Scale + fade transition
- [ ] Overlay curtain transition
- [ ] Staggered element exit + entrance
- [ ] Transitions work with Next.js App Router
- [ ] Each transition handles forward and back navigation
- [ ] Code examples included
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-007: Implement micro-interaction patterns
**Description:** As a developer, I want to see button and card hover animations so I can create polished, delightful UI interactions.

**Acceptance Criteria:**
- [ ] Button hover with scale + shadow
- [ ] Magnetic button effect (follows cursor)
- [ ] Card hover with 3D tilt effect
- [ ] Icon animation on hover
- [ ] Staggered children reveal on card hover
- [ ] Loading/spinner animations
- [ ] Progress bar animations
- [ ] Each pattern uses precise easing for "delightful" feel
- [ ] Code examples included
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-008: Implement timeline-based patterns
**Description:** As a developer, I want to see complex timeline animations so I can choreograph multi-step sequences.

**Acceptance Criteria:**
- [ ] Sequential animation timeline
- [ ] Overlapping animations with labels
- [ ] Timeline with ScrollTrigger scrub
- [ ] Timeline with pause/play controls
- [ ] Timeline with progress bar
- [ ] Nested timeline patterns
- [ ] Each pattern shows timeline structure visually
- [ ] Code examples included
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-009: Implement SVG animation patterns
**Description:** As a developer, I want to see SVG-based animations so I can create vector animations that scale perfectly.

**Acceptance Criteria:**
- [ ] SVG path drawing animation (stroke-dasharray)
- [ ] Morphing shape animations (if available, or CSS-based alternatives)
- [ ] SVG filter effects on scroll
- [ ] Animated icons and illustrations
- [ ] SVG mask reveal patterns
- [ ] Code examples included
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-010: Implement draggable patterns
**Description:** As a developer, I want to see draggable interfaces so I can create interactive, touch-friendly components.

**Acceptance Criteria:**
- [ ] Draggable card/element
- [ ] Draggable with momentum/inertia
- [ ] Draggable with bounds/constraints
- [ ] Draggable sortable list
- [ ] Draggable slider/carousel
- [ ] Touch-friendly interactions
- [ ] Each pattern shows event handling
- [ ] Code examples included
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-011: Implement advanced scroll patterns
**Description:** As an experienced developer, I want to see advanced ScrollTrigger techniques so I can create immersive scroll experiences.

**Acceptance Criteria:**
- [ ] Pinned section with sequence
- [ ] Scroll-linked video playback
- [ ] Scroll-based color theme transitions
- [ ] Scroll-triggered count-up animations
- [ ] Scroll-based image sequence (frame-by-frame)
- [ ] Parallax with pinned sections
- [ ] Each pattern explains complex trigger configurations
- [ ] Code examples included
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-012: Implement performance-optimized patterns
**Description:** As a developer, I want to see performance best practices so my animations run at 60fps on all devices.

**Acceptance Criteria:**
- [ ] will-change optimization patterns
- [ ] GPU acceleration techniques
- [ ] Batch animation for multiple elements
- [ ] Debounced scroll handlers
- [ ] Reduced motion preferences
- [ ] Mobile-specific optimizations
- [ ] Each pattern explains performance considerations
- [ ] Code examples included
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-013: Create pattern detail page with code viewer
**Description:** As a developer, I want to see the full code for each pattern so I can understand and copy it.

**Acceptance Criteria:**
- [ ] Each pattern has its own route (e.g., /patterns/fade-reveal)
- [ ] Live demo at top of page
- [ ] Syntax-highlighted code viewer
- [ ] Code is collapsible by sections (component, styles, hooks)
- [ ] "Copy to clipboard" button for each section
- [ ] Difficulty badge (Beginner/Intermediate/Advanced)
- [ ] Related patterns suggestions
- [ ] Navigation to next/previous pattern
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-014: Update navigation data with all patterns
**Description:** As a user, I want to see all new patterns in the navigation so I can discover and access them.

**Acceptance Criteria:**
- [ ] navigation-data.ts includes all 12+ pattern categories
- [ ] Each pattern has id, title, description, path, category, difficulty
- [ ] Pattern count is correct in navigation
- [ ] Mobile menu loads all patterns correctly
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-015: Add difficulty indicators to demo cards
**Description:** As a user, I want to see difficulty levels on demo cards so I can choose patterns appropriate for my skill level.

**Acceptance Criteria:**
- [ ] Demo cards show difficulty badge (color-coded)
- [ ] Beginner: green badge
- [ ] Intermediate: yellow badge
- [ ] Advanced: orange/red badge
- [ ] Cards are filterable by difficulty
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-016: Add code preview to demo cards on hover
**Description:** As a developer, I want to see a snippet of the code when hovering a card so I can quickly assess if the pattern is relevant.

**Acceptance Criteria:**
- [ ] Hovering a card reveals a code preview overlay
- [ ] Shows 5-10 lines of the core animation code
- [ ] Syntax highlighted
- [ ] Animation pauses when code is shown
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-017: Create homepage overview of all pattern categories
**Description:** As a new user, I want to see all available pattern categories at a glance so I understand what's available.

**Acceptance Criteria:**
- [ ] Hero section explains the showcase purpose
- [ ] Category grid with icons and descriptions
- [ ] Pattern count per category
- [ ] "Start learning" CTA for beginners
- [ ] Featured/Popular patterns highlighted
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-018: Add search and filter functionality
**Description:** As a user, I want to search and filter patterns so I can quickly find what I'm looking for.

**Acceptance Criteria:**
- [ ] Search input filters patterns by title/description
- [ ] Filter by category dropdown
- [ ] Filter by difficulty dropdown
- [ ] Active filters shown as removable chips
- [ ] Filter state persists in URL
- [ ] Empty state when no results
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

## Functional Requirements

### Navigation & Discovery
- FR-1: Main navigation organized by pattern categories (Scroll, Text, Transitions, Micro-interactions, Advanced)
- FR-2: Each pattern has a unique route following Next.js App Router conventions
- FR-3: Pattern cards display title, description, difficulty badge, and category
- FR-4: Search functionality filters patterns in real-time
- FR-5: Category and difficulty filters are stackable
- FR-6: URL params persist filter state across navigation

### Pattern Pages
- FR-7: Each pattern page has a live interactive demo at the top
- FR-8: Syntax-highlighted code viewer for component, hooks, and styles
- FR-9: "Copy to clipboard" functionality for each code section
- FR-10: Difficulty badge and category displayed on pattern page
- FR-11: Related patterns suggested at bottom of page
- FR-12: Next/previous pattern navigation

### Animation Categories (12 total)
- FR-13: **ScrollTrigger Basics** - Fade reveals, scale reveals, staggered reveals, batch reveals
- FR-14: **Horizontal Scroll** - Basic horizontal scroll, parallax horizontal, indicators, snap points
- FR-15: **Text Animations** - Character/word/line reveals, text fill, scramble, wavy text
- FR-16: **Parallax & Depth** - Simple parallax, multi-layer, rotation, image reveal, 3D transforms
- FR-17: **Page Transitions** - Fade slide, wipe, scale, curtain, staggered transitions
- FR-18: **Micro-interactions** - Button hovers, magnetic effect, card tilt, icons, loaders, progress
- FR-19: **Timelines** - Sequential, overlapping, scrub, controls, nested timelines
- FR-20: **SVG Animations** - Path drawing, morphing, filters, masks, animated icons
- FR-21: **Draggable** - Basic drag, momentum, bounds, sortable, slider
- FR-22: **Advanced Scroll** - Pinned sequences, video playback, theme transitions, count-up, image sequences
- FR-23: **Performance** - will-change, GPU acceleration, batching, debouncing, reduced motion
- FR-24: **Real-world Examples** - Combining multiple patterns for complete sections

### Code Quality
- FR-25: All components use the existing GSAP provider pattern from `/src/lib/gsap-config.ts`
- FR-26: All animations use `useGSAP` hook with proper cleanup
- FR-27: ScrollTrigger instances properly cleaned up on unmount
- FR-28: All animations follow the existing cleanup pattern documented in `/src/CLAUDE.md`
- FR-29: TypeScript strict mode compliance
- FR-30: ESLint passes without warnings

### Design System
- FR-31: All pages use the industrial orange design system (black/zinc/orange-500)
- FR-32: Consistent use of corner accents, diagonal stripes, scan line effects
- FR-33: Typography uses uppercase tracking for headers
- FR-34: Grid pattern overlays for depth
- FR-35: Consistent spacing and sizing with existing components

## Non-Goals (Out of Scope)

- No backend/ database integration - all patterns are static
- No user authentication or accounts
- No pattern submission or community features
- No video tutorials (code comments and explanations only)
- No framework-agnostic vanilla JS versions (React/Next.js focused)
- No integration with animation editors/libraries beyond GSAP
- No automated testing of animations (visual testing only)
- No accessibility violations (reduced motion support IS in scope)

## Design Considerations

- Maintain the existing industrial orange aesthetic from `src/app/globals.css`
- Use the same card component structure as `src/components/navigation/demo-grid.tsx`
- Mobile-first responsive design for all pattern demos
- Dark theme only (zinc-950 background)
- Orange-500 as primary accent color
- Consistent use of `grid-pattern-overlay` for backgrounds
- Aggressive, snappy easing for modern feel (back.out, power4.out)

## Technical Considerations

- Next.js 16.1.5 with App Router
- React 19.2.3 with useGSAP hook from @gsap/react
- GSAP 3.14.2 with all official plugins (now 100% free per user)
- Tailwind CSS 4 for styling
- TypeScript with strict mode
- Centralized GSAP config pattern from `/src/lib/gsap-config.ts`
- Component structure: Each pattern in `/src/app/patterns/[pattern-id]/page.tsx`
- Reusable pattern components in `/src/components/patterns/`
- Pattern metadata in `/src/lib/patterns-data.ts`

### Performance Requirements
- Each demo page should load in under 2 seconds on 3G
- Animations must run at 60fps on desktop, 30fps minimum on mobile
- Use `will-change` sparingly and only for animating properties
- Implement `prefers-reduced-motion` for all patterns
- Lazy load pattern components when not visible

### Cleanup Pattern (Critical)
All pattern components MUST follow this cleanup pattern:
```typescript
useGSAP(() => {
  const container = containerRef.current;
  if (!container) return;

  const triggers: ScrollTrigger[] = [];

  // Create animations...

  ScrollTrigger.refresh();

  return () => {
    triggers.forEach((t) => t.kill());
    gsap.killTweensOf(elements);
  };
}, { scope: containerRef });
```

## Success Metrics

- All 12 pattern categories implemented with at least 4 patterns each
- Total of 50+ individual pattern demos
- Each pattern page loads in under 2 seconds
- 60fps animations on desktop, 30fps minimum on mobile
- Zero TypeScript errors
- Zero ESLint warnings
- Zero console errors or warnings
- All patterns have copy-pasteable code examples

## Open Questions

- Should code examples be collapsible or always visible?
- Should we add a "Try in CodeSandbox" button for each pattern?
- Should patterns support dark/light theme toggle or stick to dark only?
- Should we add animation speed controls (0.5x, 1x, 2x) for demos?
- Should we add a "Pattern Collection" feature to save favorites?

## Pattern Inventory (Full List)

### Category 1: ScrollTrigger Basics (Beginner)
1. Fade-in reveal with y-movement
2. Scale-up reveal with elastic easing
3. Staggered reveal for lists/grids
4. Batch reveal with intersection
5. ToggleActions playground
6. Trigger start/end positions visualizer

### Category 2: Horizontal Scroll (Intermediate)
1. Basic horizontal pinned scroll
2. Parallax horizontal layers
3. Horizontal scroll with vertical progress indicator
4. Horizontal scroll with snap points
5. Multiple horizontal sections

### Category 3: Text Animations (Intermediate)
1. Character-by-character reveal
2. Word-by-word reveal with split
3. Line-by-line reveal
4. Text fill animation on scroll
5. Scramble text effect
6. Wavy text animation
7. Text highlight/reveal combo
8. Rotating text on scroll

### Category 4: Parallax & Depth (Intermediate)
1. Simple parallax (speed difference)
2. Multi-layer parallax forest
3. Parallax with rotation
4. Parallax image reveal (clip-path)
5. 3D perspective parallax
6. Mouse movement parallax

### Category 5: Page Transitions (Advanced)
1. Fade + slide transition
2. Wipe transition (clip-path)
3. Scale + fade transition
4. Overlay curtain transition
5. Staggered exit/entrance
6. Circle reveal transition

### Category 6: Micro-interactions (Beginner)
1. Button scale + shadow hover
2. Magnetic button effect
3. Card 3D tilt hover
4. Icon animation on hover
5. Loading spinners (3 variations)
6. Progress bar animations
7. Card stagger on hover
8. Checkbox/radio animations

### Category 7: Timelines (Intermediate)
1. Sequential animations
2. Overlapping with labels
3. Scrub-linked timeline
4. Timeline with play/pause
5. Timeline with progress bar
6. Nested timelines
7. Timeline callbacks

### Category 8: SVG Animations (Intermediate)
1. Path drawing animation
2. SVG filter effects
3. SVG mask reveal
4. Animated icons
5. SVG along path motion
6. SVG morph (if available)

### Category 9: Draggable (Advanced)
1. Basic draggable element
2. Draggable with momentum
3. Draggable with bounds
4. Draggable sortable list
5. Draggable carousel/slider
6. Draggable with throw props
7. Draggable collision detection

### Category 10: Advanced Scroll (Advanced)
1. Pinned sequence animation
2. Scroll-controlled video
3. Scroll-based theme transition
4. Count-up on scroll
5. Image sequence (frame-by-frame)
6. Scrub timeline with text sync
7. Parallax with pin

### Category 11: Performance (Beginner)
1. will-change optimization
2. GPU acceleration demo
3. Batch animation patterns
4. Debounced scroll handlers
5. Reduced motion support
6. Mobile optimization techniques

### Category 12: Real-world Examples (Advanced)
1. Hero section with reveal
2. Feature grid with stagger
3. Testimonial carousel
4. Pricing cards with hover
5. Team section with parallax
6. Contact form with micro-interactions

**Total: 64 patterns**

## Sources

Research for this PRD was based on the following resources:
- [Best GSAP Animation Websites | Web Design Inspiration](https://www.awwwards.com/websites/gsap/)
- [GSAP ScrollTrigger: Complete Guide with 20+ Examples](https://gsapify.com/gsap-scrolltrigger)
- [Trigger Animations On Scroll With GSAP](https://marmelab.com/blog/2024/04/11/trigger-animations-on-scroll-with-gsap-scrolltrigger.html)
- [A Beginner's Guide to Scroll-Based Animations with GSAP](https://dev.to/andrew-saeed/bring-your-scroll-to-life-a-beginners-guide-to-scroll-based-animations-with-gsap-f95)
- [GSAP ScrollTrigger Best Practices](https://gsap.com/community/forums/topic/32787-scrolltrigger-best-practices/)
- [Create a Text Reveal Animation with GSAP](https://medium.com/@idorenyinudoh10/create-a-text-reveal-animation-with-gsap-21cc8b425030)
- [From SplitText to MorphSVG: 5 Creative Demos Using Free GSAP Plugins](https://tympanus.net/codrops/2025/05/14/from-splittext-to-morphsvg-5-creative-demos-using-free-gsap-plugins/)
- [20 Cool GSAP Animations Examples and Effects](https://animation-addons.com/blog/gsap-animation-examples-effects/)
- [GSAP Draggable Documentation](https://gsap.com/docs/v3/Plugins/Draggable/)
- [GSAP UI Plugins](https://gsap.com/ui/)
