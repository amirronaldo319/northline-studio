// Renders every page to HTML at build time and writes it into dist/, so the first paint, crawlers, and
// visitors without JavaScript all get the real content. Runs after `vite build` (see package.json).
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { build, loadEnv } from 'vite'

const root = path.resolve(import.meta.dirname, '..')
const serverDir = path.join(root, 'dist-ssr')
const distDir = path.join(root, 'dist')
const siteUrl = (loadEnv('production', root, 'VITE_').VITE_SITE_URL ?? '').trim().replace(/\/+$/, '')

await build({
  root,
  logLevel: 'warn',
  build: { ssr: 'src/entry-server.tsx', outDir: serverDir, emptyOutDir: true, copyPublicDir: false },
})

try {
  const { render, listPages, applyPageHead } = await import(pathToFileURL(path.join(serverDir, 'entry-server.js')).href)
  const template = await readFile(path.join(distDir, 'index.html'), 'utf8')
  const placeholder = '<div id="root"></div>'
  if (!template.includes(placeholder)) throw new Error('dist/index.html has no empty #root to fill')

  const pages = listPages()
  for (const meta of pages) {
    const body = await render(meta.ref)
    const html = applyPageHead(template, meta, { siteUrl }).replace(placeholder, `<div id="root">${body}</div>`)
    const target = path.join(distDir, meta.path, 'index.html')
    await mkdir(path.dirname(target), { recursive: true })
    await writeFile(target, html)
  }
  console.log(`Prerendered ${pages.length} pages`)
} finally {
  await rm(serverDir, { recursive: true, force: true })
}
