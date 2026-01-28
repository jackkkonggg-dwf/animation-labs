# PRD: DWF Labs Website - Animation Labs Theme

## Introduction

Transform the DWF Labs website (dwf-labs.com) into a production-ready immersive showcase featuring advanced GSAP animation patterns. The site will preserve all original DWF content (Web3 investor, market maker, portfolio, news) while applying the Animation Labs visual theme (industrial orange-500 + dark zinc-950). This demonstrates world-class web animation capabilities with 12+ patterns running simultaneously across 6 sections.

**Route:** `/dwf-labs` (integrated into Animation Labs project)
**Content Source:** https://www.dwf-labs.com/ (100% preserved)
**Visual Theme:** Animation Labs (orange-500, zinc-950, Geist Mono)

## Goals

- Showcase 12+ advanced GSAP animation patterns simultaneously
- Achieve 60fps performance on scroll across all sections
- Support all major browsers (Chrome, Firefox, Safari, Edge) with consistent experience
- Provide fully responsive mobile and desktop layouts
- Preserve 100% of original DWF content and messaging
- Demonstrate production-ready animation best practices (cleanup, reduced motion, accessibility)

---

## User Stories

### Phase 1: Foundation & Configuration

### US-001: Set up GSAP configuration with all plugins
**Description:** As a developer, I need a centralized GSAP configuration with all required plugins registered so animations work consistently across the application.

**Acceptance Criteria:**
- [ ] Create `src/lib/gsap-config.ts` with ScrollTrigger, Draggable, InertiaPlugin
- [ ] Register plugins in client-side only (typeof window check)
- [ ] Export gsap, ScrollTrigger, Draggable, InertiaPlugin
- [ ] Add global defaults (ease: 'power3.out', duration: 0.5)
- [ ] Typecheck passes

### US-002: Add DWF Labs route to navigation
**Description:** As a user, I want to access the DWF Labs page from the main navigation so I can explore the animated showcase.

**Acceptance Criteria:**
- [ ] Add `/dwf-labs` route to navigation data
- [ ] Route displays in main navigation menu
- [ ] Navigation link uses Animation Labs styling (orange-500 hover)
- [ ] Page is accessible via direct URL navigation
- [ ] Typecheck passes
- [ ] Verify in browser using agent-browser skill

### US-003: Create DWF Labs page structure
**Description:** As a developer, I need a base page structure with all 6 sections so I can implement animations incrementally.

**Acceptance Criteria:**
- [ ] Create `src/app/dwf-labs/page.tsx`
- [ ] Add all 6 sections: Hero, Services, Stats, Portfolio, News, CTA/Footer
- [ ] Apply Animation Labs theme (bg-zinc-950, orange-500 accents)
- [ ] Include DWF content from storyboard (all copy preserved)
- [ ] Use Geist Mono for headings, Inter/sans for body
- [ ] Typecheck passes
- [ ] Verify in browser using agent-browser skill

---

### Phase 2: Hero Section

### US-004: Character text reveal for "DWF LABS"
**Description:** As a user, I want to see "DWF LABS" reveal character-by-character on page load so I experience an impactful branded entrance.

**Acceptance Criteria:**
- [ ] "DWF LABS" splits into individual span elements
- [ ] Initial state: y: 100, opacity: 0, rotation: -5
- [ ] Animate to: y: 0, opacity: 1, rotation: 0
- [ ] Stagger: 0.03s per character
- [ ] Easing: back.out(1.7)
- [ ] Animation triggers on page load
- [ ] Typecheck passes
- [ ] Verify in browser using agent-browser skill

### US-005: Word text reveal for tagline
**Description:** As a user, I want the tagline "NEW GENERATION WEB3 INVESTOR AND MARKET MAKER" to reveal word-by-word so I can read the messaging dynamically.

**Acceptance Criteria:**
- [ ] Tagline splits into word-level span elements
- [ ] Initial state: y: 50, opacity: 0
- [ ] Animate to: y: 0, opacity: 1
- [ ] Stagger: 0.15s per word
- [ ] Animation triggers after character reveal completes (delay: 0.3s)
- [ ] Typecheck passes
- [ ] Verify in browser using agent-browser skill

### US-006: Multi-layer parallax background
**Description:** As a user, I want depth perception through parallax scrolling so the hero section feels immersive and three-dimensional.

**Acceptance Criteria:**
- [ ] Create 4 parallax layers with different scroll speeds (0.2, 0.5, 0.8, 1.0)
- [ ] Layer 1: Grid pattern overlay (speed: 0.2)
- [ ] Layer 2: Floating crypto symbols (circles, hexagons, lines) (speed: 0.5)
- [ ] Layer 3: Data particles/trading dots (speed: 0.8)
- [ ] Layer 4: Text content (speed: 1.0)
- [ ] Use scrub: 1 for smooth catch-up
- [ ] Cleanup ScrollTriggers on unmount
- [ ] Typecheck passes
- [ ] Verify in browser using agent-browser skill

### US-007: SVG corner accents drawing animation
**Description:** As a user, I want orange corner brackets to draw themselves in on load so I see the industrial Animation Labs design aesthetic.

**Acceptance Criteria:**
- [ ] Add SVG corner elements to hero container
- [ ] Animate stroke-dashoffset from full length to zero
- [ ] Corner color: orange-500
- [ ] Animation duration: 0.8s
- [ ] Triggers on page load
- [ ] Typecheck passes
- [ ] Verify in browser using agent-browser skill

---

### Phase 3: Services Section (Pinned)

### US-008: Pinned section with progress bar
**Description:** As a user, I want the services section to pin while I scroll so I can experience the full animation sequence without it scrolling away.

**Acceptance Criteria:**
- [ ] Services section pins for 3000px of scroll
- [ ] ScrollTrigger pin: true, scrub: 1
- [ ] Progress bar fills from 0% to 100% during pin
- [ ] Pin indicator badge shows "PINNED" state
- [ ] Section releases after animation completes
- [ ] Cleanup on unmount
- [ ] Typecheck passes
- [ ] Verify in browser using agent-browser skill

### US-009: Staggered service cards reveal
**Description:** As a user, I want service cards (Market Making, OTC Trading, Ventures) to animate in sequentially so I can focus on each one individually.

**Acceptance Criteria:**
- [ ] 3 service cards with DWF content preserved
- [ ] Card 01: Market Making with chart icon
- [ ] Card 02: OTC Trading with exchange icon
- [ ] Card 03: Ventures with rocket icon
- [ ] Initial state: y: 100, opacity: 0, scale: 0.9
- [ ] Animate to: y: 0, opacity: 1, scale: 1
- [ ] Stagger: 0.3s between cards
- [ ] Easing: back.out(1.2)
- [ ] Number badges (01, 02, 03) in orange-500
- [ ] Typecheck passes
- [ ] Verify in browser using agent-browser skill

### US-010: Icon animations with color transform
**Description:** As a user, I want service icons to rotate and change color (zinc to orange) so I see visual feedback during the pinned sequence.

**Acceptance Criteria:**
- [ ] Icons scale to 1.2x
- [ ] Icons rotate 360 degrees
- [ ] Icon color transitions from zinc-700 to orange-500
- [ ] Animation stagger: 0.2s
- [ ] Synchronized with card reveal (position: 0.5)
- [ ] Typecheck passes
- [ ] Verify in browser using agent-browser skill

### US-011: Background trading chart animation
**Description:** As a user, I want subtle animated trading charts in the background during the pinned section so the experience feels tied to crypto/Web3.

**Acceptance Criteria:**
- [ ] Animated line chart paths in background
- [ ] Candlestick patterns that pulse
- [ ] Volume bar indicators that rise
- [ ] All animations loop during pin duration
- [ ] Opacity: 0.1 to avoid distraction
- [ ] Typecheck passes
- [ ] Verify in browser using agent-browser skill

---

### Phase 4: Stats Section

### US-012: Count up animation for numbers
**Description:** As a user, I want to see numbers animate from 0 to their target values (800+, 10%+, 20%+) so the statistics feel dynamic and impactful.

**Acceptance Criteria:**
- [ ] 800+ Projects counter animates from 0 to 800
- [ ] 10%+ CMC Top 100 counter animates from 0 to 10
- [ ] 20%+ CMC Top 1000 counter animates from 0 to 20
- [ ] Duration: 2 seconds
- [ ] Easing: power2.out
- [ ] Numbers snap to whole integers (no decimals)
- [ ] "+" suffix appended after animation
- [ ] Triggered by scroll position (viewport enter)
- [ ] Typecheck passes
- [ ] Verify in browser using agent-browser skill

### US-013: Scrub timeline for stat progression
**Description:** As a user, I want the number counters to be linked to scroll position so I can control the animation by scrolling.

**Acceptance Criteria:**
- [ ] Timeline scrub: 1 (1-second catch-up)
- [ ] ScrollTrigger start: 'top center', end: 'bottom center'
- [ ] Count progress directly tied to scroll position
- [ ] Reverses on scroll up
- [ ] Cleanup on unmount
- [ ] Typecheck passes
- [ ] Verify in browser using agent-browser skill

### US-014: Icon shape transformations
**Description:** As a user, I want stat icons to transform (scale, rotate, color) as numbers count up so I see visual feedback alongside the data.

**Acceptance Criteria:**
- [ ] Icons scale from 1.0 to 1.3
- [ ] Icons rotate from 0deg to 45deg
- [ ] Icon color transitions from zinc-700 to orange-500
- [ ] Transformation synchronized with count up
- [ ] 3 stat icons: circle (projects), square (CMC 100), triangle (CMC 1000)
- [ ] Typecheck passes
- [ ] Verify in browser using agent-browser skill

### US-015: Circular SVG progress indicators
**Description:** As a user, I want circular progress rings around stat icons to fill as numbers count up so I have visual representation of completion.

**Acceptance Criteria:**
- [ ] SVG circle elements around each icon
- [ ] Animate stroke-dashoffset from full circumference to zero
- [ ] Stroke color: orange-500
- [ ] Stroke width: 2px
- [ ] Fill: none (transparent center)
- [ ] Animation synchronized with count up
- [ ] Typecheck passes
- [ ] Verify in browser using agent-browser skill

---

### Phase 5: Portfolio Section

### US-016: Portfolio grid with batch reveal
**Description:** As a user, I want portfolio company logos to reveal in a staggered grid so I can see the breadth of DWF's ecosystem.

**Acceptance Criteria:**
- [ ] 15 portfolio cards in 5×3 grid layout
- [ ] Companies: TRON, Algorand, Notcoin, Mantle, WLFI, Jupiter, TON, Gala, Celo, Fetch.ai, YGG, Beam, Sonic
- [ ] Each card has: number badge [01-15], logo, company name
- [ ] Initial state: y: 60, opacity: 0, scale: 0.95
- [ ] Animate to: y: 0, opacity: 1, scale: 1
- [ ] Stagger: 0.08s between cards
- [ ] Use gsap.batch() for GPU performance
- [ ] Cards have orange corner accents
- [ ] Typecheck passes
- [ ] Verify in browser using agent-browser skill

### US-017: Infinite horizontal marquee
**Description:** As a user, I want a continuous scrolling marquee of portfolio logos below the grid so I see the ecosystem is vast and ongoing.

**Acceptance Criteria:**
- [ ] Horizontal row with all portfolio logos
- [ ] Animate xPercent from 0 to -50
- [ ] Duration: 20 seconds per loop
- [ ] Easing: none (linear)
- [ ] Repeat: -1 (infinite)
- [ ] Duplicate logos for seamless loop
- [ ] Scroll direction: left
- [ ] Typecheck passes
- [ ] Verify in browser using agent-browser skill

### US-018: Portfolio card hover effects
**Description:** As a user, I want portfolio cards to react when I hover so I know they're interactive.

**Acceptance Criteria:**
- [ ] Logo grayscale to orange-500 on hover
- [ ] Card scales from 1.0 to 1.05 on hover
- [ ] Border color: zinc-800 to orange-500 on hover
- [ ] Corner accent opacity: 0 to 1 on hover
- [ ] Transition duration: 0.2s
- [ ] Typecheck passes
- [ ] Verify in browser using agent-browser skill

---

### Phase 6: News Section

### US-019: Staggered news list reveal
**Description:** As a user, I want news articles to cascade in from bottom to top so I can read headlines in an engaging sequence.

**Acceptance Criteria:**
- [ ] 6 news articles with DWF content preserved
- [ ] Article 1: October 2025 Recap (Oct 31, 2025)
- [ ] Article 2: Block Street Funding Round (Oct 12, 2025)
- [ ] Article 3: September 2025 Highlights (Oct 01, 2025)
- [ ] Article 4: MemeCore Partnership (Sep 18, 2025)
- [ ] Article 5: Coincall Liquidity (Sep 07, 2025)
- [ ] Article 6: RICE AI Series A (Aug 18, 2025)
- [ ] Each article: thumbnail, title, date badge
- [ ] Initial state: y: 60, opacity: 0
- [ ] Animate to: y: 0, opacity: 1
- [ ] Stagger: 0.15s between articles
- [ ] Easing: power3.out
- [ ] Date badges in orange-500
- [ ] Typecheck passes
- [ ] Verify in browser using agent-browser skill

### US-020: Card 3D tilt on mouse move
**Description:** As a user, I want news cards to tilt in 3D based on my mouse position so the interface feels responsive and premium.

**Acceptance Criteria:**
- [ ] Calculate mouse position relative to card center
- [ ] RotateX: (y - 0.5) * -30deg (vertical tilt max ±15deg)
- [ ] RotateY: (x - 0.5) * 30deg (horizontal tilt max ±15deg)
- [ ] Update on mousemove event
- [ ] Reset to 0deg on mouseleave
- [ ] Duration: 0.3s transition
- [ ] Easing: power2.out
- [ ] Typecheck passes
- [ ] Verify in browser using agent-browser skill

### US-021: Shine effect following cursor
**Description:** As a user, I want a subtle shine effect to follow my cursor on news cards so I get premium micro-interaction feedback.

**Acceptance Criteria:**
- [ ] Gradient overlay on news cards
- [ ] Shine position follows mouse coordinates
- [ ] Shine opacity: 0 to 0.3 on hover
- [ ] Shine size: 100px radial gradient
- [ ] Update in mousemove handler alongside 3D tilt
- [ ] Typecheck passes
- [ ] Verify in browser using agent-browser skill

### US-022: Thumbnail zoom on hover
**Description:** As a user, I want article thumbnails to zoom in on hover so I get visual feedback that the card is interactive.

**Acceptance Criteria:**
- [ ] Thumbnail scale: 1.0 to 1.1 on hover
- [ ] Transition duration: 0.3s
- [ ] Easing: power2.out
- [ ] Transform origin: center
- [ ] Reset on mouseleave
- [ ] Typecheck passes
- [ ] Verify in browser using agent-browser skill

---

### Phase 7: CTA/Footer

### US-023: Draggable pattern gallery with inertia
**Description:** As a user, I want to drag horizontally through a gallery of animation patterns so I can explore GSAP capabilities interactively.

**Acceptance Criteria:**
- [ ] Horizontal container with 15+ pattern cards
- [ ] Cards show pattern names: Fade Reveal, Stagger, Parallax, Scrub, Pinned, Count Up, Batch, Char Text, Word Text, SVG Draw, Button Hover, Card Tilt, Multi-Layer, Draggable Basic, Draggable Momentum
- [ ] Draggable type: 'x' with bounds
- [ ] InertiaPlugin enabled
- [ ] throwResistance: 2000
- [ ] edgeResistance: 0.8
- [ ] Snap to nearest card on release
- [ ] Typecheck passes
- [ ] Verify in browser using agent-browser skill

### US-024: Active card scale animation
**Description:** As a user, I want the centered/active card to scale up so I know which pattern is currently focused.

**Acceptance Criteria:**
- [ ] Calculate which card is centered in viewport
- [ ] Scale active card from 1.0 to 1.1
- [ ] Scale non-active cards to 1.0
- [ ] Transition duration: 0.3s
- [ ] Easing: power2.out
- [ ] Update on drag end and snap
- [ ] Typecheck passes
- [ ] Verify in browser using agent-browser skill

### US-025: Progress indicator for gallery
**Description:** As a user, I want a progress bar showing my position in the pattern gallery so I know how much content remains.

**Acceptance Criteria:**
- [ ] Horizontal progress bar at bottom of gallery
- [ ] Calculate position based on scroll X / total width
- [ ] Display: "Pattern X/15" text
- [ ] Update in real-time during drag
- [ ] Color: orange-500
- [ ] Typecheck passes
- [ ] Verify in browser using agent-browser skill

### US-026: "View Ecosystem" CTA button
**Description:** As a user, I want an orange CTA button to view the full DWF ecosystem so I can take action after exploring the animations.

**Acceptance Criteria:**
- [ ] Button text: "View Ecosystem"
- [ ] Background: orange-500
- [ ] Text color: black (for contrast)
- [ ] Hover: scale 1.05, bg-orange-400
- [ ] Click: link to DWF ecosystem (placeholder or actual)
- [ ] Uppercase, font-black, tracking-wider
- [ ] Typecheck passes
- [ ] Verify in browser using agent-browser skill

---

### Phase 8: Footer

### US-027: Footer with links and copyright
**Description:** As a user, I want a footer with social links and copyright so I can navigate to DWF's official channels.

**Acceptance Criteria:**
- [ ] Footer text: "DWF Labs © 2025"
- [ ] Social links: Twitter, LinkedIn, Telegram (orange on hover)
- [ ] Additional links: Contact, Privacy
- [ ] Consistent Animation Labs styling
- [ ] Border-top: orange-500/20
- [ ] Typecheck passes
- [ ] Verify in browser using agent-browser skill

---

### Phase 9: Cross-Browser & Performance

### US-028: GPU acceleration optimization
**Description:** As a developer, I need all animations to use GPU-accelerated properties so the site maintains 60fps on scroll.

**Acceptance Criteria:**
- [ ] Use transform3d instead of transform
- [ ] Use opacity for fades (not display)
- [ ] Add will-change CSS for animated properties
- [ ] Avoid animating width, height, top, left
- [ ] Use gsap.batch() for large element sets
- [ ] Performance audit shows 60fps on scroll
- [ ] Typecheck passes
- [ ] Verify in browser using agent-browser skill (Chrome DevTools Performance)

### US-029: Cross-browser compatibility
**Description:** As a user, I want the site to work consistently across Chrome, Firefox, Safari, and Edge so I have a reliable experience regardless of browser.

**Acceptance Criteria:**
- [ ] Test all animations in Chrome (latest)
- [ ] Test all animations in Firefox (latest)
- [ ] Test all animations in Safari (latest)
- [ ] Test all animations in Edge (latest)
- [ ] Vendor prefixes added where needed
- [ ] Fallbacks for unsupported features
- [ ] Browser testing checklist completed
- [ ] Typecheck passes
- [ ] Verify in browser using agent-browser skill (each browser)

### US-030: Mobile responsive design
**Description:** As a user, I want the site to work on mobile devices so I can experience the animations on any screen size.

**Acceptance Criteria:**
- [ ] Responsive breakpoints: mobile (<768px), tablet (768-1024px), desktop (>1024px)
- [ ] Hero text scales appropriately on mobile
- [ ] Service cards stack vertically on mobile
- [ ] Portfolio grid adapts (1 col mobile, 2 col tablet, 3 col desktop)
- [ ] News cards stack vertically on mobile
- [ ] Touch events work for drag interactions
- [ ] Font sizes use responsive units
- [ ] Typecheck passes
- [ ] Verify in browser using agent-browser skill (mobile viewport)

### US-031: Reduced motion support
**Description:** As a user with motion sensitivity, I want animations to respect my prefers-reduced-motion setting so I can use the site without discomfort.

**Acceptance Criteria:**
- [ ] Detect prefers-reduced-motion media query
- [ ] When true: skip all animations, set opacity: 1 immediately
- [ ] Use matchMedia() for detection
- [ ] Test with OS reduced-motion setting enabled
- [ ] ClearProps on all animated elements
- [ ] Typecheck passes
- [ ] Verify in browser using agent-browser skill (with reduced motion)

### US-032: ScrollTrigger cleanup on navigation
**Description:** As a user, I want animations to clean up properly when I navigate away so there are no memory leaks or orphaned ScrollTriggers.

**Acceptance Criteria:**
- [ ] Return cleanup function from all useGSAP hooks
- [ ] Kill all ScrollTriggers in cleanup
- [ ] Kill all tweens in cleanup
- [ ] Call ScrollTrigger.refresh() after init
- [ ] Test navigation: /dwf-labs → other routes → /dwf-labs
- [ ] No console warnings about orphaned triggers
- [ ] Typecheck passes
- [ ] Verify in browser using agent-browser skill

---

### Phase 10: Assets & Content

### US-033: Portfolio logo integration
**Description:** As a user, I want to see actual portfolio company logos so the ecosystem section looks authentic.

**Acceptance Criteria:**
- [ ] Fetch logos from DWF website: https://www.dwf-labs.com/api/media/file/partner-*-dark.svg
- [ ] Companies: TRON, Algorand, Notcoin, Mantle, WLFI, Jupiter, TON, Gala, Celo, Fetch, YGG, Beam, Sonic
- [ ] Fallback: use SVG icon if logo unavailable
- [ ] All logos use grayscale filter (orange on hover)
- [ ] Logos cached locally to avoid repeated fetches
- [ ] Typecheck passes
- [ ] Verify in browser using agent-browser skill

### US-034: News article thumbnails
**Description:** As a user, I want article thumbnails to load from DWF website so news section looks complete.

**Acceptance Criteria:**
- [ ] Fetch thumbnails from DWF website URLs
- [ ] Use WebP format for performance
- [ ] Lazy load images below fold
- [ ] Placeholder: orange/zinc styled div while loading
- [ ] Handle load errors gracefully
- [ ] Typecheck passes
- [ ] Verify in browser using agent-browser skill

---

## Functional Requirements

### Hero Section
- FR-1: "DWF LABS" character reveal with stagger (0.03s) and back.out(1.7) easing
- FR-2: Tagline word reveal with stagger (0.15s) and 0.3s delay after character reveal
- FR-3: 4-layer parallax with speeds 0.2, 0.5, 0.8, 1.0 and scrub: 1
- FR-4: SVG corner accents with stroke-dashoffset animation (0.8s duration)
- FR-5: Display DWF content: "New Generation Web3 Investor & Market Maker", "Adding real value as partners"

### Services Section
- FR-6: Pinned section for 3000px with pin: true, scrub: 1
- FR-7: Progress bar filling 0% to 100% during pin
- FR-8: 3 service cards (Market Making, OTC Trading, Ventures) with 0.3s stagger
- FR-9: Icons animate: scale 1.2, rotate 360°, zinc-700 → orange-500
- FR-10: Number badges (01, 02, 03) in orange-500
- FR-11: Background animated trading charts with 0.1 opacity
- FR-12: All DWF service descriptions preserved verbatim

### Stats Section
- FR-13: Count up animations: 0→800, 0→10, 0→20 over 2 seconds with power2.out
- FR-14: Scrub timeline with scrub: 1, start: 'top center', end: 'bottom center'
- FR-15: Icon transforms: scale 1.0→1.3, rotate 0°→45°, zinc-700→orange-500
- FR-16: Circular SVG progress indicators with stroke-dashoffset animation
- FR-17: Display all DWF stats copy: "With a portfolio of 1000+..."

### Portfolio Section
- FR-18: 15 portfolio cards in 5×3 grid with 0.08s stagger using gsap.batch()
- FR-19: Cards show: number badge, logo, company name with orange corner accents
- FR-20: All DWF portfolio companies included: TRON, Algorand, Notcoin, Mantle, WLFI, Jupiter, TON, Gala, Celo, Fetch.ai, YGG, Beam, Sonic
- FR-21: Infinite marquee with 20s loop, linear easing, repeat: -1
- FR-22: Hover effects: grayscale→orange, scale 1.0→1.05, border zinc-800→orange-500

### News Section
- FR-23: 6 news articles cascade with 0.15s stagger and power3.out
- FR-24: All DWF article content preserved: titles, dates, thumbnails
- FR-25: 3D card tilt: rotateX ±15deg, rotateY ±15deg based on mouse position
- FR-26: Shine effect follows cursor with 0.3 opacity radial gradient
- FR-27: Thumbnail zoom: scale 1.0→1.1 on hover with 0.3s transition
- FR-28: Date badges in orange-500

### CTA/Footer
- FR-29: Draggable gallery with Draggable, InertiaPlugin, throwResistance: 2000
- FR-30: 15+ pattern cards with snap to center on release
- FR-31: Active card scale: 1.0→1.1
- FR-32: Progress indicator: "Pattern X/15" with orange-500 bar
- FR-33: "View Ecosystem" CTA button with orange-500 background
- FR-34: Footer with DWF Labs © 2025, social links, additional links

### Technical
- FR-35: All animations use GPU-accelerated properties (transform3d, opacity)
- FR-36: will-change CSS applied to animated elements
- FR-37: ScrollTrigger cleanup on unmount for all sections
- FR-38: Reduced motion support via matchMedia('(prefers-reduced-motion: reduce)')
- FR-39: Route at `/dwf-labs` integrated into Animation Labs navigation
- FR-40: Geist Mono for headings, Inter/sans for body text
- FR-41: Color scheme: zinc-950 background, zinc-900 cards, orange-500 accents

---

## Non-Goals (Out of Scope)

- No backend API integration (all content hardcoded from storyboard)
- No CMS or content management system
- No dynamic data fetching from DWF APIs
- No form submissions or contact functionality
- No authentication/user accounts
- No internationalization (i18n)
- No analytics integration
- No A/B testing or feature flags
- No server-side rendering beyond Next.js default
- No PWA features (offline support, install prompts)
- No social sharing functionality
- No accessibility audits beyond basic WCAG compliance
- No SEO optimization beyond Next.js defaults

---

## Design Considerations

### Visual Theme: Animation Labs
- **Primary accent:** orange-500 (#f97316) - CTAs, highlights, active states
- **Secondary accent:** cyan-500 (#06b6d4) - Trading indicators, links
- **Backgrounds:** zinc-950 (main), zinc-900 (cards), zinc-800 (borders)
- **Typography:** Geist Mono (headings, uppercase, tracking), Inter/sans (body)
- **Corner accents:** Orange brackets on all cards
- **Grid overlay:** Subtle technical pattern for depth
- **Scan lines:** Animated hover effect on interactive elements

### Component Reuse
- Reuse existing components from Animation Labs project:
  - `PatternHeader` → Adapted for DWF branding
  - `CodeViewer` → NOT used (this is a showcase, not tutorial)
  - `PatternNavigation` → NOT used (single page, not pattern collection)
  - `RelatedPatterns` → NOT used
- New components specific to DWF page:
  - `DWFHero` - Hero with parallax layers
  - `DWFServices` - Pinned section with cards
  - `DWFStats` - Count up numbers
  - `DWFPortfolio` - Grid + marquee
  - `DWFNews` - Article list with 3D tilt
  - `DWFGallery` - Draggable pattern cards

### Responsive Breakpoints
- Mobile: < 768px (stack vertically, smaller fonts)
- Tablet: 768px - 1024px (2 column grids)
- Desktop: > 1024px (full 3 column layouts)

---

## Technical Considerations

### GSAP Plugins Required
```typescript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);
```

### Performance Targets
- 60fps on scroll (Chrome DevTools Performance)
- <100ms interaction response time
- <3s initial page load
- Lighthouse score >90 for Performance

### Browser Support
- Chrome 120+ (primary development target)
- Firefox 120+
- Safari 17+
- Edge 120+

### Mobile Support
- iOS Safari 17+
- Chrome Mobile 120+
- Touch events for draggable interactions
- Responsive layouts for all screen sizes

### Accessibility
- A11y tree updates for all animations
- prefers-reduced-motion support
- Keyboard navigation for all interactive elements
- Alt text for all images
- ARIA labels where needed
- Focus indicators on all interactive elements

### Known Constraints
- ScrollTrigger memory management critical (Next.js SPA)
- Must use `useGSAP` hook with cleanup function
- GSAP batch() for large element sets (>10 items)
- Avoid layout thrashing (batch DOM reads/writes)

---

## Success Metrics

### Performance
- 60fps maintained throughout scroll journey
- Lighthouse Performance score >90
- First Contentful Paint <1.5s
- Time to Interactive <3s

### User Experience
- All animations visible and smooth on first load
- No janky or stuttering animations
- Intuitive scroll-driven interactions
- Clear visual hierarchy maintained

### Browser Compatibility
- All features work on Chrome, Firefox, Safari, Edge
- Consistent experience across desktop and mobile
- No console errors or warnings

### Code Quality
- TypeScript strict mode with no errors
- ESLint passes with no warnings
- All ScrollTriggers properly cleaned up
- No memory leaks on route navigation

---

## Open Questions

1. **Logo Sources:** Should we fetch actual DWF partner logos from their CDN or use placeholder SVG icons if fetch fails?
   - *Decision*: Use fetch with SVG fallback (US-033)

2. **Video Background:** The DWF site has an animated wave video placeholder. Should we recreate this with GSAP or omit?
   - *Decision*: Omit for MVP, focus on GSAP patterns

3. **External Links:** Should portfolio/news cards link to actual DWF pages or stay internal?
   - *Decision*: Internal only for MVP (no external navigation)

4. **Image Optimization:** Should we use Next.js Image component or standard img tags?
   - *Decision*: Use Next.js Image for optimization (US-034)

5. **Analytics:** Should we add page view tracking?
   - *Decision*: No (out of scope for MVP)

---

## Implementation Order

### Phase 1: Foundation (Days 1-2)
- US-001: GSAP config
- US-002: Route setup
- US-003: Page structure

### Phase 2: Hero (Days 3-4)
- US-004: Character reveal
- US-005: Word reveal
- US-006: Parallax layers
- US-007: SVG corners

### Phase 3: Services (Days 5-6)
- US-008: Pinned section
- US-009: Cards reveal
- US-010: Icon animations
- US-011: BG charts

### Phase 4: Stats (Days 7-8)
- US-012: Count up
- US-013: Scrub timeline
- US-014: Icon transforms
- US-015: Circular progress

### Phase 5: Portfolio (Days 9-10)
- US-016: Grid reveal
- US-017: Marquee
- US-018: Hover effects
- US-033: Logo integration

### Phase 6: News (Days 11-12)
- US-019: List reveal
- US-020: 3D tilt
- US-021: Shine effect
- US-022: Thumbnail zoom
- US-034: Thumbnail images

### Phase 7: CTA/Footer (Days 13-14)
- US-023: Draggable gallery
- US-024: Active card scale
- US-025: Progress indicator
- US-026: CTA button
- US-027: Footer

### Phase 8: Quality (Days 15-16)
- US-028: GPU optimization
- US-029: Cross-browser
- US-030: Mobile responsive
- US-031: Reduced motion
- US-032: Cleanup

---

## Estimated Timeline

**Total: 16 development days**

- Foundation: 2 days
- Hero: 2 days
- Services: 2 days
- Stats: 2 days
- Portfolio: 2 days
- News: 2 days
- CTA/Footer: 2 days
- Quality & Testing: 2 days

**Buffer:** 2-4 days for unforeseen issues

**Total Project: 18-20 days**

---

## Dependencies

### External
- GSAP 3.14.2 (already installed)
- @gsap/react 2.1.2 (already installed)
- Next.js 16.1.5 (already installed)
- React 19.2.3 (already installed)
- Tailwind CSS 4.x (already installed)

### Internal
- `src/lib/gsap-config.ts` - Must be created first
- `src/lib/navigation-data.ts` - Must add DWF Labs route
- Existing Animation Labs components for reference

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| ScrollTrigger memory leaks in Next.js | High | Strict cleanup pattern, test navigation extensively |
| Cross-browser GSAP inconsistencies | Medium | Test early on all browsers, use vendor prefixes |
| Mobile performance issues | Medium | GPU acceleration, batch processing, will-change |
| DWF asset availability | Low | SVG fallbacks for missing logos/images |
| Timeline slippage | Low | Build in buffer days, prioritize MVP sections |

---

## Definition of Done

A user story is considered "done" when:
- [ ] All acceptance criteria pass
- [ ] TypeScript typecheck passes with no errors
- [ ] ESLint passes with no warnings
- [ ] Visual verification in browser (agent-browser skill)
- [ ] Code reviewed for GSAP best practices
- [ ] ScrollTrigger cleanup verified
- [ ] Cross-browser compatibility checked (if applicable)
- [ ] Mobile responsiveness verified (if applicable)

The project is considered "complete" when:
- [ ] All 34 user stories are done
- [ ] All 6 sections implemented with DWF content
- [ ] 60fps performance on scroll (all browsers)
- [ ] Mobile responsive (all breakpoints)
- [ ] Reduced motion support working
- [ ] No console errors or warnings
- [ ] Lighthouse score >90 (Performance)
