<template>
  <Button
    variant="reset"
    size="xs"
    @click="$emit('export')"
  >
    <template #left>
      <PhArrowUp />
    </template>
    Exportar
  </Button>
  <Button
    variant="reset"
    size="xs"
    @click="$emit('filter')"
  >
    <template #left>
      <PhFunnelSimple />
    </template>
    Filtrar
  </Button>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import Button from '@/components/UI/Button/Button.vue';
import { PhArrowUp, PhFunnelSimple } from 'phosphor-vue'
export default defineComponent({
  components: { Button, PhArrowUp, PhFunnelSimple },
  emits: ['export', 'filter'],
  setup() {
    //
  }
})
</script>

<style lang='scss' scoped>
</style>