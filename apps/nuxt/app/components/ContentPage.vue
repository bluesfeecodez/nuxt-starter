<script setup lang="ts">
import HeroBlock from './HeroBlock.vue'
import RichTextBlock from './RichTextBlock.vue'

defineProps<{
  page: {
    title: string
    blocks: Array<{ type: string; [key: string]: unknown }>
  }
}>()

const blockComponents: Record<string, unknown> = {
  'hero': HeroBlock,
  'rich-text': RichTextBlock,
}
</script>

<template>
  <div>
    <h2>{{ page.title }}</h2>
    <template v-for="(block, i) in page.blocks" :key="i">
      <component
        v-if="blockComponents[block.type]"
        :is="blockComponents[block.type]"
        v-bind="block"
      />
      <div v-else>Unknown block: {{ block.type }}</div>
    </template>
  </div>
</template>
