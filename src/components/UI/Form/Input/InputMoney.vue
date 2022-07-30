<template>
  <div>
    <label
      v-if="label"
      class="text-gray-600 font-normal text-sm"
    >{{ label }}</label>  
    <div
      :class="[
        computedClass,
        'input-field text-gray-400 flex items-center space-x-4',
        {'is-invalid': Boolean(error)}]"
    >
      <slot
        v-if="$slots.left"
        name="left"
      />

      <span v-else>R$</span>

      <input
        v-money="money"
        type="text"
        :placeholder="placeholder"
        :class="`text-${size} flex-1 text-blue-500 text-right`"
        :value="modelValue"
        @input="onInput"
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
import { emit } from 'process';
import { computed, defineComponent, PropType } from 'vue';
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
    },
    variant: {
      type: String as PropType<'primary' | 'secondary'>,
      default: 'primary'
    },
    money: {
      type: [Object],
      required:false,
      default: () => ({precision: 2, thousands: ''})
    }
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    const computedClass = computed(() => {
      const variants = {
        primary: "bg-white border rounded-md",
        secondary: "border-b bg-transparent"
      }

      return variants[props.variant];
    })

    const onInput = (payload: Event) => {
      const target = payload.target as HTMLInputElement
      emit('update:modelValue', target.value)
    }

    return {
      computedClass,
      onInput
    }
  }
})
</script>

<style lang='scss' scoped>
@import '@/assets/scss/variables';
.input-field {
  padding: 8px 14px;
  &.border {
    border: 1px solid #DDD;
    &:focus-within {
      border: 1px solid #787876;
      color: #787876;
    }
    &-b {
      &:focus-within {
        border-bottom: 1px solid $base;
        color: #787876;
      }
    }
  }
  input {
    width: 100%;
    // color: #222;
    background: transparent;
    &:focus {
      background:transparent;
      outline: none;
    }
  }
  
  &.is-invalid {
    border-color: red;
    color:red;
  }
}
</style>