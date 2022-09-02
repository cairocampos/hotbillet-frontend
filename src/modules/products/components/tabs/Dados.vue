<template>
  <div class="space-y-10">
    <div class="grid grid-cols-2">
      <div>
        <p class="text-sm text-dark">
          Empresa
        </p>
        <span class="text-default text-xs">Hotbillet</span>
      </div>

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

    <div class="grid grid-cols-2">
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
          Produto adicionado em:
        </p>
        <span class="text-default text-xs">
          {{ formatDateTimeISO(product.created_at) }}
        </span>
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
import { useDateTime } from "@/core/composables/useDateTime";
import { Product } from "@/core/interfaces/Product";
import { PropType } from "@vue/runtime-core";

const { formatDateTimeISO } = useDateTime();

defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true
  }
})
</script>

<style>

</style>