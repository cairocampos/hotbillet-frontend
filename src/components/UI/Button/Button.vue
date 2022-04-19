<template>
  <button
    :disabled="isDisabled"
    :class="baseClass"
    class="relative"
  >
    <Badge
      v-if="badge"
      class="absolute right-0 top-0"
    >
      {{ badge }}
    </Badge>
    <slot name="left" />
    <span
      v-if="!loading"
      class="mx-auto"
    >
      <slot />
    </span>
    <div
      v-else
      class="flex items-center space-x-2"
    >
      <Spinner v-if="loadingType == 'grow'" />
      <Loading
        v-else
        class="h-4 w-4"
      />

      <span class="text-gray-400">{{ textLoading }}</span>
    </div>
    <slot name="right" />
  </button>
</template>

<script lang='ts'>
import { computed, defineComponent, PropType } from 'vue';
import Spinner from '../Spinner/Spinner.vue';
import { Sizes, Variants } from '../layout'
import Badge from '@/components/UI/Badge/Badge.vue';

export default defineComponent({
  components: { Spinner, Badge },
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
      loading: {
        type: Boolean,
        required: false,
        default: false
      },
      loadingType: {
        type: String as PropType<'grow' | 'border'>,
        required:false,
        default:'grow'
      },
      textLoading: {
        type: String,
        default: ""
      },
      outline: {
        type: Boolean,
        default:false
      },
      rounded: {
        type: Boolean,
        default:false
      },
      badge: {
        type: [String, Number],
        default: ""
      }
  },
  setup(props) {
    const isDisabled = computed(() => {
      return props.disabled || props.loading
    })

    const customClass = computed(() => {
      const borderClass = `border border-${props.variant} bg-white text-${props.variant} hover:bg-${props.variant} hover:text-white`;
      const bgClass = `text-white bg-${props.variant} hover:bg-${props.variant}-dark`
      let styles = `${props.outline ? borderClass : bgClass}`;
      if(!props.loading && !props.disabled) {
        styles += ` hover:bg-${props.variant}`;
      }
      styles = styles += isDisabled.value ? `bg-${props.variant}-dark cursor-not-allowerd opacity-70` : '';
      return styles;
    });

    const baseClass = computed(() => {
      return [
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