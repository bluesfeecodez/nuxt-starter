<script setup lang="ts">
defineProps<{
  heading: string
  subheading: string
  ctaLabel: string
  ctaUrl: string
}>()
</script>

<template>
  <section>
    <h1>{{ heading }}</h1>
    <p>{{ subheading }}</p>
    <a :href="ctaUrl">{{ ctaLabel }}</a>
  </section>
</template>
