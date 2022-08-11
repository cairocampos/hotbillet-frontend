<template>
  <div class="relative w-full">
    <label
      v-if="label"
      :class="[labelClass, 'mb-2 block text-zinc-500 text-xs']"
    >{{ label }}</label>
    <div
      :class="`border-b ${error ? 'border-red-500' : 'border-zinc-300'} h-8 flex justify-between items-center p-4 cursor-pointer hover:border-zinc-500 transition-colors`"
      @click="isOpen = !isOpen"
    >
      <span v-if="!selectedData?.id">Selecione</span>
      <span v-else>{{ selectedData.text }}</span>
      <PhCaretUp v-if="isOpen" />
      <PhCaretDown v-else />
    </div>

    <span
      v-if="error"
      class="block text-xs text-red-500 py-1"
    >
      {{ error }}
    </span>

    <Transition name="fade">
      <SelectOptions
        v-if="isOpen"
        :loading="loading"
        @scrollend="loadMore()"
        @search="onSearch"
      >
        <SelectItem
          v-for="(item, index) in data"
          :key="index"
          :active="item.id == selectedData?.id"
          @click="onSelect(item)"
        >
          {{ item.text }}
        </SelectItem>
      </SelectOptions>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { PhCaretUp, PhCaretDown } from 'phosphor-vue'
import { onMounted, PropType, ref, toRefs, watch } from 'vue';
import SelectOptions from './AutocompleteOptions.vue';
import SelectItem from './OptionItem.vue';
import { api } from '@/services/api';
export type Result = {
  id: string | number;
  text: string;
}
export type AutocompleteConfig = {
  url: string;
  params?: (data: {search:string, page: number}) => any;
  processResults: (data: any) => { results: Result[], pagination: {more:boolean} },
}

type Data = {
  id: number | string;
  text: string;
}

const props = defineProps({
  modelValue: {
    type: Number,
    required: true
  },
  label: {
    type: String,
    default: ""
  },
  config: {
    type: Object as PropType<AutocompleteConfig>,
    default: null
  },
  labelClass: {
    type: String,
    default:""
  },
  error: {
    type: String,
    default: ""
  },
  selected: {
    type: Object as PropType<Data>,
    default: () => ({
      id: "",
      text: ""
    })

  }
})

const { selected } = toRefs(props)

const emit = defineEmits(['update:modelValue', 'input'])
const loading = ref(false);
const isOpen = ref(false);
const selectedData = ref<Data>();
const data = ref<Data[]>([])
const hasNextPage = ref(false)
const params = ref({
  search: "",
  page: 1
});

const onSelect = (data: Data) => {
  emit('update:modelValue', data.id);
  isOpen.value = false;
  selectedData.value = data;
  emit('input', data)
}

const processData = (responseData: any) => {
  const { results, pagination } = props.config.processResults(responseData)
  data.value.push(...results)
  hasNextPage.value = pagination.more
}

const fetchData = async () => {
  try {
    loading.value = true;
    const {data} = await api.get(props.config.url, {
      params: props.config?.params && props.config.params(params.value) || params.value
    });
    processData(data);
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false;
  }
}

const onSearch = (term:string) => {
  params.value.search = term;
  params.value.page = 1;
  data.value = [];
  fetchData();
}

const loadMore = () => {
 if(!loading.value && hasNextPage.value) {
  params.value.page++;
  fetchData();
 } 
}

watch(isOpen, val => {
  if(!val) {
    data.value = []
    params.value.search = "";
  } else {
    fetchData();
  }
})

const initializeData = () => {
  selectedData.value = props.selected
}

watch(selected, val => {
  initializeData();
})

onMounted(() => {
  if(props.selected.id) {
    initializeData();
  }
})
</script>

<style scoped>
.fade-enter-from,
.fade-leave-from {
  transition: all .3s ease-in;
}

.fade-enter-active,
.fade-leave-to {
  opacity: 0;
}
</style>