<template>
  <div
    ref="element"
    class="select flex flex-col"
    tabindex="0"
  >
    <label class="label">
      {{ label }}
      <span
        v-if="required"
        class="text-red-500"
      >*</span>
      <span
        v-if="multiple && options.length"
        class="ml-2 text-xs cursor-pointer"
      >
        <span
          v-if="options.length === optionSelected?.length"
          class="text-red-500"
          @click="onClear()"
        >Limpar</span>
        <span
          v-else
          class="text-blue-500"
          @click="onSelectAll()"
        >Todos</span>
      </span>
    </label>
    <div
      class="select__input"
      @click="isOpen = !isOpen"
    >
      <template
        v-if="multiple && optionSelected?.length"
      >
        <Tag
          v-for="(item, index) in optionSelected"
          :key="index"
          @on-delete="onDelete(index)"
        >
          {{ item?.[keyName] }}
        </Tag>
      </template>
      <div
        class="select__content"
        :data-value="search"
      >
        <input
          ref="input"
          type="text"
          :data-value="search"
          :value="search"
          @input="onInput"
          @keydown="onKeydown"
          @blur="onBlur"
        />
        <span v-if="!search">{{ optionSelected?.[keyName] }}</span>
      </div>
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
        :ref="el => {option_index[index] = el}"
        :class="[
          'select__item',
          {
            active: optionSelected?.[keyValue] == option[keyValue],
            'bg-gray-100': arrowCounter === index
          }
        ]"
        @click="onSelect(index)"
      >
        <span v-html="option?.highlight || option[keyName]"></span>
        <span v-if="isSelected(option)">
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
        v-if="!filteredOptions.length && !loading"
        class="p-4 text-xs"
      >
        Nenhum registro encontrado para <span class="font-semibold">"{{ search }}"</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, PropType, ref, toRefs, watch } from 'vue';
import { PhCheck } from 'phosphor-vue';
import Spinner from '../Spinner/Spinner.vue';
import Tag from '../Tag/Tag.vue';

const emit = defineEmits(['update:modelValue', 'loadMore', 'open', 'search']);
const props = defineProps({
  modelValue: {
    type: [Number, String, Array, null] as PropType<any|null|any[]>,
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
    default: "name"
  },
  keyValue: {
    type: String,
    default: "id"
  },
  server: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  selected: {
    type: Object,
    default: null
  },
  multiple: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  }
});

const optionSelected = ref<any|any[]>();
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
});

const setOptionSelected = (option: any) => {
  if(props.multiple) {
    optionSelected.value.push(Array.isArray(option) ? [...option] : option)
    return
  }
  optionSelected.value = option;
}

const isSelected = (option: any) => {
  if(props.multiple) {
    return optionSelected.value
      .map((item: any) => item[props.keyValue])
      .includes(option?.[props.keyValue])
  } else {
    return optionSelected.value?.[props.keyValue] == option[props.keyValue]
  }
}
const emitOption = () => {
  if(props.multiple) {
    emit('update:modelValue', optionSelected.value.map((item: any) => item?.[props.keyValue]));
    return;
  }

  emit('update:modelValue', props.options
    .find((item: any) => item?.[props.keyValue] === optionSelected.value?.[props.keyValue])?.[props.keyValue]);
}

const onSelect = (index: number) => {
  const selectedOption = filteredOptions.value[index];
  if(!selectedOption) return;
  setOptionSelected(selectedOption);
  search.value = ""
  emitOption();
  isOpen.value = false;
}

let timeout = setTimeout(() => null);
const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  search.value = target.value
  if(search.value.length >= 3 && props.server) {
    clearTimeout(timeout)
    timeout = setTimeout(() => emit('search', search.value), 300)
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
    fixScrolling()
  }
}
const onArrowUp = () => {
  if(arrowCounter.value > 0) {
    arrowCounter.value--
    fixScrolling()
  }
}

const onEsc = () => {
  isOpen.value = false;
  input.value?.blur();
}

const onBlur = ({relatedTarget}: FocusEvent) => {
  const target = relatedTarget as HTMLElement;
  if(target && target.classList.contains('select')) {
    return false;
  }
  isOpen.value = false;
}

const onSelectAll = () => {
  optionSelected.value = props.options;
  emitOption();
}

const onClear = () => {
  optionSelected.value = [];
  emitOption();
}

const option_index = ref<any[]>([]);
const fixScrolling = () => {
  const element = option_index.value[arrowCounter.value];
  if(!element) return;
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'start'
  });
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
      onEsc()
      break;
  }
}

const onDelete = (index:number) => {
  optionSelected.value.splice(index, 1)
  emitOption();
}

const checkProps = () => {
  if(props.multiple) {
    if(Array.isArray(props.modelValue) && props.modelValue.length && !optionSelected.value.length) {
      const refs: any[] = props.modelValue;
      const items = props.options.filter(item => refs.includes(item[props.keyValue]))
      if(!items.length) return;
      setOptionSelected([...items]);
    }
  } else {
    if(!optionSelected.value) {
      setOptionSelected(props.options.find(item => item[props.keyValue] === props.modelValue))
    }
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
    clearTimeout(timeout)
    timeout = setTimeout(() => emit('loadMore'), 300)
  }
}

const {options, selected} = toRefs(props)
watch(() => [...options.value], () => checkProps());
watch(selected, () => {
  if(props.selected && props.selected[props.keyName]) {
    setOptionSelected(props.selected)
    return;
  }
})
watch(isOpen, val => {
  if(val) {
    arrowCounter.value = 0;
    emit('open');
    input.value?.focus();
  } else {
    search.value = ""
  }
});

const clickOutsideElement = (event: Event) => {
  // @ts-ignore
  if(!element.value?.contains(event.target)) {
    isOpen.value = false;
  }
}
onMounted(() => {
  document.addEventListener('click', clickOutsideElement);
  if(props.multiple) {
    optionSelected.value = []
  }

  if(!props.modelValue && props.options.length) return;
  checkProps();
})

onBeforeUnmount(() => {
  document.removeEventListener('click', clickOutsideElement);
})

</script>

<style lang="scss" scoped>
.select {
  @apply relative flex flex-col gap-2 min-w-[200px];
  &__input {
    @apply border-b border-b-zinc-300 hover:border-b-zinc-500 transition-colors px-2 pt-2 pb-1 bg-transparent outline-none w-full flex gap-2 flex-wrap max-h-[100px] overflow-y-auto relative;
      // flex: 1 1 auto;
      // margin: 2px;
      // visibility: visible;
      // color: rgb(51, 51, 51);
      // flex: 1 1 auto;
      // display: inline-grid;
      // grid-area: 1 / 1 / 2 / 3;
      // grid-template-columns: 0px min-content;
      // box-sizing: border-box;
    // input {
    //   color: inherit;
    //   background: 0px center;
    //   opacity: 1;
    //   width: 100%;
    //   grid-area: 1 / 2 / auto / auto;
    //   font: inherit;
    //   min-width: 2px;
    //   border: 0px;
    //   margin: 0px;
    //   outline: 0px;
    //   padding: 0px;
    // }
  }
  &__content {
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
    @apply bg-white shadow-md rounded-md absolute w-full max-h-[250px] overflow-y-auto z-10;
    top: calc(100% + 12px);
  }
  &__item {
    @apply flex items-center gap-2 p-2 text-zinc-500 hover:bg-zinc-100 transition-colors cursor-pointer;
    &.active {
      @apply bg-zinc-100;
    }
  }
}
</style>