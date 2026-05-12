<script setup lang="ts">
defineProps<{
  page: {
    title: string
    intro: string
    steps: Array<{ number: number; title: string; description: string }>
  }
}>()
</script>

<template>
  <div>
    <h1>{{ page.title }}</h1>
    <p>{{ page.intro }}</p>
    <ol>
      <li v-for="step in page.steps" :key="step.number">
        <strong>{{ step.number }}. {{ step.title }}</strong>
        <p>{{ step.description }}</p>
      </li>
    </ol>
  </div>
</template>
