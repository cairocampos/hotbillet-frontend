<template>
  <div
    class="options rounded-md mt-1"
    :class="customClass"
  >
    <div class="p-2">
      <slot name="header" />
    </div>
    <div
      class="max-h-32 overflow-y-auto"
      @scroll="checkScroll"
    >
      <slot />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    customClass: {
      type: String,
      default: () => {
        return `border border-gray-300 bg-white bg-opacity-10 hover:border-gray-400`;
      },
    },
    labelKey: {
      type: String,
      default: "label",
    },
    labelValue: {
      type: String,
      default: "value",
    },
  },
  emits: ['scrollend'],
  setup(props, {emit}) {
    let count = setTimeout(() => null);
    const checkScroll = ({ target }: UIEvent) => {
      const element = target as HTMLElement;
      const totalScroll = element.scrollHeight;
      const height = element.offsetHeight;
      const scrollTop = element.scrollTop;
      if (scrollTop + height >= totalScroll - 500) {
        clearTimeout(count);
        count = setTimeout(() => {
          emit("scrollend");
        }, 500);
      }
    };

    return {
      checkScroll
    }
  }
})
</script>

<style lang='scss' scoped>
</style>