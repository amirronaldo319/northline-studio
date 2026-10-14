import { describe, expect, test } from 'vitest'
import { splitWords } from './words'

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
})
