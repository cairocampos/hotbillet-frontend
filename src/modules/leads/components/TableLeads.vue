<template>
  <div>
    <Loading
      v-if="loading"
    />
    <table
      v-else
      class="table table-white table-sm w-full my-10"
    >
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
              <EventIcon
                :event-id="lead.event.id"
                class="h-5 w-5"
              />
              <span class="text-xs text-gray-800">{{ lead.event.name }}</span>
            </div>
          </td>
          <td>{{ lead.customer.name }}</td>
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
              :src="lead?.product_image ?? ''"
              loading="lazy"
              class="object-contain h-10 w-10 rounded-full"
              @error="useFallbackImage"
            />
            <span>{{ lead.product_name }}</span>
          </td>
          <td class="text-sm">
            <p class="font-md font-semibold">
              {{ getDateDiff(lead.created_at) }}
            </p>
            <span class="font-light text-gray-500 text-xs">
              {{ formatDateTimeISO(lead.created_at) }}
            </span>
          </td>
          <td>
            <div class="flex items-center justify-end space-x-2 divide-x-2 divide-gray-200">
              <button
                v-if="lead.customer.phone"
                v-tooltip="'Abrir Whatsapp'"
                @click="redirectToWhatsapp(lead.id, lead.customer.phone)"
              >
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
  </div>
</template>

<script lang="ts" setup>
import { leadService } from "@/core/services/api/leads";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import {Lead} from '@/core/interfaces/Lead'
import {firstName} from '@/core/helpers'
import EventIcon from "@/components/EventIcon.vue";
import useFallbackImage from "@/core/composables/useFallbackImage";
import { useDateTime } from "@/core/composables/useDateTime";
import usePagination from "@/core/composables/usePagination";
import Loading from "@/components/UI/Loading/Loading.vue";
const router = useRouter();
const { formatDateTimeISO, dateDiffNow } = useDateTime()

const showLead = (lead_id: number) => {
  router.push({path: `/leads/${lead_id}`});
}

const { data: leads } = usePagination<Lead>();
const loading = ref(false)
const getLeads = async () => {
  try {
    loading.value = true
    const {data: {data}} = await leadService.all()
    leads.value = data
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false;
  }
}

const getDateDiff = (date:string) => {
  const diff = dateDiffNow(date);
  if(diff?.days) {
    return `${diff.days} atrás`;
  }

  if(diff.hours) {
    return `${diff.hours}hr atrás`
  }

  if(diff.minutes) {
    return `${diff.minutes} min`
  }
}

const redirectToWhatsapp = (lead_id: number, phone:string) => {
  window.open(`https://api.whatsapp.com/send?phone=${phone}`,  '_blank');
  router.push({name: 'Lead', params: {id: lead_id}})
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