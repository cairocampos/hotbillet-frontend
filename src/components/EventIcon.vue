<template>
  <img :src="`/assets/icons/${icon}.svg`">
</template>

<script setup lang="ts">
import { EVENTS } from '@/constants'
import { computed } from 'vue';

const props  = defineProps({
  eventId: {
    type: Number,
    required:true
  }
});

const icon = computed(() => {
  const icons = {
    [EVENTS.BOLETO_IMPRESSO]: 'boleto',
    [EVENTS.BOLETO_VENCIDO]: 'boleto-vencido',
    [EVENTS.CARTAO_CANCELADO]: 'cartao-cancelado',
    [EVENTS.ABANDONO]: 'carrinho-abandonado',
    [EVENTS.BOLETO_PAGO]: 'boleto', 
    [EVENTS.CARTAO_APROVADO]: 'cartao',
    [EVENTS.PIX_GERADO]: 'pix',
    [EVENTS.PIX_PAGO]: 'pix',
  }

  return icons[props.eventId] || 'boleto-vencido';
});
</script>

<style scoped>

</style>