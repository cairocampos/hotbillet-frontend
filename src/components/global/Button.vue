<template>
  <button :disabled="disabled">
    <div
      v-if="loading"
      class="flex items-center space-x-2"
    >
      <Loading v-if="loading" />
      <span class="text-white">Carregando...</span>
    </div>
    <span
      v-else
      class="text-white"
    >
      {{ title }}
    </span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
button {
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
