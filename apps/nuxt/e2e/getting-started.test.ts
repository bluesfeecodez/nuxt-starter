import { describe, it, expect } from 'vitest'

const BASE = process.env.NUXT_URL ?? 'http://localhost:3001'

describe('/getting-started', () => {
  it('renders the Getting Started heading', async () => {
    const res = await fetch(`${BASE}/getting-started`)
    expect(res.ok).toBe(true)
    const html = await res.text()
    expect(html).toContain('Getting Started')
  })

  it('renders at least one step title', async () => {
    const res = await fetch(`${BASE}/getting-started`)
    const html = await res.text()
    expect(html).toContain('Clone the repo')
  })
})
