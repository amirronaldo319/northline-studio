import { Fragment, type CSSProperties } from 'react'
import { softFrom, tokenize } from '@/lib/words'

/** Words past this index share the last delay, so a long heading never takes seconds to arrive. */
const MAX_WORD_STEPS = 9

type Props = {
  text: string
  /** Indexes of words set in the brand gradient (the hero's key word). */
  marked?: readonly number[]
  /** Set the words after the first clause in grey, as Apple's two-tone headlines do. */
  twoTone?: boolean
}

/**
 * Renders a heading as separate words so each can arrive in turn (see `.word` in index.css).
 * The words stay in normal reading order and are separated by real spaces, so the heading reads as one sentence.
 */
export function Words({ text, marked = [], twoTone = false }: Props) {
  const soft = twoTone ? softFrom(text) : null
  // <bdi> keeps a heading that starts with a Latin name or a number ("604 Kars") in its own order inside right-to-left text.
  return (
    <bdi>
      {tokenize(text).map(({ word, spaceBefore }, index) => (
        <Fragment key={`${word}-${index}`}>
          {spaceBefore && ' '}
          <span
            className={['word', marked.includes(index) && 'word-marked', soft !== null && index >= soft && 'word-soft'].filter(Boolean).join(' ')}
            style={{ '--w': Math.min(index, MAX_WORD_STEPS) } as CSSProperties}
          >
            {word}
          </span>
        </Fragment>
      ))}
    </bdi>
  )
}
