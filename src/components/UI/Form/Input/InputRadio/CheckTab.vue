<template>
  <div class="flex space-x-2 items-center">
    <input
      :id="value"
      type="radio"
      :value="value"
      name="radio"
      @change="$emit('update:modelValue', value)"
    >
    <label
      :for="value"
      class="text-base p-1 px-2 rounded-full"
    >{{ label }}</label>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    modelValue: {
      type: [String,Number,Object],
      required:true
    },
    label: {
      type: String,
      required:false,
      default: ""
    },
    value: {
      type: String,
      required:true
    },
  },
  emits:['update:modelValue'],
  setup() {
    //
  }
})
</script>

<style lang='scss' scoped>
@import '@/assets/scss/variables';
input {
  display:none;
}

label {
  position: relative;
  background-color: rgba(255,255,255,.5);
  font-size: .9rem;
}

input:checked {
  + label {
    background-color: lighten($primary, 30);
    color: darken($primary, 0);
    box-shadow: 0 0px 1px rgba(0,0,0,0.5);
  }
}
</style>