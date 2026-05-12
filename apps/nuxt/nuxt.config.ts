import { defineNuxtConfig } from "nuxt/config"

export default defineNuxtConfig({
  modules: ["@pinia/nuxt"],
  devtools: { enabled: true },
  runtimeConfig: {
    apiSecret: process.env.NUXT_API_SECRET,
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE ?? "http://localhost:3002"
    }
  },
  typescript: {
    typeCheck: false
  }
})
