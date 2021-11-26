<template>
  <table class="table table-white table-sm w-full my-10">
      <thead>
        <th class="text-default font-medium text-xs">Transação</th>
        <th class="text-default font-medium text-xs">Cliente</th>
        <th class="text-default font-medium text-xs">Status</th>
        <th class="text-default font-medium text-xs">Atendente</th>
        <th class="text-default font-medium text-xs">Produto</th>
        <th class="text-default font-medium text-xs">Data</th>
        <th align="center" class="text-default font-medium text-xs w-30">Ações</th>
      </thead>
      <tbody>
        <tr v-for="item in 10" :key="item">
          <td>
            <div class="flex space-x-2">
              <img src="@/assets/icons/boleto.svg" class="h-5 w-5">
              <span class="text-xs text-gray-800">Boleto Vencido</span>
            </div>
          </td>
          <td>Alan Alves</td>
          <td>
            <div class="leads__status">
              <div class="tag tag__em_negociacao"></div>
              <span>Aguardando Contato</span>
            </div>
          </td>
          <td class="font-medium">Mateus</td>
          <td class="flex items-center space-x-2">
            <img src="@/assets/fake/produto.png" alt="" class="object-cover h-10 w-10 rounded-full" />
            <span>Just4You</span>
          </td>
          <td class="text-sm">
            <p class="font-md font-semibold">30 min</p>
            <span class="font-light text-gray-500 text-xs">25/02/2021 às 11:45</span>
          </td>
          <td>
            <div class="flex items-center justify-end space-x-2 divide-x-2 divide-gray-200">
              <button v-tooltip="'Abrir Whatsapp'">
                <img src="@/assets/icons/whatsapp.png">
              </button>
              <button class="flex items-center text-xs px-2" @click="showLead">
                <span class="font-medium mr-2">Ver</span> 
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();

    const showLead = () => {
      router.push({path: '/leads/10'});
    }

    return {
      showLead
    }
  }
})
</script>

<style scoped lang="scss">
@import "@/assets/scss/_variables";
.icone__filtro {
  transform: rotate(90deg);
}

.leads {
  &__status {
    height: 100%;
    display: flex;
    align-items: center;
    word-break: break-all;
    .tag {
      height: 35px;
      width:8px;
      background: $blue;
      display: block;
      margin-right: 6px;
      border-radius: 4px;
      &__em_negociacao {
        background-color: $blue;
      }
    }
    span {
      font-size: 12px;
    }
  }
}
</style>