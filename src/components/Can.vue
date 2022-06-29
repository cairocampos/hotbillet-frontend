<template>
  <slot
    v-if="useCanSeeComponent"
  ></slot>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue';

const props = defineProps({
  permissions: {
    type: Array as PropType<string[]>,
    default: () => []
  }
})

const permissions = ["list"]
const useCanSeeComponent = computed(() => {
  return props.permissions?.every(permission => {
    return permissions.includes(permission)
  })
});

</script>

<style lang="scss" scoped>

</style>