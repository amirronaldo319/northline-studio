import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fontPreloadPlugin, seoPlugin } from './vite-seo-plugin.ts'
import { securityPlugin } from './vite-security-plugin.ts'
import { site } from './src/config/site.ts'
import { seo } from './src/config/seo.ts'
import { FAQ } from './src/content/faq.ts'
import { allPages } from './src/content/pageMeta.ts'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const siteUrl = (env.VITE_SITE_URL ?? '').trim().replace(/\/+$/, '')

  return {
    // Set VITE_BASE (e.g. /northline-studio/) when hosting under a sub-path such as GitHub Pages.
    base: env.VITE_BASE || '/',
    plugins: [
      react(),
      tailwindcss(),
      seoPlugin({
        siteUrl,
        businessName: site.brand.name,
        email: site.contact.email,
        description: seo.description,
        areaServed: site.serviceArea.primary,
        ogImagePath: '/og-canada.png',
        faq: FAQ,
        paths: allPages().map((page) => page.path),
        analyticsToken: (env.VITE_CF_ANALYTICS_TOKEN ?? '').trim(),
      }),
      fontPreloadPlugin(),
      securityPlugin({
        formEndpoint: (env.VITE_FORM_ENDPOINT ?? '').trim(),
        analyticsToken: (env.VITE_CF_ANALYTICS_TOKEN ?? '').trim(),
      }),
    ],
    build: {
      // The sales site, plus study pages (/bubble-ui/, /topographic-flow/, /refracted-text/) that are not linked from it
      // and not in the sitemap.
      rolldownOptions: {
        input: {
          main: path.resolve(import.meta.dirname, 'index.html'),
          'bubble-ui': path.resolve(import.meta.dirname, 'bubble-ui/index.html'),
          'topographic-flow': path.resolve(import.meta.dirname, 'topographic-flow/index.html'),
          'refracted-text': path.resolve(import.meta.dirname, 'refracted-text/index.html'),
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, './src'),
      },
    },
  }
})
