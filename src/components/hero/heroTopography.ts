/**
 * The contours are faint background, so they are drawn on a canvas that is only a fraction of the hero's size and
 * stretched back up by CSS (`.hero-topo .topographic-flow` in index.css reads `--hero-topo-render`, which the component
 * sets to the value chosen here). Fewer pixels for the drawing code to fill each frame is the whole saving: on a
 * retina screen a full-size canvas is 7.8 million pixels a frame.
 *
 * Screens at 2x or more already have four device pixels per CSS pixel, so half size there still has one canvas pixel
 * per CSS pixel and looks like an ordinary screen's rendering. A 1x screen needs more of its pixels, so it gets 0.75.
 */
export const HERO_RENDER_SCALE_SHARP = 0.5
export const HERO_RENDER_SCALE_STANDARD = 0.75

export function heroRenderScale(highDensity: boolean): number {
  return highDensity ? HERO_RENDER_SCALE_SHARP : HERO_RENDER_SCALE_STANDARD
}

/** The drawing code paces its motion by the canvas's longest side; this keeps the visible speed the same when it shrinks. */
const pace = (side: number) => 0.18 + 0.27 * Math.log2(1 + side / 320)
const speedFor = (speed: number, referenceSide: number, renderScale: number) =>
  Number((speed * (pace(referenceSide) / pace(referenceSide * renderScale))).toFixed(3))

/** Typical longest hero side, used only to keep the speed steady: a desktop hero is ~1400px wide, a phone one ~1000px tall. */
const DESKTOP_SIDE = 1400
const PHONE_SIDE = 1000

/**
 * Topographic Flow behind the hero, in the site's cobalt and kept faint: the contours are scenery, and the headline
 * and buttons in front stay the loudest thing on the screen. Phones get fewer, slower, finer lines, and no pointer
 * effect (there is no pointer). Every length is in the (smaller) canvas's own pixels, so they follow `renderScale`.
 */
export function heroTopographySettings(phone: boolean, renderScale: number) {
  const fit = (length: number) => Number((length * renderScale).toFixed(3))
  return {
    backgroundColor: 'transparent',
    backgroundImage: 'none',
    gradientColors: [] as const,
    gradientDiffusion: 0,
    grain: 0,
    lineColor: '#0071e3',
    accentColor: '#0058b0',
    lineStyle: 'mixed' as const,
    lineWidth: Math.max(0.25, fit(1)),
    dashLength: fit(7),
    dashGap: fit(8),
    hover: 0,
    seed: 42,
    ...(phone
      ? {
          scale: fit(250),
          density: 3,
          speed: speedFor(0.4, PHONE_SIDE, renderScale),
          distortion: 1.4,
          opacity: 0.34,
        }
      : {
          scale: fit(420),
          density: 4,
          speed: speedFor(0.55, DESKTOP_SIDE, renderScale),
          distortion: 1.8,
          opacity: 0.4,
        }),
  }
}
