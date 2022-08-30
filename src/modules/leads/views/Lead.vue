<template>
  <div>
    <HeadPage class="mb-10">
      <RouteBack
        :route="{name:'Leads'}"
        class="h-8"
      >
        <h1 class="text-xl text-dark">
          Cláudia Moreno
        </h1>
        <template #extras>
          <div class="mx-4 px-4 flex items-center space-x-2 border-l-2 border-r-2 border-gray-300 h-full">
            <img src="@/assets/icons/boleto.svg" />
            <span class="text-xs text-default">Boleto Vencido</span>
          </div>

          <div class="space-x-3">
            <button
              v-tooltip="{text:'Enviar mensagem Whatsapp', position:'bottom'}"
              class="bg-white p-1 shadow-md rounded-md"
            >
              <img
                src="@/assets/icons/whatsapp.png"
                alt=""
                class="w-5 h-5"
              />
            </button>

            <!-- <button class="bg-white p-1 shadow-md rounded-md" v-tooltip="{text:'Enviar SMS', position:'bottom'}">
              <img src="@/assets/icons/whatsapp.png" alt="" class="w-5 h-5" />
              <span class="h-5 w-5 text-xs">SMS</span>
            </button> -->

            <button
              v-tooltip="{text:'Enviar Email', position:'bottom'}"
              class="bg-white p-1 shadow-md rounded-md"
            >
              <img
                src="@/assets/icons/gmail.png"
                alt=""
                class="w-5 h-5"
              />
            </button>

            <button
              v-tooltip="{text:'Fazer uma Ligação', position:'bottom'}"
              class="bg-white p-1 shadow-md rounded-md"
            >
              <img
                src="@/assets/icons/telefone.png"
                alt=""
                class="w-5 h-5"
              />
            </button>

            <button
              v-tooltip="{text:'Agendar Contato', position:'bottom'}"
              class="bg-white p-1 shadow-md rounded-md"
            >
              <img
                src="@/assets/icons/calendario.png"
                alt=""
                class="w-5 h-5"
              />
            </button>
          </div>
        </template>
      </RouteBack>
    </HeadPage>

    <div class="sm:space-y-8 lg:flex lg:space-y-0 lg:space-x-4 mb-10">
      <ClienteInfo class="lg:w-5/12" />
      <ProdutoInfo class="lg:w-2/3" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import RouteBack from '@/components/RouteBack.vue'
import ClienteInfo from '../components/detalhes/cliente/ClienteInfo.vue'
import ProdutoInfo from '../components/detalhes/produto/ProdutoInfo.vue'
import HeadPage from "@/components/HeadPage.vue";

export default defineComponent({
  components: {
    RouteBack,
    ClienteInfo,
    ProdutoInfo,
    HeadPage
},
  setup() {
    //
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
