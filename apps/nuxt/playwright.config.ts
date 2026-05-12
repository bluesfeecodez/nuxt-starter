import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './screenshots',
  snapshotDir: './screenshots/__snapshots__',
  use: {
    baseURL: process.env.NUXT_URL ?? 'http://localhost:3001',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
    },
  ],
})
