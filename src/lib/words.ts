/** Chinese clause punctuation. A break is allowed after these, never inside a clause. */
const CJK_CLAUSE_END = /([，。、；：？！])/

const HAS_CJK = /[㐀-鿿]/

export interface WordToken {
  word: string
  /** Whether a space belongs before this unit. False at the start and between Chinese clauses. */
  spaceBefore: boolean
}

/**
 * Splits a heading into units for staggered entrances and sensible line breaks.
 * Latin and Persian text splits on spaces. Chinese is written without spaces, so it splits after clause
 * punctuation, which keeps every unit a whole phrase.
 */
export function tokenize(text: string): WordToken[] {
  const tokens: WordToken[] = []
  const spaced = text.split(/\s+/).filter(Boolean)

  spaced.forEach((chunk, chunkIndex) => {
    if (!HAS_CJK.test(chunk)) {
      tokens.push({ word: chunk, spaceBefore: chunkIndex > 0 })
      return
    }
    const clauses = chunk
      .split(CJK_CLAUSE_END)
      .reduce<string[]>((acc, part, index) => {
        if (index % 2 === 1) acc[acc.length - 1] += part
        else if (part) acc.push(part)
        return acc
      }, [])
    clauses.forEach((clause, clauseIndex) => {
      // A space the writer typed survives between chunks; clauses inside one chunk have none.
      tokens.push({ word: clause, spaceBefore: clauseIndex === 0 && chunkIndex > 0 })
    })
  })
  return tokens
}

/** The units of a heading, without the spacing information. */
export function splitWords(text: string): string[] {
  return tokenize(text).map((token) => token.word)
}

/** Punctuation that ends a clause or sentence, in the site's languages (Latin, Persian, Chinese). */
const CLAUSE_END = /[.!?,;:،؛؟。，；：？！]$/

/**
 * Where a two-tone heading turns grey: the first unit after the first clause or sentence ends, as Apple sets
 * "A small start. Room to grow." Returns null when the heading is a single clause, so it stays one colour.
 */
export function softFrom(text: string): number | null {
  const units = splitWords(text)
  const end = units.findIndex((unit, index) => index < units.length - 1 && CLAUSE_END.test(unit))
  return end === -1 ? null : end + 1
}
