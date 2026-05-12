<script setup lang="ts">
import ContentPage from './ContentPage.vue'
import GettingStartedPage from './GettingStartedPage.vue'

defineProps<{
  page: { type: string; [key: string]: unknown }
}>()

const pageComponents: Record<string, unknown> = {
  'content-page': ContentPage,
  'getting-started-page': GettingStartedPage,
}
</script>

<template>
  <component
    v-if="pageComponents[page.type]"
    :is="pageComponents[page.type]"
    :page="page"
  />
  <div v-else>Unknown page type: {{ page.type }}</div>
</template>
