<template>
  <div>
    <h2 :class="`text-${size}`">
      <slot />
    </h2>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue';
import { ISize } from '@/interfaces/ISize';
export default defineComponent({
  props: {
    size: {
      type: String as PropType<ISize>,
      required:false,
      default: 'md'
    }
  },
  setup() {
    //
  }
})
</script>

<style lang='scss' scoped>
</style>