# DWF Labs Website - Animation Lab Theme Storyboard

## Executive Summary

Transform the DWF Labs website into an immersive showcase of advanced GSAP animation patterns while maintaining all original DWF content (Web3 investor, market maker, portfolio, news). The Animation Labs visual theme (industrial orange + dark zinc) elevates the brand with sophisticated scroll-driven interactions.

**Content:** Original DWF Labs (Web3, market making, portfolio, news)
**Visual Theme:** Animation Labs (Industrial Orange x Dark Zinc)
**Advanced Patterns:** 8+ running simultaneously

---

## Section 1: Hero - Kinetic Text Reveal + Multi-Layer Parallax

### DWF Content (Preserved)
**Headline:** "New Generation Web3 Investor & Market Maker"
**Subhead:** "DWF Labs - Adding real value as partners"
**Description:** "One of the world's largest high-frequency cryptocurrency trading entities"

### Visual Theme: Animation Labs
- **Primary accent:** `orange-500` (#f97316)
- **Background:** `zinc-950` with grid pattern overlay
- **Typography:** Uppercase headers with tight tracking, Geist Mono

### Patterns Running Simultaneously

#### Pattern 1: Character Text Reveal (Foreground)
```
┌─────────────────────────────────────────────────────────────┐
│  D W F   L A B S                                            │
│  ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑                                    │
│  Character-by-character kinetic reveal with stagger         │
│  Easing: back.out(1.7)                                       │
│  Stagger: 0.03s per character                                │
└─────────────────────────────────────────────────────────────┘
```

**Technical Implementation:**
- Split "DWF LABS" into `<span>` elements per character
- Use GSAP `stagger: 0.03` with `back.out(1.7)` easing
- Initial state: `y: 100, opacity: 0, rotation: -5`
- Animate to: `y: 0, opacity: 1, rotation: 0`

#### Pattern 2: Word Text Reveal (Tagline)
```
┌─────────────────────────────────────────────────────────────┐
│  NEW GENERATION WEB3 INVESTOR                               │
│  ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ │
│  AND MARKET MAKER                                           │
│  Word-by-word reveal with stagger                           │
│  Stagger: 0.15s per word                                     │
└─────────────────────────────────────────────────────────────┘
```

#### Pattern 3: Multi-Layer Parallax (Background)
```
┌─────────────────────────────────────────────────────────────┐
│  Layer 1 (Slow): Grid Pattern          speed: 0.2           │
│  Layer 2 (Medium): Floating Geometric Shapes  speed: 0.5    │
│  Layer 3 (Fast): Data Particles/Lines     speed: 0.8       │
│  Layer 4 (Foreground): Text Content       speed: 1.0       │
└─────────────────────────────────────────────────────────────┘
```

**Technical Implementation:**
- 4 parallax layers creating depth
- Background layers move slower than foreground
- `scrub: 1` for smooth scroll-linked motion
- Geometric shapes: circles (representing coins), hexagons (blocks), lines (charts)

#### Pattern 4: SVG Path Drawing (Corner Accents)
```
┌─────────────────────────────────────────────────────────────┐
│  ┌─────────┐                                                │
│  │         │ ← SVG stroke-dashoffset animation             │
│  │  DWF    │    Orange corners draw themselves in           │
│  │  LABS   │    Represents precision and technical          │
│  └─────────┘                                                │
└─────────────────────────────────────────────────────────────┘
```

---

## Section 2: Services - Pinned Sequence with Animated Cards

### DWF Content (Preserved)
**Tagline:** "Adding real value as partners"

**Three Services:**
1. **Market Making** - "Empower your project with innovative crypto market making solutions"
2. **OTC Trading** - "Tailored OTC crypto trading solutions for the digital asset market"
3. **Ventures** - "Backing visionary founders with strategic crypto venture investments"

### Visual Theme: Animation Labs
- Industrial orange corner accents on cards
- Dark zinc card backgrounds with subtle borders
- Number indicators (01, 02, 03) in orange

### Pattern: Pinned Section Sequence

```
┌─────────────────────────────────────────────────────────────┐
│  [SCROLL PIN ACTIVATED - 3000px duration]                   │
│                                                             │
│  ╔═════════════════════════════════════════════════════════╗│
│  ║  📌 PINNED: Adding Real Value as Partners              ║│
│  ║  Progress: ████████████████░░░░░░░░░░░░░░░░░░░░░  40%   ║│
│  ╚═════════════════════════════════════════════════════════╝│
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │     01       │  │     02       │  │     03       │     │
│  │   ┌─────┐    │  │   ┌─────┐    │  │   ┌─────┐    │     │
│  │   │ 📊  │    │  │   │ 💱  │    │  │   │ 🚀  │    │     │
│  │   └─────┘    │  │   └─────┘    │  │   └─────┘    │     │
│  │              │  │              │  │              │     │
│  │   Market     │  │     OTC      │  │   Ventures   │     │
│  │   Making     │  │   Trading    │  │              │     │
│  │              │  │              │  │              │     │
│  │  [Animated   │  │  [Animated   │  │  [Animated   │     │
│  │   Icon]      │  │   Icon]      │  │   Icon]      │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│      ↑                 ↑                 ↑               │
│      └────0.3s─────┴────0.3s─────┘ (stagger)              │
│                                                             │
│  Background: Animated chart lines, trading symbols         │
└─────────────────────────────────────────────────────────────┘
```

**Technical Implementation:**
```typescript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: container,
    start: 'top center',
    end: '+=3000',
    scrub: 1,
    pin: true,
  },
});

// Cards reveal with stagger
tl.from('.service-card', {
  y: 100,
  opacity: 0,
  scale: 0.9,
  stagger: 0.3,
  duration: 1,
  ease: 'back.out(1.2)',
})
// Icon animations
.to('.service-icon', {
  scale: 1.2,
  rotation: 360,
  backgroundColor: '#f97316',
  stagger: 0.2,
}, 0.5);
```

**Simultaneous Animations:**
1. **Cards**: Scale and fade in with stagger
2. **Icons**: Rotate and color change (zinc → orange)
3. **Progress bar**: Fills from 0% to 100%
4. **Background**: Trading chart lines animate
5. **Numbers**: Count up (00 → 01 → 02 → 03)

---

## Section 3: Stats - Count Up + Scrub Timeline

### DWF Content (Preserved)
- **800+** Projects in Portfolio
- **10%+** CMC Top 100
- **20%+** CMC Top 1000

**Supporting Copy:** "With a portfolio of 1000+, we proudly support over 20% of CMC's Top 100 projects and 35% of CMC's Top 1000 crypto projects."

### Visual Theme: Animation Labs
- Large orange numbers
- Circular SVG progress indicators
- Geometric shape icons that transform

### Patterns Running Simultaneously

#### Pattern 1: Count Up Animation
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│    800+                                                     │
│    ↑↑↑↑↑↑↑↑↑                                                 │
│    Numbers scroll from 0 to 800                             │
│    Duration: 2s                                             │
│    Easing: power2.out                                       │
└─────────────────────────────────────────────────────────────┘
```

#### Pattern 2: Scrub Timeline + Shape Transform
```
┌─────────────────────────────────────────────────────────────┐
│  Scroll position controls:                                  │
│  - Number counter progress                                  │
│  - Icon shape transformation (scale, rotate, color)         │
│  - Circular progress fill                                   │
│                                                             │
│  Before: 📊 (gray zinc-700)                                 │
│  After:  📊 (orange-500, scaled 1.3x, rotated 45deg)        │
└─────────────────────────────────────────────────────────────┘
```

**Technical Implementation:**
```typescript
// Count up linked to scroll
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: container,
    start: 'top center',
    end: 'bottom center',
    scrub: 1,
  },
});

// Number counter
tl.to(counterObj, {
  value: 800,
  duration: 1,
  onUpdate: () => {
    element.textContent = Math.floor(counterObj.value) + '+';
  },
})
// Icon transform
.to('.stat-icon', {
  scale: 1.3,
  rotation: 45,
  backgroundColor: '#f97316',
  duration: 1,
}, 0)
// Circular progress
.to('.progress-circle', {
  strokeDashoffset: 0,
  duration: 1,
}, 0);
```

**Simultaneous Effects:**
1. **Numbers**: 0 → 800+
2. **Icons**: Scale 1.0 → 1.3, rotate 0° → 45°, zinc → orange
3. **Circular progress**: SVG stroke fills
4. **Background gradient**: zinc-900 → orange-500/10
5. **Label text**: "Projects" fades in

---

## Section 4: Portfolio - Batch Reveal + Infinite Marquee

### DWF Content (Preserved)
**Headline:** "Portfolio"
**Copy:** "With a portfolio of 1000+, we proudly support over 20% of CMC's Top 100 projects and 35% of CMC's Top 1000 crypto projects."

**Portfolio Logos:** TRON, Algorand, Notcoin, Mantle, WLFI, Jupiter, Vaultek, Floki, TON, Gala, Celo, Fetch.ai, YGG, Beam, Sonic (15 logos)

### Visual Theme: Animation Labs
- Grid pattern cards with orange corner accents
- Logo grayscale with orange hover state
- Industrial number badges on cards

### Patterns Running Simultaneously

#### Pattern 1: Batch Reveal (Grid)
```
┌─────────────────────────────────────────────────────────────┐
│  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐              │
│  │TRON │  │ALGO │  │NOT  │  │MAN  │  │JUP  │              │
│  │ [01]│  │ [02]│  │ [03]│  │ [04]│  │ [05]│              │
│  └─────┘  └─────┘  └─────┘  └─────┘  └─────┘              │
│    ↑↑↑      ↑↑↑      ↑↑↑      ↑↑↑      ↑↑↑                 │
│  GPU-accelerated staggered reveal                           │
└─────────────────────────────────────────────────────────────┘
```

#### Pattern 2: Infinite Horizontal Marquee
```
┌─────────────────────────────────────────────────────────────┐
│  ← Continuous horizontal scroll →                          │
│  [TRON][ALGO][NOTCOIN][MANTLE][JUPITER][TON][GALA]...       │
│    ════════════════════════════════════════════════         │
│    Duration: 20s | Ease: none | Repeat: -1                  │
└─────────────────────────────────────────────────────────────┘
```

**Technical Implementation:**
```typescript
// Batch reveal for grid
gsap.batch('.portfolio-card', {
  y: 60,
  opacity: 0,
  scale: 0.9,
  duration: 0.5,
  stagger: 0.08,
  ease: 'back.out(1.2)',
  scrollTrigger: {
    start: 'top 85%',
  },
});

// Infinite marquee
gsap.to('.marquee-row', {
  xPercent: -50,
  ease: 'none',
  duration: 20,
  repeat: -1,
});
```

**Simultaneous Effects:**
1. **Grid items**: Batch reveal on scroll (5 rows × 3 columns)
2. **Marquee**: Continuous scroll below grid
3. **Hover**: Logo grayscale → orange + scale
4. **Corner accents**: Orange borders animate in

---

## Section 5: Ecosystem/News - Staggered Reveal + Card Tilt

### DWF Content (Preserved)
**Latest News Articles:**
1. "October 2025 Recap: New Partnerships, Conferences, and Community Events" (Oct 31, 2025)
2. "DWF Labs Participates in Block Street's Funding Round" (Oct 12, 2025)
3. "September 2025 Highlights: Partnerships, Events, and Research" (Oct 01, 2025)
4. "DWF Labs Backs MemeCore: Building the First Blockchain for Meme 2.0" (Sep 18, 2025)
5. "DWF Labs Joins as Strategic Crypto Liquidity Provider in Coincall's Enhanced Market Ecosystem" (Sep 07, 2025)
6. "RICE AI Secures Series A Funding with Support from DWF Labs" (Aug 18, 2025)

### Visual Theme: Animation Labs
- Dark cards with orange accents
- Date badges in orange
- Thumbnail images with hover zoom

### Patterns Running Simultaneously

#### Pattern 1: Staggered List Reveal
```
┌─────────────────────────────────────────────────────────────┐
│  News Article 1                                             │
│    └─ Reveals from bottom, slides up                        │
│                                                             │
│  News Article 2                                             │
│    └─ Reveals after 150ms delay                             │
│                                                             │
│  News Article 3                                             │
│    └─ Reveals after 150ms delay                             │
│                                                             │
│  Pattern: cascade from bottom to top                        │
└─────────────────────────────────────────────────────────────┘
```

#### Pattern 2: Card 3D Tilt (Interactive)
```
┌─────────────────────────────────────────────────────────────┐
│  Mouse position determines card tilt:                       │
│  - rotateX (vertical tilt: ±15deg)                          │
│  - rotateY (horizontal tilt: ±15deg)                        │
│  - Shine gradient position                                  │
│                                                             │
│  [Thumbnail]  Title                                         │
│     ↑            ↑                                          │
│   Zoom      Color change (zinc → orange)                    │
└─────────────────────────────────────────────────────────────┘
```

**Technical Implementation:**
```typescript
// Staggered reveal
gsap.from('.news-card', {
  y: 60,
  opacity: 0,
  stagger: 0.15,
  duration: 0.5,
  ease: 'power3.out',
  scrollTrigger: {
    start: 'top 80%',
  },
});

// 3D tilt on hover
cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    gsap.to(card, {
      rotateY: (x - 0.5) * 30,
      rotateX: (y - 0.5) * -30,
      duration: 0.3,
      ease: 'power2.out',
    });
  });
});
```

**Simultaneous Effects:**
1. **Initial load**: Staggered reveal from bottom
2. **On scroll**: Cards fade/slide in based on viewport
3. **On hover**: 3D tilt based on mouse position
4. **Shine effect**: Gradient follows cursor
5. **Thumbnail**: Zoom in on hover

---

## Section 6: CTA/Footer - Draggable Pattern Gallery

### DWF Content (Preserved)
**CTA:** "View Ecosystem" (link to full portfolio)
**Contact info, social links, copyright**

### Visual Theme: Animation Labs
- Orange CTA button
- Draggable pattern showcase demonstrating GSAP capabilities

### Pattern: Draggable with Momentum

```
┌─────────────────────────────────────────────────────────────┐
│  EXPLORE OUR ECOSYSTEM                                      │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐         │
│  │Fade│ │Stag│ │Para│ │Scru│ │Pin │ │Coun│ │Batc│         │
│  │    │ │ger │ │llax│ │b   │ │    │ │tUp │ │h   │         │
│  └────┘ └────┘ └────┘ └────┘ └────┘ └────┘ └────┘         │
│                                                             │
│  ← Drag horizontally →                                      │
│  Physics-based throw with momentum                          │
└─────────────────────────────────────────────────────────────┘
```

**Technical Implementation:**
```typescript
Draggable.create(patternGallery, {
  type: 'x',
  bounds: {
    minX: -maxScroll,
    maxX: 0,
  },
  inertia: true,
  edgeResistance: 0.8,
  throwResistance: 2000,
  onDragEnd: function() {
    // Snap to nearest card
    const cardWidth = 200;
    const snapX = Math.round(this.x / cardWidth) * cardWidth;
    gsap.to(this.target, { x: snapX, duration: 0.5 });
  },
});
```

**Simultaneous Effects:**
1. **Drag physics**: Inertia and momentum on release
2. **Active card**: Scales up (1.0 → 1.1)
3. **Progress indicator**: Shows current position
4. **Snap to center**: Cards align on release

---

## Design System - Animation Labs Theme Applied to DWF

### Color Palette

| Context | Color | Hex | Usage on DWF Site |
|---------|-------|-----|-------------------|
| Primary Accent | orange-500 | #f97316 | CTAs, highlights, active states |
| Secondary | cyan-500 | #06b6d4 | Trading indicators, links |
| Success | emerald-500 | #10b981 | Positive stats, growth indicators |
| Background | zinc-950 | #09090b | Main page background |
| Cards | zinc-900 | #18181b | Service cards, news cards |
| Borders | zinc-800 | #27272a | Dividers, card borders |

### Typography

| Element | Font | Style | Example |
|---------|------|-------|---------|
| H1 Hero | Geist Mono | Uppercase, tracking-tighter | "DWF LABS" |
| H2 Section | Geist Mono | Uppercase, tracking-wide | "PORTFOLIO" |
| Body | Inter/Sans | Normal | Regular paragraphs |
| Numbers | Geist Mono | Bold | "800+", "10%" |

### Visual Motifs

1. **Corner Accents** - Orange brackets on cards
2. **Diagonal Stripes** - Subtle background patterns
3. **Grid Overlay** - Technical/precision feel
4. **Scan Lines** - Animated hover effect
5. **Geometric Shapes** - Circles, hexagons (crypto references)

---

## Technical Architecture

### Global Animation Configuration

```typescript
// src/lib/gsap-config.ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);

// Animation Labs theme defaults
gsap.defaults({
  ease: 'power3.out',
  duration: 0.5,
});

ScrollTrigger.defaults({
  toggleActions: 'play none none reverse',
});
```

### Performance Optimization

1. **GPU Acceleration**
   ```typescript
   // Use transform3d for hardware acceleration
   gsap.set(element, { transform3d: 'translate3d(0,0,0)' });
   ```

2. **Batch Processing**
   ```typescript
   // Single ScrollTrigger for many elements
   gsap.batch('.portfolio-card', { ... });
   ```

3. **Will-change CSS**
   ```css
   .portfolio-card {
     will-change: transform, opacity;
   }
   ```

4. **Reduced Motion Support**
   ```typescript
   const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
   if (prefersReduced) {
     gsap.set('*', { opacity: 1, clearProps: 'all' });
     return;
   }
   ```

---

## Animation Timeline Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│  USER SCROLL JOURNEY - DWF LABS WEBSITE                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  0.0s ───────────► Hero                                             │
│       ├─ Character reveal: "DWF LABS"                               │
│       ├─ Word reveal: "NEW GENERATION WEB3 INVESTOR..."            │
│       ├─ 4-layer parallax (grid, shapes, particles, text)          │
│       └─ SVG corners draw in                                       │
│                                                                     │
│  1.5s ───────────► Services (Pinned)                                │
│       ├─ PIN activates (3000px scroll)                              │
│       ├─ Cards stagger in (0.3s intervals)                          │
│       ├─ Icons rotate + color change (zinc → orange)                │
│       ├─ Progress bar fills                                         │
│       └─ Background: Trading charts animate                         │
│                                                                     │
│  4.5s ───────────► Stats                                            │
│       ├─ Count up: 0 → 800+                                         │
│       ├─ Icons: scale 1.3, rotate 45°, zinc → orange               │
│       ├─ Circular progress fills                                    │
│       └─ Background gradient shift                                  │
│                                                                     │
│  6.5s ───────────► Portfolio                                       │
│       ├─ Batch reveal (15 cards, staggered)                         │
│       ├─ Infinite marquee (continuous, 20s loop)                    │
│       └─ Hover: grayscale → orange + scale                         │
│                                                                     │
│  8.5s ───────────► News                                             │
│       ├─ Staggered reveal (cascade, 150ms intervals)                │
│       ├─ 3D card tilt on mouse move                                 │
│       ├─ Shine effect follows cursor                                │
│       └─ Thumbnail zoom on hover                                    │
│                                                                     │
│  10.5s ──────────► CTA / Footer                                     │
│       ├─ Draggable pattern gallery with inertia                     │
│       ├─ Card scale transitions                                     │
│       └─ Progress indicator + snap to center                        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Easing Patterns

| Animation Type | Easing | Rationale |
|----------------|--------|-----------|
| Text reveals | back.out(1.7) | Snappy, overshoot for impact |
| Card entrances | back.out(1.2) | Slightly softer bounce |
| Scroll-linked | none | Direct 1:1 control |
| Smooth transitions | power3.out | Natural deceleration |
| Micro-interactions | power2.inOut | Symmetrical, predictable |

---

## Implementation Phases

### Phase 1: Foundation
- [ ] GSAP config with all plugins
- [ ] Base layout with DWF content
- [ ] Animation Labs theme application (colors, typography)
- [ ] Parallax background layers

### Phase 2: Hero Section
- [ ] "DWF LABS" character reveal
- [ ] Tagline word reveal
- [ ] SVG corner accents
- [ ] 4-layer parallax integration

### Phase 3: Services (Pinned)
- [ ] Pinned section structure
- [ ] Service cards with stagger
- [ ] Icon animations
- [ ] Progress bar

### Phase 4: Stats
- [ ] Count up animations
- [ ] Scrub timeline
- [ ] Icon transforms
- [ ] Circular progress

### Phase 5: Portfolio
- [ ] Portfolio grid with batch reveal
- [ ] Infinite marquee
- [ ] Hover effects

### Phase 6: News & CTA
- [ ] Staggered list reveal
- [ ] 3D card tilt
- [ ] Draggable gallery

### Phase 7: Polish
- [ ] Performance optimization
- [ ] Reduced motion support
- [ ] Cross-browser testing
- [ ] Mobile responsiveness

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Performance | 60fps | Chrome DevTools Performance |
| Interaction | <100ms | Input response time |
| Accessibility | WCAG AA | A11y tree updates |
| Browser Support | Last 2 versions | Chrome, Firefox, Safari, Edge |
| Content | 100% preserved | All DWF copy included |

---

## Resources

- GSAP Docs: https://gsap.com/docs/v3/
- ScrollTrigger: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- DWF Labs: https://www.dwf-labs.com/
- Project Guidelines: `/CLAUDE.md`
