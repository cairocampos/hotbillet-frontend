<template>
  <div class="historico_cliente">
    <div
      v-for="item in 5"
      :key="item"
      class="historico_cliente__item py-4"
    >
      <div class="flex items-start justify-between">
        <h3 class="text-sm text-gray-800 font-medium">
          Lead Desistiu da Compra
        </h3>
        <span class="text-xs text-default">Há 8 horas</span>
      </div>

      <div class="flex flex-col">
        <div class="py-2 text-xs text-default">
          <p>Transação: Cartão de Crédito</p>
          <p>Código da Transação: 123456789</p>
        </div>
        <div class="flex items-center space-x-2">
          <img
            src="@/assets/fake/perfil.jpeg"
            alt=""
            class="h-6 w-6 rounded-full"
          />
          <div class="text-xs text-default">
            <p>Vendedor: Mateus</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_variables";
.historico_cliente {
  &__item {
    position: relative;
  }
  &__item:not(:first-child) {
    border-top: 1px solid #eee;
  }
  &__item:not(:last-child) {
    border-bottom: 1px solid #ccc;
  }
  &__item--border-left {
    position: relative;
  }
}
</style>