<template>
  <section class="my-5">
    <transition
      name="slide"
      mode="out-in"
    >
      <slot />
    </transition>
  </section>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    //
  }
})
</script>

<style lang='scss' scoped>
</style>