<template>
  <div>
    <HeadPage class="mb-10">
      <RouteBack :route="{name:'Products'}">
        <h1 class="text-xl text-dark">
          {{ product?.name }}
        </h1>
      </RouteBack>
    </HeadPage>

    <!-- <NavTabHeader
      v-model:tabActive="tabActive"
      :tabs="tabs"
    /> -->

    <section class="m-4 my-16">
      <PageLoading v-if="loading" />
      <div v-else-if="product && product.id">
        <div class="grid grid-cols-3 mb-10">
          <div class="flex items-center space-x-4 col-span-2">
            <div class="w-16 h-16 bg-gray-200 rounded-full">
              <!-- <img src="@/assets/fake/produto.png" alt="" class="h-100 w-100 object-contain rounded-full"> -->
            </div>
            <div>
              <h3 class="font-medium text-xl">
                {{ product?.name }}
              </h3>
              <span class="text-default text-xs font-light">{{ product?.abbreviation }}</span>
            </div>
          </div>

          <!-- <div>
            <div class="flex space-x-1">
              <span class="text-default font-extralight">R$</span>
              <h3 class="text-xl font-medium">
                59,90
              </h3>
            </div>
            <span class="text-default font-medium text-xs">até 3x s/ juros</span>
          </div> -->


          <div class="flex items-center gap-4">
            <Button
              :redirect="{name: 'UpdateProduct', params: {id: product.id}}"
              radius="full"
              variant="dark"
              outline
            >
              Editar Produto
            </Button>
            <Button
              radius="full"
              variant="special"
            >
              Pausar Produto
            </Button>
          </div>
        </div>
        <transition
          name="slide-fade"
          mode="out-in"
        >
          <component
            :is="tabActive.value"
            :key="tabActive.label"
            :product="product"
          ></component>
        </transition>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from "vue";

import Dados from "../components/tabs/Dados.vue";
import Links from "../components/tabs/Links.vue";
import Midias from "../components/tabs/Midias.vue";
import Ebooks from "../components/tabs/Ebooks.vue";
import Faq from "../components/tabs/Faq.vue";
import Conversao from "../components/tabs/Conversao.vue";

import NavTabHeader from '@/components/NavTabHeader.vue';

import RouteBack from '@/components/RouteBack.vue'
import { IProduct } from "@/interfaces/IProduct";
import useNotifications from "@/composables/useNotifications";
import { api } from "@/services/api";
import PageLoading from "@/components/global/PageLoading.vue";
import Button from "@/components/UI/Button/Button.vue";

export default defineComponent({
  components: {
    Dados,
    Links,
    Midias,
    Ebooks,
    Faq,
    Conversao,
    NavTabHeader,
    RouteBack,
    PageLoading,
    Button
},
  props: {
    id: {
      type: Number,
      required:true
    }
  },
  setup(props) {
    const loading = ref(false);
    const {notifications} = useNotifications();
    const tabs = [
      { label: "Dados", value: 'Dados'},
      { label: "Links", value: 'Links' },
      { label: "Mídias", value: 'Midias' },
      { label: "Ebooks", value: 'Ebooks' },
      { label: "Faq", value: 'Faq' },
      { label: "Conversão", value: 'Conversao' },
    ]
    const tabActive = ref(tabs[0]);


    const product = ref<IProduct>();
    const fetchProduct = async () => {
      try {
        loading.value = true;
        const {data} = await api.get<IProduct>(`/products/${props.id}`)
        product.value = data;
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
