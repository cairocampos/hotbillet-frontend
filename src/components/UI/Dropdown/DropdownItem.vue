<template>
  <component
    :is="is"
    :href="href"
    :to="to"
    class="block px-4 py-2 text-sm leading-5 hover:bg-gray-100 cursor-pointer w-full"
    @click="onClick"
  >
    <slot />
  </component>
</template>

<script lang='ts'>
import { computed, defineComponent, inject } from 'vue';
export default defineComponent({
  props: {
    href: {
      type: String,
      default: undefined
    },
    to: {
      type: [String, Object],
      default: undefined
    }
  },
  emits:['click'],
  setup(props, {emit}) {
    const closeDropdown = inject<() => void>('closeDropdown', Function);
    const is = computed(() => {
      if(typeof props.to !== 'undefined') {
        return 'RouterLink';
      }

      if(typeof props.href !== 'undefined') {
        return 'a';
      }
      return 'button';
    })
    const onClick = (event: Event) => {      
      emit('click', event);
      closeDropdown();
    }

    return {
      is,
      onClick
    }
  }
})
</script>

<style lang='scss' scoped>
</style>