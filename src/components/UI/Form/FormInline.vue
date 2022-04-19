<template>
  <div :class="`grid grid-cols-2 gap-${gap}`">
    <slot />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    gap: {
      type: String,
      default: '4'
    }
  },
  setup() {
    //
  }
})
</script>

<style lang='scss' scoped>
</style>