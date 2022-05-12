<template>
  <Button
    variant="reset"
    size="xs"
    @click="$emit('export')"
  >
    <template #left>
      <Icon icon="arrow-up" />
    </template>
    Exportar
  </Button>
  <Button
    variant="reset"
    size="xs"
    @click="$emit('filter')"
  >
    <template #left>
      <Icon icon="filter" />
    </template>
    Filtrar
  </Button>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import Button from '@/components/UI/Button/Button.vue';
export default defineComponent({
  components: { Button },
  emits: ['export', 'filter'],
  setup() {
    //
  }
})
</script>

<style lang='scss' scoped>
</style>