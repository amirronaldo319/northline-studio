import { describe, expect, test } from 'vitest'
import { settlePending, shownSection } from './navSelection'

describe('glass tab bar selection', () => {
  test('follows the section being read when nothing was picked', () => {
    expect(shownSection({ active: 'process', pending: null })).toBe('process')
    expect(shownSection({ active: null, pending: null })).toBeNull()
  })

  test('holds a picked tab while the page glides past other sections', () => {
    expect(shownSection({ active: 'package', pending: 'faq' })).toBe('faq')
    expect(settlePending({ active: 'package', pending: 'faq' })).toBe('faq')
  })

  test('lets go of the picked tab once the page arrives there', () => {
    expect(settlePending({ active: 'faq', pending: 'faq' })).toBeNull()
  })

  test('nothing picked stays nothing picked', () => {
    expect(settlePending({ active: 'work', pending: null })).toBeNull()
  })
})
