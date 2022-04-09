<template>
  <div class="grid grid-cols-2">
    <div>
      <p class="text-sm text-dark my-4">
        Tipos de Transações
      </p>
      <ul class="text-xs text-default space-y-4 font-light">
        <li>Boleto Impresso</li>
        <li>Cartão Cancelado</li>
        <li>Pix Aprovado</li>
        <li>Pix</li>
        <li>Abandono de Checkout</li>
      </ul>
    </div>

    <div>
      <button class="btn btn-sm btn-dark rounded-md mb-4">
        Links de Postback
      </button>
      <Card>
        <template #header>
          <div class="text-xs font-light text-default">
            Resumo de Leads (Últimos 2 meses)
          </div>
        </template>

        <template #body>
          <div class="flex justify-around">
            <div class="text-center flex flex-col">
              <h3 class="text-2xl text-ble-500">
                235
              </h3>
              <span class="text-xs font-light text-default">Total</span>
            </div>

            <div class="text-center flex flex-col">
              <h3 class="text-2xl text-yellow-500">
                235
              </h3>
              <span class="text-xs font-light text-default">Em negociaçao</span>
            </div>

            <div class="text-center flex flex-col">
              <h3 class="text-2xl text-green-500">
                235
              </h3>
              <span class="text-xs font-light text-default">Convertidos</span>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>