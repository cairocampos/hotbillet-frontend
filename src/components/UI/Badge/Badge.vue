<template>
  <div
    :class="['rounded-full px-2 text-white flex items-center space-x-2 bg-opacity-30 notificacoes', `bg-${variant}`]"
  >
    <div :class="['text-xs uppercase font-semibold', opacity ? `text-${variant}` : '']">
      <slot></slot>
    </div>
    <div
      v-if="close"
      role="button"
      class="mt-1"
      @click="$emit('on-close')"
    >
      <PhX
        class="text-xs bg-gray-800 rounded-full p-1 hover:bg-gray-600"
      />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue';
import { Variants } from '../layout';
import { PhX } from 'phosphor-vue'
export default defineComponent({
  props: {
    variant: {
      type: String as PropType<Variants>,
      required:false,
      default: 'primary'
    },
    opacity: {
      type: String,
      required:false,
      default: '0'
    },
    close: {
      type: Boolean,
      required:false,
      default:false
    }
  },
  emits: ['on-close'],
  components: {PhX},
  setup() {
    //
  }
})
</script>

<style lang='scss' scoped>
</style>