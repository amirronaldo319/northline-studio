import { describe, expect, test } from 'vitest'
import { emptyInquiry } from './inquiry'
import { SITE_CHECK_MESSAGE, siteCheckPreset } from './siteCheck'

describe('siteCheckPreset', () => {
  test('fills the need and a starter message when the form is empty', () => {
    const next = siteCheckPreset(emptyInquiry)
    expect(next.need).toBe('An update to my current website')
    expect(next.message).toBe(SITE_CHECK_MESSAGE)
  })

  test('keeps whatever the visitor already wrote', () => {
    const typed = { ...emptyInquiry, name: 'Sam', message: 'We are a cleaning company in Burnaby.' }
    const next = siteCheckPreset(typed)
    expect(next.message).toBe('We are a cleaning company in Burnaby.')
    expect(next.name).toBe('Sam')
    expect(next.need).toBe('An update to my current website')
  })

  test('does not mutate the original values', () => {
    const original = { ...emptyInquiry }
    siteCheckPreset(original)
    expect(original).toEqual(emptyInquiry)
  })
})
