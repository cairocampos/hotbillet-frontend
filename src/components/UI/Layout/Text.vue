<template>
  <div>
    <p :class="[`text-${size}`, bold ? 'font-semibold' : '', variant ? `text-${variant}` : '']">
      <slot />
    </p>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue';
import { ISize } from '@/interfaces/ISize';
import { Variants } from '../layout';
export default defineComponent({
  props: {
    size: {
      type: String as PropType<ISize>,
      required:false,
      default: 'md'
    },
    bold: {
      type: Boolean,
      required:false,
      default: false
    },
    variant: {
      type: String as PropType<Variants>,
      default: ""
    }
  },
  setup() {
    //
  }
})
</script>

<style lang='scss' scoped>
</style>