<template>
  <div>
    <h5 class="text-base text-zinc-500">
      <slot>{{ title }}</slot>
    </h5>
    <hr
      v-show="border"
      class="mt-2"
    >
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default:""
  },
  border: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>

</style>