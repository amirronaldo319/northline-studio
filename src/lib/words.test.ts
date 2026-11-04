import { describe, expect, test } from 'vitest'
import { softFrom, splitWords, tokenize } from './words'

describe('splitWords', () => {
  test('keeps words in order and drops extra whitespace', () => {
    expect(splitWords('  Custom   websites for\nVancouver ')).toEqual(['Custom', 'websites', 'for', 'Vancouver'])
  })

  test('keeps punctuation attached to its word', () => {
    expect(splitWords('Vancouver’s local businesses.')).toEqual(['Vancouver’s', 'local', 'businesses.'])
  })

  test('returns an empty list for blank text', () => {
    expect(splitWords('   ')).toEqual([])
  })

  test('breaks Chinese at clause punctuation, keeping the punctuation with its clause', () => {
    expect(splitWords('我做过什么，以及我如何设计。')).toEqual(['我做过什么，', '以及我如何设计。'])
  })

  test('leaves a Chinese phrase without punctuation whole', () => {
    expect(splitWords('温哥华本地商家的专属网站。')).toEqual(['温哥华本地商家的专属网站。'])
  })

  test('does not split Latin text on Chinese-style punctuation rules', () => {
    expect(splitWords('Hello, world. Again')).toEqual(['Hello,', 'world.', 'Again'])
  })
})

describe('tokenize', () => {
  test('marks where a space belongs between units', () => {
    expect(tokenize('Custom websites')).toEqual([
      { word: 'Custom', spaceBefore: false },
      { word: 'websites', spaceBefore: true },
    ])
  })

  test('puts no space between Chinese clauses, since the script does not use them', () => {
    expect(tokenize('我做过什么，以及我如何设计。')).toEqual([
      { word: '我做过什么，', spaceBefore: false },
      { word: '以及我如何设计。', spaceBefore: false },
    ])
  })

  test('keeps a space the writer put between Chinese phrases', () => {
    expect(tokenize('为本地商家 量身定制的网站。')).toEqual([
      { word: '为本地商家', spaceBefore: false },
      { word: '量身定制的网站。', spaceBefore: true },
    ])
  })
})

describe('softFrom', () => {
  test('turns grey after the first sentence', () => {
    expect(softFrom('A small start. Room to grow.')).toBe(3)
  })

  test('turns grey after the first clause', () => {
    expect(softFrom('What I’ve built, and how I design.')).toBe(3)
  })

  test('keeps a single-clause heading one colour', () => {
    expect(softFrom('Request a quote.')).toBeNull()
    expect(softFrom('Made for local service businesses.')).toBeNull()
  })

  test('works for Chinese clauses and Persian punctuation', () => {
    expect(softFrom('我做过什么，以及我如何设计。')).toBe(1)
    expect(softFrom('شروعی کوچک، جا برای رشد.')).toBe(2)
  })
})
