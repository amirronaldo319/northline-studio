import { describe, expect, test } from 'vitest'
import { preferredRedirect } from './language'

const ALL = ['en', 'fa', 'zh-hans', 'zh-hant'] as const

describe('preferredRedirect', () => {
  test('sends a visitor who chose another language from the English page to it', () => {
    expect(preferredRedirect('fa', 'en', ALL)).toBe('fa')
    expect(preferredRedirect('zh-hant', 'en', ALL)).toBe('zh-hant')
  })

  test('does nothing when there is no earlier choice, or it is English', () => {
    expect(preferredRedirect(null, 'en', ALL)).toBeNull()
    expect(preferredRedirect('en', 'en', ALL)).toBeNull()
  })

  test('never overrides a link opened in a non-English language', () => {
    expect(preferredRedirect('en', 'zh-hans', ALL)).toBeNull()
    expect(preferredRedirect('fa', 'zh-hans', ALL)).toBeNull()
  })

  test('ignores a stored language that is switched off, or is not a language at all', () => {
    expect(preferredRedirect('fa', 'en', ['en'])).toBeNull()
    expect(preferredRedirect('klingon', 'en', ALL)).toBeNull()
  })
})
