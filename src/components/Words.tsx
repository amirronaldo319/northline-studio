/**
 * A heading's text. Headings appear at once, in one colour: no word-by-word entrance and no two-tone or gradient
 * words, so nothing makes a visitor wait to read them.
 */
export function Words({ text }: { text: string }) {
  // <bdi> keeps a heading that starts with a Latin name or a number ("604 Kars") in its own order inside right-to-left text.
  return <bdi>{text}</bdi>
}
