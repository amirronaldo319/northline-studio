import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { seoPlugin } from './vite-seo-plugin.ts'
import { site } from './src/config/site.ts'
import { seo } from './src/config/seo.ts'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const siteUrl = (env.VITE_SITE_URL ?? '').trim().replace(/\/+$/, '')

  return {
    plugins: [
      react(),
      tailwindcss(),
      seoPlugin({
        siteUrl,
        businessName: site.brand.name,
        email: site.contact.email,
        description: seo.description,
        areaServed: site.serviceArea.primary,
        ogImagePath: '/og-image.png',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, './src'),
      },
    },
  }
})
