<template>
  <div
    class="bg-gray-400 rounded-full px-2 text-white flex items-center space-x-2"
  >
    <div class="text-xs uppercase">
      {{ label }}
    </div>
    <div
      v-if="close"
      role="button"
      class="mt-1"
      @click="$emit('on-close')"
    >
      <Icon
        icon="times"
        class="text-xs bg-gray-800 rounded-full p-1 hover:bg-gray-600"
      />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    label: {
      type: String,
      required:true
    },
    close: {
      type: Boolean,
      required:false,
      default:false
    }
  },
  emits: ['on-close'],
  setup() {
    //
  }
})
</script>

<style lang='scss' scoped>
</style>