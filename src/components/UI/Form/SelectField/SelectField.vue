<template>
  <div>
    <label
      v-if="label"
      :class="['text-gray-600 font-normal', labelClass]"
    >{{ label }}</label>
    <select :class="baseClass">
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="labelValue ? option[labelValue] : option"
      >
        {{ labelKey ? option[labelKey] : option }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { IOption } from '@/interfaces/IOption';
import { computed } from '@vue/reactivity';
import { PropType } from 'vue';

const props = defineProps({
  options: {
    type: Array as PropType<IOption[]>,
    required:true
  },
  label: {
    type: String,
    default: ""
  },
  labelKey: {
    type: String,
    default: "label"
  },
  labelValue: {
    type: String,
    default: "value"
  },
  labelClass: {
    type: String,
    default: ""
  },
  variant: {
    type: String,
    default: ""
  }
})

const baseClass = computed(() => {
  return [
    'w-64 block bg-transparent text-zinc-600 p-2 rounded-sm focus:outline-none cursor-pointer',
    props.variant == 'secondary' ? 'border-b border-zinc-300' : 'border mt-2'
  ];
})

</script>

<style scoped>
select {
  padding: 8px 14px;
}

</style>