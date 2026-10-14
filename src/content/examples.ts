import { lazy, type ComponentType } from 'react'
import type { DemoProps } from '@/components/demos/types'

// Each demo is its own chunk, fetched only when an example scrolls near or is opened.
const CleaningDemo = lazy(() => import('@/components/demos/CleaningDemo').then((m) => ({ default: m.CleaningDemo })))
const LandscapeDemo = lazy(() => import('@/components/demos/LandscapeDemo').then((m) => ({ default: m.LandscapeDemo })))
const DetailingDemo = lazy(() => import('@/components/demos/DetailingDemo').then((m) => ({ default: m.DetailingDemo })))

export interface ExampleSite {
  id: string
  name: string
  industry: string
  style: string
  approach: string
  swatches: readonly string[]
  Demo: ComponentType<DemoProps>
}

/** Concept demos — fictional businesses, always labelled as such on the page. */
export const EXAMPLES: readonly ExampleSite[] = [
  {
    id: 'cleaning',
    name: 'Tidewell Cleaning',
    industry: 'Home cleaning',
    style: 'Bright, clear, approachable',
    approach:
      'Fresh teal and a warm yellow keep things friendly. Services are listed plainly, and the quote button sits in the header, the hero, and beside a short form.',
    swatches: ['#0e7c78', '#f4c552', '#e3f3f1'],
    Demo: CleaningDemo,
  },
  {
    id: 'landscaping',
    name: 'Rootline Landscapes',
    industry: 'Landscaping',
    style: 'Confident, grounded, practical',
    approach:
      'Earthy greens, clay, and strong uppercase headings. A full-width hero, a services grid, and a project gallery let finished work do the selling.',
    swatches: ['#22301f', '#c27c2c', '#ece6d8'],
    Demo: LandscapeDemo,
  },
  {
    id: 'detailing',
    name: 'Northgloss Detailing',
    industry: 'Auto detailing',
    style: 'Refined, bold, visually strong',
    approach:
      'A dark, high-contrast layout with one sharp accent colour. Packages are easy to compare, and every section ends with a clear way to request a booking.',
    swatches: ['#0c0d10', '#ff5a36', '#a9aeb8'],
    Demo: DetailingDemo,
  },
]
