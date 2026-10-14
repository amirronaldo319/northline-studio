/** Splits a heading into words for staggered entrances. Punctuation stays with its word. */
export function splitWords(text: string): string[] {
  return text.split(/\s+/).filter(Boolean)
}
