<template>
  <div>
    <HeadPage title="Produtos" />

    <NavTabHeader
      v-model:tabActive="tabActive"
      :tabs="tabs"
    >
      <template #acessorios>
        <button
          class="flex items-center text-sm text-default gap-1"
          @click="habilitarFiltro = !habilitarFiltro"
        >
          <PhFunnelSimple />
          <span>Filtrar</span>
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
      <Button
        :redirect="{name: 'CreateProduct'}"
        variant="dark"
        radius="full"
      >
        Adicionar Produto
      </Button>
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
        :por-pagina="pagination.per_page"
        :total="pagination.total"
      />
    </div>
    <p v-else>
      Nenhum registro encontrado.
    </p>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import CardProduto from '../components/CardProduto.vue'
import Paginacao from '@/components/Paginacao.vue';
import NavTabHeader from '@/components/NavTabHeader.vue';
import Filtros from "../components/Filtros.vue"
import { api } from '@/services/api';
import { IProductData } from '@/interfaces/IProduct';
import usePagination from '@/composables/usePagination';
import { IPagination } from '@/interfaces/IPagination';
import Button from '@/components/UI/Button/Button.vue';
import HeadPage from '@/components/HeadPage.vue';
import { PhFunnelSimple } from 'phosphor-vue'

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
    const {data: {data, ...paginationProps}} = await api.get<IPagination<IProductData[]>>('/products');
    products.value = data;
    pagination.value = paginationProps
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchProducts();
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