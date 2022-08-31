<template>
  <div
    ref="element"
    class="select"
  >
    <!-- search - {{ search }} -->
    <label class="label text-gray-600 font-normal">{{ label }}</label>
    <div
      class="select__input"
      :data-value="search"
      @click="isOpen = !isOpen"
    >
      <input
        ref="input"
        type="text"
        :data-value="search"
        :placeholder="placeholder"
        :value="search"
        @input="onInput"
        @keydown="onKeydown"
      />
      <span v-if="!search">{{ selected?.[keyName] }}</span>
    </div>

    <div
      v-if="isOpen"
      class="select__options"
      :data-value="search"
      @scroll="onScroll"
    >
      <div
        v-for="(option, index) in filteredOptions"
        :key="option[keyValue]"
        :class="[
          'select__item',
          {
            active: selected?.[keyValue] == option[keyValue],
            'bg-gray-100': arrowCounter === index
          }
        ]"
        @click="onSelect(index)"
      >
        <span v-html="option?.highlight || option[keyName]"></span>
        <span v-if="selected?.[keyValue] == option[keyValue]">
          <PhCheck size="20" />
        </span>
      </div>
      <div
        v-if="loading"
        class="p-4 text-sm flex items-center gap-2 justify-center"
      >
        <Spinner />
        <span>Carregando...</span>
      </div>
      <div
        v-if="!filteredOptions.length"
        class="p-4 text-sm"
      >
        Nenhum registro encontrado para "{{ search }}"
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, onBeforeUnmount, onMounted, PropType, ref, watch } from 'vue';
import { PhCheck } from 'phosphor-vue';
import {delay} from '@/core/helpers'
import Spinner from '../Spinner/Spinner.vue';

const emit = defineEmits(['update:modelValue', 'loadMore', 'open', 'search']);
const props = defineProps({
  modelValue: {
    type: [Number, String],
    required:true
  },
  label: {
    type: String,
    default: ""
  },
  options: {
    type: Array as PropType<any[]>,
    required:true
  },
  searchable: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: "Selecione"
  },
  keyName: {
    type: String,
    default: "label"
  },
  keyValue: {
    type: String,
    default: "value"
  },
  server: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const selected = ref<any>();
const isOpen = ref(false);
const element = ref<HTMLElement>();
const input = ref<HTMLInputElement>()
const search = ref('');

const filteredOptions = computed(() => {
  if(!search.value) return props.options;
  const multableOptions: any[] = JSON.parse(JSON.stringify(props.options));

  const match = new RegExp(search.value, 'i')
  return multableOptions
    .filter(option => option[props.keyName].toLowerCase().search(search.value.toLowerCase()) >= 0)
    .map(option => {
      return {
        ...option,
        highlight: option[props.keyName].replace(match, `<span class="text-black">${search.value}</span>`)
      }
    })
})

const onSelect = (index: number) => {
  const selectedOption = filteredOptions.value[index];
  if(!selectedOption) return;
  selected.value = selectedOption;
  search.value = ""
  emit('update:modelValue', props.options.find(option => option[props.keyValue] == selectedOption[props.keyValue])?.[props.keyValue])
  isOpen.value = false;
}

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  search.value = target.value
  if(search.value.length >= 3 && props.server) {
    delay(() => emit('search', search.value));
  } else {
    isOpen.value = true;
  }
}

const arrowCounter = ref(0);
const onEnter = (index: number) => {
  onSelect(index);
}
const onArrowDown = () => {
  if(!isOpen.value) isOpen.value = true;
  if(arrowCounter.value < filteredOptions.value.length) {
    arrowCounter.value++
  }
}
const onArrowUp = () => {
  if(arrowCounter.value > 0) {
    arrowCounter.value--
  }
}

const onKeydown = (event: KeyboardEvent) => {
  switch(event.key) {
    case "Enter":
      event.preventDefault();
      onEnter(arrowCounter.value);
      break;
    case "ArrowDown":
      event.preventDefault();
      onArrowDown();
      break;
    case "ArrowUp":
      event.preventDefault();
      onArrowUp();
      break;
    case "Escape":
      isOpen.value = false;
      console.log('opa')
      break;
  }
}

const checkProps = () => {
  if(!selected.value) {
    selected.value = props.options.find(item => item[props.keyValue] === props.modelValue)
  }
}

const onScroll = (event: Event) => {
  if(!props.server) return;
  const target = event.target as HTMLElement;
  const {
    scrollHeight,
    scrollTop,
    offsetHeight
  } = target;

  if((scrollTop + offsetHeight) > (scrollHeight - 100)) {
    delay(() => emit('loadMore'));
  }
}

watch(() => props.options, () => checkProps());
watch(isOpen, val => {
  if(val) {
    arrowCounter.value = 0;
    emit('open');
    input.value?.focus();
  } else {
    search.value = ""
  }
});

onMounted(() => {
  if(!props.modelValue && props.options.length) return;
  checkProps();
})

const clickOutsideElement = (event: Event) => {
  // @ts-ignore
  if(!element.value?.contains(event.target)) {
    isOpen.value = false;
  }
}
onMounted(() => {
  document.addEventListener('click', clickOutsideElement);
})

onBeforeUnmount(() => {
  document.removeEventListener('click', clickOutsideElement);
})

</script>

<style lang="scss" scoped>
.select {
  @apply relative flex flex-col gap-2 min-w-[200px];
  &__input {
    @apply border-b border-b-zinc-300 hover:border-b-zinc-500 transition-colors px-2 pt-2 pb-1 bg-transparent outline-none w-full;
      flex: 1 1 auto;
      margin: 2px;
      visibility: visible;
      color: rgb(51, 51, 51);
      flex: 1 1 auto;
      display: inline-grid;
      grid-area: 1 / 1 / 2 / 3;
      grid-template-columns: 0px min-content;
      box-sizing: border-box;
    input {
      color: inherit;
      background: 0px center;
      opacity: 1;
      width: 100%;
      grid-area: 1 / 2 / auto / auto;
      font: inherit;
      min-width: 2px;
      border: 0px;
      margin: 0px;
      outline: 0px;
      padding: 0px;
    }
    &::after {
      content: attr(data-value);
      visibility: hidden;
      white-space: pre;
      grid-area: 1 / 2 / auto / auto;
      font: inherit;
      min-width: 2px;
      border: 0px;
      margin: 0px;
      outline: 0px;
      padding: 0px;
    }
  }
  &__options {
    @apply bg-white shadow-sm rounded-md absolute w-full top-20 max-h-[250px] overflow-y-auto;
  }
  &__item {
    @apply flex items-center gap-2 p-2 text-zinc-500 hover:bg-zinc-100 transition-colors cursor-pointer;
    &.active {
      @apply bg-zinc-100;
    }
  }
}
</style>