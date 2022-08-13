<template>
  <div
    ref="element"
    class="relative"
  >
    <label
      v-if="label"
      for=""
      class="text-xs text-zinc-700"
    >
      {{ label }}
      <span
        v-if="required"
        class="text-red-500"
      >*</span>
    </label>
    <div
      :class="computedClass"
      @click="showOptions = !showOptions"
    >
      <span>
        {{ selectedOption && selectedOption[labelName] || 'Selecione' }}
      </span>
      <component :is="arrowIcon" />
    </div>
    <span
      v-if="errorMessage"
      class="text-danger text-xs"
    >{{ errorMessage }}</span>
    <Transition name="fade">
      <ListboxOptions
        v-show="showOptions"
      >
        <div
          v-if="searchable"
          class="w-full p-2"
        >
          <input
            v-model="search"
            placeholder="Pesquisar..."
            type="text"
            class="w-full outline-none border p-1 px-2 text-sm text-zinc-700 rounded-md"
          >
        </div>
        <OptionItem
          v-for="(option, index) in filteredOptions"
          :key="index"
          :class="selectedOption && selectedOption[keyName] == option[keyName] ? 'bg-zinc-200' : ''"
          @click="onSelectOption(option)"
        >
          {{ option[labelName] }}
        </OptionItem>
        <p
          v-show="!filteredOptions.length"
          class="text-xs text-zinc-500 px-4 py-2"
        >
          Nenhum resultado encontrado
        </p>
      </ListboxOptions>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import ListboxOptions from './ListboxOptions.vue';
import { PhCaretUp, PhCaretDown } from 'phosphor-vue'

import { onBeforeUnmount, onMounted, PropType, ref, toRefs, watch } from 'vue';
import { computed } from '@vue/reactivity';
import OptionItem from './OptionItem.vue';
import { Validator } from '@/composables/useFormHandler';
import { getInputError } from '@/helpers/formValidation';

type Option = {
  [key:string]:string|number
}

type Variants = "primary"|"secondary"

const props = defineProps({
  options: {
    type: Array as PropType<any[]>,
    required:true
  },
  labelName: {
    type: String,
    default: "label"
  },
  keyName: {
    type: String,
    default: "value"
  },
  label: {
    type: String,
    default: ""
  },
  modelValue: {
    type: [String,Number],
    required:true
  },
  searchable: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String as PropType<Variants>,
    default: "primary"
  },
  validator: {
    type: [Object, undefined] as PropType<Validator|undefined>,
    default: undefined
  },
  required: {
    type: Boolean,
    default:false
  }
})
const emit = defineEmits(['on:selected', 'update:modelValue']);
const search = ref('')
const showOptions = ref(false)
const element = ref<HTMLElement>();
const { options } = toRefs(props)

const filteredOptions = computed(() => {
  const regex = new RegExp(search.value , 'i');
  return props.options
    .filter(option => regex.test(String(option[props.labelName])))
})

const arrowIcon = computed(() => {
  return showOptions.value ?  PhCaretUp : PhCaretDown
})

const selectedOption = ref<Option>();
const onSelectOption = (option: Option) => {
  selectedOption.value = option;
  emit('on:selected', option[props.keyName])
  emit('update:modelValue', option[props.keyName])
  showOptions.value = false;
  search.value = "";
}

const checkSelectedProp = () => {
  const selectedElement = props.options
    .find(item => item[props.keyName] == props.modelValue)
  if(selectedElement) {
    selectedOption.value = selectedElement
  }
}

const computedClass = computed(() => {
  const variants = {
    primary: `cursor-pointer h-12 bg-zinc-100 rounded-md text-zinc-700 flex items-center justify-between px-4 mt-2`,
    secondary: `cursor-pointer h-12 bg-zinc-100 text-zinc-700 flex items-center justify-between px-4 mt-2 border-b-2 border-zinc-200`
  }

  return variants[props.variant]
});

const clickOutsideElement = (event: Event) => {
  // @ts-ignore
  if(!element.value?.contains(event.target)) {
    showOptions.value = false;
  }
}

const errorMessage = computed(() => {
  if(!props.validator) return '';
  return getInputError(props.validator.field, props.validator.result)
});

onMounted(() => {
  checkSelectedProp();
  document.addEventListener('click', clickOutsideElement);
})
onBeforeUnmount(() => {
  document.removeEventListener('click', clickOutsideElement);
})

watch(options, () => checkSelectedProp())

</script>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s;
}
</style>;