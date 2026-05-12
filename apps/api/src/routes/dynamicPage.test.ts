import express from 'express'
import request from 'supertest'
import { describe, it, expect } from 'vitest'
import { dynamicPageRouter } from './dynamicPage.js'

const app = express()
app.use(express.json())
app.use('/', dynamicPageRouter)

describe('GET /getDynamicPage', () => {
  it('returns 400 when relativeUrl is missing', async () => {
    const res = await request(app).get('/')
    expect(res.status).toBe(400)
    expect(res.body).toEqual({ error: 'relativeUrl is required' })
  })

  it('returns content-page fixture', async () => {
    const res = await request(app).get('/?relativeUrl=content-page')
    expect(res.status).toBe(200)
    expect(res.body.type).toBe('content-page')
  })

  it('returns getting-started-page fixture', async () => {
    const res = await request(app).get('/?relativeUrl=getting-started')
    expect(res.status).toBe(200)
    expect(res.body.type).toBe('getting-started-page')
    expect(Array.isArray(res.body.steps)).toBe(true)
  })

  it('returns 404 for unknown slug', async () => {
    const res = await request(app).get('/?relativeUrl=does-not-exist')
    expect(res.status).toBe(404)
    expect(res.body).toEqual({ error: 'Page not found' })
  })
})
