<template>
  <div>
    <HeadPage class="mb-10">
      <h1 class="text-md lg:text-2xl text-gray-600">
        Produtos
      </h1>
    </HeadPage>

    <NavTabHeader
      v-model:tabActive="tabActive"
      :tabs="tabs"
    >
      <template #acessorios>
        <button
          class="flex items-center space-x-2 text-sm text-default"
          @click="habilitarFiltro = !habilitarFiltro"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
          Filtrar
        </button>
      </template>
    </NavTabHeader>

    <transition
      name="slide"
      mode="out-in"
    >
      <Filtros v-if="habilitarFiltro" />
    </transition>

    <div class="my-10 flex justify-end">
      <ButtonRouter
        :to="{name: 'CreateProduct'}"
        variant="dark"
        size="sm"
        :rounded="true"
      >
        Adicionar Produto
      </ButtonRouter>
    </div>

    <PageLoading v-if="loading" />

    <div v-else-if="products && products.length">
      <div class="space-y-4 lg:space-y-0 md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-6">
        <CardProduto
          v-for="product in products"
          :key="product.name"
          :product="product"
        />
      </div>
      <Paginacao
        :por-pagina="pagination.limit"
        :total="pagination.total"
      />
    </div>
    <p v-else>
      Nenhum registro encontrado.
    </p>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue';
import CardProduto from '../components/CardProduto.vue'
import Paginacao from '@/components/Paginacao.vue';
import NavTabHeader from '@/components/NavTabHeader.vue';
import Filtros from "../components/Filtros.vue"
import { api } from '@/services';
import { IProductData } from '@/interfaces/IProduct';
import usePagination from '@/composables/usePagination';
import { IPagination } from '@/interfaces/IPagination';
import ButtonRouter from '@/components/UI/Button/ButtonRouter.vue';

export default defineComponent({
  components: {
    CardProduto,
    Paginacao,
    NavTabHeader,
    Filtros,
    ButtonRouter
},
  setup() {
    const { pagination } = usePagination();
    const loading = ref(false);
    const products = ref<IProductData[]>();
    const tabs = [
      {label: "Ativos", component:"Ativo"},
      {label: "Pausados", component:"Pausados"},
    ];
    const tabActive = ref(tabs[0]);
    const habilitarFiltro = ref(false);

    const fetchProducts = async () => {
      try {
        loading.value = true;
        const {data} = await api.get<{products: IProductData[], pagination: IPagination}>('/products');
        products.value = data.products;
        pagination.value = data.pagination;
      } catch (error) {
        console.log(error);
      } finally {
        loading.value = false;
      }
    }

    onMounted(() => {
      fetchProducts();
    })

    return {
      tabs, 
      habilitarFiltro,
      tabActive,
      loading,
      products,
      pagination
    }
  }
})

</script>

<style scoped>

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}

.slide-enter-active,
.slide-leave-active {
  transition: all .3s;
}

</style>