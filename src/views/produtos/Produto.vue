<template>
  <div>
    <HeadPage class="mb-10">
      <RouteBack :route="{name:'Produtos'}">
        <h1 class="text-xl text-dark">Just4You</h1>
      </RouteBack>
    </HeadPage>

    <NavTabHeader :tabs="tabs" v-model:tabActive="tabActive"/>

    <section class="m-4 my-16">
      <PageLoading v-if="loading" />
      <div v-else-if="product && product.id">
        <div class="grid grid-cols-3 mb-10">
          <div class="flex items-center space-x-4">
            <div class="w-16 h-16 bg-gray-200 rounded-full">
              <!-- <img src="@/assets/fake/produto.png" alt="" class="h-100 w-100 object-contain rounded-full"> -->
            </div>
            <div>
              <h3 class="font-medium text-xl">{{product?.name}}</h3>
              <span class="text-default text-xs font-light">{{product?.abbreviation}}</span>
            </div>
          </div>

          <div>
            <div class="flex space-x-1">
              <span class="text-default font-extralight">R$</span>
              <h3 class="text-xl font-medium">59,90</h3>
            </div>
            <span class="text-default font-medium text-xs">até 3x s/ juros</span>
          </div>


          <div class="space-x-2">
            <router-link :to="{name: 'EditarProduto', params: {id: 1}}" class="btn btn-sm btn-outline-secondary rounded-full">Editar Produto</router-link>
            <button class="btn btn-sm btn-primary rounded-full">Pausar Produto</button>
          </div>

        </div>
        <transition name="slide-fade" mode="out-in">
          <component :is="tabActive.value" :key="tabActive.label" :product="product"></component>
        </transition>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from "vue";

import Dados from "@/components/produtos/tabs/Dados.vue";
import Links from "@/components/produtos/tabs/Links.vue";
import Midias from "@/components/produtos/tabs/Midias.vue";
import Ebooks from "@/components/produtos/tabs/Ebooks.vue";
import Faq from "@/components/produtos/tabs/Faq.vue";
import Conversao from "@/components/produtos/tabs/Conversao.vue";

import NavTabHeader from '@/components/NavTabHeader.vue';

import RouteBack from '@/components/RouteBack.vue'
import { IProduct } from "@/interfaces/IProduct";
import useNotifications from "@/composables/useNotifications";
import { api } from "@/services";
import PageLoading from "@/components/global/PageLoading.vue";

export default defineComponent({
  props: {
    id: {
      type: Number
    }
  },
    components: {
    Dados,
    Links,
    Midias,
    Ebooks,
    Faq,
    Conversao,
    NavTabHeader,
    RouteBack,
    PageLoading
},
    setup(props) {
      const loading = ref(false);
      const {notifications} = useNotifications();
        const product = ref<IProduct>();
        const tabs = [
            { label: "Dados", value: 'Dados'},
            { label: "Links", value: 'Links' },
            { label: "Mídias", value: 'Midias' },
            { label: "Ebooks", value: 'Ebooks' },
            { label: "Faq", value: 'Faq' },
            { label: "Conversão", value: 'Conversao' },
        ]
        const tabActive = ref(tabs[0]);


        const fetchProduct = async () => {
          try {
            loading.value = true;
            const {data} = await api.get<{product: IProduct}>(`/products/${props.id}`)
            product.value = data.product;
          } catch (error) {
            notifications.error(error);
          } finally {
            loading.value = false;
          }
        }

        onMounted(() => {
          fetchProduct();
        })

        return {
            tabs, tabActive,
            product,
            loading
        }
    }
})

</script>

<style scoped lang="scss">
.steps {
  &::after {
    top: 14px;
    content: "";
    display: block;
    height: 2px;
    width: 100%;
    position: absolute;
    background: #eee;
  }
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all .3s;
}


.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

</style>
