<template>
  <div
    class="p-2 hover:bg-gray-400 hover:bg-opacity-20 cursor-pointer transition-all"
  >
    <slot />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    //
  }
})
</script>

<style lang='scss' scoped>
</style>