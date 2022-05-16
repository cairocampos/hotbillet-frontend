<template>
  <div class="hot__checkbox flex space-x-2 items-center relative mr-4">
    <input
      :id="value"
      type="checkbox"
      :value="value"
      @change="onChange"
    >
    <label
      :for="value"
      class="text-base"
    >{{ label }}</label>
  </div>
</template>

<script lang='ts'>
import { defineComponent, toRefs, PropType } from 'vue';
export default defineComponent({
  props: {
    modelValue: {
      type: [Array, String, Boolean, Number] as PropType<string[] | string | boolean | number | number[]>,
      required:true
    },
    label: {
      type: String,
      required:false,
      default: ""
    },
    value: {
      type: [String,Number],
      required:true
    },
    trueValue: {
      type: [String,Boolean],
      default:true
    },
    falseValue: {
      type: [String,Boolean],
      default:false
    }
  },
  emits:['update:modelValue'],
  setup(props, {emit}) {
    const {modelValue} = toRefs(props)
    
    const onChange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const isChecked = target.checked;
      if(typeof modelValue.value !== 'object') {
        emit('update:modelValue', isChecked ? props.trueValue : props.falseValue)
        return
      }
      const set = [...new Set([...modelValue.value, target.value])];
      emit('update:modelValue', isChecked ? set : set.filter(item => item != target.value));
    }

    return {
      onChange
    }
  }
})
</script>

<style lang='scss' scoped>
@import '@/assets/scss/variables';
.hot__checkbox {
  padding-left: .18rem;
  input {
    visibility: hidden;
  }

  label {
    position: static;
  }

  label::before,
  label::after {
    content: "";
    display:block;
    height: 18px;
    width: 18px;
    background: transparent;
    top:50%;
    left: 0;
    transform: translateY(-50%);
    position:absolute;
    border-radius: 4px;
    pointer-events: none;
  }

  label::before {
    border: 1px solid #d8d6de;
  }

  input:checked {
    & + label::after {
      background: no-repeat 50%/50% 50% url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 9.5 7.5'%3E%3Cpolyline points='0.75 4.35 4.18 6.75 8.75 0.75' style='fill:none;stroke:%23fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.5px'/%3E%3C/svg%3E");
      background-size: 57%;
    }
    & + label::before {
      box-shadow: 0 2px 4px 0 rgba(115,103,240,.4)!important;
      border-color: #7367f0;
      background-color: #7367f0;
    }
  }
}

</style>