/**
 * Renders text one word per mask so each word can rise into place with CSS.
 * The words stay in normal text order with real spaces, so the heading reads the same to assistive tech.
 */
export function SplitWords({ text }: { text: string }) {
  const words = text.split(' ')

  return (
    <>
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <span className="word-mask">
            <span style={{ '--i': index } as React.CSSProperties}>{word}</span>
          </span>
          {index < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </>
  )
}
