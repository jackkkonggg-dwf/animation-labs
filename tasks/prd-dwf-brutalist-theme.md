# Product Requirements Document: DWF Brutalist Theme

## 1. Introduction/Overview

The DWF Brutalist Theme is a neo-brutalist data presentation interface for yield farming analytics. This theme embraces raw, hard-hitting aesthetics with bold geometric shapes, stark typography, and aggressive animations that create a visceral user experience. The design philosophy prioritizes impact and clarity over subtlety, using brutalist design principles to present complex DeFi yield farming data in an uncompromising, memorable way.

**Target Audience**: DeFi traders, yield farmers, and crypto-native users who appreciate bold, unconventional interfaces and need quick access to yield farming metrics.

**Theme Type**: Standard scope implementation featuring Hero section + Stats section with animated data visualizations.

## 2. Goals

### Primary Goals
1. **Create a distinctive visual identity** that stands apart from traditional DeFi interfaces through neo-brutalist design principles
2. **Present yield farming data** with maximum clarity and immediate visual impact
3. **Deliver memorable animations** that reinforce the brutalist aesthetic through hard-cut transitions and aggressive motion
4. **Maintain data accessibility** while embracing unconventional design choices

### Secondary Goals
1. Establish a template for brutalist-themed interfaces in the DWF ecosystem
2. Demonstrate GSAP's capabilities for creating jarring, impactful animations
3. Create a mobile-responsive brutalist interface that maintains visual impact across devices

## 3. User Stories

### US-1: Yield Metrics Discovery
**As a** DeFi trader
**I want to** see key yield farming metrics at a glance
**So that** I can quickly assess potential investment opportunities

**Acceptance Criteria:**
- Hero section displays 4 primary metrics: Pool APY, Total Staked, Rewards Distributed, Pool Count
- Metrics are visible within 2 seconds of page load
- Each metric uses large, heavy sans-serif typography (minimum 48px font size)
- Metrics update in real-time or on page refresh
- All numbers are formatted with appropriate suffixes (K, M, B) and decimal places

### US-2: Visual Data Interpretation
**As a** yield farmer
**I want to** view animated charts showing yield distributions
**So that** I can understand market dynamics visually

**Acceptance Criteria:**
- Bar charts display yield distribution across pools
- Gauge/donut charts show APY ranges and concentration
- Charts animate on scroll with hard-cut, jarring transitions
- Chart animations complete within 1.5 seconds
- All charts are readable on mobile devices (minimum 320px width)

### US-3: Market Awareness
**As a** DeFi participant
**I want to** see scrolling marquee text with market updates
**So that** I stay informed about latest yield farming opportunities

**Acceptance Criteria:**
- Marquee text scrolls horizontally at a steady, readable pace (approximately 20-30 pixels per second)
- Text contains relevant market information (top pools, recent APY changes, new opportunities)
- Marquee is visible on both desktop and mobile
- Marquee animation loops seamlessly without visible jumps
- Text is high-contrast and readable against the background

### US-4: Responsive Experience
**As a** mobile user
**I want to** access the brutalist interface on any device
**So that** I can monitor yield farming opportunities on the go

**Acceptance Criteria:**
- Interface adapts to screens from 320px to 3840px
- Typography scales proportionally
- Charts remain interactive and readable on mobile
- Animations perform smoothly on mobile devices (60fps target)
- Touch targets meet minimum size requirements (44x44px)

### US-5: Visual Impact
**As a** user
**I want to** experience bold, aggressive animations
**So that** the interface feels dynamic and memorable

**Acceptance Criteria:**
- Page elements animate in with hard-cut transitions (no gradual fades)
- Geometric shapes appear with snap animations
- Hover states use harsh easing functions (e.g., power4.inOut)
- All animations feel intentional and jarring rather than smooth
- Animation timing aligns with brutalist aesthetic (fast, aggressive)

## 4. Functional Requirements

### 4.1 Hero Section
**FR-1.1:** Display 4 primary yield farming metrics:
- Pool APY (Average percentage across all pools)
- Total Staked (Total value locked in USD)
- Rewards Distributed (Total rewards in USD)
- Pool Count (Number of active pools)

**FR-1.2:** Metric values must be formatted with:
- Appropriate decimal places (2 for percentages, 0-2 for large numbers)
- Suffixes for large numbers (K, M, B, T)
- Dollar signs for USD values
- Percentage signs for APY

**FR-1.3:** Hero section must include:
- Large, bold headline using heavy sans-serif typography
- Marquee scrolling text element with market information
- Geometric shape accents (rectangles, bold lines, circles)

**FR-1.4:** Hero section must be fully responsive across all device sizes

### 4.2 Stats Section
**FR-2.1:** Display animated bar charts showing:
- Top 10 yield pools by APY
- Pool sizes (TVL) for comparison
- Color-coded bars based on performance tiers

**FR-2.2:** Display animated gauge/donut charts showing:
- APY distribution (percentage of pools in each range)
- Reward concentration across pools
- Risk distribution metrics

**FR-2.3:** Charts must animate on:
- Initial page load
- Scroll into view
- Data refresh/update

**FR-2.4:** Charts must include:
- Clear labels and legends
- Hover/tooltips with additional data
- Accessibility attributes (ARIA labels, roles)
- High-contrast colors for readability

### 4.3 Animation System
**FR-3.1:** Implement GSAP-based animations with:
- Hard-cut transitions (no gradual fades)
- Snap animations for geometric shapes
- Marquee scrolling for text elements
- Harsh easing functions (power4, elastic, bounce)

**FR-3.2:** Animation timing must be:
- Fast and aggressive (0.3-1.5 second durations)
- Synchronized for grouped elements
- Performant (60fps on modern devices)

**FR-3.3:** Implement scroll-triggered animations using:
- Intersection Observer or GSAP ScrollTrigger
- Staggered animations for multiple elements
- Progress indicators for long sections

### 4.4 Data Management
**FR-4.1:** Implement mock data generation for:
- Pool APY values (realistic range: 5% - 200%)
- Total staked amounts (realistic range: $10K - $100M)
- Reward distributions (daily/weekly/monthly)
- Pool counts (realistic range: 10 - 500)

**FR-4.2:** Data must update:
- On page load
- On manual refresh
- With loading states during updates

## 5. Non-Goals

### Out of Scope for Initial Release
1. **Real-time data integration** - Mock data only; no live blockchain or API connections
2. **User authentication** - No wallet connection or user accounts
3. **Interactive filtering** - No advanced filter controls or search functionality
4. **Historical data views** - No time-series charts or historical trends
5. **Portfolio tracking** - No user portfolio integration or tracking features
6. **Transaction execution** - No ability to stake, unstake, or execute transactions
7. **Multi-chain support** - Single blockchain focus (Ethereum or generic)
8. **Advanced analytics** - No advanced metrics (impermanent loss, risk scores, etc.)
9. **Social features** - No sharing, commenting, or community features
10. **Admin dashboard** - No content management or admin interface

### Explicitly Excluded Design Elements
1. Gradients (use solid colors only)
2. Shadows (use borders for depth)
3. Rounded corners (use sharp edges)
4. Subtle animations (use hard-cut, jarring transitions)
5. Pastel or muted colors (use high-contrast colors only)
6. Decorative illustrations (use geometric shapes only)
7. Photographic imagery (use abstract geometric forms)

## 6. Design Considerations

### 6.1 Color Palette

**Primary Colors:**
```
Background: #000000 (Pure Black)
Foreground: #FFFFFF (Pure White)
Accent: #FFFF00 (Electric Yellow) OR #FF0000 (Pure Red)
```

**Supporting Colors:**
```
Secondary Accent: #CCCCCC (Light Gray)
Warning: #FF6600 (Orange)
Success: #00FF00 (Lime Green)
Error: #FF0000 (Red)
```

**Color Usage Rules:**
- Maintain minimum 7:1 contrast ratio for text
- Use accent color sparingly (5-10% of design)
- Prioritize high-contrast combinations
- No gradients or color transitions
- Use borders and thick lines instead of shadows

### 6.2 Typography

**Font Family:**
- Primary: Inter, Roboto, or similar heavy sans-serif
- Weights: 700 (Bold), 900 (Black/Heavy)
- No italic or light weights

**Type Scale:**
```
Headline: 80px - 120px (desktop), 48px - 64px (mobile)
Subheadline: 48px - 64px (desktop), 32px - 40px (mobile)
Body Large: 24px - 32px (desktop), 18px - 24px (mobile)
Body Base: 16px - 20px (all devices)
Labels/Captions: 12px - 14px (all devices)
```

**Typography Rules:**
- Use all caps for headlines
- Tight letter spacing (-0.02em to -0.05em)
- No text shadows
- Large line heights for readability (1.4 - 1.6)

### 6.3 Layout Principles

**Grid System:**
- Heavy grid lines (2px - 4px thickness)
- Visible borders between sections
- Asymmetric layouts for visual interest
- Large whitespace (100px+ margins on desktop)

**Shapes:**
- Sharp rectangles and squares
- Bold circles (stroke only, no fill)
- Thick lines and dividers (4px - 8px)
- No rounded corners (0px border-radius)

### 6.4 Chart Specifications

**Bar Charts:**
- Solid color bars (no gradients)
- Thick borders (2px - 4px)
- Sharp corners
- Bold axis lines
- Large, heavy labels

**Gauge/Donut Charts:**
- Thick stroke width (20px - 40px)
- Solid color segments
- Hard edges between segments
- No soft transitions
- Bold percentage text in center

**Chart Animations:**
- Bars grow from bottom (0% to 100% height)
- Gauge segments fill clockwise
- Snap animations (elastic or bounce easing)
- Staggered timing for multiple elements
- Hard-cut entry animations

### 6.5 Spacing System

```
XS: 8px
SM: 16px
MD: 32px
LG: 64px
XL: 128px
XXL: 256px
```

### 6.6 Interactive Elements

**Buttons:**
- Rectangular, sharp corners
- Heavy borders (3px - 4px)
- Solid fill (black or white)
- High contrast text
- Hard color shifts on hover (no transitions)

**Hover States:**
- Instant color changes (0.1s - 0.2s)
- Position shifts (4px - 8px)
- Scale changes (0.95 or 1.05)
- Invert colors (black ↔ white)

## 7. Technical Considerations

### 7.1 Tech Stack

**Core Framework:**
- Next.js 15+ (App Router)
- React 18+
- TypeScript 5+

**Animation Libraries:**
- GSAP (GreenSock Animation Platform) 3.12+
- GSAP ScrollTrigger (for scroll-based animations)
- Optional: GSAP Draggable (for interactive elements)

**Styling:**
- Tailwind CSS 4+ (for utility classes)
- CSS Modules or styled-components (for component-specific styles)

**Data Visualization:**
- Custom SVG charts (preferred for brutalist aesthetic)
- Optional: Recharts or Chart.js (with brutalist theme customization)

**Utilities:**
- clsx or classnames (for conditional classes)
- date-fns or similar (for date formatting)
- number formatting utilities

### 7.2 GSAP Plugins Required

**Core:**
- `gsap.to()`, `gsap.from()`, `gsap.fromTo()` - Basic animations
- `gsap.timeline()` - Sequenced animations
- `gsap.set()` - Instant state changes

**Recommended Plugins:**
- `ScrollTrigger` - Scroll-based animations
- No need for: MorphSVG, DrawSVG (keep it simple)

**Easing Functions:**
- `power4.inOut` - Harsh, aggressive transitions
- `elastic.out(1, 0.5)` - Bouncy, jarring effects
- `bounce.out` - Sharp, mechanical feel
- `steps()` - Hard-cut, frame-by-frame animation
- Avoid: `power1`, `power2`, `sine` (too smooth)

### 7.3 Animation Performance

**Optimization Strategies:**
1. Use `transform` and `opacity` only (GPU-accelerated)
2. Animate SVG properties instead of DOM layout
3. Use `will-change` sparingly
4. Implement Intersection Observer for scroll-triggered animations
5. Debounce resize handlers
6. Use CSS containment where appropriate

**Performance Targets:**
- 60fps on desktop (Chrome, Firefox, Safari)
- 30fps minimum on mobile devices
- First contentful paint < 1.5s
- Time to interactive < 3s
- Lighthouse score > 90

### 7.4 Responsive Design

**Breakpoints:**
```
xs: 320px - 480px (mobile)
sm: 481px - 768px (tablet)
md: 769px - 1024px (small desktop)
lg: 1025px - 1440px (desktop)
xl: 1441px - 1920px (large desktop)
2xl: 1921px+ (ultra-wide)
```

**Mobile Considerations:**
- Simplified charts on mobile (fewer data points)
- Larger touch targets (minimum 44x44px)
- Reduced animation complexity on slower devices
- Horizontal scrolling for wide charts
- Vertical stacking of metrics

### 7.5 Accessibility

**Requirements:**
- Semantic HTML5 elements
- ARIA labels for charts and animations
- Keyboard navigation support
- Focus indicators (bold, visible)
- Screen reader announcements for dynamic content
- Respect `prefers-reduced-motion` setting

**Color Accessibility:**
- Minimum 7:1 contrast ratio for text
- Minimum 3:1 contrast ratio for large text
- Color not the only indicator (use icons, borders, text)
- Test with color blindness simulators

### 7.6 Data Structure

**Mock Data Schema:**
```typescript
interface PoolData {
  id: string;
  name: string;
  apy: number;
  tvl: number;
  rewards: number;
  risk: 'low' | 'medium' | 'high';
}

interface YieldMetrics {
  averageApy: number;
  totalStaked: number;
  rewardsDistributed: number;
  poolCount: number;
  topPools: PoolData[];
  apyDistribution: {
    low: number;   // < 10%
    medium: number; // 10% - 50%
    high: number;  // > 50%
  };
}
```

### 7.7 Component Architecture

**Recommended Component Structure:**
```
BrutalistTheme/
├── HeroSection/
│   ├── MetricsCard.tsx
│   ├── MarqueeText.tsx
│   └── GeometricShapes.tsx
├── StatsSection/
│   ├── BarChart.tsx
│   ├── GaugeChart.tsx
│   └── StatsGrid.tsx
├── components/
│   ├── Button.tsx
│   ├── Card.tsx
│   └── Typography.tsx
└── hooks/
    ├── useGsapAnimation.ts
    ├── useScrollTrigger.ts
    └── useYieldData.ts
```

### 7.8 Browser Support

**Target Browsers:**
- Chrome/Edge 90+ (last 2 versions)
- Firefox 88+ (last 2 versions)
- Safari 14+ (last 2 versions)
- Mobile Safari iOS 14+
- Chrome Android

**Progressive Enhancement:**
- Core functionality works without JavaScript
- Animations enhance but don't break experience
- Fallbacks for unsupported features

## 8. Success Metrics

### 8.1 Technical Metrics

**Performance:**
- Lighthouse Performance Score: ≥ 90
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Cumulative Layout Shift: < 0.1
- Animation frame rate: ≥ 60fps (desktop), ≥ 30fps (mobile)

**Quality:**
- Zero console errors
- 100% TypeScript coverage
- Zero accessibility violations (WCAG 2.1 AA)
- 100% responsive design coverage (tested on 5+ devices)

### 8.2 Design Metrics

**Visual Impact:**
- Distinctive brutalist aesthetic clearly visible
- High contrast maintained across all elements
- Consistent use of geometric shapes and bold typography
- Animations feel jarring and intentional (not smooth or subtle)

**User Experience:**
- Data readability score (user testing): ≥ 8/10
- Navigation ease (user testing): ≥ 8/10
- Visual memorability (user testing): ≥ 9/10

### 8.3 Completion Metrics

**Scope Deliverables:**
- Hero section with 4 metrics ✓
- Marquee scrolling text element ✓
- Stats section with bar charts ✓
- Stats section with gauge/donut charts ✓
- Responsive design (mobile to ultra-wide) ✓
- GSAP animations implemented ✓
- Mock data integration ✓
- Documentation completed ✓

**Code Quality:**
- Component reusability score: ≥ 80%
- Code review approval required
- Documentation completeness: 100%

## 9. Open Questions

### 9.1 Design Decisions

**Q1: Accent Color Selection**
- Which accent color should be primary: Electric Yellow (#FFFF00) or Pure Red (#FF0000)?
- Should we support both as theme variants?
- **Decision needed**: Before design mockup creation

**Q2: Typography Selection**
- Should we use a web font (Inter, Roboto) or system fonts?
- Budget for premium fonts (no cost for open source)?
- **Decision needed**: Before development start

**Q3: Animation Intensity**
- How jarring should animations be? (scale 1-10, 10 being most jarring)
- Should we respect `prefers-reduced-motion` or maintain brutalist aesthetic?
- **Decision needed**: During prototyping phase

### 9.2 Technical Decisions

**Q4: Chart Library Selection**
- Should we build custom SVG charts or use a library (Recharts, Chart.js)?
- Custom offers more control, library offers more features
- **Decision needed**: Before development start

**Q5: Data Source**
- Should we use static mock data or generate dynamic mock data?
- Dynamic allows for more realistic testing
- **Decision needed**: Before development start

**Q6: GSAP Version**
- Should we use GSAP 3.x (current) or wait for 4.x (if released)?
- Any paid plugins needed (free for non-commercial use)?
- **Decision needed**: Before development start

### 9.3 Scope Clarifications

**Q7: Additional Sections**
- Should we include a footer section?
- Should we include a header/navigation?
- **Decision needed**: Before design finalization

**Q8: Interactive Features**
- Should charts be interactive (hover states, tooltips)?
- Should users be able to sort/filter data?
- **Decision needed**: Before development start

**Q9: Testing Requirements**
- Do we need E2E tests (Playwright, Cypress)?
- Do we need visual regression tests?
- **Decision needed**: During QA planning

### 9.4 Future Considerations

**Q10: Real Data Integration**
- If successful, should we integrate real blockchain data?
- Which protocols would we integrate with (Curve, Yearn, Aave)?
- **Decision needed**: After initial launch

**Q11: Theme Expansion**
- Should we create additional brutalist theme variants?
- Should we make this a selectable theme option?
- **Decision needed**: After initial launch

**Q12: Mobile App**
- Should this be adapted for mobile app (React Native)?
- **Decision needed**: After web launch evaluation

---

## Appendix: References and Inspiration

**Brutalist Design References:**
- Neo-brutalist websites: [Craig Reynolds](https://craig-reynolds.com/), [DPH](https://dph.io/)
- Brutalist Web Design: https://brutalist-web.design/
- Raw, bold typography: [Swiss Style/International Typographic Style](https://en.wikipedia.org/wiki/International_Typographic_Style)

**Animation References:**
- Hard-cut transitions: Motion graphics, kinetic typography
- GSAP showcase: https://greensock.com/showcase/
- Jarring UI animations: Glitch art, brutalist motion design

**Competitive Analysis:**
- DeFi yield dashboards: Yearn, Curve, Aave interfaces
- Brutalist crypto interfaces: Research needed
- Data visualization best practices: D3.js gallery, Tableau gallery

---

**Document Version:** 1.0
**Last Updated:** 2025-01-28
**Status:** Draft - Pending Review
**Next Review:** After design mockup completion
