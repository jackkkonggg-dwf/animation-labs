# PRD: Advanced GSAP Patterns Showcase

## Introduction

Create a showcase gallery of 5-6 expert-level GSAP demo pages that demonstrate complex composition of multiple animation patterns. Each demo will combine scroll-driven animations, mouse/touch interactions, and time-based auto-playing sequences. The showcase will be educational, showing developers how to expertly combine GSAP features through interactive visual indicators, performance metrics, and debug modes.

## Goals

- Demonstrate expert-level GSAP patterns: complex ScrollTrigger choreography, multiple pinned sections, advanced easing
- Create 5-6 medium-complexity composed demos that showcase pattern combinations
- Provide educational visual indicators showing which GSAP features are active
- Include performance metrics overlay (FPS, animation duration) for each demo
- Add debug mode showing ScrollTrigger markers and timeline states
- Cover scroll-driven, mouse/touch, and time-based animations across demos
- Teach developers how to compose multiple patterns on a single page

## User Stories

### US-001: Create Advanced Patterns showcase page
**Description:** As a developer, I want a gallery page listing all advanced pattern demos so I can browse and select complex animation examples to study.

**Acceptance Criteria:**
- [ ] Create `/advanced-patterns` route with gallery grid layout
- [ ] Each demo card shows: title, description, used GSAP features, preview thumbnail
- [ ] Cards use hover animation (scale + shadow) consistent with design system
- [ ] Filter chips to sort by: Scroll-based, Interactive, Timeline-heavy, Mixed
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-002: Implement Demo 1 - "Cinematic Scroll Sequence"
**Description:** As a developer learning GSAP, I want to see a complex pinned scroll sequence with multiple timelines choreographed together.

**Acceptance Criteria:**
- [ ] Create `/advanced-patterns/cinematic-scroll` route
- [ ] Implement 3-4 pinned sections that auto-scroll through content
- [ ] Each section has multiple timelines: parallax backgrounds, text reveals, image reveals
- [ ] Use advanced easing: `back.out`, `elastic.out`, `expo.inOut`
- [ ] Nested timelines with precise timing control
- [ ] Cleanup on unmount with ScrollTrigger.kill()
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### ~~US-003: Implement Demo 2 - "Interactive Physics Playground"~~
**Status:** REMOVED - Demo deleted

### US-003: Implement Demo 2 - "SVG Morph & Path Journey"
**Description:** As a developer, I want to see MorphSVG and MotionPath combined for complex SVG animations.

**Acceptance Criteria:**
- [ ] Create `/advanced-patterns/svg-morph-journey` route
- [ ] MorphSVGPlugin for shape transitions between 3-4 states
- [ ] MotionPathPlugin for elements following morphing paths
- [ ] DrawSVG-style path animations combined with morphing
- [ ] Scroll-triggered morph progression
- [ ] Hover interaction that triggers independent morph animations
- [ ] SVG filters (blur, glow) animated with morph
- [ ] Cleanup kills all morph instances
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-004: Implement Demo 3 - "Text Symphony"
**Description:** As a developer, I want to see advanced text animations combining SplitText-style reveals with scroll and timeline control.

**Acceptance Criteria:**
- [ ] Create `/advanced-patterns/text-symphony` route
- [ ] Character-based stagger animations on scroll (cascade wave effects)
- [ ] Word-based reveals with different timings per section
- [ ] Line-by-line text reveals with custom easing
- [ ] Scroll-linked text scrub (text animates as user scrolls)
- [ ] Auto-playing timeline for hero text with complex choreography
- [ ] Text blends color/gradient on scroll progress
- [ ] Reduced motion support with CSS `@media (prefers-reduced-motion)`
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-005: Implement Demo 4 - "Gesture & Scroll Hybrid"
**Description:** As a developer, I want to see mouse/touch gestures combined with scroll-based animations for rich interactions.

**Acceptance Criteria:**
- [ ] Create `/advanced-patterns/gesture-scroll` route
- [ ] Mouse-follow cursor with trail effect (multiple trailing elements)
- [ ] Scroll velocity detection for dynamic animation speed
- [ ] Scroll direction awareness (different animations for up vs down)
- [ ] Touch swipe gestures triggering independent animations
- [ ] Pinch-zoom on images with smooth scale animation
- [ ] Hover states that interrupt scroll-based animations
- [ ] Observer plugin for efficient intersection detection
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-006: Implement Demo 5 - "Timeline Orchestration Masterclass"
**Description:** As a developer, I want to see complex timeline composition with labels, callbacks, and advanced control methods.

**Acceptance Criteria:**
- [ ] Create `/advanced-patterns/timeline-orchestration` route
- [ ] Master timeline with 5+ child timelines
- [ ] Timeline labels for precise sequencing: `tl.addLabel("section1")`
- [ ] `tl.to()` animations positioned relative to labels: `"<"` and `">"`
- [ ] Timeline callbacks: `onUpdate`, `onStart`, `onComplete`
- [ ] Progress control: play, pause, reverse, restart buttons
- [ ] Scrubber for manual timeline control
- [ ] Nested timelines with independent control
- [ ] Timeline restart capability from specific labels
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-007: Create visual indicator/legend component
**Description:** As a developer, I want to see which GSAP features are active at any time so I understand what's happening in the demo.

**Acceptance Criteria:**
- [ ] Create `AdvancedDemoIndicator` component
- [ ] Fixed overlay showing active GSAP plugins with icons
- [ ] Highlight plugin when animation using it is active
- [ ] Legend with color coding for different pattern types
- [ ] Current animation state (playing, paused, reversed)
- [ ] Collapsible to avoid obscuring demo
- [ ] Matches design system (zinc backgrounds, orange accents)
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-008: Create performance metrics overlay
**Description:** As a developer, I want to see real-time performance metrics to understand animation efficiency.

**Acceptance Criteria:**
- [ ] Create `PerformanceMetrics` component
- [ ] Real-time FPS counter using `requestAnimationFrame`
- [ ] Animation duration display per active timeline
- [ ] ScrollTrigger instances count
- [ ] Memory usage indicator (performance.memory if available)
- [ ] Toggle to show/hide metrics
- [ ] Color-coded performance: green (>50 FPS), yellow (30-50), red (<30)
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-009: Create debug mode with ScrollTrigger markers
**Description:** As a developer, I want to enable debug mode to see ScrollTrigger markers and understand trigger boundaries.

**Acceptance Criteria:**
- [ ] Create `DebugModeToggle` component
- [ ] Toggle switch in demo header
- [ ] When enabled: `ScrollTrigger.config({ ignoreMobileResize: true })` for stability
- [ ] Show built-in ScrollTrigger markers via `markers: true` on triggers
- [ ] Display timeline labels and positions
- [ ] Show current scroll position and velocity
- [ ] Highlight trigger boundaries on scroll
- [ ] Debug info panel shows: trigger element, start/end positions, scrub status
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-010: Register missing GSAP plugins
**Description:** As a developer, I need all required GSAP plugins registered for the advanced demos to work.

**Acceptance Criteria:**
- [ ] Add to `gsap-config.ts`: InertiaPlugin registration
- [ ] Add to `gsap-config.ts`: MorphSVGPlugin registration
- [ ] Add to `gsap-config.ts`: ScrollToPlugin registration
- [ ] Add to `gsap-config.ts`: SnapPlugin registration
- [ ] Add to `gsap-config.ts`: Observer plugin registration
- [ ] Note: SplitText is a Club GSAP paid plugin - create manual character/word splitting utility
- [ ] All plugins registered client-side only (check `typeof window !== 'undefined'`)
- [ ] Typecheck passes

### US-011: Install and register GSAP bonus plugins (now free!)
**Description:** As a developer, I need all GSAP bonus plugins registered since they are now free with GSAP 3.13+.

**Acceptance Criteria:**
- [ ] Verify `package.json` has `gsap@3.14.2` or higher
- [ ] Update `src/lib/gsap-config.ts` to register: SplitText, ScrollSmoother
- [ ] Update `src/lib/gsap-config.ts` to register: InertiaPlugin, MorphSVGPlugin
- [ ] Update `src/lib/gsap-config.ts` to register: DrawSVGPlugin, ScrambleTextPlugin
- [ ] Update `src/lib/gsap-config.ts` to register: ScrollToPlugin, SnapPlugin
- [ ] Update `src/lib/gsap-config.ts` to register: Observer
- [ ] All plugins registered client-side only (`typeof window !== 'undefined'`)
- [ ] Add TypeScript types for all new plugins
- [ ] Typecheck passes

## Functional Requirements

### Advanced Patterns
- FR-1: Implement complex ScrollTrigger choreography with multiple pinned sections
- FR-2: Combine Draggable with physics simulations (InertiaPlugin, ThrowPropsPlugin)
- FR-3: Demonstrate SVG morphing with MorphSVGPlugin and MotionPathPlugin
- FR-4: Create advanced text animations with manual character/word/line splitting
- FR-5: Implement gesture recognition combining mouse/touch with scroll
- FR-6: Build complex timeline orchestration with labels, positions, and callbacks

### Visual Indicators
- FR-7: Fixed overlay showing active GSAP plugins in real-time
- FR-8: Color-coded legend for pattern types (scroll, interactive, timeline)
- FR-9: Current animation state display (playing, paused, reversed)
- FR-10: Performance metrics: FPS, duration, instance count, memory

### Debug Features
- FR-11: Toggle switch for ScrollTrigger markers visibility
- FR-12: Debug panel showing trigger boundaries and positions
- FR-13: Scroll position and velocity display
- FR-14: Timeline label and position visualization

### Educational Features
- FR-15: Each demo includes descriptive header explaining patterns used
- FR-16: Code comments explaining complex timeline logic
- FR-17: Visual guide showing which animation corresponds to which code block
- FR-18: Links to GSAP documentation for each featured pattern

### Performance
- FR-19: All ScrollTriggers properly cleaned up on unmount
- FR-20: GPU acceleration used where appropriate (will-change, transform3d)
- FR-21: Reduced motion support via `prefers-reduced-motion` media query
- FR-22: FPS counter for real-time performance monitoring

## Non-Goals

- No code viewer section for these demos (explicitly requested)
- No mobile-specific responsive adjustments beyond basic layout
- No accessibility keyboard navigation for the interactive physics playground
- No backend API integration
- No user account or authentication
- No animation preset saving/sharing
- No audio/synced animations
- No WebGL/Three.js integration (keep it 2D DOM/SVG)
- No CMS integration for demo content

## Design Considerations

- Maintain industrial orange (#f97316) accent color scheme
- Use zinc backgrounds (zinc-950, zinc-900, zinc-800)
- Typography: Geist Mono with uppercase headers
- Visual motifs: corner accents, diagonal stripes, grid patterns
- Demo cards should feel "technical" and showcase-oriented
- Performance overlay should be subtle but readable (small text, semi-transparent)
- Debug markers should use GSAP's built-in colors but blend with dark theme
- Loading states for heavy SVG demos

## Technical Considerations

### GSAP Plugins to Add
```typescript
// All plugins are now FREE with GSAP 3.13+
// Current version: 3.14.2

// Already installed - register additional plugins:
- SplitText (for character/word/line text animations)
- ScrollSmoother (for smooth scrolling - optional global feature)
- InertiaPlugin (for draggable momentum)
- MorphSVGPlugin (for SVG shape morphing)
- DrawSVGPlugin (for SVG path drawing)
- ScrambleTextPlugin (for text scramble effects)
- ScrollToPlugin (for smooth scrolling)
- SnapPlugin (for snap-to-grid)
- Observer (for efficient intersection detection)
```

### Custom Utilities Needed
- Performance monitor using `requestAnimationFrame`
- Scroll velocity calculator
- Gesture recognizer (swipe, pinch detection)

### Component Structure
```
/app/advanced-patterns/
  ├── page.tsx (gallery)
  ├── cinematic-scroll/page.tsx
  ├── svg-morph-journey/page.tsx
  ├── text-symphony/page.tsx
  ├── gesture-scroll/page.tsx
  └── timeline-orchestration/page.tsx

/components/
  ├── AdvancedDemoIndicator.tsx
  ├── PerformanceMetrics.tsx
  └── DebugModeToggle.tsx

/lib/
  ├── gsap-config.ts (update with new plugins)
  └── utils/performance-monitor.ts
```

### Performance Considerations
- Lazy load heavy SVG demos
- Use `will-change` sparingly and remove after animation
- Batch DOM reads and writes
- Use `ScrollTrigger.batch()` for multiple elements
- Monitor for memory leaks with long-running timelines
- Consider virtualization for demos with many elements

### Browser Compatibility
- Modern browsers only (no IE11)
- Touch events for mobile gestures
- Pointer events for unified mouse/touch handling
- `ResizeObserver` for responsive triggers

## Success Metrics

- All 6 demos run at 60fps on mid-range devices
- Zero memory leaks after navigating away from demo pages
- Each demo uses 3+ GSAP features in combination
- Performance overlay shows consistent >50 FPS during scroll
- Debug mode clearly shows all trigger boundaries
- Developers can identify which GSAP features are used via legend
- Code cleanup properly kills all ScrollTriggers (verified with markers)
- Each demo takes <3 seconds to fully load

## Open Questions

- Should we include example code snippets for each pattern (even without a full code viewer)?
- How many draggable elements for the physics playground (balance complexity vs performance)?
- Should the gallery page have a "beginner path" vs "advanced path" option?
- Do we need mobile-specific gesture handling for touch devices?
- Should the performance metrics be persisted in localStorage for user reference?
- Should demos auto-play or wait for user interaction first (for better first impression)?
- Should we add ScrollSmoother as an optional global feature for the entire showcase?

---

**Pattern Categories to Demonstrate:**

| Demo | Primary Patterns | Secondary Patterns |
|------|------------------|-------------------|
| Cinematic Scroll | ScrollTrigger Pin, Timelines, Parallax | Text Reveal, Image Mask |
| Physics Playground | Draggable, Inertia, ThrowProps | Collision Detection, Snap |
| SVG Morph Journey | MorphSVG, MotionPath, DrawSVG | Filters, Scroll-triggered morph |
| Text Symphony | SplitText (chars/words/lines), Stagger | Scroll Scrub, Gradient blends, ScrambleText effects |
| Gesture Hybrid | Cursor follow, Scroll velocity, Swipe | Pinch-zoom, Observer |
| Timeline Orchestration | Nested timelines, Labels, Callbacks | Progress control, Scrubber |

**Required GSAP Plugins (all free with GSAP 3.13+):**
- ✅ ScrollTrigger (already registered)
- ✅ Draggable (already registered)
- ✅ MotionPathPlugin (already registered)
- ➕ SplitText (now free - for text animations)
- ➕ ScrollSmoother (now free - optional global smooth scroll)
- ➕ InertiaPlugin (now free - for draggable momentum)
- ➕ MorphSVGPlugin (now free - for SVG shape morphing)
- ➕ DrawSVGPlugin (now free - for SVG path drawing)
- ➕ ScrambleTextPlugin (now free - for text scramble effects)
- ➕ ScrollToPlugin (now free - for smooth scrolling)
- ➕ SnapPlugin (now free - for snap-to-grid)
- ➕ Observer (now free - for efficient intersection detection)
