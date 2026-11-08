/**
 * Decides, from the timestamps of animation frames, whether a device is keeping up with an animation.
 *
 * It ignores a warm-up period (shader compiling, other scripts starting), then looks at one-second windows of frames.
 * Only several slow windows in a row count, and any long gap between two frames (a frozen or backgrounded tab) starts
 * the warm-up over, so a busy moment or a tab switch never retires an animation that is otherwise fine.
 */

export type FrameWatchOptions = {
  /** Milliseconds of frames to ignore after a start or restart. */
  warmupMs: number
  /** Length of each measured window, in milliseconds. */
  windowMs: number
  /** A window averaging fewer frames per second than this is slow. */
  minFps: number
  /** How many slow windows in a row it takes to give up. */
  strikes: number
  /** A gap between two frames longer than this restarts the warm-up. */
  gapMs: number
}

export const HERO_FRAME_WATCH: FrameWatchOptions = {
  warmupMs: 2000,
  windowMs: 1000,
  // iOS Low Power Mode runs animation at 30 frames a second, which is fine for slow background contours.
  minFps: 20,
  strikes: 3,
  gapMs: 1000,
}

export type FrameWatch = {
  /** Call once per animation frame with the frame's timestamp. */
  frame: (now: number) => void
  /** Start the warm-up over, e.g. after the animation was off screen. */
  reset: () => void
}

export function createFrameWatch(options: FrameWatchOptions, onSlow: () => void): FrameWatch {
  let warmupEnds = -1
  let previous = -1
  let windowStart = -1
  let frames = 0
  let slowWindows = 0
  let done = false

  const reset = () => {
    warmupEnds = -1
    previous = -1
    windowStart = -1
    frames = 0
    slowWindows = 0
  }

  const frame = (now: number) => {
    if (done) return
    if (previous >= 0 && now - previous > options.gapMs) reset()
    previous = now
    if (warmupEnds < 0) warmupEnds = now + options.warmupMs
    if (now < warmupEnds) return
    if (windowStart < 0) {
      windowStart = now
      frames = 0
      return
    }
    frames += 1
    const elapsed = now - windowStart
    if (elapsed < options.windowMs) return
    const fps = (frames * 1000) / elapsed
    slowWindows = fps < options.minFps ? slowWindows + 1 : 0
    windowStart = now
    frames = 0
    if (slowWindows >= options.strikes) {
      done = true
      onSlow()
    }
  }

  return { frame, reset }
}
