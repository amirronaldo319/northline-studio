import { describe, expect, test } from 'vitest'
import { buildCsp, originOf, scriptHashes } from '../vite-security-plugin.ts'

describe('buildCsp', () => {
  test('allows only the page itself, plus the hashed inline script', () => {
    const csp = buildCsp({ scriptHashes: ['sha256-abc='], connectOrigins: [] })
    expect(csp).toContain("default-src 'self'")
    expect(csp).toContain("script-src 'self' 'sha256-abc='")
    expect(csp).toContain("object-src 'none'")
    expect(csp).toContain("base-uri 'self'")
    expect(csp).not.toMatch(/unsafe-eval/)
    expect(csp).not.toMatch(/script-src[^;]*unsafe-inline/)
  })

  test('allows the form service origin for connections, and nothing broader', () => {
    const csp = buildCsp({ scriptHashes: [], connectOrigins: ['https://formspree.io'] })
    expect(csp).toContain("connect-src 'self' https://formspree.io")
    expect(csp).not.toMatch(/connect-src[^;]*https:(?!\/\/)/)
  })

  test('meta policies leave out directives browsers ignore in a meta tag', () => {
    expect(buildCsp({ scriptHashes: [], connectOrigins: [], forMeta: true })).not.toContain('frame-ancestors')
    expect(buildCsp({ scriptHashes: [], connectOrigins: [] })).toContain("frame-ancestors 'none'")
  })
})

describe('originOf', () => {
  test('returns the origin of a URL, or nothing for blanks and invalid values', () => {
    expect(originOf('https://formspree.io/f/abc123')).toBe('https://formspree.io')
    expect(originOf('')).toBeNull()
    expect(originOf('not a url')).toBeNull()
  })
})

describe('scriptHashes', () => {
  test('hashes inline scripts and skips external and data scripts', () => {
    const html = `<script>var a = 1</script><script src="/x.js"></script><script type="application/ld+json">{}</script>`
    const hashes = scriptHashes(html)
    expect(hashes).toHaveLength(1)
    expect(hashes[0]).toMatch(/^sha256-[A-Za-z0-9+/]+=*$/)
  })
})
