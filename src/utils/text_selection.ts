export function getSelectedText(): string | null {
  if (typeof window === 'undefined') {
    return null; // Not in a browser environment
  }
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    return selection.toString();
  }
  return null;
}

export function normalizeSelectedText(text: string): string {
  // Trim whitespace and remove excessive newlines/spaces
  return text.trim().replace(/\s\s+/g, ' ');
}

// Optional: Function to get surrounding context (more complex, might need DOM traversal)
export function getSurroundingContext(selection: Selection | null, maxLength = 200): string | null {
  if (!selection || selection.rangeCount === 0) {
    return null;
  }

  const range = selection.getRangeAt(0);
  const clonedRange = range.cloneRange();

  // Expand range backwards
  clonedRange.collapse(true); // collapse to start of selection
  let startNode = clonedRange.startContainer;
  let startOffset = clonedRange.startOffset;
  let charsBefore = 0;

  while (charsBefore < maxLength && startNode) {
    if (startNode.nodeType === Node.TEXT_NODE) {
      const textContent = startNode.textContent || '';
      const availableChars = Math.min(maxLength - charsBefore, startOffset);
      if (availableChars > 0) {
        clonedRange.setStart(startNode, startOffset - availableChars);
        charsBefore += availableChars;
      }
    }
    startOffset = 0; // After first node, always start from beginning of previous nodes
    startNode = startNode.previousSibling || startNode.parentNode; // Move to previous sibling or parent
    // Stop if we hit a major block element boundary (e.g., another chapter, heading)
    if (startNode && (startNode.nodeName === 'H1' || startNode.nodeName === 'H2' || startNode.nodeName === 'DIV')) {
      break;
    }
  }

  // Expand range forwards
  clonedRange.collapse(false); // collapse to end of selection
  let endNode = clonedRange.endContainer;
  let endOffset = clonedRange.endOffset;
  let charsAfter = 0;

  while (charsAfter < maxLength && endNode) {
    if (endNode.nodeType === Node.TEXT_NODE) {
      const textContent = endNode.textContent || '';
      const availableChars = Math.min(maxLength - charsAfter, textContent.length - endOffset);
      if (availableChars > 0) {
        clonedRange.setEnd(endNode, endOffset + availableChars);
        charsAfter += availableChars;
      }
    }
    endOffset = 0; // After first node, always start from beginning of next nodes
    endNode = endNode.nextSibling || endNode.parentNode; // Move to next sibling or parent
    // Stop if we hit a major block element boundary
    if (endNode && (endNode.nodeName === 'H1' || endNode.nodeName === 'H2' || endNode.nodeName === 'DIV')) {
      break;
    }
  }

  return clonedRange.toString();
}

