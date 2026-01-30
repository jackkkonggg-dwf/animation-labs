// ============================================================================
// PATTERN HEADER COMPONENT - Compound Component Pattern
// ============================================================================

/**
 * PatternHeader - Compound component for flexible pattern page headers
 *
 * Usage (new compound API):
 *   import { PatternHeader } from '@/components/patterns';
 *
 *   <PatternHeader>
 *     <PatternHeader.Category color="orange">ScrollTrigger Basics</PatternHeader.Category>
 *     <PatternHeader.Difficulty>Beginner</PatternHeader.Difficulty>
 *     <PatternHeader.Title highlight="Staggered">Reveal</PatternHeader.Title>
 *     <PatternHeader.Description>...</PatternHeader.Description>
 *     <PatternHeader.Features>
 *       <PatternHeader.Feature>x: -100 → 0</PatternHeader.Feature>
 *     </PatternHeader.Features>
 *   </PatternHeader>
 *
 * Usage (legacy prop-based API for backward compatibility):
 *   import PatternHeader from '@/components/patterns/pattern-header';
 *
 *   <PatternHeader
 *     category="ScrollTrigger Basics"
 *     categoryColor="orange"
 *     difficulty="Beginner"
 *     title="Reveal"
 *     titleHighlight="Staggered"
 *     description="..."
 *     features={[{ label: 'x: -100 → 0' }]}
 *   />
 */

interface FeatureBadge {
  label: string;
}

// Color type for flexible theming
export type CategoryColor = 'orange' | 'emerald' | 'cyan' | 'yellow' | 'zinc';

// Color classes map - internal utility
const colorClasses: Record<CategoryColor, { text: string; bg: string; border: string }> = {
  orange: {
    text: 'text-orange-500',
    bg: 'bg-orange-500',
    border: 'border-orange-500',
  },
  emerald: {
    text: 'text-emerald-500',
    bg: 'bg-emerald-500',
    border: 'border-emerald-500',
  },
  cyan: {
    text: 'text-cyan-500',
    bg: 'bg-cyan-500',
    border: 'border-cyan-500',
  },
  yellow: {
    text: 'text-yellow-500',
    bg: 'bg-yellow-500',
    border: 'border-yellow-500',
  },
  zinc: {
    text: 'text-zinc-500',
    bg: 'bg-zinc-500',
    border: 'border-zinc-500',
  },
};

// ============================================================================
// MAIN CONTAINER COMPONENT (Compound API)
// ============================================================================

interface PatternHeaderProps {
  children: React.ReactNode;
}

export function PatternHeaderCompound({ children }: PatternHeaderProps) {
  return (
    <header className="relative border-b border-orange-500/20 bg-zinc-900/50 backdrop-blur-sm">
      {/* Corner accent - top left */}
      <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-orange-500" />
      {/* Corner accent - bottom right */}
      <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-orange-500" />

      {/* Diagonal stripe decoration */}
      <div className="absolute top-0 right-0 w-64 h-1 bg-gradient-to-l from-orange-500 to-transparent opacity-50" />

      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        {/* Render compound children */}
        {children}
      </div>
    </header>
  );
}

// ============================================================================
// CATEGORY COMPONENT
// ============================================================================

interface CategoryProps {
  children: React.ReactNode;
  color?: CategoryColor;
}

export function PatternHeaderCategory({ children, color = 'orange' }: CategoryProps) {
  const colors = colorClasses[color];

  return (
    <div className="inline-flex items-center gap-2 mb-6">
      <span className={`${colors.text} text-xs font-black tracking-[0.3em] uppercase`}>
        {children}
      </span>
      <span className="w-8 h-px bg-orange-500/50" />
    </div>
  );
}

// Alias for convenience
PatternHeaderCompound.Category = PatternHeaderCategory;

// ============================================================================
// DIFFICULTY COMPONENT
// ============================================================================

interface DifficultyProps {
  children: React.ReactNode;
}

export function PatternHeaderDifficulty({ children }: DifficultyProps) {
  return (
    <span className="text-zinc-500 text-xs font-bold tracking-[0.2em] uppercase">
      {children}
    </span>
  );
}

// Alias for convenience
PatternHeaderCompound.Difficulty = PatternHeaderDifficulty;

// ============================================================================
// TITLE COMPONENT
// ============================================================================

interface TitleProps {
  children: React.ReactNode;
  highlight?: string;
  color?: CategoryColor;
}

export function PatternHeaderTitle({ children, highlight, color = 'orange' }: TitleProps) {
  const colors = colorClasses[color];

  return (
    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase mb-6">
      {highlight ? (
        <>
          <span className={colors.text}>{highlight}</span> {children}
        </>
      ) : (
        children
      )}
    </h1>
  );
}

// Alias for convenience
PatternHeaderCompound.Title = PatternHeaderTitle;

// ============================================================================
// DESCRIPTION COMPONENT
// ============================================================================

interface DescriptionProps {
  children: React.ReactNode;
}

export function PatternHeaderDescription({ children }: DescriptionProps) {
  return (
    <p className="text-zinc-400 text-lg md:text-xl max-w-3xl font-light leading-relaxed">
      {children}
    </p>
  );
}

// Alias for convenience
PatternHeaderCompound.Description = PatternHeaderDescription;

// ============================================================================
// FEATURES COMPONENT
// ============================================================================

interface FeaturesProps {
  children: React.ReactNode;
  color?: CategoryColor;
}

export function PatternHeaderFeatures({ children, color = 'orange' }: FeaturesProps) {
  return (
    <div className="flex flex-wrap gap-4 mt-8">{children}</div>
  );
}

// Alias for convenience
PatternHeaderCompound.Features = PatternHeaderFeatures;

// ============================================================================
// FEATURE COMPONENT
// ============================================================================

interface FeatureProps {
  children: React.ReactNode;
  color?: CategoryColor;
}

export function PatternHeaderFeature({ children, color = 'orange' }: FeatureProps) {
  const colors = colorClasses[color];

  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded">
      <span className={`w-2 h-2 ${colors.bg} rounded-full animate-pulse`} />
      <span className="text-zinc-300 text-sm font-mono">{children}</span>
    </div>
  );
}

// Alias for convenience
PatternHeaderCompound.Feature = PatternHeaderFeature;

// ============================================================================
// LEGACY PROP-BASED API (Backward Compatibility)
// ============================================================================

/**
 * Legacy PatternHeader component interface for backward compatibility.
 * Deprecated: Use compound components instead.
 *
 * @deprecated Use <PatternHeader> with sub-components instead
 */
interface LegacyPatternHeaderProps {
  category: string;
  categoryColor?: CategoryColor;
  difficulty?: string;
  title: string;
  titleHighlight?: string;
  description: string;
  features: FeatureBadge[];
}

/**
 * LegacyPatternHeader - Prop-based API for backward compatibility
 *
 * This component wraps the new compound component API internally,
 * allowing existing code to continue working without changes.
 */
function LegacyPatternHeader({
  category,
  categoryColor = 'orange',
  difficulty,
  title,
  titleHighlight,
  description,
  features,
}: LegacyPatternHeaderProps) {
  return (
    <PatternHeaderCompound>
      <PatternHeaderCategory color={categoryColor}>{category}</PatternHeaderCategory>
      {difficulty && <PatternHeaderDifficulty>{difficulty}</PatternHeaderDifficulty>}
      <PatternHeaderTitle highlight={titleHighlight} color={categoryColor}>
        {title}
      </PatternHeaderTitle>
      <PatternHeaderDescription>{description}</PatternHeaderDescription>
      <PatternHeaderFeatures color={categoryColor}>
        {features.map((feature, index) => (
          <PatternHeaderFeature key={index} color={categoryColor}>
            {feature.label}
          </PatternHeaderFeature>
        ))}
      </PatternHeaderFeatures>
    </PatternHeaderCompound>
  );
}

// ============================================================================
// EXPORTS
// ============================================================================

// Export legacy as default for backward compatibility with existing imports
export default LegacyPatternHeader;

// Export legacy component also as named export for backward compatibility
export { LegacyPatternHeader as PatternHeader };
