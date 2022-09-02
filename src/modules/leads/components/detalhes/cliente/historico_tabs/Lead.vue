<template>
  <div class="historico_lead">
    <div
      v-if="loading"
      class="flex justify-center my-4"
    >
      <Spinner class="h-10 w-10" />
    </div>
    <div
      v-for="item in historic"
      :key="item.id"
      class="historico_lead__item py-4"
    >
      <div class="historico_lead__item--border-left pl-4">
        <div class="flex items-start justify-between">
          <p class="text-sm text-gray-800 font-medium">
            {{ item.status_description }}
          </p>
          <span class="text-xs text-default">{{ getDateDiff(item.created_at) }}</span>
        </div>
        <div class="py-2 text-xs text-default">
          <p>Transação: {{ item.event.name }}</p>
          <p>Código da Transação: {{ item.transaction_id ?? '---' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { LeadHistoric } from '@/core/interfaces/Lead';
import { leadService } from '@/core/services/api/leads';
import { onMounted, ref } from 'vue';
import Spinner from '@/components/UI/Spinner/Spinner.vue';
import {getDateDiff} from '@/core/helpers'
  
const props = defineProps({
  leadId: {
    type: Number,
    required:true
  }
})

const loading = ref(false);
const historic = ref<LeadHistoric[]>([])
const getHistoric = async () => {
  try {
    loading.value = true;
    const {data} = await leadService.historic(props.leadId);
    historic.value = data;
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  getHistoric();
})
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