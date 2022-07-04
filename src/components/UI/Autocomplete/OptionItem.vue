<template>
  <li
    :class="`text-sm text-zinc-600 p-2 hover:bg-zinc-200 cursor-pointer transition-colors ${active && 'bg-zinc-200'}`"
  >
    <slot></slot>
  </li>
</template>

<script setup lang="ts">
defineProps({
  active: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
</style>