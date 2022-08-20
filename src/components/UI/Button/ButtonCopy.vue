<template>
  <button
    v-copy="text"
    class="btn btn-sm hover:bg-gray-200 p-1 rounded-md transition flex items-center gap-2"
  >
    <slot></slot>
    <img src="@/assets/icons/copy.svg">
  </button>
</template>

<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required:true
  }
})
</script>

<style scoped>

</style>