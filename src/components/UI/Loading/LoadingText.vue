<template>
  <div class="flex items-center gap-2 text-zinc-500">
    <Loading />
    <slot>{{ text }}</slot>
  </div>
</template>

<script setup lang="ts">
import Loading from './Loading.vue'
defineProps({
  text: {
    type: String,
    default: ""
  }
})
</script>

<style scoped>

</style>