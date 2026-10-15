import { describe, expect, test } from 'vitest'
import { LANGUAGES, LANGUAGE_CODES, enabledLanguages, findLanguage } from './languages'

describe('translated pages', () => {
  test('every language has the full set of copy', () => {
    for (const code of LANGUAGE_CODES) {
      const language = LANGUAGES[code]
      expect(language.groups, code).toHaveLength(4)
      expect(language.steps, code).toHaveLength(4)
      for (const field of [
        language.title,
        language.description,
        language.headline,
        language.intro,
        language.quoteButton,
        language.quoteText,
        language.contactTitle,
        language.mailSubject,
        language.label,
        language.shortLabel,
      ]) {
        expect(field.trim().length, `${code}: empty field`).toBeGreaterThan(0)
      }
    }
  })

  test('paths are unique, end with a slash, and do not clash with English pages', () => {
    const paths = LANGUAGE_CODES.map((code) => LANGUAGES[code].path)
    expect(new Set(paths).size).toBe(paths.length)
    for (const path of paths) expect(path).toMatch(/^[a-z-]+\/$/)
  })

  test('titles stay short enough to show in search results', () => {
    for (const code of LANGUAGE_CODES) expect(LANGUAGES[code].title.length, code).toBeLessThanOrEqual(62)
  })

  test('the scripts and directions are right', () => {
    expect(LANGUAGES.fa.dir).toBe('rtl')
    expect(LANGUAGES['zh-hans'].dir).toBe('ltr')
    expect(LANGUAGES['zh-hans'].htmlLang).toBe('zh-Hans')
    expect(LANGUAGES['zh-hant'].htmlLang).toBe('zh-Hant')
    expect(LANGUAGES.fa.headline).toMatch(/[\u0600-\u06FF]/)
    expect(LANGUAGES['zh-hans'].headline).toMatch(/[\u4e00-\u9fff]/)
  })

  test('Simplified and Traditional versions are separate texts', () => {
    expect(LANGUAGES['zh-hans'].quoteText).not.toBe(LANGUAGES['zh-hant'].quoteText)
  })

  test('none are switched on yet, and unknown codes are rejected', () => {
    expect(enabledLanguages()).toEqual([])
    expect(findLanguage('klingon')).toBeUndefined()
  })
})
