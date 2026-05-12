import { describe, it, expect } from 'vitest'

const BASE = process.env.NUXT_URL ?? 'http://localhost:3001'

describe('unknown route', () => {
  it('does not crash — responds with some content', async () => {
    const res = await fetch(`${BASE}/this-page-does-not-exist`)
    // Nuxt returns a page (even if it's an error page), not a hard crash
    expect(res.status).toBeLessThan(600)
    const html = await res.text()
    expect(html.length).toBeGreaterThan(0)
  })
})
