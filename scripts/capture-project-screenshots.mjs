// Captures the portfolio screenshots in src/assets/projects/ from the live project sites.
//
// Usage:  node scripts/capture-project-screenshots.mjs [projectId ...]
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

const TARGETS = [
  { id: '604kars', url: 'https://604kars.com/', settleMs: 4000 },
  { id: 'ganjineh-ofogh', url: 'https://amirronaldo319.github.io/ganjineh-ofogh/en/', settleMs: 9000 },
  { id: 'farsh-aquatics', url: 'https://farshaquatics.ca/', settleMs: 4000 },
  { id: 'mend', url: 'https://amirronaldo319.github.io/mend-website/', settleMs: 5000 },
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
    const loaded = page.once('Page.loadEventFired')
    await page.send('Page.navigate', { url: target.url })
    await loaded
    await sleep(target.settleMs)
    const shot = await page.send('Page.captureScreenshot', { format: 'webp', quality: 82, fromSurface: true })
    const file = path.join(OUT_DIR, `${target.id}-${kind}.webp`)
    writeFileSync(file, Buffer.from(shot.data, 'base64'))
    console.log(`wrote ${path.relative(process.cwd(), file)}  (${viewport.width}x${viewport.height} @${viewport.deviceScaleFactor}x)`)
  } finally {
    page.close()
    await fetch(`http://127.0.0.1:${PORT}/json/close/${created.id}`).catch(() => {})
  }
}

const wanted = process.argv.slice(2)
const targets = wanted.length ? TARGETS.filter((t) => wanted.includes(t.id)) : TARGETS
if (targets.length === 0) throw new Error(`No matching projects. Known: ${TARGETS.map((t) => t.id).join(', ')}`)

mkdirSync(OUT_DIR, { recursive: true })
const profile = mkdtempSync(path.join(tmpdir(), 'sitepilot-capture-'))
const chrome = spawn(
  CHROME,
  [`--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run'],
  { stdio: 'ignore' },
)

try {
  await waitForChrome()
  for (const target of targets) {
    await capture(target, 'desktop', DESKTOP)
    await capture(target, 'mobile', PHONE)
  }
} finally {
  chrome.kill()
}
