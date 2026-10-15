import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const root = path.resolve(import.meta.dirname, '..')
const css = readFileSync(path.join(root, 'src/index.css'), 'utf8')
const read = (file: string) => readFileSync(path.join(root, file), 'utf8')

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

describe('motion system', () => {
  const outsideSafeBlocks = [
    /@media\s*\(prefers-reduced-motion:\s*no-preference\)\s*{/,
    /@media[^{]*\(hover:\s*hover\)[^{]*{/,
    /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*{/,
    /@media\s+print\s*{/,
    /@keyframes[^{]*{/,
  ].reduce((source, header) => stripBlocks(source, header), css)

  test('no animation runs unless the visitor has not asked for reduced motion', () => {
    const offenders = outsideSafeBlocks.match(/animation(-name|-timeline)?\s*:[^;]+;/g) ?? []
    expect(offenders).toEqual([])
  })

  test('hover-only effects are limited to devices that can hover', () => {
    const hoverRules = outsideSafeBlocks.match(/[^{}]*:hover[^{}]*{[^}]*(transform|box-shadow)[^}]*}/g) ?? []
    // Plain colour/underline hovers are fine; movement and elevation must be inside a (hover: hover) block.
    expect(hoverRules).toEqual([])
  })

  test('every hover media query also requires a fine pointer', () => {
    const queries = css.match(/@media[^{]*\(hover:\s*hover\)[^{]*/g) ?? []
    expect(queries.length).toBeGreaterThan(0)
    for (const query of queries) expect(query, query).toMatch(/\(pointer:\s*fine\)/)
  })

  test('shared motion tokens are defined', () => {
    for (const token of [
      '--motion-ease-out',
      '--motion-ease-in-out',
      '--motion-dur-press',
      '--motion-dur-hover',
      '--motion-dur-ui',
      '--motion-dur-enter',
      '--motion-dur-reveal',
      '--motion-dur-mask',
      '--motion-dur-nav',
      '--motion-dur-expand',
      '--motion-dur-presentation',
      '--motion-shift-sm',
      '--motion-shift-md',
      '--motion-shift-lg',
      '--motion-stagger',
    ]) {
      expect(css, token).toMatch(new RegExp(`${token}\\s*:`))
    }
  })

  test('uses the standard entrance curve', () => {
    expect(css).toContain('cubic-bezier(0.22, 1, 0.36, 1)')
  })

  test('never animates everything or leaves will-change applied', () => {
    expect(css).not.toMatch(/transition\s*:\s*all/)
    expect(css).not.toMatch(/^\s*will-change\s*:/m)
  })

  test('page transitions and the process rail only run when motion is welcome', () => {
    for (const name of ['@view-transition', 'rail-fill', 'view-transition-name']) {
      expect(css).toContain(name)
      expect(outsideSafeBlocks, `${name} must sit inside a safe block`).not.toContain(name)
    }
  })

  test('removed pointer-following effects stay removed', () => {
    for (const file of ['src/components/Hero.tsx', 'src/components/sections/Hero.tsx', 'src/components/sections/Work.tsx']) {
      try {
        expect(read(file)).not.toMatch(/TiltFrame|pointermove|onPointerMove/i)
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error
      }
    }
    expect(css).not.toMatch(/perspective\s*:/)
  })
})

describe('motion is neutralised when printing', () => {
  const printBlock = css.slice(css.lastIndexOf('@media print'))

  for (const selector of ['.enter', '.fx-in', '.mask-reveal', '.draw-line::before', '.scroll-progress', '.disclosure', '.menu-item']) {
    test(selector, () => expect(printBlock).toContain(selector))
  }
})
