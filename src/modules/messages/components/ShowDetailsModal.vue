<template>
  <Modal v-model:open="modalAtivo" screen="w-1/2">
    <template #header>
      <div class="flex items-center space-x-2">
        <div class="h-5 w-5 rounded-full bg-gray-200">
          <img src="@/assets/fake/produto.png" alt="" class="object-contain h-full w-full rounded-full" />
        </div>
        <div class="flex items-end space-x-2 divide-x divide-gray-200">
          <h3 class="text-default text-sm">Just4You</h3>
          <div class="flex items-center">
            <img src="@/assets/icons/boleto-vencido.svg" alt="" class="h-6 ml-2">
            <span class="font-light text-xs text-default pl-2 mt-1">Boleto Vencido</span>
          </div>
        </div>
      </div>
    </template>
    <template #body>
      <div class="mb-4 flex items-center space-x-4 text-xs text-color-base">
        <p><span class="font-semibold">Status:</span> Mensagem Automática</p>
        <p><span class="font-semibold">Tag:</span> Saudação</p>
      </div>
      <div>
        <p class="text-xs text-color-base leading-5">
          Nós aqui da (nome da empresa) temos uma novidade.
          AMANHÃ lançaremos a nova versão da ferramenta (nome da ferramenta)!
          Separamos alguns profissionais de marketing para testá-lo gratuitamente por 3 dias.
          E você é uma delas.
        </p>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end">
        <button class="transition hover:bg-gray-200 rounded-md p-1 flex items-center space-x-2" v-copy="'Ok'">
          <img src="@/assets/icons/copy.svg" alt="">
          <span class="text-color-base text-xs">Copiar Mensagem</span>
        </button>
      </div>
    </template>
  </Modal>
</template>

<script lang='ts'>
import useModal from '@/composables/useModal';
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    const { modalAtivo,showModal } = useModal();
    return {
      modalAtivo,
      showModal
    }
  }
})
</script>

<style lang='scss' scoped>
</style>