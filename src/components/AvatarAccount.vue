<template>
  <div :class="baseClass">
    <img
      :src="source"
      class="rounded-full"
    >
  </div>
</template>

<script setup>
import {computed} from 'vue';
import defaultAvatar from "@/assets/fake/perfil.jpeg"
const props = defineProps({
  width: {
    type: String,
    default: "16"
  },
  height: {
    type: String,
    default: '16'
  },
  source: {
    type: String,
    default: defaultAvatar
  }
})

const baseClass = computed(() => {
  return [
    'avatar rounded-full p-1',
    `w-${props.width}`,
    `h-${props.height}`,
  ];
})

</script>

<style scoped>
.avatar {
  background: linear-gradient(230.64deg, #FF7800 17.24%, #E31E22 82.83%) center center;
}
</style>