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
      class="text-base"
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
  // display:none;
  visibility: hidden;
}

label {
  position: relative;
}

label::before {
  content: "";
  display:block;
  height: 15px;
  width: 15px;
  background: transparent;
  border: 1px solid $info;
  border-radius: 50%;
  top:50%;
  left: -20px;
  transform: translateY(-50%);
  position:absolute;
  box-shadow: 0 1px 2px rgba(0,0,0,.4);
}

input:checked {
  & + label::before {
    border: 4px solid $info;
    background: white;
  }
}
</style>