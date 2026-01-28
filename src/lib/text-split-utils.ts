/**
 * Text Splitting Utilities for GSAP Animations
 *
 * Vanilla JS utilities for direct DOM manipulation.
 * Handles proper spacing preservation when using inline-block elements.
 */

/**
 * Split text element into character spans (Vanilla JS)
 * Use this when working directly with DOM elements outside React
 *
 * @param element - The HTMLElement to split
 * @param className - Optional class name for the spans (default: 'char-split')
 * @returns Array of created span elements
 */
export function splitElementToChars(element: HTMLElement, className: string = 'char-split'): HTMLSpanElement[] {
  const text = element.textContent ?? '';
  const chars: HTMLSpanElement[] = [];
  element.innerHTML = '';

  text.split('').forEach((char) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.className = className;
    span.style.display = 'inline-block';
    span.style.position = 'relative';
    if (char === ' ') {
      span.style.minWidth = '0.25em';
    }
    element.appendChild(span);
    chars.push(span);
  });

  return chars;
}

/**
 * Split text element into word spans (Vanilla JS)
 * Use this when working directly with DOM elements outside React
 *
 * @param element - The HTMLElement to split
 * @param className - Optional class name for the spans (default: 'word-split')
 * @returns Array of created span elements (words + spaces)
 */
export function splitElementToWords(element: HTMLElement, className: string = 'word-split'): HTMLSpanElement[] {
  const text = element.textContent ?? '';
  const words = text.split(' ');
  const spans: HTMLSpanElement[] = [];
  element.innerHTML = '';

  words.forEach((word, index) => {
    // Word span
    const wordSpan = document.createElement('span');
    wordSpan.textContent = word;
    wordSpan.className = className;
    wordSpan.style.display = 'inline-block';
    wordSpan.style.whiteSpace = 'nowrap';
    element.appendChild(wordSpan);
    spans.push(wordSpan);

    // Space span (except after last word)
    if (index < words.length - 1) {
      const spaceSpan = document.createElement('span');
      spaceSpan.innerHTML = '&nbsp;';
      spaceSpan.style.display = 'inline-block';
      spaceSpan.style.minWidth = '0.25em';
      element.appendChild(spaceSpan);
      spans.push(spaceSpan);
    }
  });

  return spans;
}
