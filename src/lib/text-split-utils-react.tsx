/**
 * Text Splitting Utilities for GSAP Animations (React)
 *
 * React utilities for JSX components.
 * Handles proper spacing preservation when using inline-block elements.
 */

/**
 * Split text into individual character spans for character-level animation
 * Preserves spaces as non-breaking spaces with proper width
 *
 * @param text - The text string to split
 * @param className - Optional class name for the spans (default: 'char-split')
 * @returns Array of React elements representing each character
 */
export function splitTextToChars(text: string, className: string = 'char-split'): React.ReactNode {
  return text.split('').map((char, index) => (
    <span
      key={index}
      className={`${className} inline-block`}
      style={char === ' ' ? { minWidth: '0.25em' } : undefined}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));
}

/**
 * Split text into word spans for word-level animation
 * Preserves spaces between words with proper width
 *
 * @param text - The text string to split
 * @param className - Optional class name for the spans (default: 'word-split')
 * @returns Array of React elements representing each word
 */
export function splitTextToWords(text: string, className: string = 'word-split'): React.ReactNode {
  const words = text.split(' ');
  return words.map((word, index) => (
    <span key={index} className={`${className} inline-block whitespace-nowrap`}>
      {word}
      {index < words.length - 1 && (
        <span style={{ display: 'inline-block', minWidth: '0.25em' }}>&nbsp;</span>
      )}
    </span>
  ));
}
