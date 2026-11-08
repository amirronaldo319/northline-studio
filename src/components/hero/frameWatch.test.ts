import { describe, expect, it, vi } from 'vitest'
import { createFrameWatch, HERO_FRAME_WATCH } from './frameWatch'

/** Feeds frames at a steady interval for `seconds` seconds, starting at `from`; returns the time reached. */
function run(watch: ReturnType<typeof createFrameWatch>, from: number, seconds: number, intervalMs: number) {
  let now = from
  const end = from + seconds * 1000
  while (now < end) {
    watch.frame(now)
    now += intervalMs
  }
  return now
}

describe('createFrameWatch', () => {
  it('stays quiet at 60 and at 30 frames a second', () => {
    for (const interval of [1000 / 60, 1000 / 30]) {
      const onSlow = vi.fn()
      run(createFrameWatch(HERO_FRAME_WATCH, onSlow), 0, 30, interval)
      expect(onSlow).not.toHaveBeenCalled()
    }
  })

  it('gives up after several slow windows in a row, and only once', () => {
    const onSlow = vi.fn()
    const watch = createFrameWatch(HERO_FRAME_WATCH, onSlow)
    // 5 frames a second: slow. Warm-up (2 s) plus three one-second windows.
    const reached = run(watch, 0, 8, 200)
    expect(onSlow).toHaveBeenCalledTimes(1)
    run(watch, reached, 10, 200)
    expect(onSlow).toHaveBeenCalledTimes(1)
  })

  it('ignores slowness during the warm-up', () => {
    const onSlow = vi.fn()
    const watch = createFrameWatch(HERO_FRAME_WATCH, onSlow)
    const reached = run(watch, 0, 2, 400)
    expect(onSlow).not.toHaveBeenCalled()
    run(watch, reached, 10, 1000 / 60)
    expect(onSlow).not.toHaveBeenCalled()
  })

  it('does not count a short stutter between healthy windows', () => {
    const onSlow = vi.fn()
    const watch = createFrameWatch(HERO_FRAME_WATCH, onSlow)
    let now = run(watch, 0, 3, 1000 / 60)
    for (let i = 0; i < 5; i++) {
      now = run(watch, now, 2, 200) // two slow windows...
      now = run(watch, now, 1.2, 1000 / 60) // ...then a healthy one resets the count
    }
    expect(onSlow).not.toHaveBeenCalled()
  })

  it('treats a long gap (frozen or backgrounded tab) as a restart, not as slowness', () => {
    const onSlow = vi.fn()
    const watch = createFrameWatch(HERO_FRAME_WATCH, onSlow)
    let now = run(watch, 0, 4, 1000 / 60)
    now += 60_000
    now = run(watch, now, 1.5, 1000 / 60)
    expect(onSlow).not.toHaveBeenCalled()
    run(watch, now, 10, 1000 / 60)
    expect(onSlow).not.toHaveBeenCalled()
  })

  it('starts the warm-up over after reset()', () => {
    const onSlow = vi.fn()
    const watch = createFrameWatch(HERO_FRAME_WATCH, onSlow)
    let now = run(watch, 0, 4, 200)
    watch.reset()
    now = run(watch, now, 2, 200)
    expect(onSlow).not.toHaveBeenCalled()
    run(watch, now, 4, 200)
    expect(onSlow).toHaveBeenCalledTimes(1)
  })
})
