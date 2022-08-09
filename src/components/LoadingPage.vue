<template>
  <div>
    <div
      class="fixed top-0 left-0 h-screen w-screen 
        bg-zinc-800 z-10"
    ></div>

    <transition
      name="slide-fade"
      mode="out-in"
    >
      <div
        class="fixed h-screen w-screen top-0 left-0 flex flex-col items-center gap-8 justify-center z-20"
      >
        <img
          src="@/assets/logo.png"
          alt="Logo Hotbillet"
          width="250"
        />
        <loading class="h-8 w-8" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">

import {defineComponent} from 'vue';
import Loading from './global/Loading.vue';

export default defineComponent({
  components: { Loading },
  emits: ["update:modelValue"],
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