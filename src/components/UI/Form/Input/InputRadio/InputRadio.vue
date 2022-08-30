<template>
  <div>
    <h3
      class="text-gray-600 font-normal mb-2 label"
    >
      {{ label }}
    </h3>
    <div :class="row ? 'flex items-center gap-4' : ''">
      <div
        v-for="(option, index) in options"
        :key="index"
        class="flex space-x-2 items-center cursor-pointer"
      >
        <input
          :id="`${hash}-${option[keyValue]}`"
          type="radio"
          :value="option[keyValue]"
          name="radio"
          :checked="selected == option[keyValue]"
          @change="onChange(option)"
        >
        <label
          :for="`${hash}-${option[keyValue]}`"
          class="label"
        >{{ option[keyName] }}</label>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { computed } from '@vue/reactivity';
import { defineComponent, getCurrentInstance, onMounted, PropType, ref } from 'vue';

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
    options: {
      type: Array as PropType<any[]>,
      required: true
    },
    keyName: {
      type: String,
      default: "label"
    },
    keyValue: {
      type: String,
      default: "value"
    },
    row: {
      type: Boolean,
      default: false
    }
  },
  emits:['update:modelValue'],
  setup(props, {emit}) {
    const instance = getCurrentInstance();
    const hash = computed(() => Date.now() +'-'+ instance?.uid)

    const selected = ref()
    const onChange = (option: any) => {
      emit('update:modelValue', option[props.keyValue])
    }

    onMounted(() => {
      selected.value = props.modelValue
    })

    return {
      hash,
      selected,
      onChange
    }
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