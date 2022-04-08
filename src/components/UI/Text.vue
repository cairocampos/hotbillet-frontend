<template>
  <div>
    <p :class="`text-${size}`">
      <slot />
    </p>
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