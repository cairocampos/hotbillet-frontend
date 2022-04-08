<template>
  <div
    class="space-y-2"
  >
    <label
      v-if="label"
      class="text-gray-600 font-normal text-sm"
    >Seu Email {{ modelValue }}</label>  
    <div
      class="input-field rounded-md text-gray-400 flex items-center space-x-4"
      :class="{'is-invalid': Boolean(error)}"
    >
      <slot
        name="left"
      />
      <input
        type="text"
        :placeholder="placeholder"
        :class="`text-${size} flex-1`"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <slot name="right" />
    </div>
    <span
      v-if="error"
      class="text-danger text-xs"
    >{{ error }}</span>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    modelValue: {
      type: String,
      required:true
    },
    size: {
      type: String,
      required:false,
      default: 'md'
    },
    label: {
      type: String,
      required:false,
      default: ''
    },
    placeholder: {
      type: String,
      required:false,
      default: ''
    },
    error: {
      type: String,
      required:false,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  setup() {
    //
  }
})
</script>

<style lang='scss' scoped>
.input-field {
  background-color: #FFF;
  padding: 8px 14px;
  border: 1px solid #FFF;
  input {
    color: #222;
    background: transparent;
    &:focus {
      background:transparent;
      outline: none;
    }
  }
  &:focus-within {
    border: 1px solid #787876;
    color: #787876;
  }
  &.is-invalid {
    border-color: red;
    color:red;
  }
}
</style>