<template>
  <div>
    <label
      v-if="label"
      :class="['text-gray-600 font-normal', labelClass]"
    >
      {{ label }}
      <span
        v-if="required"
        class="text-red-500"
      >*</span>
    </label>  
    <div
      :class="[
        computedClass,
        'input-field text-gray-400 flex items-center space-x-4',
        {'is-invalid': Boolean(errorMessage)}]"
    >
      <slot
        name="left"
      />
      <input
        ref="inputElement"
        v-maska="mask"
        type="text"
        :placeholder="placeholder"
        :class="`text-${size} flex-1 w-full`"
        :value="modelValue"
        @input="onInput"
        @blur="validate()"
      />
      <slot name="right" />
    </div>
    <span
      v-if="errorMessage"
      class="text-danger text-xs"
    >{{ errorMessage }}</span>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, PropType, ref } from 'vue';
import {Validator, useFormHandler} from '@/core/composables/useFormHandler'

const touchMap = new WeakMap();

export default defineComponent({
  props: {
    modelValue: {
      type: [String,Number] as PropType<string|number|undefined>,
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
    mask: {
      type: [Array, Object, String],
      required:false,
      default: ""
    },
    labelClass: {
      type: String,
      default: "label"
    },
    validator: {
      type: [Object, undefined] as PropType<Validator|undefined>,
      default: undefined
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'input'],
  setup(props, {emit}) {
    const { getInputError, testInput } = useFormHandler()
    const computedClass = computed(() => {
      const variants = {
        secondary: "bg-white border rounded-md",
        primary: "border-b border-zinc-300 bg-transparent"
      }

      return variants[props.variant];
    })

    const inputElement = ref<HTMLInputElement>()

    const setFocus = () => inputElement.value?.focus();

    const onInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      emit('update:modelValue', target.value);
      emit('input', target.value);
      delayTouch();
    }

    let timeout = setTimeout(() => null);
    const delayTouch = () => {
      clearTimeout(timeout);
      if(props.validator) {
        timeout = setTimeout(() =>  validate(), 500);
      }
    }

    const validate = () => {
      if(props.validator) {
        testInput(props.validator.field, props.validator.result)
      }
    }

    const errorMessage = computed(() => {
      if(!props.validator) return '';
      return getInputError(props.validator.field, props.validator.result)
    });

    return {
      computedClass,
      inputElement,
      setFocus,
      onInput,
      errorMessage,
      validate
    }
  }
})
</script>

<style lang='scss' scoped>
@import '@/assets/scss/variables';
.input-field {
  padding: 8px;
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
    color: #222;
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