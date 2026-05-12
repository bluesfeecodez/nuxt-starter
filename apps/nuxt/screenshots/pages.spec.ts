import { test, expect } from '@playwright/test'

test('getting-started page matches screenshot', async ({ page }) => {
  await page.goto('/getting-started')
  await expect(page).toHaveScreenshot('getting-started.png', { fullPage: true })
})

test('content-page matches screenshot', async ({ page }) => {
  await page.goto('/content-page')
  await expect(page).toHaveScreenshot('content-page.png', { fullPage: true })
})
