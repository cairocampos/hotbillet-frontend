<template>
  <div class="custom-select-container w-full relative">
    <p>{{ title }}</p>
    <div
      class="
        custom-select-input
        flex
        items-center
        justify-between
        cursor-pointer
        transition-all
      "
      :class="customClass"
      @click="showOptions = !showOptions"
    >
      <div>
        <span>{{
          modelValue && options.length
            ? options.find((option) => option.value == modelValue)?.label
            : "Selecione"
        }}</span>
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
      v-if="showOptions"
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
        />
      </div>
      <div class="max-h-32 overflow-y-auto">
        <div
          v-for="(option, index) in items"
          :key="index"
          :class="[
            'p-2 hover:bg-gray-400 hover:bg-opacity-20 cursor-pointer transition-all',
            option.value === modelValue ? 'bg-gray-500 bg-opacity-20' : '',
          ]"
          @click="selected(option.value)"
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
import { computed, defineComponent, PropType, ref, toRefs } from "vue";

interface IOptions {
  label: string;
  value: string | number;
}

export default defineComponent({
  directives: {
    focus: {
      mounted(el: HTMLInputElement) {
        el.focus();
      },
    },
  },
  props: {
    title: {
      type: String,
      required: false,
      default: "",
    },
    modelValue: {
      type: [String, Number, Object],
      required: true,
    },
    options: {
      type: Object as PropType<IOptions[]>,
      required: true,
      default: () => {
        return {
          label: "",
          value: "",
        };
      },
    },
    type: {
      type: String,
      required: false,
      default: () => "default",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const { options, type } = toRefs(props);
    const showOptions = ref(false);
    const selected = (value: string|number) => {
      showOptions.value = false;
      search.value = "";
      emit("update:modelValue", value);
    };

    const search = ref("");

    const items = computed(() => {
      const regex = new RegExp(search.value, "i");
      return options.value.filter((option) => regex.test(option.label));
    });

    const customClass = computed(() => {
      if (type.value == "line") {
        return "border-b border-gray-400 bg-transparent rounded-none focus:bg-transparent";
      }

      return "";
    });

    return {
      selected,
      showOptions,
      search,
      items,
      customClass,
      opa: () => alert("opa"),
    };
  },
});
</script>

<style scoped lang="scss">
.custom-select-input {
  width: 100%;
  padding: 0 16px;
  height: 50px;
}

.options {
  position: absolute;
  width: 100%;
  z-index: 10;
  background: #fff !important;
}
</style>