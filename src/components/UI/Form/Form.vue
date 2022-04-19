<template>
  <form :class="['space-y-4', `text-${size}`]">
    <slot />
  </form>
</template>

<script lang='ts'>
import { ISize } from '@/interfaces/ISize';
import { defineComponent, PropType } from 'vue';
export default defineComponent({
  props: {
    size: {
      type: String as PropType<ISize>,
      default: "sm"
    }
  },
  setup() {
    //
  }
})
</script>

<style lang='scss' scoped>
</style>