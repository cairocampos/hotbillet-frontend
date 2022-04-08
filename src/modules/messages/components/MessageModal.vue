<template>
  <Modal v-model:open="modalAtivo" title="Adicionar Mensagem" screen="w-1/2">
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
        <Button
          title="Adicionar"
          class="btn btn-sm rounded-md btn-dark"
        />
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