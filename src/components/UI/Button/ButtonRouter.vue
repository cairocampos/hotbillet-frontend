<template>
  <router-link
    :to="to"
    :disabled="isDisabled"
    :class="baseClass"
    class="w-max"
  >
    <slot name="left" />
    <span
      class="mx-auto"
    >
      <slot />
    </span>
    <slot name="right" />
  </router-link>
</template>

<script lang='ts'>
import { computed, defineComponent, PropType } from 'vue';
import { Sizes, Variants } from '../layout'

export default defineComponent({
    props: {
      size: {
        type: String as PropType<Sizes>,
        required: false,
        default: "md"
      },
      variant: {
        type: String as PropType<Variants>,
        required: false,
        default: "primary"
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false
      },
      blocked: {
        type: Boolean,
        required: false,
        default: false
      },
      outline: {
        type: Boolean,
        default:false
      },
      rounded: {
        type: Boolean,
        default:false
      },
      to: {
        type: [Object, String],
        required:true
      }
  },
  setup(props) {
    const isDisabled = computed(() => {
      return props.disabled
    })

    const customClass = computed(() => {
      const borderClass = `border border-${props.variant} bg-white text-${props.variant} hover:bg-${props.variant} hover:text-white`;
      const bgClass = `text-white bg-${props.variant} hover:bg-${props.variant}-dark`
      let styles = `${props.outline ? borderClass : bgClass}`;
      if(!isDisabled.value) {
        styles += ` hover:bg-${props.variant}`;
      }
      styles = styles += isDisabled.value ? `bg-${props.variant}-dark cursor-not-allowerd opacity-70` : '';
      return styles;
    });

    const baseClass = computed(() => {
      return [
        'text-center',
        'btn',
        `btn-${props.size}`,
        props.outline ? `btn-outline-${props.variant}` : `btn-${props.variant}`,
        props.rounded ? 'btn-rounded' : '',
        props.blocked ? 'btn-blocked' : ''
      ];
    });
    return {
      baseClass,
      isDisabled,
      customClass
    };
  },
})
</script>

<style lang='scss' scoped>
button:disabled {
  cursor: not-allowed;
}
</style>