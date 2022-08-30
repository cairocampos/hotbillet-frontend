<template>
  <div>
    <div
      v-if="open"
      class="fixed top-0 left-0 h-screen w-screen 
        bg-black bg-opacity-50 z-10"
    ></div>

    <transition
      name="slide-fade"
      mode="out-in"
    >
      <div
        v-if="open"
        class="fixed h-screen w-screen top-0 left-0 flex items-center justify-center z-20"
      >
        <div
          class="modal bg-white rounded-md shadow-sm py-8 px-5 space-y-5"
          :class="screen"
        >
          <div class="modal-header flex items-center justify-between pb-4">
            <h2 v-if="!$slots.header">
              {{ title }}
            </h2>
            <slot name="header"></slot>
            <button
              class="btn m-0 p-0 hover:text-gray-600"
              @click="closeModal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <slot name="body"></slot>
          <slot name="footer"></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    props: {
      open: {
        type: Boolean,
        default:false
      },
      title: {
        type:String,
        default: "Modal"
      },
      screen: {
        type: String,
        default: 'md'
      }
    },
   emits: ['update:open'],
   setup(props, {emit}) {
      const closeModal = ()   => {
        emit('update:open', false);       
      }

      return {
        closeModal
      }
   }
});
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all .3s ease-out;
}

.slide-fade-leave-active {
  transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-50px);
  opacity: 0;
}
</style>