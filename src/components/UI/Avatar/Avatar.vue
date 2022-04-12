<template>
  <div class="hot__avatar">
    <span
      :class="customClass"
      :style="customStyle"
      class="hot__avatar-wrapper"
    >
      <img
        v-if="src"
        class="object-cover"
        src="https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-1/img/6-small.c9b47a98.png"
        alt=""
      />
      <span
        v-else
        :class="['w-full h-full flex items-center justify-center text-center text-gray-100', `bg-${variant}`]"
      >MD</span>
    </span>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, PropType } from 'vue';
import { Variants } from '../layout';
export default defineComponent({
  props: {
    size: {
      type: String,
      default: 'md'
    },
    variant: {
      type: String as PropType<Variants>,
      default: 'primary'
    },
    src: {
      type: String,
      required:false,
      default: ""
    }
  },
  setup(props) {
    const customClass = computed(() => {
      if(!/([0-9]{ 1,})/.test(props.size)) {
        return `size-${props.size}`
      }

      return '';
    })

    const customStyle = computed(() => {
      if(/([0-9]{ 1,})/.test(props.size)) {
        return {
          height: props.size,
          width: props.size
        }
      }

      return ''
    })

    return {
      customClass,
      customStyle
    }
  }
})
</script>

<style lang='scss' scoped>
.hot__avatar {
  &-wrapper {
    display: inline-block;
    * {
      border-radius: 50%;
    }
    &.size {
      &-sm {
        width: 1.5rem;
        height: 1.5rem;
      }
      &-md {
        width: 2rem;
        height: 2rem;
      }
      &-lg {
        width: 3.5rem;
        height: 3.5rem;
      }
    }
  }
}
</style>