import { renderToString } from 'react-dom/server'
import { describe, expect, test } from 'vitest'
import { FAN_IMAGES } from '@/content/projectFan'
import { PROJECTS } from '@/content/projects'
import { CopyContext } from '@/i18n/context'
import { en } from '@/i18n/en'
import { fa } from '@/i18n/fa'
import { FAN_CONFIG } from './fanConfig'
import { fanGroups } from './fanGroups'
import { ProjectFan } from './ProjectFan'

const html = (copy: typeof en) =>
  renderToString(
    <CopyContext.Provider value={copy}>
      <ProjectFan />
    </CopyContext.Provider>,
  )

describe('the fan of every project', () => {
  test('every project has its own picture', () => {
    const pictures = PROJECTS.map((project) => FAN_IMAGES[project.id])
    for (const picture of pictures) expect(picture).toBeTruthy()
    expect(new Set(pictures).size).toBe(PROJECTS.length)
    expect(Object.keys(FAN_IMAGES).sort()).toEqual(PROJECTS.map((project) => project.id).sort())
  })

  test('there is one card per project, each a link to the project page named by the project and what it is', () => {
    const page = html(en)
    expect(page.match(/class="fan-gallery-card"/g)).toHaveLength(PROJECTS.length)
    for (const project of PROJECTS) {
      expect(page).toContain(`href="/work/${project.id}/"`)
      expect(page).toContain(`aria-label="${project.name.replace(/&/g, '&amp;')} · ${en.projects[project.id].type.replace(/&/g, '&amp;')}"`)
    }
    expect(page).toContain(`aria-label="${en.work.fanLabel}"`)
  })

  test('on a right-to-left page the cards keep their left-to-right order and links carry the language', () => {
    const page = html(fa)
    expect(page).toMatch(/^<div dir="ltr" class="project-fan"/)
    expect(page).toContain('href="/fa/work/farsh-aquatics/"')
  })

  test('on a phone the projects are dealt into two fans of at most six, and none is left out', () => {
    const groups = fanGroups(true, en)
    expect(groups).toHaveLength(2)
    for (const group of groups) expect(group.projects.length).toBeLessThanOrEqual(6)
    expect(groups.flatMap((group) => group.projects.map((project) => project.id)).sort()).toEqual(
      PROJECTS.map((project) => project.id).sort(),
    )
    expect(new Set(groups.map((group) => group.label)).size).toBe(2)
    expect(fanGroups(false, en)).toHaveLength(1)
  })

  test('the settings are the ones given with the component', () => {
    expect(FAN_CONFIG).toMatchObject({
      cardWidth: 162,
      aspectRatio: 0.8,
      spacing: 0.69,
      curve: 0.14,
      tilt: 14.5,
      lift: 42,
      spread: 0.2,
      stackFrom: 'left',
      speed: 0.7,
      stagger: 0.09,
      bounce: 0.35,
      hoverSpeed: 0.28,
      radius: 18,
      entrance: 'stack',
      trigger: 'scroll',
      viewportStart: 75,
      once: true,
      showTitle: false,
    })
  })
})
