<template>
  <Combobox
    v-model="optionSelected"
    :multiple="multiple"
  >
    <div class="relative mt-1">
      <div
        class="relative w-full cursor-default overflow-hidden bg-transparent text-left border-b border-b-zinc-200 focus:outline-none focus:border-b-2 focus-visible:border-b-2 sm:text-sm"
      >
        <ComboboxButton
          class="w-full flex flex-wrap gap-1"
          as="div"
        >
          <div
            v-if="multiple && optionSelected?.length"
            class="flex flex-wrap gap-1"
          >
            <Tag
              v-for="(selected, index) in optionSelected"
              :key="index"
              @on-delete="onDelete(index)"
            >
              {{ selected[keyName] }}
            </Tag>
          </div>
          <ComboboxInput
            ref="input"
            class="border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 bg-transparent outline-none float-left"
            :display-value="(option: any) => option?.[keyName]"
            @change="query = $event.target.value"
          />
          <!-- <PhCaretDown
            class="h-5 w-5 text-gray-400"
            aria-hidden="true"
          /> -->
        </ComboboxButton>
      </div>
      <TransitionRoot
        leave="transition ease-in duration-100"
        leave-from="opacity-100"
        leave-to="opacity-0"
        @after-leave="query = ''"
      >
        <ComboboxOptions
          class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <div
            v-if="filteredOptions.length === 0 && query !== ''"
            class="relative cursor-default select-none py-2 px-4 text-gray-700"
          >
            Nothing found.
          </div>

          <ComboboxOption
            v-for="option in filteredOptions"
            :key="option?.[keyValue]"
            v-slot="{ selected, active }"
            as="template"
            :value="option"
          >
            <li
              class="relative cursor-default select-none py-2 pl-10 pr-4"
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
                :class="{ 'text-white': active, 'text-zinc-600': !active }"
              >
                <PhCheck
                  class="h-5 w-5"
                  aria-hidden="true"
                />
              </span>
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </TransitionRoot>
    </div>
  </Combobox>
</template>

<script setup lang="ts">
import { ref, computed, watch, PropType, toRefs, onMounted } from 'vue'
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue'
import { PhCheck, PhCaretDown } from 'phosphor-vue';
import Tag from '../Tag/Tag.vue';

const props = defineProps({
  modelValue: {
    type: [String,Number,Array] as PropType<string|number|any[]>,
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

const emit = defineEmits(['update:modelValue'])

const {options} = toRefs(props)

let optionSelected = ref<any|any[]>(null);
let query = ref('')

let filteredOptions = computed(() =>
  query.value === ''
    ? options.value
    : options.value.filter((option) =>
        option?.[props.keyName]
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.value.toLowerCase().replace(/\s+/g, ''))
      )
)

const onDelete = (index:number) => {
  optionSelected.value.splice(index, 1)
}


watch(optionSelected, val => {
  emit('update:modelValue', val[props.keyValue])
})

onMounted(() => {
  if(props.multiple) {
    optionSelected.value = [];
  } else {
    optionSelected.value = {}
  }
})
</script>
