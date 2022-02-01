<template>
  <div>
    <HeadPage class="mb-10">
      <h1 class="text-2xl text-gray-600">Novo Produto</h1>
    </HeadPage>


    <div class="flex items-start justify-between">
        <ul class="steps hidden md:flex space-x-16 relative">
            <li v-for="step in steps" :key="step.label" class="text-sm text-default md:flex flex-col items-center space-y-4">
              <div 
                :class="['steps__circle rounded-full w-8 h-8 border-2 flex items-center justify-center text-xs bg-gray-100 z-10',
                step.ordem === 1 ? 'border-gray-800' : ''
                ]">
                <span :class="[step.ordem === 1 ? 'text-black font-medium' : '']">{{step.ordem}}º</span>
              </div>
              <span :class="[step.ordem === 1 ? 'text-black font-medium' : '']">{{step.label}}</span>
            </li>
        </ul>
        <transition name="slide">
          <div v-if="loading" key="teste1">
            <button class="btn btn-sm btn-dark rounded-full flex space-x-2 items-center">
              <Loading class="h-5 w-5" />
              <span>Salvando...</span>
            </button>
          </div>
          <div v-else class="space-x-2" key="teste2">
            <Button
              @click="submitForm"
              :loading="loading"
              :disabled="loading"
              title="Salvar e Continuar"
              class="btn btn-sm btn-dark rounded-full"
            />
            <button class="btn btn-sm btn-outline-secondary rounded-full">Cancelar</button>
          </div>
        </transition>
    </div>

    <section class="m-4 my-16">
      <form class="lg:grid lg:grid-cols-2 lg:gap-32 form-sm">

        <div class="space-y-12">
            <div class="form-group">
                <label for="" class="label">Nome do Produto</label>
                <input type="text" class="form-control form-control-line" v-model="form.name" />
            </div>
            <div class="form-group">
                <label for="" class="label">Subtitulo</label>
                <input type="text" class="form-control form-control-line" v-model="form.abbreviation"/>
            </div>
            <div class="form-group">
                <label for="" class="label">Link do Produto</label>
                <input type="text" class="form-control form-control-line" v-model="form.url" placeholder="Cole aqui a URL da página do produto" />
            </div>
            <div class="form-group">
                <label for="" class="label">Tipo de Produto</label>
                <select class="form-control form-control-line" v-model="form.product_type">
                  <option v-for="product_type in PRODUCT_TYPE" :value="product_type" :key="product_type">
                    {{product_type}}
                  </option>
                </select>
            </div>
        </div>

        <div class="mt-10 md:mt-0 space-y-12">
            <div class="form-group">
                <label class="label">Contato do Suporte</label>
                <div class="input-group input-group-line">
                    <div class="input-prepend mr-2">
                        <span class="text-default">
                            Telefone:
                        </span>
                    </div>
                    <input v-model="form.support_tel" type="text" v-maska="'(##) #####-####'" placeholder="(xx) xxxxx-xxxx" class="bg-transparent outline-none">
                </div>
            </div>
            <div class="form-group">
                <label class="label"></label>
                <div class="input-group input-group-line">
                    <div class="input-prepend mr-2">
                        <span class="text-default">
                            Email:
                        </span>
                    </div>
                    <input v-model="form.support_email" type="text" placeholder="suporte@suporte.com" class="bg-transparent outline-none">
                </div>
            </div>
            <div class="form-group">
                <label for="" class="label">Descrição do Produto</label>
                <textarea v-model="form.description" class="form-control form-control-line border rounded-sm" placeholder="Descreva o produto aqui" rows="10"></textarea>
            </div>
        </div>
          
      </form>
    </section>

  </div>
</template>

<script lang="ts">

import {ref, defineComponent} from 'vue';
import useNotifications from '@/composables/useNotifications';
import { IProduct, IProductData } from '@/interfaces/IProduct';
import { useRouter } from 'vue-router';
import useConstants from '@/composables/useConstants';
import { api } from '@/services';
interface Step {
    label:string;
    ordem:number;
}
export default defineComponent({
  setup() {
    const { PRODUCT_TYPE } = useConstants();
    const router = useRouter();
    const steps = ref<Step[]>([
        {ordem: 1,label: "Dados"},
        {ordem: 2,label: "Links"},
        {ordem: 3,label: "Mídias"},
        {ordem: 4,label: "Ebooks"},
        {ordem: 5,label: "Faq"},
        {ordem: 6,label: "Conversão"}
    ]);
    const form = ref<IProductData>({
      name: '',
      abbreviation:"",
      company_id:1,
      url:'',
      product_type: 'FISICO',
      status: 'ATIVO',
      support_email:'',
      support_tel:'',
      description: ''
    });
    const loading = ref(false);

    const {notifications} = useNotifications();
    const submitForm = async () => {
      try {
        loading.value = true;
        const {data} = await api.post<IProduct>('/products', form.value);
        notifications.success('Continue cadastrando os dados do seu produto.')
        router.push({name: 'EditarProduto', params: {id: data.id}, query: {redirect:1}})
      } catch (error) {
        notifications.error(error);
      } finally {
        loading.value = false;
      }
    }

    return {
      steps,
      loading,
      form,
      submitForm,
      PRODUCT_TYPE
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