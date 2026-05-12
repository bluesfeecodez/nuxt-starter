<script setup lang="ts">
defineProps<{
  content: string
}>()
</script>

<template>
  <div v-html="content" />
</template>
