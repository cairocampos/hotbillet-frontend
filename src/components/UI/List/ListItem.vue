<template>
  <div class="text-zinc-500 text-xs">
    <slot>
      {{ title }}
    </slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: ""
  }
})
</script>

<style scoped>

</style>