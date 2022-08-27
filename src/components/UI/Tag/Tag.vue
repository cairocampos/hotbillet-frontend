<template>
  <span
    :class="[
      'rounded-full inline-flex items-center bg-zinc-500 p-1 px-3 gap-2 text-white',
      'text-[0.75rem]'
    ]"
  >
    <span class="font-bold">
      <slot></slot>
    </span>
    <span
      class="bg-zinc-700 hover:bg-zinc-500 transition-colors cursor-pointer h-6 w-6 flex items-center justify-center rounded-full"
      @click="emits('onDelete')"
    >&times;</span>
  </span>
</template>

<script setup lang="ts">
const emits = defineEmits(['onDelete'])
</script>

<style scoped>

</style>