<template>
  <div>
    <HeadPage class="mb-10">
      <h1 class="text-2xl text-gray-600">Adicionar Produto</h1>
    </HeadPage>


    <div class="flex items-center justify-between">
        <ul class="steps flex items-center space-x-4">
            <li v-for="step in steps" :key="step.label">
                {{step.label}}
            </li>
        </ul>
        <div class="space-x-2">
            <button class="btn btn-sm btn-dark rounded-full">Salvar e Continuar</button>
            <button class="btn btn-sm btn-outline-secondary rounded-full">Cancelar</button>
        </div>
    </div>

  </div>
</template>

<script setup lang="ts">

import {ref} from 'vue';

interface Step {
    label:string;
}

const steps = ref<Step[]>([
    {label: "Dados"},
    {label: "Links"},
    {label: "Mídias"},
    {label: "Ebooks"},
    {label: "Faq"},
    {label: "Conversão"}
]);

</script>

<style scoped>

</style>