// Renders the page to HTML at build time and writes it into dist/index.html, so the first paint, crawlers,
// and visitors without JavaScript all get the real content. Runs after `vite build` (see package.json).
import { readFile, writeFile, rm } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { build } from 'vite'

const root = path.resolve(import.meta.dirname, '..')
const serverDir = path.join(root, 'dist-ssr')
const indexFile = path.join(root, 'dist/index.html')

await build({
  root,
  logLevel: 'warn',
  build: { ssr: 'src/entry-server.tsx', outDir: serverDir, emptyOutDir: true, copyPublicDir: false },
})

try {
  const { render } = await import(pathToFileURL(path.join(serverDir, 'entry-server.js')).href)
  const html = await readFile(indexFile, 'utf8')
  const placeholder = '<div id="root"></div>'
  if (!html.includes(placeholder)) throw new Error('dist/index.html has no empty #root to fill')
  await writeFile(indexFile, html.replace(placeholder, `<div id="root">${await render()}</div>`))
  console.log('Prerendered dist/index.html')
} finally {
  await rm(serverDir, { recursive: true, force: true })
}
