// ============================================================================
// PATTERN COMPONENTS
// ============================================================================

// PatternHeader: Legacy prop-based API (backward compatible)
//   import { PatternHeader } from '@/components/patterns';
//   <PatternHeader category="..." title="..." features={...} />
//
// For new compound API (recommended for new code):
//   import { PatternHeaderCompound, PatternHeaderCategory } from '@/components/patterns/pattern-header';
//   <PatternHeaderCompound>
//     <PatternHeaderCategory>...</PatternHeaderCategory>
//   </PatternHeaderCompound>
export { PatternHeader, type CategoryColor } from './pattern-header';
export { default } from './pattern-header';

// Re-export compound components for convenience
export { PatternHeaderCompound, PatternHeaderCategory, PatternHeaderDifficulty, PatternHeaderTitle, PatternHeaderDescription, PatternHeaderFeatures, PatternHeaderFeature } from './pattern-header';

export { CodeViewer } from './code-viewer';
export { ReplayButton } from './replay-button';
export { RelatedPatterns } from './related-patterns';
export { PatternNavigation } from './pattern-navigation';
