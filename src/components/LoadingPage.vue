<template>
  <div>
    <div
      v-if="modelValue && modelValue.show"
      class="fixed top-0 left-0 h-screen w-screen 
        bg-black bg-opacity-50 z-10"
    ></div>

    <transition
      name="slide-fade"
      mode="out-in"
    >
      <div
        v-if="modelValue.show"
        class="fixed h-screen w-screen top-0 left-0 flex items-center justify-center z-20"
      >
        <div class="bg-gray-200 rounded-full p-4 animate-ping">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-32 w-32 text-default animate-ping"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
            />
          </svg>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">

import {defineComponent} from 'vue';

export default defineComponent({
    props: {
        modelValue: {
            type: Object,
            required:true
        }
    },
   emits: ['update:modelValue'],
   setup(props, {emit}) {
       const screen = "w-1/4";
        const closeModal = ()   => {
            emit('update:modelValue', false);       
        }

        return {
            closeModal,
            screen
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