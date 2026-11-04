import { readFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const root = path.resolve(import.meta.dirname, '..')
const read = (file: string) => readFileSync(path.join(root, file), 'utf8')
const css = read('src/index.css')

function sourceFiles(dir: string): string[] {
  return readdirSync(path.join(root, dir)).flatMap((name) => {
    const file = path.join(dir, name)
    if (statSync(path.join(root, file)).isDirectory()) return sourceFiles(file)
    return /\.tsx?$/.test(name) && !/\.test\./.test(name) ? [file] : []
  })
}

const GLISSE_COMPONENTS = ['Glass', 'Button', 'TabBar', 'SegmentedControl', 'Menu', 'Input', 'SearchField', 'Slider', 'Switch']
const GLISSE_TYPES = ['ButtonProps', 'GlassProps', 'InputProps', 'MenuEntry', 'MenuItem', 'MenuProps', 'SearchFieldProps', 'SegmentedControlItem', 'SegmentedControlProps', 'SliderProps', 'SwitchProps', 'TabBarItem', 'TabBarProps']

describe('Liquid Glass (Glisse) integration', () => {
  const files = sourceFiles('src').map((file) => ({ file, source: read(file) }))
  const users = files.filter(({ source }) => source.includes("from 'glisse'"))

  test('imports only what the library documents and exports', () => {
    expect(users.length).toBeGreaterThan(0)
    for (const { file, source } of users) {
      for (const match of source.matchAll(/import\s*{([^}]*)}\s*from 'glisse'/g)) {
        const names = match[1]
          .split(',')
          .map((name) => name.replace(/^\s*type\s+/, '').trim())
          .filter(Boolean)
        for (const name of names) expect([...GLISSE_COMPONENTS, ...GLISSE_TYPES], `${file}: ${name}`).toContain(name)
      }
    }
  })

  test('never puts display utilities on a Glisse component, whose own unlayered rules would win', () => {
    const component = new RegExp(`<(${GLISSE_COMPONENTS.join('|')})\\b[^>]*className="([^"]*)"`, 'g')
    for (const { file, source } of users) {
      for (const match of source.matchAll(component)) {
        expect(match[2], `${file}: <${match[1]} className="${match[2]}">`).not.toMatch(
          /(^|\s)([a-z0-9[\]-]+:)*(hidden|block|inline-block|flex|inline-flex|grid)(\s|$)/,
        )
      }
    }
  })

  test('pins the light theme, so glass never follows the device into dark mode on this light page', () => {
    expect(read('index.html')).toMatch(/<body[^>]*data-theme="light"/)
  })

  test('tunes the library variables in one place', () => {
    for (const variable of ['--lg-glass', '--lg-glass-active', '--lg-blur', '--lg-glass-bend', '--lg-glass-dispersion', '--lg-rim-shine', '--lg-fill', '--lg-on']) {
      expect(css, variable).toMatch(new RegExp(`${variable}\\s*:`))
    }
  })

  test('the header is not a backdrop root, so its glass can see the page', () => {
    // A view-transition-name, filter, opacity or backdrop filter on an ancestor of the glass would hide the page from it.
    const plain = css.replace(/\/\*[\s\S]*?\*\//g, '')
    expect(plain).not.toMatch(/view-transition-name\s*:/)
    const header = plain.match(/\n\.site-nav\s*{([^}]*)}/)?.[1]
    expect(header, 'header rule').toBeDefined()
    expect(header).not.toMatch(/(^|[\s;])(filter|opacity|backdrop-filter|-webkit-backdrop-filter)\s*:/)
  })

  test('glass over moving content frosts without the costly per-frame bend', () => {
    const rule = css.match(/\.lg-glass\.glass-frost\s*{([^}]*)}/)
    expect(rule, 'frost rule').not.toBeNull()
    expect(rule?.[1]).toMatch(/backdrop-filter:\s*blur\(/)
    expect(rule?.[1]).not.toMatch(/url\(/)
    // The bar and its phone sheet, the phone quote bar, the form card and the pricing strip all frost.
    expect(read('src/components/Header.tsx').match(/glass-frost/g)?.length).toBe(2)
    expect(read('src/components/QuoteBar.tsx')).toContain('glass-frost')
    expect(read('src/components/sections/Contact.tsx')).toContain('glass-frost')
    expect(read('src/components/sections/Package.tsx')).toContain('glass-frost')
  })

  test('form fields are plain controls, never glass, so they read clearly', () => {
    const form = read('src/components/contact/InquiryForm.tsx')
    expect(form).not.toMatch(/from 'glisse'/)
    expect(css).toMatch(/\.field\s*{[^}]*border:\s*1px solid #86868b/)
  })

  test('field text is at least 16px, so iOS does not zoom when a field is focused', () => {
    const size = css.match(/\n\.field\s*{[^}]*font-size:\s*([\d.]+)rem/)?.[1]
    expect(Number(size)).toBeGreaterThanOrEqual(1)
  })
})
