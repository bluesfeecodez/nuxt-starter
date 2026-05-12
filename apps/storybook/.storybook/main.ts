import type { StorybookConfig } from "@storybook/vue3-vite"
import vue from "@vitejs/plugin-vue"

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|ts)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  framework: {
    name: "@storybook/vue3-vite",
    options: {}
  },
  viteFinal(config) {
    config.plugins = config.plugins ?? []
    const hasVue = config.plugins.some(
      (p) => p && typeof p === "object" && "name" in p && p.name === "vite:vue"
    )
    if (!hasVue) {
      config.plugins.push(vue())
    }
    return config
  }
}

export default config
