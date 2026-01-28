/**
 * Text Splitting Utilities for GSAP Animations - React Version
 *
 * React-friendly utilities that return JSX for rendering.
 * These functions create span elements that can be animated with GSAP.
 */

import React from 'react';
import { splitElementToChars, splitElementToWords } from './text-split-utils';

/**
 * Split text string into character spans (returns React elements)
 * Use this for rendering split text in React components
 *
 * @param text - The text string to split
 * @param className - Optional class name for the spans (default: 'char-split')
 * @returns Array of React span elements
 */
export function splitTextToChars(text: string, className: string = 'char-split'): React.ReactElement[] {
  const chars: React.ReactElement[] = [];
  text.split('').forEach((char, index) => {
    chars.push(
      <span key={`${className}-${index}`} className={className} style={{ display: 'inline-block', position: 'relative' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    );
  });
  return chars;
}

/**
 * Split text string into word spans (returns React elements)
 * Use this for rendering split text in React components
 *
 * @param text - The text string to split
 * @param className - Optional class name for the spans (default: 'word-split')
 * @returns Array of React span elements
 */
export function splitTextToWords(text: string, className: string = 'word-split'): React.ReactElement[] {
  const words = text.split(' ');
  const spans: React.ReactElement[] = [];

  words.forEach((word, wordIndex) => {
    // Word span
    spans.push(
      <span
        key={`${className}-word-${wordIndex}`}
        className={className}
        style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
      >
        {word}
      </span>
    );

    // Space span (except after last word)
    if (wordIndex < words.length - 1) {
      spans.push(
        <span
          key={`${className}-space-${wordIndex}`}
          style={{ display: 'inline-block', minWidth: '0.25em' }}
        >
          {'\u00A0'}
        </span>
      );
    }
  });

  return spans;
}

/**
 * Split DOM element into character spans (for GSAP animation)
 * Use this with React refs when you need to animate after mount
 *
 * @param element - The HTMLElement to split
 * @param className - Optional class name for the spans (default: 'char-split')
 * @returns Array of created span elements
 */
export function splitElementToCharsReact(element: HTMLElement, className: string = 'char-split'): HTMLSpanElement[] {
  return splitElementToChars(element, className);
}

/**
 * Split DOM element into word spans (for GSAP animation)
 * Use this with React refs when you need to animate after mount
 *
 * @param element - The HTMLElement to split
 * @param className - Optional class name for the spans (default: 'word-split')
 * @returns Array of created span elements
 */
export function splitElementToWordsReact(element: HTMLElement, className: string = 'word-split'): HTMLSpanElement[] {
  return splitElementToWords(element, className);
}
