<template>
  <div>
    <div
      v-if="loading"
      class="h-screen flex items-center"
    >
      <Loading />
    </div>
    <div v-else>
      <HeadPage
        class="mb-10"
        :title="product?.name"
      />

      <div class="flex items-start justify-between">
        <ul class="steps hidden md:flex space-x-16 relative">
          <li
            v-for="step in steps"
            :key="step.label"
            class="text-sm text-default md:flex flex-col items-center space-y-4"
          >
            <div 
              :class="['steps__circle rounded-full w-8 h-8 border-2 flex items-center justify-center text-xs bg-gray-100 z-10',
                       step.ordem === currentStep.ordem ? 'border-gray-800' : ''
              ]"
            >
              <span :class="[step.ordem === currentStep.ordem ? 'text-black font-medium' : '']">{{ step.ordem }}º</span>
            </div>
            <span :class="[step.ordem === currentStep.ordem ? 'text-black font-medium' : '']">{{ step.label }}</span>
            <a
              v-if="step.ordem != currentStep.ordem"
              href="#"
              class="text-xs text-blue-500 flex items-center space"
              @click="currentStep = step"
            >
              <span class="underline border-b border-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </span>
              <span class="ml-1">Editar</span>
            </a>
          </li>
        </ul>

        <div class="flex gap-4">
          <Button
            variant="dark"
            radius="full"
            size="sm"
            :loading="sendingForm"
            @click="validateStep"
          >
            Confirmar Alterações
          </Button>
          <Button
            :redirect="{name: 'Product', params: {id}}"
            variant="dark"
            radius="full"
            size="sm"
            outline
          >
            Cancelar
          </Button>
        </div>
      </div>

      <section
        v-if="product?.id"
        class="m-4 my-16"
      >
        <component
          :is="currentStep.component"
          ref="root"
          v-model:loading="sendingForm"
          :product="product"
          @change-step="nextStep"
          @update:loading="sendingForm = $event"
        />
      </section>
    </div>
  </div>
</template>

<script lang="ts">

import {ref, computed, defineComponent, onMounted} from 'vue';

import Dados from '../components/steps/Dados.vue'
import Links from '../components/steps/Links.vue'
import Midias from '../components/steps/Midias.vue'
import Images from '../components/steps/Images.vue'
import Coupons from '../components/steps/Coupons.vue'
import Faq from '../components/steps/Faq.vue'
import Conversao from '../components/steps/Conversao.vue'
import { useRoute } from 'vue-router';
import { IProduct } from '@/interfaces/IProduct';
import { api } from '@/core/services/api/base';
import useNotifications from '@/core/composables/useNotifications';
import Button from '@/components/UI/Button/Button.vue';
import HeadPage from '@/components/HeadPage.vue'
import Loading from '@/components/UI/Loading/Loading.vue';

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
    Images,
    Faq,
    Button,
    HeadPage,
    Coupons,
    Loading,
    Conversao
},
  props: {
    id: {
      type: [Number,String],
      required:true
    }
  },
  setup(props) {
    const route = useRoute();
    const product = ref<IProduct>();
    const loading = ref(false);
    const root = ref<typeof Dados>();

    const { notifications } = useNotifications();

    const steps = ref<Step[]>([
      {ordem: 1,label: "Dados", component: 'Dados'},
      {ordem: 2,label: "Links", component: 'Links'},
      {ordem: 3,label: "Imagens", component: 'Images'},
      {ordem: 4,label: "Mídias", component: 'Midias'},
      {ordem: 5,label: "Cupons", component: 'Coupons'},
      {ordem: 6,label: "Faq", component: 'Faq'},
      {ordem: 7,label: "Conversão", component: 'Conversao'}
    ]);
    const sendingForm = ref(false);

    const setInitialStep = computed((): Step => {
      return route.query.redirect ? steps.value[0] : steps.value[0];
    });

    const currentStep = ref<Step>(setInitialStep.value);

    // const lastStep = computed(() => {
    //   return steps.value[steps.value.length - 1].ordem;
    // });

    const validateStep = () => {
      sendingForm.value = true;
      root.value?.submitForm();
    }

    const nextStep = () => {
      // if(currentStep.value.ordem < lastStep.value) {
      //   const next = steps.value.find(step => step.ordem == (currentStep.value.ordem + 1));
      //   if(next) {
      //     currentStep.value = next 
      //   }          
      // }
    }


    const fetchProduct = async () => {
      try {
        loading.value = true;
        const {data} = await api.get<IProduct>(`/products/${props.id}`);
        product.value = data;
      } catch (error) {
        notifications.error(error);
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      fetchProduct();
    })

    return {
      steps,
      currentStep,
      validateStep,
      nextStep,
      sendingForm,
      product,
      loading,
      root
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