import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import {
  HERO_RENDER_SCALE_SHARP,
  HERO_RENDER_SCALE_STANDARD,
  heroRenderScale,
  heroTopographySettings,
} from '../src/components/hero/heroTopography.ts'

describe('heroTopographySettings', () => {
  it('draws on a smaller canvas than the hero, and a sharper screen gets the smaller one', () => {
    expect(heroRenderScale(true)).toBe(HERO_RENDER_SCALE_SHARP)
    expect(heroRenderScale(false)).toBe(HERO_RENDER_SCALE_STANDARD)
    expect(HERO_RENDER_SCALE_SHARP).toBeLessThan(HERO_RENDER_SCALE_STANDARD)
    expect(HERO_RENDER_SCALE_STANDARD).toBeLessThan(1)
  })

  it('keeps the picture the same size on screen: lengths shrink with the canvas, speed rises to match', () => {
    const full = heroTopographySettings(false, 1)
    const half = heroTopographySettings(false, 0.5)
    expect(half.scale).toBeCloseTo(full.scale * 0.5, 1)
    expect(half.dashLength).toBeCloseTo(full.dashLength * 0.5, 1)
    expect(half.speed).toBeGreaterThan(full.speed)
    expect(half.speed).toBeLessThan(full.speed * 1.6)
  })

  it('keeps phones lighter and quieter than desktops, and never reacts to the pointer', () => {
    const phone = heroTopographySettings(true, 0.5)
    const desktop = heroTopographySettings(false, 0.5)
    expect(phone.density).toBeLessThan(desktop.density)
    expect(phone.opacity).toBeLessThan(desktop.opacity)
    expect(phone.hover).toBe(0)
    expect(desktop.hover).toBe(0)
    expect(phone.lineWidth).toBeGreaterThanOrEqual(0.25)
  })

  it('has CSS that reads the same variable the component sets', () => {
    const css = readFileSync(path.resolve(import.meta.dirname, '../src/index.css'), 'utf8')
    const rule = css.slice(css.indexOf('.hero-topo .topographic-flow {'))
    const block = rule.slice(0, rule.indexOf('}'))
    expect(block).toContain('--hero-topo-render')
    expect(block).toMatch(/scale\(calc\(1 \/ var\(--hero-topo-render/)
  })
})
