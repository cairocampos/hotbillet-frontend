<template>
  <div>
    <HeadPage class="mb-10">
      <h1 class="text-2xl text-gray-600">Hialuronic</h1>
    </HeadPage>


    <div class="flex items-start justify-between">
        <ul class="steps hidden md:flex space-x-16 relative">
            <li v-for="step in steps" :key="step.label" class="text-sm text-default md:flex flex-col items-center space-y-4">
              <div 
                :class="['steps__circle rounded-full w-8 h-8 border-2 flex items-center justify-center text-xs bg-gray-100 z-10',
                step.ordem === currentStep.ordem ? 'border-gray-800' : ''
                ]">
                <span :class="[step.ordem === currentStep.ordem ? 'text-black font-medium' : '']">{{step.ordem}}º</span>
              </div>
              <span :class="[step.ordem === currentStep.ordem ? 'text-black font-medium' : '']">{{step.label}}</span>
              <a href="#" @click="currentStep = step" class="text-xs text-blue-500 flex items-center space" v-if="step.ordem != currentStep.ordem">
                <span class="underline border-b border-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </span>
                <span class="ml-1">Editar</span>
              </a>
            </li>
        </ul>
        <transition name="slide">
          <div v-if="sendingForm" key="teste1">
            <button class="btn btn-sm btn-dark rounded-full flex space-x-2 items-center">
              <Loading class="h-5 w-5" />
              <span>Salvando...</span>
            </button>
          </div>
          <div v-else class="space-x-2" key="teste2">
            <button class="btn btn-sm btn-dark rounded-full" @click="validateStep">Salvar e Continuar</button>
            <button class="btn btn-sm btn-outline-secondary rounded-full">Cancelar</button>
          </div>
        </transition>
    </div>

    <section class="m-4 my-16">
      <component ref="childComponent" @change-step="nextStep" :is="currentStep.component"></component>
    </section>

  </div>
</template>

<script lang="ts">

import {ref, computed, defineComponent} from 'vue';

import Dados from '@/components/produtos/steps/Dados.vue'
import Links from '@/components/produtos/steps/Links.vue'
import Midias from '@/components/produtos/steps/Midias.vue'
import Ebooks from '@/components/produtos/steps/Ebooks.vue'
import Faq from '@/components/produtos/steps/Faq.vue'
import Conversao from '@/components/produtos/steps/Conversao.vue'
import { useRoute } from 'vue-router';

// import useNotification from '@/composables/useNotifications';

interface Step {
    label:string;
    ordem:number;
    component:string;
}

export default defineComponent({
  components: {
    Dados,
    Links,
    Midias,
    Ebooks,
    Faq,
    Conversao
  },
  setup() {
    const route = useRoute();
    const steps = ref<Step[]>([
        {ordem: 1,label: "Dados", component: 'Dados'},
        {ordem: 2,label: "Links", component: 'Links'},
        {ordem: 3,label: "Mídias", component: 'Midias'},
        {ordem: 4,label: "Ebooks", component: 'Ebooks'},
        {ordem: 5,label: "Faq", component: 'Faq'},
        {ordem: 6,label: "Conversão", component: 'Conversao'}
    ]);
    const childComponent = ref<typeof Dados>();
    const sendingForm = ref(false);

    const setInitialStep = computed((): Step => {
      return route.query.redirect ? steps.value[1] : steps.value[1];
    });

    const currentStep = ref<Step>(setInitialStep.value);

    const lastStep = computed(() => {
      return steps.value[steps.value.length - 1].ordem;
    });

    const validateStep = () => {
      sendingForm.value = true;
      childComponent.value?.submitForm();
    }

    const nextStep = () => {
      sendingForm.value = false;
      if(currentStep.value.ordem < lastStep.value) {
        const next = steps.value.find(step => step.ordem == (currentStep.value.ordem + 1));
        if(next) {
          currentStep.value = next 
        }          
      }
    }

    return {
      steps,
      currentStep,
      validateStep,
      nextStep,
      sendingForm
    }
  }
})

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

// .slide-enter-active ,
// .slide-leave-active {
//   transition: all .3s forwards;
// }


// .slide-enter-from,
// .slide-leave-to {
//   opacity: 0;
//   transform:translateY(-20px);
// }

.slide-fade-enter-active {
  transition: all 5s ease-out;
}

.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>