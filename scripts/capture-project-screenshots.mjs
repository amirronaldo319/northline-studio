// Captures the portfolio screenshots in src/assets/projects/ from the live project sites.
//
// Usage:  node scripts/capture-project-screenshots.mjs [--hidpi] [projectId ...]
// Needs Google Chrome (set CHROME_PATH if it is not in the default macOS location). Uses Chrome's DevTools
// protocol over the global WebSocket in Node 22+, so there are no extra dependencies.
//
// Each capture waits for the page to load plus a fixed delay for entrance animations, then saves a WebP.
// Only public pages are captured. Update the TARGETS list when a project changes, and note the capture date in
// src/assets/projects/SOURCES.md.
import { spawn } from 'node:child_process'
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'

const OUT_DIR = path.resolve(import.meta.dirname, '../src/assets/projects')
const CHROME = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const PORT = 9333

/** Desktop frames share one aspect ratio so projects line up in the portfolio. */
// 1200px keeps the desktop layouts while making text inside a scaled preview about 20% larger than at 1440px.
const DESKTOP = { width: 1200, height: 778, deviceScaleFactor: 1, mobile: false }
const PHONE = { width: 390, height: 760, deviceScaleFactor: 2, mobile: true }
/** With `--hidpi`, the desktop frame is also captured at twice the density, for pictures shown large (a 2x source). */
const DESKTOP_2X = { ...DESKTOP, deviceScaleFactor: 2 }
const hidpi = process.argv.includes('--hidpi')

// Projects with a private repository and no public page have `url: null`. Capture them from a local copy by
// passing `id=url`, for example `node scripts/capture-project-screenshots.mjs stayin=file:///path/web/index.html`.
const TARGETS = [
  { id: '604kars', url: 'https://604kars.com/', settleMs: 4000 },
  { id: 'ganjineh-ofogh', url: 'https://amirronaldo319.github.io/ganjineh-ofogh/en/', settleMs: 9000 },
  { id: 'farsh-aquatics', url: 'https://farshaquatics.ca/', settleMs: 4000 },
  { id: 'mend', url: 'https://amirronaldo319.github.io/mend-website/', settleMs: 5000 },
  { id: 'storage4666', url: 'https://amirronaldo319.github.io/storage4666-concept/', settleMs: 4000 },
  {
    id: 'maid-new',
    url: 'https://amirronaldo319.github.io/maid-new-redesign-demo/',
    settleMs: 6000,
    // The concept's "What's improved" note slides in over the hero after a few seconds; mark it as seen.
    initScript: "try { sessionStorage.setItem('sp-nudge', '1') } catch {}",
  },
  { id: 'octaiq', url: 'https://amirronaldo319.github.io/octaiq/', settleMs: 6000 },
  { id: 'shamsi-calendar', url: 'https://amirronaldo319.github.io/shamsi-calendar/', settleMs: 4000 },
  {
    id: 'mend-app',
    url: 'https://amirronaldo319.github.io/mend-prototype/',
    // The app opens on a short splash screen, then says once that it works offline; dismiss that notice.
    settleMs: 10000,
    beforeShot: "[...document.querySelectorAll('button, [role=button]')].find((el) => el.textContent.trim() === 'Dismiss')?.click()",
  },
  { id: 'jarvis', url: 'https://amirronaldo319.github.io/jarvis-agent/', settleMs: 5000 },
  {
    id: 'stayin',
    url: null, // private repo: capture STAYIN-iOS/web/index.html
    settleMs: 2000,
    // Open on Home (as after setup, with progress hidden) and give the single-file preview a phone viewport.
    initScript: `
      try { localStorage.setItem('stayin-silver-preview', JSON.stringify({ v: 1, goal: 0, start: new Date().toISOString(), reason: '', hide: true })) } catch {}
      document.addEventListener('DOMContentLoaded', () => {
        const meta = document.createElement('meta')
        meta.name = 'viewport'
        meta.content = 'width=device-width, initial-scale=1'
        document.head.append(meta)
      })`,
  },
  { id: 'motion-kit', url: null, settleMs: 6000 },
]

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function waitForChrome() {
  for (let i = 0; i < 60; i += 1) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`)
      if (res.ok) return
    } catch {
      /* not up yet */
    }
    await sleep(250)
  }
  throw new Error('Chrome did not start')
}

function connect(wsUrl) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl)
    let nextId = 1
    const pending = new Map()
    const listeners = new Set()

    ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data)
      if (msg.id && pending.has(msg.id)) {
        const { resolve: ok, reject: fail } = pending.get(msg.id)
        pending.delete(msg.id)
        if (msg.error) fail(new Error(msg.error.message))
        else ok(msg.result)
      } else {
        listeners.forEach((fn) => fn(msg))
      }
    })
    ws.addEventListener('error', reject)
    ws.addEventListener('open', () =>
      resolve({
        send: (method, params = {}) =>
          new Promise((ok, fail) => {
            const id = nextId++
            pending.set(id, { resolve: ok, reject: fail })
            ws.send(JSON.stringify({ id, method, params }))
          }),
        once: (method) =>
          new Promise((ok) => {
            const fn = (msg) => {
              if (msg.method === method) {
                listeners.delete(fn)
                ok(msg.params)
              }
            }
            listeners.add(fn)
          }),
        close: () => ws.close(),
      }),
    )
  })
}

async function capture(target, kind, viewport) {
  const created = await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: 'PUT' }).then((r) => r.json())
  const page = await connect(created.webSocketDebuggerUrl)
  try {
    await page.send('Page.enable')
    await page.send('Emulation.setDeviceMetricsOverride', viewport)
    if (viewport.mobile) await page.send('Emulation.setTouchEmulationEnabled', { enabled: true })
    if (target.initScript) await page.send('Page.addScriptToEvaluateOnNewDocument', { source: target.initScript })
    const loaded = page.once('Page.loadEventFired')
    await page.send('Page.navigate', { url: target.url })
    await loaded
    await sleep(target.settleMs)
    if (target.beforeShot) {
      await page.send('Runtime.evaluate', { expression: target.beforeShot })
      await sleep(800)
    }
    const shot = await page.send('Page.captureScreenshot', { format: 'webp', quality: 82, fromSurface: true })
    const file = path.join(OUT_DIR, `${target.id}-${kind}.webp`)
    writeFileSync(file, Buffer.from(shot.data, 'base64'))
    console.log(`wrote ${path.relative(process.cwd(), file)}  (${viewport.width}x${viewport.height} @${viewport.deviceScaleFactor}x)`)
  } finally {
    page.close()
    await fetch(`http://127.0.0.1:${PORT}/json/close/${created.id}`).catch(() => {})
  }
}

// Each argument is a project id, or `id=url` to capture that project from another address (a local copy).
const overrides = new Map(
  process.argv.slice(2).filter((arg) => !arg.startsWith('--')).map((arg) => {
    const [id, ...rest] = arg.split('=')
    return [id, rest.length ? rest.join('=') : null]
  }),
)
const targets = (overrides.size ? TARGETS.filter((t) => overrides.has(t.id)) : TARGETS)
  .map((t) => ({ ...t, url: overrides.get(t.id) ?? t.url }))
  .filter((t) => {
    if (t.url) return true
    console.log(`skipped ${t.id}: no public page. Pass ${t.id}=<local url> to capture it.`)
    return false
  })
if (targets.length === 0) throw new Error(`No matching projects. Known: ${TARGETS.map((t) => t.id).join(', ')}`)

mkdirSync(OUT_DIR, { recursive: true })
const profile = mkdtempSync(path.join(tmpdir(), 'sitepilot-capture-'))
const chrome = spawn(
  CHROME,
  [
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${profile}`,
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--no-first-run',
    // Linux containers: Chrome refuses to run as root without this, and only reads a proxy from a flag.
    ...(process.getuid?.() === 0 ? ['--no-sandbox'] : []),
    ...(process.env.HTTPS_PROXY ? [`--proxy-server=${process.env.HTTPS_PROXY}`] : []),
  ],
  { stdio: 'ignore' },
)

try {
  await waitForChrome()
  for (const target of targets) {
    await capture(target, 'desktop', DESKTOP)
    if (hidpi) await capture(target, 'desktop-2x', DESKTOP_2X)
    await capture(target, 'mobile', PHONE)
  }
} finally {
  chrome.kill()
}
