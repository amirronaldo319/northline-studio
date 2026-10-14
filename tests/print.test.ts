import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const css = readFileSync(path.resolve(import.meta.dirname, '../src/index.css'), 'utf8')

describe('print styles', () => {
  const printBlock = css.slice(css.indexOf('@media print'))

  test('scroll reveals are shown in full when printed', () => {
    expect(css).toContain('@media print')
    expect(printBlock).toMatch(/\.js \.reveal:not\(\.is-visible\)[^}]*opacity:\s*1\s*!important/)
  })

  test('the sticky header does not repeat on printed pages', () => {
    expect(printBlock).toMatch(/header\s*{[^}]*position:\s*static\s*!important/)
  })
})
