<template @click="opa">
  <div class="relative">
    <ul
      class="w-full border-b text-sm selected flex flex-wrap cursor-text"
      @click="showOptions = !showOptions"
    >
      <li v-if="!multiple">
        {{ selectedOption.label }}
      </li>
      <li
        v-for="(option, index) in selectedOptions"
        :key="index"
        class="bg-gray-200 rounded-lg m-1 px-2 flex items-center text-gray-400"
      >
        <button
          class="mr-2"
          @click="updateSelected(option)"
        >
          x
        </button>
        <span class="text-xs text-default">{{ option.label }}</span>
      </li>
      <div
        ref="root"
        contenteditable="true"
        class="min-w-min outline-none"
        @input="inputRoot"
      ></div>
    </ul>

    <div
      v-if="showOptions"
      class="relative bg-white w-full top-0 border-2 select__dropdown"
    >
      <ul class="text-sm text-default relative">
        <!-- <input v-if="!multiple" type="text" class="form-control bg-white border border-blue-500 mb-2 fixed top-0"> -->
        <li
          v-for="(option, index) in optionsSearching"
          :key="index"
          :class="[
            'hover:bg-gray-200 p-2',
            hasSelected(option) ? 'bg-gray-200' : '',
          ]"
          @click="updateSelected(option)"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>
  </div>
</template>


<script lang="ts" setup>
interface Option {
  label: string;
  value: string | number;
  selected?: boolean;
}

import { computed, ref, watch, defineProps } from "vue";
const showOptions = ref(false);
const props = defineProps({
  multiple: {
    type: Boolean,
    default: false,
  },
});

const options = ref<Option[]>([
  { label: "Titulo 01", value: 1 },
  { label: "Titulo 02", value: 2 },
  { label: "Titulo 03", value: 3 },
  { label: "Titulo 04", value: 4 },
]);

const selectedOption = ref<Option>({ label: "", value: "" });

const selectedOptions = ref<Option[]>([]);

const root = ref<HTMLElement>();
const searchable = ref("");
const updateSelected = (option: Option) => {
  root.value.innerHTML = "";
  searchable.value = "";

  if (props.multiple) {
    const tagIndex = selectedOptions.value.findIndex(
      (item) => item.value == option.value
    );

    if (tagIndex != -1) {
      selectedOptions.value.splice(tagIndex, 1);
    } else {
      selectedOptions.value.push({ ...option, selected: true });
    }
  } else {
    selectedOption.value = option;
  }
  showOptions.value = false;
};

watch(showOptions, (val) => {
  if (val) root.value?.focus();
});

const inputRoot = () => {
  searchable.value = root.value?.innerHTML || "";
};

const optionsSearching = computed(() => {
  return options.value.filter((option) =>
    option.label.includes(searchable.value)
  );
});

const hasSelected = (option: Option) => {
  return selectedOptions.value.find((item) => item.value == option.value);
};
</script>

<style lang="scss" scoped>
.select {
  &__dropdown {
    max-height: 150px;
    overflow-y: scroll;
  }
}

ul.selected {
  min-height: 25px;
  &:after {
    // content: url("../../assets/icons/arrow-down.svg");
    position: absolute;
    top: 0;
    right: 5px;
    background: red;
    color: red;
  }
}
</style>