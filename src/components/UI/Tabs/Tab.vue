<template>
  <section class="my-5">
    <slot name="default" />
    <slot name="title" />
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    title: {
      type: String,
      required: false,
      default: undefined,
    },
    lazy: {
      type: Boolean,
      required:false,
      default: false
    }
  },
  setup() {
    //
  },
});
</script>

<style lang="scss" scoped></style>
