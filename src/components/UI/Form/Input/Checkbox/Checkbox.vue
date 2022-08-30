<template>
  <div class="space-y-4">
    <label
      for="#"
      class="label"
    >
      {{ label }}
    </label>
    <div
      v-for="option in options"
      :key="option[keyValue]"
      class="hot__checkbox flex items-center relative mr-4 gap-2"
    >
      <input
        :id="`${hash}-${option[keyValue]}`"
        type="checkbox"
        :value="option[keyValue]"
        @change="onChange"
      >
      <label
        :for="`${hash}-${option[keyValue]}`"
        class="label flex items-center gap-2"
      >
        <PhCheckSquare
          class="checked text-green-500 font-bold"
          size="22"
        />
        <PhSquare
          class="uncheck"
          size="22"
        />
        {{ option[keyName] }}
      </label>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, toRefs, PropType, getCurrentInstance, ref, onMounted, computed } from 'vue';
import { PhSquare, PhCheckSquare } from 'phosphor-vue'
export default defineComponent({
  components: {
    PhSquare,
    PhCheckSquare
  },
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
    trueValue: {
      type: [String,Boolean],
      default:true
    },
    falseValue: {
      type: [String,Boolean],
      default:false
    },
    options: {
      type: Array as PropType<any[]>,
      required:true
    },
    keyName: {
      type: String,
      default: "label"
    },
    keyValue: {
      type: String,
      default: "value"
    }
  },
  emits:['update:modelValue'],
  setup(props, {emit}) {
    const {modelValue} = toRefs(props)
    const instance = getCurrentInstance();
    
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

    const hash = computed(() => {
      return Date.now() + '-' + instance?.uid
    })

    return {
      onChange,
      hash
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
    display: none;
  }

  label {
    position: static;
  }

  .checked {
    display: none;
  }

  .uncheck {
    display: inline-block;
  }

  input:checked + label {
    .checked {
      display: inline-block;
    }
    .uncheck {
      display: none;
    }
  }

  // label::before,
  // label::after {
  //   content: "";
  //   display:block;
  //   height: 18px;
  //   width: 18px;
  //   background: transparent;
  //   top:50%;
  //   left: 0;
  //   transform: translateY(-50%);
  //   position:absolute;
  //   border-radius: 4px;
  //   pointer-events: none;
  // }

  // label::before {
  //   border: 1px solid #d8d6de;
  // }

  // input:checked {
  //   & + label::after {
  //     background: no-repeat 50%/50% 50% url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 9.5 7.5'%3E%3Cpolyline points='0.75 4.35 4.18 6.75 8.75 0.75' style='fill:none;stroke:%23fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.5px'/%3E%3C/svg%3E");
  //     background-size: 57%;
  //   }
  //   & + label::before {
  //     box-shadow: 0 2px 4px 0 rgba(115,103,240,.4)!important;
  //     border-color: #00D115;
  //     background-color: #00D115;
  //   }
  // }
}

</style>