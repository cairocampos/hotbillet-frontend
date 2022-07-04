<template>
  <div class="border border-zinc-400 absolute left-0 top-14 w-full rounded-md overflow-hidden bg-white z-10 min-h-4">
    <div
      v-show="loading"
      class="loader-line"
    ></div>
    <div class="w-full flex">
      <input
        v-model="input"
        v-focus
        placeholder="Pesquisar"
        type="text"
        class="border rounded-md border-zinc-400 w-full top-0 m-2 p-2 outline-none focus:border-zinc-500 focus:shadow-md"
      />
    </div>
    <ul
      class="rounded-md max-h-36 overflow-y-auto overflow-x-hidden"
      @scroll="onScroll"
    >
      <slot></slot>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const vFocus = (el: HTMLElement) => {
  el.focus();
}

const props = defineProps({
  loading:{
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['scrollend', 'search'])
const input = ref('')

let timeout = setTimeout(() => null)
watch(input, val => {
  clearTimeout(timeout)
  if(val.length >= 3) {
    timeout = setTimeout(() => {
      emit('search', val);
    }, 600)
  }
})

const onScroll = (event: Event) => {
  const target = event.target as HTMLElement;
  const {
    scrollHeight,
    scrollTop,
    offsetHeight
  } = target;

  if((scrollTop + offsetHeight) > (scrollHeight - 100)) {
    emit('scrollend')
  }
}

</script>

<style scoped>
.loader-line {
  width: 100%;
  height: 3px;
  position: absolute;
  overflow: hidden;
  background-color: #ddd;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
}

.loader-line:before {
  content: "";
  position: absolute;
  left: -50%;
  height: 3px;
  width: 40%;
  background-color: coral;
  -webkit-animation: lineAnim 1s linear infinite;
  -moz-animation: lineAnim 1s linear infinite;
  animation: lineAnim 1s linear infinite;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
}

@keyframes lineAnim {
  0% {
    left: -40%;
  }

  50% {
    left: 20%;
    width: 80%;
  }

  100% {
    left: 100%;
    width: 100%;
  }
}
</style>