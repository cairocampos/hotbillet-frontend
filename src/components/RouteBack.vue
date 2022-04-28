<template>
  <div class="flex items-center">
    <button
      class="flex items-center space-x-2"
      @click="onClick"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="#2F2D2C"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      <slot />
    </button>
    <slot name="extras" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi';
import { useRouter } from 'vue-router';
export default defineComponent({
  props: {
    route: {
      type: Object,
      required:false,
      default: () => ({})
    }
  },
  setup(props) {
    const router = useRouter();
    const onClick = () => {
      if(Object.values(props.route).length) {
        router.push(props.route)
        return
      }

      router.go(-1)
    }

    return {
      onClick
    }
  }
})
</script>