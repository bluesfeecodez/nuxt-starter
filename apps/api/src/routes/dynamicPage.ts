import { Router } from "express"

export const dynamicPageRouter = Router()

const contentPageFixture = {
  type: "content-page",
  slug: "content-page",
  title: "Welcome to the Content Page",
  meta: {
    description: "A sample CMS-driven content page",
    canonicalUrl: "/content-page",
  },
  blocks: [
    {
      type: "hero",
      heading: "Hero Heading",
      subheading: "Hero subheading text",
      ctaLabel: "Get Started",
      ctaUrl: "/getting-started",
    },
    {
      type: "rich-text",
      content: "<p>This is a rich text block from the CMS.</p>",
    },
  ],
}

const gettingStartedFixture = {
  type: "getting-started-page",
  slug: "getting-started",
  title: "Getting Started",
  intro: "Follow these steps to get up and running with this project.",
  steps: [
    {
      number: 1,
      title: "Clone the repo",
      description: "git clone https://github.com/your-org/nuxt-starter.git && cd nuxt-starter",
    },
    {
      number: 2,
      title: "Install dependencies",
      description: "Run pnpm install from the repo root to install all workspace packages.",
    },
    {
      number: 3,
      title: "Start the dev servers",
      description: "Run pnpm dev to start both the Nuxt frontend and the Express API concurrently.",
    },
  ],
}

const fixtures: Record<string, object> = {
  "content-page": contentPageFixture,
  "getting-started": gettingStartedFixture,
}

dynamicPageRouter.get("/", (req, res) => {
  const { relativeUrl } = req.query

  if (!relativeUrl) {
    res.status(400).json({ error: "relativeUrl is required" })
    return
  }

  const fixture = fixtures[relativeUrl as string]
  if (!fixture) {
    res.status(404).json({ error: "Page not found" })
    return
  }

  res.json(fixture)
})
