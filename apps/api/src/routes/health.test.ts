import express from 'express'
import request from 'supertest'
import { describe, it, expect } from 'vitest'
import { healthRouter } from './health.js'

const app = express()
app.use('/', healthRouter)

describe('GET /health', () => {
  it('returns status ok', async () => {
    const res = await request(app).get('/')
    expect(res.status).toBe(200)
    expect(res.body.status).toBe('ok')
  })
})
