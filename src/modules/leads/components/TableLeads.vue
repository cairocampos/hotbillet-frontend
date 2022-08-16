<template>
  <table class="table table-white table-sm w-full my-10">
    <thead>
      <th class="text-default font-medium text-xs">
        Transação
      </th>
      <th class="text-default font-medium text-xs">
        Cliente
      </th>
      <th class="text-default font-medium text-xs">
        Status
      </th>
      <th class="text-default font-medium text-xs">
        Atendente
      </th>
      <th class="text-default font-medium text-xs">
        Produto
      </th>
      <th class="text-default font-medium text-xs">
        Data
      </th>
      <th
        align="center"
        class="text-default font-medium text-xs w-30"
      >
        Ações
      </th>
    </thead>
    <tbody>
      <tr
        v-for="lead in leads"
        :key="lead.id"
      >
        <td>
          <div class="flex space-x-2 items-center">
            <img
              src="@/assets/icons/boleto.svg"
              class="h-5 w-5"
            >
            <span class="text-xs text-gray-800">{{ lead.event.name }}</span>
          </div>
        </td>
        <td>{{ lead.customer_name }}</td>
        <td>
          <div class="leads__status">
            <div class="tag tag__em_negociacao"></div>
            <span>{{ lead.status_description }}</span>
          </div>
        </td>
        <td class="font-medium">
          {{ firstName(lead.seller.name) }}
        </td>
        <td class="flex items-center space-x-2">
          <img
            src="@/assets/fake/produto.png"
            alt=""
            class="object-cover h-10 w-10 rounded-full"
          />
          <span>{{ lead.product_name }}</span>
        </td>
        <td class="text-sm">
          <p class="font-md font-semibold">
            30 min
          </p>
          <span class="font-light text-gray-500 text-xs">25/02/2021 às 11:45</span>
        </td>
        <td>
          <div class="flex items-center justify-end space-x-2 divide-x-2 divide-gray-200">
            <button v-tooltip="'Abrir Whatsapp'">
              <img src="@/assets/icons/whatsapp.png">
            </button>
            <button
              class="flex items-center text-xs px-2"
              @click="showLead(lead.id)"
            >
              <span class="font-medium mr-2">Ver</span> 
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import { fetchLeads } from "@/core/services/api/leads";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import {Lead} from '@/core/interfaces/Lead'
import {firstName} from '@/helpers'
const router = useRouter();

const leads = ref<Lead[]>([])
const showLead = (lead_id: number) => {
  router.push({path: `/leads/${lead_id}`});
}

const loading = ref(false)
const getLeads = async () => {
  try {
    const {data: {data}} = await fetchLeads()
    leads.value = data
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  getLeads()
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
      background: $info;
      display: block;
      margin-right: 6px;
      border-radius: 4px;
      &__em_negociacao {
        background-color: $info;
      }
    }
    span {
      font-size: 12px;
    }
  }
}
</style>