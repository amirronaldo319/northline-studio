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
    // The pricing strip floats over rows that keep moving, so it frosts.
    expect(read('src/components/sections/Package.tsx')).toContain('glass-frost')
  })

  test('form fields are native controls: white, with a clear 3:1 edge', () => {
    const form = read('src/components/contact/InquiryForm.tsx')
    expect(form).not.toMatch(/from 'glisse'/)
    expect(css).toMatch(/\.field\s*{[^}]*border:\s*1px solid #86868b/)
    expect(read('src/components/contact/fieldStyles.ts')).toContain("fieldControlClasses = 'field'")
  })

  test('field text is at least 16px, so iOS does not zoom when a field is focused', () => {
    const size = css.match(/\n\.field\s*{[^}]*font-size:\s*([\d.]+)rem/)?.[1]
    expect(Number(size)).toBeGreaterThanOrEqual(1)
  })
})

describe('Apple design system', () => {
  const plain = css.replace(/\/\*[\s\S]*?\*\//g, '')
  const rule = (selector: RegExp) => plain.match(new RegExp(`(^|\\n)[ \\t]*${selector.source}\\s*{([^}]*)}`))?.[2] ?? ''
  const luminance = (hex: string) => {
    const [r, g, b] = [1, 3, 5]
      .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
      .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }
  const contrast = (a: string, b: string) => {
    const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x)
    return (high + 0.05) / (low + 0.05)
  }
  const token = (name: string) => css.match(new RegExp(`--color-${name}:\\s*(#[0-9a-f]{6})`, 'i'))?.[1] ?? ''

  test('every button is an Apple pill in glass: blue glass for the main action, clear glass beside it', () => {
    const button = read('src/components/ui/button.ts')
    expect(button).toMatch(/\['button', variants\[variant\], sizes\[size\], extra\]/)
    expect(rule(/\.button/)).toMatch(/border-radius:\s*980px/)
    expect(rule(/\.button-primary/)).toMatch(/background-color:\s*#0071e3/)
    expect(rule(/\.button-secondary/)).toMatch(/-webkit-backdrop-filter:\s*var\(--glass-filter\)/)
    // Buttons never jump under the pointer; they only give a little when pressed.
    expect(plain).not.toMatch(/\.button[^{]*:hover[^{]*{[^}]*transform/)
  })

  test('the light on the blue glass never sits behind the label', () => {
    const primary = rule(/\.button-primary/)
    const top = Number(primary.match(/rgb\(255 255 255 \/ ([\d.]+)\),\s*rgb\(255 255 255 \/ 0\) (\d+)%/)?.[1])
    const fade = Number(primary.match(/rgb\(255 255 255 \/ [\d.]+\),\s*rgb\(255 255 255 \/ 0\) (\d+)%/)?.[1])
    expect(top).toBeLessThanOrEqual(0.1)
    expect(fade).toBeLessThanOrEqual(40)
  })

  test('the controls are glass: rim, blur with the WebKit property, and glass in glass never frosts twice', () => {
    expect(plain).toMatch(/:is\(\.liquid-glass-navigation, \.glass-control[^)]*\)::before\s*{[^}]*mask-composite:\s*exclude[^}]*pointer-events:\s*none/)
    expect(plain).toMatch(/\.liquid-glass-navigation,\s*\.glass-control,[^{]*{[^}]*-webkit-backdrop-filter:\s*var\(--glass-filter\)[^}]*(^|[\s;])backdrop-filter:\s*var\(--glass-filter\)/)
    expect(plain).toMatch(/\.liquid-glass-navigation :is\(\.glass-control, \.button, \.lang-pill\)\s*{[^}]*backdrop-filter:\s*none/)
  })

  test('the blue keeps its white label, and links and secondary text keep 4.5:1, on white and on Apple grey', () => {
    expect(contrast('#0071e3', '#ffffff')).toBeGreaterThanOrEqual(4.5)
    for (const background of ['#ffffff', token('paper')]) {
      expect(contrast(token('accent'), background), `link on ${background}`).toBeGreaterThanOrEqual(4.5)
      expect(contrast(token('ink-3'), background), `grey text on ${background}`).toBeGreaterThanOrEqual(4.5)
    }
  })

  test('the capsule is a denser glass, Apple\'s blur and saturation', () => {
    expect(rule(/\.liquid-glass-navigation/)).toMatch(/--glass-filter:\s*blur\(20px\) saturate\(180%\)/)
  })

  test('the header keeps one height, so nothing on the page shifts as the capsule changes', () => {
    expect(rule(/\.site-nav/)).toMatch(/height:\s*3\.75rem/)
    expect(plain).not.toMatch(/\[data-scrolled\][^{]*\.site-nav-row[^{]*{[^}]*height/)
  })

  test('no decorative shapes or colour washes remain', () => {
    expect(plain).not.toMatch(/\.glass-orb|\.glass-ring|\.ambient|--ambient-light/)
  })

  test('cards lift only on devices that hover, and only when motion is welcome', () => {
    const lift = plain.indexOf('.card:hover {\n    transform')
    expect(lift).toBeGreaterThan(-1)
    const block = plain.lastIndexOf('@media', lift)
    expect(plain.slice(block, lift)).toMatch(/\(hover: hover\) and \(pointer: fine\) and \(prefers-reduced-motion: no-preference\)/)
  })

  test('the material turns solid when transparency is unwelcome, and plain when contrast matters', () => {
    for (const query of ['prefers-reduced-transparency: reduce', 'prefers-contrast: more', 'forced-colors: active']) {
      const at = plain.indexOf(`@media (${query})`)
      expect(at, query).toBeGreaterThan(-1)
      expect(plain.slice(at, at + 1400), query).toMatch(/\.liquid-glass-navigation[^{]*{[^}]*backdrop-filter:\s*none/)
    }
  })
})
