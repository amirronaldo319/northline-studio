import { Fragment, type CSSProperties } from 'react'
import { splitWords } from '@/lib/words'

/** Words past this index share the last delay, so a long heading never takes seconds to arrive. */
const MAX_WORD_STEPS = 9

type Props = {
  text: string
  /** Indexes of words that get a drawn underline. */
  marked?: readonly number[]
}

/**
 * Renders a heading as separate words so each can arrive in turn (see `.word` in index.css).
 * The words stay in normal reading order and are separated by real spaces, so the heading reads as one sentence.
 */
export function Words({ text, marked = [] }: Props) {
  // <bdi> keeps a heading that starts with a Latin name or a number ("604 Kars") in its own order inside right-to-left text.
  return (
    <bdi>
      {splitWords(text).map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          {index > 0 && ' '}
          <span
            className={marked.includes(index) ? 'word word-marked' : 'word'}
            style={{ '--w': Math.min(index, MAX_WORD_STEPS) } as CSSProperties}
          >
            {word}
          </span>
        </Fragment>
      ))}
    </bdi>
  )
}
