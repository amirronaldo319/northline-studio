import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const css = readFileSync(path.resolve(import.meta.dirname, '../src/index.css'), 'utf8')

/** Removes every at-rule block that starts with `header`, matching braces so nested rules go too. */
function stripBlocks(source: string, header: RegExp): string {
  let out = ''
  let i = 0
  while (i < source.length) {
    const rest = source.slice(i)
    const match = rest.match(header)
    if (!match || match.index === undefined) {
      out += rest
      break
    }
    out += rest.slice(0, match.index)
    let depth = 0
    let j = i + match.index + match[0].length - 1 // position of the opening brace
    do {
      if (source[j] === '{') depth += 1
      if (source[j] === '}') depth -= 1
      j += 1
    } while (depth > 0 && j < source.length)
    i = j
  }
  return out
}

describe('motion', () => {
  const outsideSafeBlocks = [
    /@media\s*\(prefers-reduced-motion:\s*no-preference\)\s*{/,
    /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*{/,
    /@media\s+print\s*{/,
    /@keyframes[^{]*{/,
  ].reduce((source, header) => stripBlocks(source, header), css)

  test('no animation runs unless the visitor has not asked for reduced motion', () => {
    const offenders = outsideSafeBlocks.match(/animation(-name|-timeline)?\s*:[^;]+;/g) ?? []
    expect(offenders).toEqual([])
  })

  test('the new motion exists and is gated', () => {
    for (const selector of ['.word-mask', '.hero-settle', '.draw-line', '.scroll-progress', '.btn-primary::after']) {
      expect(css, selector).toContain(selector)
    }
  })

  test('motion is neutralised when printing', () => {
    const printBlock = css.slice(css.lastIndexOf('@media print'))
    for (const selector of ['.word-mask > span', '.hero-in', '.hero-settle', '.draw-line::before', '.scroll-progress']) {
      expect(printBlock, selector).toContain(selector)
    }
  })
})
