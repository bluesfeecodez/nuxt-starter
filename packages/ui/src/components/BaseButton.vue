<script setup lang="ts">
export interface BaseButtonProps {
  label: string
  variant?: "primary" | "secondary"
  disabled?: boolean
}

const props = withDefaults(defineProps<BaseButtonProps>(), {
  variant: "primary",
  disabled: false
})
</script>

<template>
  <button
    :disabled="props.disabled"
    :class="['btn', `btn--${props.variant}`, { 'btn--disabled': props.disabled }]"
  >
    {{ props.label }}
  </button>
</template>
