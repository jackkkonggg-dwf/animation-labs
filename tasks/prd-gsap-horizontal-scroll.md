# PRD: GSAP Horizontal Scroll Animation - Artist Cards Carousel

## Introduction

A portfolio/demo project showcasing advanced frontend animation skills using GSAP ScrollTrigger. The page features a horizontal scroll animation where 7 artist cards cascade across the viewport as the user scrolls vertically. This serves as a demonstration of smooth, performant scroll-based animations for potential clients.

## Goals

- Demonstrate mastery of GSAP and ScrollTrigger for scroll-based animations
- Create a visually striking, smooth horizontal scroll experience
- Showcase performance optimization techniques for animations
- Build a reusable pattern for horizontal scroll sections

## User Stories

### US-001: Initialize Next.js project with GSAP dependencies
**Description:** As a developer, I need a properly configured Next.js project with GSAP and ScrollTrigger installed so I can build scroll-based animations.

**Acceptance Criteria:**
- [ ] Create new Next.js project with TypeScript
- [ ] Install gsap and scrolltrigger packages via npm
- [ ] Register ScrollTrigger plugin
- [ ] Project builds without errors
- [ ] Typecheck passes

### US-002: Create horizontal scroll section structure
**Description:** As a developer, I need to build the HTML structure for the horizontal scroll container and cards so GSAP can animate them.

**Acceptance Criteria:**
- [ ] Create full-viewport container section
- [ ] Add 7 card elements with consistent dimensions
- [ ] Each card has placeholder content (image, name, description)
- [ ] Cards initially positioned off-screen to the right
- [ ] Container has proper overflow handling
- [ ] Verify in browser using dev-browser skill

### US-003: Implement GSAP horizontal scroll animation
**Description:** As a developer, I need to configure GSAP ScrollTrigger to map vertical scroll to horizontal card movement so cards slide left as user scrolls down.

**Acceptance Criteria:**
- [ ] Pin the horizontal container section during scroll
- [ ] Cards translate horizontally based on vertical scroll position
- [ ] Scrub enabled with value of 1 for smooth scroll-follow
- [ ] End value calculated dynamically based on container width
- [ ] All 7 cards traverse across viewport fully
- [ ] Verify in browser using dev-browser skill

### US-004: Add staggered card entry animation
**Description:** As a developer, I need to implement staggered timing so cards cascade into view with a fanning effect rather than moving all at once.

**Acceptance Criteria:**
- [ ] Each card has staggered delay (0.15-0.3s between cards)
- [ ] Cards animate from opacity 0 and offset x position
- [ ] Stagger triggers when section enters viewport
- [ ] Creates cascading/fanning visual effect
- [ ] Verify in browser using dev-browser skill

### US-005: Style cards with dark mode neon aesthetic
**Description:** As a developer, I need to style the cards with a dark mode and neon accents design so the page has a modern, edgy visual aesthetic.

**Acceptance Criteria:**
- [ ] Dark background (near black or deep purple/blue)
- [ ] Neon accent colors (cyan, magenta, lime, etc.)
- [ ] Cards have rounded corners with shadow/depth effects
- [ ] Hover states with glow effects on cards
- [ ] Typography is modern and readable on dark background
- [ ] Verify in browser using dev-browser skill

### US-006: Add placeholder artist content
**Description:** As a developer, I need to populate cards with mock artist data so the animation demonstrates realistic content.

**Acceptance Criteria:**
- [ ] 7 unique artist cards with placeholder names (Artist 1-7)
- [ ] Each card has placeholder image URL (e.g., Unsplash or gradient)
- [ ] Brief description text on each card
- [ ] Consistent card dimensions across all 7 cards
- [ ] Verify in browser using dev-browser skill

### US-007: Add page header and completion indicator
**Description:** As a user, I want to see a title at the top and know when I've completed the scroll so I understand the page structure.

**Acceptance Criteria:**
- [ ] Fixed or sticky header with project title
- [ ] Visual indicator of scroll progress
- [ ] End state shows completion message or visual cue
- [ ] Verify in browser using dev-browser skill

## Functional Requirements

- FR-1: Next.js 14+ project with TypeScript
- FR-2: GSAP 3.x and ScrollTrigger plugin installed and registered
- FR-3: Full-viewport horizontal scroll container (100vh height)
- FR-4: Exactly 7 artist cards with consistent dimensions (e.g., 60vw width, 70vh height)
- FR-5: Vertical page scroll triggers horizontal card movement (left direction)
- FR-6: Container pinned during horizontal scroll animation
- FR-7: Scrub enabled with value 1 for direct scroll control
- FR-8: Stagger timing of 0.15-0.3 seconds between card animations
- FR-9: Cards animate from x: 100, opacity: 0 with stagger
- FR-10: Dark mode background with neon accent colors
- FR-11: Cards have rounded corners and shadow/depth effects
- FR-12: Hover states with glow effects on individual cards
- FR-13: Placeholder artist data (names, images, descriptions)

## Non-Goals (Out of Scope)

- No real artist data or CMS integration
- No additional animation demos beyond horizontal scroll
- No navigation to other pages (single-page app)
- No call-to-action or lead capture forms
- No social sharing functionality
- No mobile-specific responsive behaviors beyond basic responsiveness
- No analytics or tracking
- No SEO optimization for search engines

## Design Considerations

### Visual Style
- Dark background: hex colors like #0a0a0f, #1a1a2e, or deep purple/blue
- Neon accents: cyan (#00ffff), magenta (#ff00ff), lime (#00ff00)
- Modern sans-serif typography (Inter, Space Grotesk, or similar)
- Card shadows using CSS box-shadow or GSAP filters

### Card Layout
- Cards overlap slightly for depth effect
- 1-2 cards visible in viewport at any time
- Smooth easing for all animations

### Performance
- Use GSAP's native performance optimizations
- Avoid layout thrashing during animations
- Consider will-change CSS property for animated elements

## Technical Considerations

### Dependencies
```json
{
  "gsap": "^3.12.x",
  "next": "^14.x",
  "react": "^18.x",
  "typescript": "^5.x"
}
```

### GSAP Configuration Reference
```javascript
// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Horizontal scroll animation
gsap.to(".card", {
  xPercent: -100 * (cards.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".cards-container",
    pin: true,
    scrub: 1,
    end: () => "+=" + containerWidth
  }
});

// Staggered entry
gsap.from(".card", {
  x: 100,
  opacity: 0,
  stagger: 0.15,
  scrollTrigger: {
    trigger: ".cards-container",
    start: "top center",
    scrub: true
  }
});
```

### Browser Compatibility
- Modern browsers with ES6+ support
- GSAP provides fallbacks for older browsers
- Test in Chrome, Firefox, Safari, Edge

## Success Metrics

- Scroll animation feels smooth (60fps target)
- Horizontal movement correlates 1:1 with vertical scroll
- All 7 cards are fully viewable during scroll
- Stagger effect creates clear cascading visual
- Page loads in under 2 seconds on 3g connection
- No console errors or warnings

## Open Questions

- Should the animation pause when user stops scrolling, or continue to coast?
- Should there be a "scroll to explore" indicator at the top?
- What specific neon color palette should be used?
- Should cards have parallax effect within themselves during scroll?
