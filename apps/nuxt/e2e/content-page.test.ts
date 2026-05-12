import { describe, it, expect } from 'vitest'

const BASE = process.env.NUXT_URL ?? 'http://localhost:3001'

describe('/content-page', () => {
  it('renders the hero heading', async () => {
    const res = await fetch(`${BASE}/content-page`)
    expect(res.ok).toBe(true)
    const html = await res.text()
    expect(html).toContain('Hero Heading')
  })
})
