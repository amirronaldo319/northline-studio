import { describe, expect, test } from 'vitest'
import { en } from '../i18n/en'
import { linkLabel, statusLabel } from '../i18n/projectStatus'
import {
  APP_PROJECTS,
  CONCEPT_PROJECT,
  FEATURED_PROJECT,
  HERO_PROJECT,
  PROJECTS,
  SUPPORTING_PROJECTS,
  STATUS_LABEL,
  WEBSITE_PROJECTS,
} from './projects'

describe('portfolio projects', () => {
  test('every project is labelled as a live website, a concept project, or a personal project', () => {
    for (const project of PROJECTS) {
      expect(['live', 'concept', 'personal']).toContain(project.status)
      expect(['website', 'app']).toContain(project.kind)
      expect(STATUS_LABEL[project.status].length).toBeGreaterThan(0)
      expect(statusLabel(en.work, project.status)).toBe(STATUS_LABEL[project.status])
    }
  })

  test('only a launched site is "visited"; everything else is a preview', () => {
    expect(linkLabel(en.work, 'live')).toBe(en.work.visitLive)
    expect(linkLabel(en.work, 'concept')).toBe(en.work.openLivePreview)
    expect(linkLabel(en.work, 'personal')).toBe(en.work.openLivePreview)
  })

  test('links point at https pages, and a project without one says why', () => {
    for (const project of PROJECTS) {
      if (project.liveUrl) expect(project.liveUrl).toMatch(/^https:\/\//)
      else expect(project.note, project.id).toMatch(/private/i)
    }
  })

  test('apps are personal projects, and websites for a business are never labelled personal by mistake', () => {
    for (const project of APP_PROJECTS) expect(project.status, project.id).toBe('personal')
    for (const project of PROJECTS.filter((candidate) => candidate.status === 'live')) {
      expect(project.kind, project.id).toBe('website')
    }
  })

  test('a redesign concept for a real business says it is unofficial and shown with permission', () => {
    for (const id of ['storage4666', 'maid-new']) {
      const project = PROJECTS.find((candidate) => candidate.id === id)
      expect(project?.status).toBe('concept')
      expect(project?.summary).toMatch(/unofficial/i)
      expect(project?.note).toMatch(/not .+ website/i)
      expect(project?.note).toMatch(/permission/i)
    }
  })

  test('every app has its own key colour for the glow behind its phone', () => {
    for (const project of APP_PROJECTS) expect(project.tint, project.id).toMatch(/^#[0-9a-f]{6}$/i)
    expect(new Set(APP_PROJECTS.map((project) => project.tint)).size).toBe(APP_PROJECTS.length)
  })

  test('the home page leads with live work, then three different website concepts, each shown once', () => {
    const home = [HERO_PROJECT, FEATURED_PROJECT, CONCEPT_PROJECT, ...SUPPORTING_PROJECTS]
    expect(new Set(home.map((project) => project.id)).size).toBe(5)
    expect([HERO_PROJECT.status, FEATURED_PROJECT.status]).toEqual(['live', 'live'])
    for (const project of [CONCEPT_PROJECT, ...SUPPORTING_PROJECTS]) {
      expect(project.kind).toBe('website')
      expect(project.status).not.toBe('personal')
    }
  })

  test('the work page lists every project exactly once: websites, then apps and tools', () => {
    const listed = [...WEBSITE_PROJECTS, ...APP_PROJECTS].map((project) => project.id)
    expect(new Set(listed).size).toBe(listed.length)
    expect([...listed].sort()).toEqual(PROJECTS.map((project) => project.id).sort())
    expect(WEBSITE_PROJECTS.every((project) => project.kind === 'website')).toBe(true)
  })

  test('projects shown large on the home page have a sharp 2x capture', () => {
    for (const project of [HERO_PROJECT, FEATURED_PROJECT, CONCEPT_PROJECT, ...SUPPORTING_PROJECTS]) {
      expect(project.desktop2x?.width, project.id).toBe(project.desktop.width * 2)
    }
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
