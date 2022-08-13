<template>
  <div
    :class="[
      'bg-zinc-100',
      'shadow-sm',
      'rounded-md',
      'py-1',
      'mt-2',
      'absolute',
      'w-full',
      'border',
      'border-zinc-200',
      'max-h-64',
      'overflow-y-auto',
      'z-10'
    ]"

    @scroll="onScroll"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['scrollend'])
const onScroll = ({target}: Event) => {
  const element = target as HTMLElement;
  const scrollTop = element.scrollTop
  const totalScroll = element.scrollHeight;
  const totalHeight = element.clientHeight

  if((scrollTop + totalHeight) > (totalScroll - 50)) {
    emit('scrollend')
  }
}
</script>

<style scoped>

</style>