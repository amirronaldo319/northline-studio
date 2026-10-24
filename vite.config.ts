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
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, './src'),
      },
    },
  }
})
