<template>
  <div
    ref="element"
    class="relative inline-block text-left"
  >
    <button
      type="button"
      class="flex items-center justify-center leading-5 border rounded-md shadow-sm p-2 space-x-2 focus:outline-none"
      @click.stop.prevent="toggle()"
    >
      <span>{{ label }}</span>
      <span>
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
      class="origin-top-right absolute right-0 mt-2 w-56 rounded-sm"
    >
      <div class="py-1 rounded-md bg-white shadow-xs">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onBeforeUnmount, onMounted, provide, ref } from 'vue';
export default defineComponent({
  props: {
    label: {
      type: String,
      default: "Dropdown"
    }
  },
  setup() {
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

    // watch(isOpen, (value) => {
    //   if(value) {

    //   }
    // })

    onMounted(() => {
      document.addEventListener('click', clickOutsideElement);
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