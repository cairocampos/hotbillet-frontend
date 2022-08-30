<template>
  <Listbox
    v-model="optionSelected"
    multiple
    name="teste"
  >
    <div class="relative mt-1">
      <ListboxLabel
        v-if="label"
        class="text-sm"
      >
        {{ label }}
        <span
          v-if="multiple"
          class="ml-2 text-blue-500 text-xs cursor-pointer"
          @click="selectAll"
        >
          Todos
        </span>
      </ListboxLabel>
      <ListboxButton
        v-if="multiple"
        class="relative w-full cursor-default border-b border-b-zinc-200 py-4 pl-3 pr-10 hover:border-b-zinc-400 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
      >
        <div class="flex flex-wrap gap-1">
          <Tag
            v-for="(selected, index) in optionSelected"
            :key="index"
            @on-delete="onDelete(index)"
          >
            {{ selected[keyName] }}
          </Tag>
        </div>
        <span
          v-if="!optionSelected"
          class="block truncate"
        >{{ optionSelected?.[keyName] || "Selecione" }}</span>
        <span
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <PhCaretDown
            class="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </span>
      </ListboxButton>
      <ListboxButton
        v-else
        class="relative w-full cursor-default border-b border-b-zinc-200 py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
      >
        <span class="block truncate">
          {{ optionSelected?.[keyName] || 'Selecione' }}
        </span>
        <span
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <PhCaretDown
            class="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            v-for="option in options"
            :key="option"
            v-slot="{active, selected}"
            :value="option"
            as="template"
          >
            <li
              class="'bg-zinc-100 text-zinc-900 hover:text-gray-900 relative cursor-default select-none py-2 pl-10 pr-4'"
              :class="{
                'bg-zinc-300 text-white': active,
                'text-gray-900': !active,
              }"
            >
              <span
                class="block truncate"
                :class="{ 'font-medium': selected, 'font-normal': !selected }"
              >
                {{ option?.[keyName] }}
              </span>
              <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-3"
              >
                <PhCheck
                  class="h-5 w-5"
                  aria-hidden="true"
                />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup lang="ts">
import { computed, onMounted, PropType, ref, toRefs } from 'vue'
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'

import { PhCheck, PhCaretDown } from 'phosphor-vue';
import Tag from '../Tag/Tag.vue';
import { watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String,Number,Array] as PropType<any|any[]>,
    required:true
  },
  label: {
    type: String,
    default: ''
  },
  options: {
    type: Array as PropType<any[]>,
    required:true
  },
  multiple: {
    type: Boolean,
    default:false
  },
  keyName: {
    type: String,
    default: "label"
  },
  keyValue: {
    type: String,
    default: "value"
  }
});

// const { modelValue } = toRefs(props)

const emits = defineEmits(['update:modelValue'])

const optionSelected = ref<any|any[]>(props.multiple ? [] : {
  [props.keyName] : "",
  [props.keyValue]: ""
});

const onDelete = (index:number) => {
  optionSelected.value.splice(index, 1)
}

watch(optionSelected, () => {
  const data = props.multiple ? optionSelected.value.map((item: any) => item[props.keyValue]) : optionSelected.value[props.keyValue]
  if((Array.isArray(data) && data.length) || data[props.keyValue]) {
    emits('update:modelValue', data)
  }
});


const selectAll = () => {
  optionSelected.value = props.options
}

const fillMultiple = () => {
  optionSelected.value = props.options
  .filter(item => props.modelValue.includes(item[props.keyValue]))
  return;
}

const fill = () => {
  const findIndex = props.options.findIndex(item => item[props.keyValue] == props.modelValue[props.keyValue]);
  if(findIndex !== -1) {
    optionSelected.value = props.options[findIndex];
  }
}

const check = () => {
  if(!props.modelValue || !props.modelValue.length) return;
  if(props.multiple) {
    fillMultiple();
    return;
  }

  fill();
}

watch(() => props.modelValue, () => {
  check();
})

watch(() => props.options, () => {
  check()
});

onMounted(() => {
  check();
});

</script>
