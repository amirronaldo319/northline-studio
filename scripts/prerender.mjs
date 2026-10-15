// Renders every page to HTML at build time and writes it into dist/, so the first paint, crawlers, and
// visitors without JavaScript all get the real content. Runs after `vite build` (see package.json).
import { mkdir, readdir, readFile, writeFile, rm } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { build, loadEnv } from 'vite'

const root = path.resolve(import.meta.dirname, '..')
const serverDir = path.join(root, 'dist-ssr')
const distDir = path.join(root, 'dist')
const env = loadEnv('production', root, 'VITE_')
const siteUrl = (env.VITE_SITE_URL ?? '').trim().replace(/\/+$/, '')
const base = (env.VITE_BASE || '/').endsWith('/') ? env.VITE_BASE || '/' : `${env.VITE_BASE}/`

await build({
  root,
  logLevel: 'warn',
  build: { ssr: 'src/entry-server.tsx', outDir: serverDir, emptyOutDir: true, copyPublicDir: false },
})

try {
  const { render, listPages, applyPageHead, alternatesFor } = await import(pathToFileURL(path.join(serverDir, 'entry-server.js')).href)
  const template = await readFile(path.join(distDir, 'index.html'), 'utf8')
  const placeholder = '<div id="root"></div>'
  if (!template.includes(placeholder)) throw new Error('dist/index.html has no empty #root to fill')

  // Each language's dictionary is its own file. Preloading the one a page needs starts its download with the
  // page instead of after the main script has run.
  const assets = await readdir(path.join(distDir, 'assets'))
  const dictionaryFile = (locale) => {
    const name = { en: 'en', fa: 'fa', 'zh-hans': 'zhHans', 'zh-hant': 'zhHant' }[locale]
    return assets.find((file) => new RegExp(`^${name}-[\\w-]+\\.js$`).test(file) && file.length > 0)
  }

  const pages = listPages()
  for (const meta of pages) {
    const body = await render(meta.ref)
    const dictionary = dictionaryFile(meta.locale)
    const preload = dictionary ? `<link rel="modulepreload" crossorigin href="${base}assets/${dictionary}">` : ''
    const html = applyPageHead(template, meta, { siteUrl, alternates: alternatesFor(meta) })
      .replace('</head>', `${preload}</head>`)
      .replace(placeholder, `<div id="root">${body}</div>`)
    const target = path.join(distDir, meta.path, 'index.html')
    await mkdir(path.dirname(target), { recursive: true })
    await writeFile(target, html)
  }
  console.log(`Prerendered ${pages.length} pages`)
} finally {
  await rm(serverDir, { recursive: true, force: true })
}
