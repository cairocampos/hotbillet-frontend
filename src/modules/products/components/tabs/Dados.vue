<template>
  <div class="space-y-10">
    <div class="grid grid-cols-2">
      <div>
        <p class="text-sm text-dark">
          Subtitulo
        </p>
        <span class="text-default text-xs">
          ---
        </span>
      </div>

      <div>
        <p class="text-sm text-dark">
          Empresa
        </p>
        <span class="text-default text-xs">Hotbillet</span>
      </div>

      <div class="space-y-1">
        <p class="text-sm text-dark">
          Suporte do Fornecedor
        </p>
        <span class="text-default text-xs block">
          Email: {{ product?.support_email ?? '---' }}
        </span>
        <span class="text-default text-xs block">
          Telefone: {{ product?.support_phone ?? '---' }}
        </span>
      </div>
    </div>

    <div class="grid grid-cols-3">
      <div>
        <p class="text-sm text-dark">
          Link do Produto
        </p>
        <a
          :href="product?.url"
          target="_blank"
          class="text-blue-500 text-xs"
        >{{ product?.url ?? '---' }}</a>
      </div>

      <div>
        <p class="text-sm text-dark">
          Tipo
        </p>
        <span class="text-default text-xs">
          {{ product?.type_description ?? "---" }}
        </span>
      </div>

      <div>
        <p class="text-sm text-dark">
          Meios de Pagamento
        </p>
        <ul class="flex items-center space-x-2 text-default text-xs">
          <li class="flex items-center space-x-2">
            <img
              src="@/assets/icons/boleto.svg"
              alt=""
            > <span>Boleto</span>
          </li>
          <li class="flex items-center space-x-2">
            <img
              src="@/assets/icons/boleto.svg"
              alt=""
            > <span>Cartão</span>
          </li>
          <li class="flex items-center space-x-2">
            <img
              src="@/assets/icons/pix.svg"
              alt=""
            > <span>Pix</span>
          </li>
        </ul>
      </div>
    </div>

    <div>
      <p class="text-sm text-dark">
        Descrição
      </p>
      <p class="text-xs text-default">
        {{ product?.description ?? '---' }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IProduct } from "@/interfaces/IProduct";
import { PropType } from "@vue/runtime-core";

defineProps({
  product: {
    type: Object as PropType<IProduct>,
    required: true
  }
})
</script>

<style>

</style>