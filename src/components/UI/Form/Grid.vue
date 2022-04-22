<template>
  <div
    :class="[
      className
    ]"
  >
    <slot />
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, PropType } from 'vue';

type Grid = {
  gap: string|number;
  cols: string|number;
}

const defaultProps: Grid = {
  cols: 2,
  gap: 4
}

export default defineComponent({
  props: {
    gap: {
      type: [String, Number],
      required:false,
      default: defaultProps.gap
    },
    cols: {
      type: [String,Number],
      required:false,
      default: defaultProps.cols
    },
    md: {
      type: Object as PropType<Grid>,
      required:false,
      default: () => ({})
    },
    lg: {
      type: Object as PropType<Grid>,
      required:false,
      default: () => ({})
    }
  },
  setup(props) {
    const className = computed(() => {
      return [
        props.cols || props.gap ? `grid grid-cols-${props.cols} gap-${props.gap}` : '',
        props.md?.cols ? `md:grid md:grid-cols-${props.md.cols} md:gap-${props.md.gap}` : '',
        props.lg?.cols ? `lg:grid lg:grid-cols-${props.lg.cols} lg:gap-${props.lg.gap}` : '',
      ];
    })

    return {
      className
    }
  }
})
</script>

<style lang='scss' scoped>
</style>