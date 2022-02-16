<template>
  <span
    v-if="handler.has(field)"
    class="text-red-500 text-xs"
    v-text="handler.get(field)"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
interface Dic {
  [key: string]: string;
}
interface IFormHandler {
  errors: Dic;
  has(field: string): boolean;
  any(): boolean;
  get: (field: string) => string;
  record(errors: Dic): void;
  clear(field?: string): void;
}
export default defineComponent({
  props: {
    handler: {
      type: Object as PropType<IFormHandler>,
      required:true
    },
    field: {
      type: String,
      required:true
    }
  },
  setup() {
    //
  },
})
</script>
