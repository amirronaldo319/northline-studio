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
    // The phone quote bar and the pricing strip float over content that keeps moving, so they frost.
    expect(read('src/components/QuoteBar.tsx')).toContain('glass-frost')
    expect(read('src/components/sections/Package.tsx')).toContain('glass-frost')
  })

  test('form fields are native controls with a clear 3:1 edge, inset into the glass', () => {
    const form = read('src/components/contact/InquiryForm.tsx')
    expect(form).not.toMatch(/from 'glisse'/)
    expect(css).toMatch(/\.field\s*{[^}]*border:\s*1px solid #86868b/)
    expect(read('src/components/contact/fieldStyles.ts')).toContain("'field liquid-glass-input'")
  })

  test('field text is at least 16px, so iOS does not zoom when a field is focused', () => {
    const size = css.match(/\n\.field\s*{[^}]*font-size:\s*([\d.]+)rem/)?.[1]
    expect(Number(size)).toBeGreaterThanOrEqual(1)
  })
})

describe('Liquid Glass system', () => {
  const plain = css.replace(/\/\*[\s\S]*?\*\//g, '')
  const rule = (selector: RegExp) => plain.match(new RegExp(`(^|\\n)${selector.source}\\s*{([^}]*)}`))?.[2] ?? ''
  const SURFACES = ['liquid-glass', 'liquid-glass-strong', 'liquid-glass-subtle', 'liquid-glass-card']

  test('defines every variant', () => {
    for (const name of [...SURFACES, 'liquid-glass-button', 'liquid-glass-navigation', 'liquid-glass-input']) {
      expect(plain, name).toMatch(new RegExp(`\\.${name}[\\s,{:]`))
    }
  })

  test('surfaces frost with both the standard and the WebKit property, over a fill clipped inside a clear border', () => {
    const base = plain.match(/\.liquid-glass,\s*\.liquid-glass-strong,\s*\.liquid-glass-subtle,\s*\.liquid-glass-card\s*{([^}]*)}/)?.[1] ?? ''
    expect(base).toMatch(/-webkit-backdrop-filter:\s*blur\(/)
    expect(base).toMatch(/(^|[\s;])backdrop-filter:\s*blur\(/)
    expect(base).toMatch(/border:\s*1px solid transparent/)
    expect(base).toMatch(/padding-box/)
    const nav = rule(/\.liquid-glass-navigation/)
    expect(nav).toMatch(/-webkit-backdrop-filter:\s*blur\(/)
    expect(nav).toMatch(/background-clip:\s*padding-box/)
  })

  test('the rim and highlight are drawn by pseudo-elements that never take clicks', () => {
    expect(plain).toMatch(/:is\(\.liquid-glass,[^)]*\)::before\s*{[^}]*mask-composite:\s*exclude[^}]*pointer-events:\s*none/)
    expect(plain).toMatch(/:is\(\.liquid-glass,[^)]*\)::after\s*{[^}]*pointer-events:\s*none/)
  })

  test('glass inside glass does not frost twice', () => {
    expect(plain).toMatch(/:is\(\.liquid-glass,[^)]*\)\s*:is\(\.liquid-glass,[^)]*\.liquid-glass-button[^)]*\)\s*{[^}]*backdrop-filter:\s*none/)
  })

  test('the shapes that move are painted, never frosted, so motion never re-blurs the page', () => {
    for (const shape of ['.glass-orb', '.glass-ring', '.glass-capsule-shape', '.glass-shapes']) {
      for (const match of plain.matchAll(new RegExp(`[^{}]*\\${shape}[^{}]*{([^}]*)}`, 'g'))) {
        expect(match[1], shape).not.toMatch(/backdrop-filter/)
      }
    }
    // The contact panel frosts what is behind it, so its shapes stay still.
    expect(plain).not.toMatch(/\.contact-shapes[^{]*{[^}]*animation/)
  })

  test('turns solid when transparency is unwelcome, plain when contrast matters, and outlined in forced colours', () => {
    for (const query of ['prefers-reduced-transparency: reduce', 'prefers-contrast: more', 'forced-colors: active']) {
      const at = plain.indexOf(`@media (${query})`)
      expect(at, query).toBeGreaterThan(-1)
      expect(plain.slice(at, at + 1500), query).toMatch(/\.liquid-glass[^{]*{[^}]*backdrop-filter:\s*none/)
    }
  })

  test('every button on the site is a Liquid Glass button', () => {
    const button = read('src/components/ui/button.ts')
    expect(button).toMatch(/\['liquid-glass-button', variants\[variant\], sizes\[size\], extra\]/)
    for (const name of ['glass-btn-primary', 'glass-btn-secondary', 'glass-btn-sm', 'glass-btn-md', 'glass-btn-lg']) {
      expect(button, name).toContain(`'${name}'`)
      expect(plain, name).toMatch(new RegExp(`\\.${name}\\s*{`))
    }
  })

  test('the primary glass keeps its white label at 4.5:1 or better', () => {
    const luminance = (hex: string) => {
      const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
      return 0.2126 * r + 0.7152 * g + 0.0722 * b
    }
    const primary = rule(/\.glass-btn-primary/)
    const stops = primary.match(/linear-gradient\(180deg, (#[0-9a-f]{6}), (#[0-9a-f]{6}) \d+%, (#[0-9a-f]{6})\)/i)?.slice(1) ?? []
    expect(stops).toHaveLength(3)
    for (const stop of stops) expect(1.05 / (luminance(stop) + 0.05), stop).toBeGreaterThanOrEqual(4.5)
    // The light along the top edge stays faint.
    const light = Number(primary.match(/rgb\(255 255 255 \/ ([\d.]+)\), rgb\(255 255 255 \/ 0\)/)?.[1])
    expect(light).toBeLessThanOrEqual(0.12)
  })
})
