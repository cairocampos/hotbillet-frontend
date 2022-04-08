<template>
  <div class="custom-select-container w-full relative">
    <p>{{ label }}</p>
    <div
      class="
        custom-select-input
        flex
        items-center
        justify-between
        cursor-pointer
        rounded-md
        transitiall
      "
      :class="[customClass, {'cursor-not-allowed': disabled}]"
      @click="showOptions = !showOptions"
    >
      <div>
        <span>
          {{ selectedOption.label ?? 'Selecione' }}
        </span>
      </div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>

    <div
      v-if="showOptions && !disabled"
      class="options rounded-md mt-1"
      :class="customClass"
    >
      <div class="p-2">
        <input
          v-model="search"
          v-focus
          type="text"
          class="form-control text-xs"
          placeholder="Digite para buscar"
        >
      </div>
      <div
        class="max-h-32 overflow-y-auto"
        @scroll="checkScroll"
      >
        <div
          v-for="(option, index) in items"
          :key="index"
          :class="[
            'p-2 hover:bg-gray-400 hover:bg-opacity-20 cursor-pointer transitiall',
            option.value == modelValue ? 'bg-gray-500 bg-opacity-20' : '',
          ]"
          @click="selectedItem(option)"
        >
          {{ option.label }}
        </div>

        <p
          v-if="!items.length"
          class="p-2"
        >
          Nenhum item encontrado.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

type IOption = {
  label:string;
  value:number;
}

import { computed, defineComponent, PropType, ref, toRefs, watch } from "vue";

export default defineComponent({
  directives: {
    focus: {
      mounted(el: HTMLInputElement) {
        el.focus();
      }
    }
  },
  props: {
    label: {
      type: String,
      required:false,
      default: ""
    },
    modelValue: {
      type: [String, Number, Object],
      required:true
    },
    options: {
      type: Object as PropType<IOption[]>,
      required:true,
      default: () => {
        return {
          label: "",
          value: ""
        }
      },
    },
    disabled: {
      type: Boolean,
      required:false,
      default: () => false
    },
    customClass: {
      type: String,
      default: () => {
        return `border border-gray-300 bg-white bg-opacity-10 hover:border-gray-400`
      }
    },
    selected: {
      name: "Teste",
      type: Object as PropType<{label: string, value: number}>,
      required:false,
      default: () => ({
        label: "",
        value: 0
      })
    }
  },
  emits: ["update:modelValue", "scrollend", "search", 'open'],
  setup(props, { emit }) {
    const {options, selected} = toRefs(props);
    const showOptions = ref(false);

    const selectedOption = ref<IOption>(selected.value);

    watch(selected, val => {
      selectedOption.value = val;
    })

    const selectedItem = (option: IOption) => {
      showOptions.value = false;
      search.value = '';
      selectedOption.value = option;
      emit("update:modelValue", option.value);
    };

    const search = ref('');

    let interval = setTimeout(() => null)
    watch(search, () => {
      clearTimeout(interval)
      interval = setTimeout(() => {
        emit('search', search.value)
      }, 500);
    })

    watch(showOptions, (val) => {
      if(val) {
        emit('open');
      }
    })

    const items = computed(() => {
      const regex = new RegExp(search.value, 'i')
      const newOptions = options.value;
      // if(props.selected.value) {
      //   if(!newOptions.find(item => item.value == props.selected.value)) {
      //     newOptions.unshift({
      //       label: props.selected.label,
      //       value: props.selected.value,
      //     })
      //   }
      // }
      return newOptions.filter(option => regex.test(option.label));
    })

    let count = setTimeout(() => null)
    const checkScroll = ({target}: UIEvent) => {
      const element = target as HTMLElement

      const totalScroll = element.scrollHeight;
      const height = element.offsetHeight;
      const scrollTop = element.scrollTop;

      if((scrollTop + height ) >= totalScroll - 500) {
        clearTimeout(count)

        count = setTimeout(() => {
          emit('scrollend');
        }, 500)
      }
    }

    return {
      selectedItem,
      showOptions,
      search,
      items,
      checkScroll,
      selectedOption
    };
  },
});
</script>

<style scoped lang="scss">
.custom-select-input {
  width: 100%;
  padding: 0 16px;
  border-radius: 6px;
  height: 50px;
}

.options {
  position: absolute;
  width: 100%;
  z-index: 10;
  background: #FFF !important;
}
</style>