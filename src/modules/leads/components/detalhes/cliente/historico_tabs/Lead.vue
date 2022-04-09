<template>
  <div class="historico_lead">
    <div
      v-for="item in 5"
      :key="item"
      class="historico_lead__item py-4"
    >
      <div class="historico_lead__item--border-left pl-4">
        <div class="flex items-start justify-between">
          <p class="text-sm text-gray-800 font-medium">
            Comprometeu-se
          </p>
          <span class="text-xs text-default">Há 12 min</span>
        </div>
        <div class="py-2 text-xs text-default">
          <p>Transação: Cartão de Crédito</p>
          <p>Código da Transação: 123456789</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables';
.historico_lead {
  &__item {
    position: relative;
  }
  &__item:not(:first-child) {
    border-top: 1px solid #EEE;
  }
  &__item:not(:last-child) {
    border-bottom: 1px solid #CCC;
  }
  &__item--border-left {
    position: relative;
  }
  &__item--border-left::before {
    content: "";
    height: 100%;
    width: 6px;
    background-color: $yellow;
    position: absolute;
    top: 0;
    left:0;
    border-radius: 6px;
  }
}

</style>