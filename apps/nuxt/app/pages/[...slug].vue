<script setup lang="ts">
const route = useRoute()
const { public: { apiBase } } = useRuntimeConfig()

const slug = Array.isArray(route.params.slug)
  ? route.params.slug.join('/')
  : route.params.slug

const { data: page, pending, error } = await useFetch(
  `${apiBase}/getDynamicPage`,
  { query: { relativeUrl: slug } }
)
</script>

<template>
  <div>
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error loading page: {{ error.message }}</div>
    <PageRenderer v-else-if="page" :page="page" />
  </div>
</template>
