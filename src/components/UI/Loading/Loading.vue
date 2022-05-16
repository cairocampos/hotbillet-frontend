<template>
  <div :class="['loading animate-spin', `w-${width} h-${height}`]"></div>
</template>

<script setup lang="ts">
defineProps({
  width: {
    type: [String,Number],
    default: 4
  },
  height: {
    type: [String, Number],
    default: 4
  }
})
</script>

<style scoped>
.loading {
  /* height:18px;
  width:18px; */
  border-radius: 50%;
  background:transparent;
  border:3px solid rgba(0,0,0,.2);
  --tw-bg-opacity: 1;
  border-top-color: rgba(229, 231, 235, var(--tw-bg-opacity));
}
</style>