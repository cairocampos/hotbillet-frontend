<template>
  <div class="custom-select-container w-full relative">
    <label :class="['text-gray-600 font-normal', labelClass]">{{ label }}</label>
    <div
      :class="baseClass"
      @click="showOptions = !showOptions"
    >
      <div>
        <span>
          {{ selectedOption[labelKey] ?? "Selecione" }}
        </span>
      </div>
      <div>
        <Icon :icon="`angle-${showOptions ? 'up' : 'down'}`" />
      </div>
    </div>
    <span
      v-if="error"
      class="text-danger text-xs"
    >{{ error }}</span>

    <AutocompleteOptions
      v-if="showOptions && !disabled"
      :custom-class="customClass"
      @scrollend="$emit('scrollend')"
    >
      <template
        v-if="searchable"
        #header
      >
        <input
          v-model="search"
          v-focus
          type="text"
          class="form-control text-xs border"
          placeholder="Digite para buscar"
        />
        <Text
          v-show="loading || showMessage"
          size="xs"
          variant="default"
          class="my-2"
        >
          Buscando...
        </Text>
      </template>

      <OptionItem
        v-for="(item, index) in items"
        :key="index"
        :class="[isSelected(item) ? 'bg-gray-500 bg-opacity-20' : '']"
        @click="selectedItem(item)"
      >
        {{ item[labelKey] }}
      </OptionItem>
      <p
        v-if="!items.length && !loading"
        class="p-2"
      >
        Nenhum item encontrado.
      </p>
    </AutocompleteOptions>
  </div>
</template>

<script lang="ts">
import { IOption } from "@/interfaces/IOption";
import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  ref,
  toRefs,
  watch,
} from "vue";
import Text from "../Layout/Text.vue";
import AutocompleteOptions from "./AutocompleteOptions.vue";
import OptionItem from "./OptionItem.vue";

export default defineComponent({
  directives: {
    focus: {
      mounted(el: HTMLInputElement) {
        el.focus();
      },
    },
  },
  components: { Text, AutocompleteOptions, OptionItem },
  props: {
    label: {
      type: String,
      required: false,
      default: "",
    },
    labelClass: {
      type: String,
      default: ""
    },
    modelValue: {
      type: [String, Number, Object, undefined] as PropType<string|number|undefined>,
      required: true,
    },
    options: {
      type: Object as PropType<IOption[]>,
      required: true,
      default: () => {
        return {
          label: "",
          value: "",
        };
      },
    },
    disabled: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    customClass: {
      type: String,
      default: () => {
        return `border border-gray-300 bg-white bg-opacity-10 hover:border-gray-400`;
      },
    },
    selected: {
      type: Object as PropType<IOption>,
      required: false,
      default: () => ({
        label: "",
        value: 0,
      }),
    },
    labelKey: {
      type: String,
      default: "label",
    },
    labelValue: {
      type: String,
      default: "value",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    ajax: {
      type: Boolean,
      default: false,
    },
    searchable: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: ""
    },
    error: {
      type: String,
      required:false,
      default: ''
    }
  },
  emits: ["update:modelValue", "scrollend", "search", "open", "selected"],
  setup(props, { emit }) {
    const { options, selected, modelValue } = toRefs(props);
    const showOptions = ref(false);
    const selectedOption = ref<IOption>(selected.value);
    const showMessage = ref(false);

    watch(selected, (val) => {
      selectedOption.value = val;
    });
    const selectedItem = (option: IOption) => {
      showOptions.value = false;
      search.value = "";
      selectedOption.value = option;
      emit("update:modelValue", option[props.labelValue]);
      emit("selected", option[props.labelValue])
    };
    const search = ref("");
    let interval = setTimeout(() => null);
    watch(search, () => {
      showMessage.value = true;
      clearTimeout(interval);
      interval = setTimeout(() => {
        emit("search", search.value);
        showMessage.value = false;
      }, 500);
    });
    watch(showOptions, (val) => {
      if (val) {
        emit("open");
      }
    });
    const items = computed(() => {
      if (!props.ajax) {
        const regex = new RegExp(search.value, "i");
        // const newOptions = options.value;
        // if(props.selected.value) {
        //   if(!newOptions.find(item => item.value == props.selected.value)) {
        //     newOptions.unshift({
        //       label: props.selected.label,
        //       value: props.selected.value,
        //     })
        //   }
        // }
        return options.value.filter((option) =>
          regex.test(option[props.labelKey])
        );
      }

      return options.value;
    });

    const isSelected = (option: IOption) => {
      if (
        option[props.labelValue] == props.modelValue ||
        (!props.modelValue &&
          option[props.labelValue] == props.selected[props.labelValue])
      )
        return true;
      return false;
    };

    const baseClass = computed(() => {
      return [
        'custom-select-input flex items-center justify-between cursor-pointer',
        'transition-all border-gray-300 bg-white bg-opacity-10 hover:border-gray-400',
        props.variant != 'secondary' ? 'border' : 'border-b',
        Boolean(props.error) && 'is-invalid'
      ]
    });

    const checkModelValue = () => {
      if (!props.ajax && props.modelValue) {
        const option = options.value.find(
          (item) => item[props.labelValue] == props.modelValue
        );

        if (option) {
          selectedOption.value = {
            [props.labelKey]: option[props.labelKey],
            [props.labelValue]: option[props.labelValue],
          };
        }
      }
    }

    watch(options, () => checkModelValue());
    watch(modelValue, () => checkModelValue())

    onMounted(() => {
      checkModelValue()
    });

    return {
      selectedItem,
      showOptions,
      search,
      items,
      selectedOption,
      isSelected,
      showMessage,
      baseClass
    };
  },
});
</script>

<style scoped lang="scss">
.custom-select-input {
  width: 100%;
  padding: 0 16px;
  height: 37px;
  &:disabled {
    cursor: not-allowed;
  }
   &.border {
     border-radius: 6px;
     height: 50px;
   }
   &.is-invalid {
    border-color: red;
    color:red;
  }
}

.options {
  position: absolute;
  width: 100%;
  z-index: 10;
  background: #fff !important;
}
</style>
