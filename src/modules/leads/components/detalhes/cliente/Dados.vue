<template>
  <div class="dados">
    <div>
      <h4 class="mb-4 text-md text-default font-semibold">
        Dados da Compra
      </h4>
      <ul class="text-sm text-default font-light">
        <li>
          <span>Motivo:</span> {{ lead.event.name }}
        </li>
        <li>
          <span>Plataforma:</span> {{ lead.platform.name }}
        </li>
        <li>
          <span>Código da Transação:</span> {{ lead.transaction_id ?? "" }}
        </li>
        <li>
          <span>Data:</span> {{ formatDateTimeISO(lead.created_at) }}
        </li>
      </ul>
    </div>

    <div class="border-t-2 border-b-2 border-gray-200">
      <div class="flex items-center justify-between mb-4">
        <h4 class="text-md text-default font-semibold">
          Dados do Cliente
        </h4>
        <button class="text-blue-500 text-xs flex items-center space-x-1 font-light">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 underline"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          <span>Editar Telefone</span>
        </button>
      </div>
      <ul class="text-sm text-default font-light">
        <li>
          <span>Nome:</span> {{ lead.customer.name }}
        </li>
        <li>
          <span>Telefone:</span> {{ lead.customer.phone ? maskPhone(lead.customer.phone) : '---' }}
        </li>
        <li>
          <span>Email:</span> {{ lead.customer.email ?? "---" }}
        </li>
        <li>
          <span>CPF:</span> {{ lead.customer.document ?? '---' }}
        </li>
      </ul>
    </div>

    <div>
      <h4 class="mb-4 text-md text-default font-semibold">
        Endereço do Cliente
      </h4>
      <ul class="text-sm text-default font-light">
        <li>
          <span>logradouro:</span> {{ lead.customer.address ?? '---' }}
        </li>
        <li>
          <span>Número:</span> {{ lead.customer.address_number ?? '---' }}
        </li>
        <li>
          <span>Bairro:</span> {{ lead.customer.district ?? '---' }}
        </li>
        <li>
          <span>Cidade/UF:</span> {{ cityState }}
        </li>
        <li>
          <span>Cep:</span> {{ lead.customer.zipcode ?? '---' }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDateTime } from '@/core/composables/useDateTime';
import { maskPhone } from '@/core/helpers';
import { Lead } from '@/core/interfaces/Lead';
import { computed } from '@vue/reactivity';
import { PropType } from 'vue';

const { formatDateTimeISO } = useDateTime()

const props = defineProps({
  lead: {
    type: Object as PropType<Lead>,
    required:true
  }
})

const cityState = computed(() => {
  if(props.lead.customer.city) {
    return `${props.lead.customer.city} - ${props.lead.customer.state}`
  }
  return '---'
})

</script>

<style scoped lang="scss">
.dados {
  & > div {
    padding: 1.5rem 1rem;
    font-size: 14px;
    font-weight: light;
    li span {
      color: #444;
    }
  }
}
</style>