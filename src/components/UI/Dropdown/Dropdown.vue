<template>
  <div
    ref="element"
    class="relative inline-block text-left"
  >
    <button
      type="button"
      class="flex items-center justify-center leading-5 p-2 space-x-2 focus:outline-none"
      :class="[rounded ? `shadow-sm border rounded-${rounded}` : '']"
      @click.stop.prevent="toggle()"
    >
      <span v-if="title">{{ title }}</span>
      <slot name="title" />
      <span v-if="!$slots.default">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </span>
    </button>
    <div
      v-show="isOpen"
      class="origin-top-right absolute z-50 right-0 mt-2 w-56 rounded-sm border"
    >
      <div class="py-1 rounded-md bg-white shadow-xs">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, getCurrentInstance, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue';
import mitt from 'mitt'
const emitter = mitt()
export default defineComponent({
  props: {
    title: {
      type: String,
      default: ""
    },
    rounded: {
      type: String,
      required:false,
      default: ""
    }
  },
  setup() {
    const instance = getCurrentInstance()
    const element = ref<HTMLElement>();
    const isOpen = ref(false);
    const toggle = () => isOpen.value = !isOpen.value
    const close = () => isOpen.value = false;
    provide('closeDropdown', close);

    const clickOutsideElement = (event: Event) => {
      // @ts-ignore
      if(!element.value?.contains(event.target)) {
        close();
      }
    }

    watch(isOpen, (value) => {
      if(value) {
        emitter.emit('dropdown::open', instance);
      }
    })

    const rootCloseListener = (event: unknown) => {
      // @ts-ignore
      if(event.uid !== instance.uid) {
        close();
      }
    }

    onMounted(() => {
      document.addEventListener('click', clickOutsideElement);

      emitter.on('dropdown::open', rootCloseListener)
    })

    onBeforeUnmount(() => {
      document.removeEventListener('click', clickOutsideElement);
    })

    return {
      element,
      isOpen,
      toggle
    }
  }
})
</script>

<style lang='scss' scoped>
</style>