<template>
  <div>
    <HeadPage class="mb-10">
      <h1 class="text-2xl text-gray-600">Adicionar Produto</h1>
    </HeadPage>


    <div class="flex items-start justify-between">
        <ul class="steps flex space-x-16 relative">
            <li v-for="step in steps" :key="step.label" class="text-sm text-default flex flex-col items-center space-y-4">
              <div 
                :class="['steps__circle rounded-full w-8 h-8 border-2 flex items-center justify-center text-xs bg-gray-100 z-10',
                step.ordem === currentStep.ordem ? 'border-gray-800' : ''
                ]">
                <span :class="[step.ordem === currentStep.ordem ? 'text-black font-medium' : '']">{{step.ordem}}º</span>
              </div>
              <span :class="[step.ordem === currentStep.ordem ? 'text-black font-medium' : '']">{{step.label}}</span>
              <a href="#" @click="currentStep = step" class="text-xs text-blue-500 flex items-center space" v-if="step.ordem < currentStep.ordem">
                <span class="underline border-b border-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </span>
                <span class="ml-1">Editar</span>
              </a>
            </li>
        </ul>
        <div class="space-x-2">
            <button class="btn btn-sm btn-dark rounded-full" @click="nextStep">Salvar e Continuar</button>
            <button class="btn btn-sm btn-outline-secondary rounded-full">Cancelar</button>
        </div>
    </div>

    <section class="m-4 my-16">
      <component :is="currentStep.component"></component>
    </section>

  </div>
</template>

<script setup lang="ts">

import {ref, computed, Component} from 'vue';

import Dados from '@/components/produtos/steps/Dados.vue'
import Links from '@/components/produtos/steps/Links.vue'
import Midias from '@/components/produtos/steps/Midias.vue'
import Ebooks from '@/components/produtos/steps/Ebooks.vue'
import Faq from '@/components/produtos/steps/Faq.vue'
import Conversao from '@/components/produtos/steps/Conversao.vue'

import useNotification from '@/composables/useNotifications';

interface Step {
    label:string;
    ordem:number;
    component:Component;
}

const steps = ref<Step[]>([
    {ordem: 1,label: "Dados", component: Dados},
    {ordem: 2,label: "Links", component: Links},
    {ordem: 3,label: "Mídias", component: Midias},
    {ordem: 4,label: "Ebooks", component: Ebooks},
    {ordem: 5,label: "Faq", component: Faq},
    {ordem: 6,label: "Conversão", component: Conversao}
]);

const currentStep = ref<Step>({ordem:1,label:"Dados", component: Dados})

const lastStep = computed(() => {
  return steps.value[steps.value.length - 1].ordem;
});

const nextStep = () => {
  if(currentStep.value.ordem < lastStep.value) {
    currentStep.value = steps.value.find(step => step.ordem == (currentStep.value.ordem + 1));
  }
}

</script>

<style scoped lang="scss">
.steps {
  &::after {
    top:14px;
    content:"";
    display: block;
    height:2px;
    width:100%;
    position: absolute;
    background: #EEE;
  }
}
</style>