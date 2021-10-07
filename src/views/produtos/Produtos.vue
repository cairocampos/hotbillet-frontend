<template>
  <div>
    <HeadPage class="mb-10">
      <h1 class="text-2xl text-gray-600">Produtos</h1>
    </HeadPage>

    <NavTabHeader :tabs="tabs">
      <template #acessorios>
        <button @click="habilitarFiltro = !habilitarFiltro" class="flex items-center space-x-2 text-sm text-default">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Filtrar
        </button>
      </template>
    </NavTabHeader>

    <transition name="slide" mode="out-in">
      <Filtros v-if="habilitarFiltro" />
    </transition>
    
    <div class="my-10 text-right">
      <router-link :to="{name: 'AdicionarProduto'}" class="btn btn-sm btn-dark rounded-full py-3">Adicionar Produto</router-link>
    </div>
    <div class="grid grid-cols-4 gap-6">
      <CardProduto v-for="item in 12" :key="item"/>
    </div>
    <Paginacao :por-pagina="10" :total="300" />

  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import CardProduto from '@/components/produtos/CardProduto.vue'
import Paginacao from '@/components/Paginacao.vue';
import NavTabHeader from '@/components/NavTabHeader.vue';
import Filtros from "@/components/produtos/Filtros.vue"

const tabs = [
  {label: "Ativos", value:"ativos"},
  {label: "Pausados", value:"pausados"},
];

const habilitarFiltro = ref(false);

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