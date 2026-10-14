import { describe, expect, test } from 'vitest'
import { CONCEPT_PROJECT, FEATURED_PROJECT, HERO_PROJECT, PROJECTS, STATUS_LABEL } from './projects'

describe('portfolio projects', () => {
  test('every project is labelled as a live website or a concept project', () => {
    for (const project of PROJECTS) {
      expect(['live', 'concept']).toContain(project.status)
      expect(STATUS_LABEL[project.status].length).toBeGreaterThan(0)
    }
  })

  test('links point at https pages', () => {
    for (const project of PROJECTS) expect(project.liveUrl).toMatch(/^https:\/\//)
  })

  test('screenshots have dimensions and alternative text', () => {
    for (const project of PROJECTS) {
      for (const image of [project.desktop, project.mobile]) {
        expect(image.width).toBeGreaterThan(0)
        expect(image.height).toBeGreaterThan(0)
        expect(image.src.length).toBeGreaterThan(0)
      }
      expect(project.alt.length).toBeGreaterThan(20)
    }
  })

  test('descriptions state no outcomes or metrics', () => {
    const outcomes = /\b(\d+\s?%|leads?|conversions?|revenue|increased|boosted|grew|growth|clients?|testimonial|award)/i
    for (const project of PROJECTS) {
      const text = [project.summary, project.contribution, ...project.decisions].join(' ')
      expect(text, project.id).not.toMatch(outcomes)
    }
  })

  test('the hero and the featured work are live websites, and the concept project is labelled as a concept', () => {
    expect(HERO_PROJECT.status).toBe('live')
    expect(FEATURED_PROJECT.status).toBe('live')
    expect(CONCEPT_PROJECT.status).toBe('concept')
    expect(new Set([HERO_PROJECT.id, FEATURED_PROJECT.id, CONCEPT_PROJECT.id]).size).toBe(3)
  })

  test('captions read as a sentence fragment after the project name', () => {
    for (const project of PROJECTS) expect(project.caption).toMatch(/^[a-z]/)
  })
})
