/**
 * Pattern difficulty levels
 */
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

/**
 * Pattern category metadata
 */
export interface PatternCategory {
  /** Unique identifier for the category */
  id: string;
  /** Display title for the category */
  title: string;
  /** Icon representation (emoji or component reference) */
  icon: string;
  /** Brief description of the category */
  description: string;
}

/**
 * Code snippet for a pattern
 */
export interface CodeSnippet {
  /** Language identifier (e.g., 'typescript', 'tsx') */
  language: string;
  /** File name for display purposes */
  filename: string;
  /** The actual code content */
  code: string;
}

/**
 * Complete pattern metadata
 */
export interface Pattern {
  /** Unique identifier for the pattern */
  id: string;
  /** Display title */
  title: string;
  /** Detailed description of what the pattern demonstrates */
  description: string;
  /** Route path for the pattern page */
  path: string;
  /** Category this pattern belongs to */
  category: string;
  /** Difficulty level for this pattern */
  difficulty: Difficulty;
  /** Code snippets demonstrating the pattern */
  codeSnippets: CodeSnippet[];
  /** Optional: Tags for additional filtering */
  tags?: string[];
}
