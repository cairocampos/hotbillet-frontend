<template>
  <div class="interacao">
    <div
      v-for="item in 5"
      :key="item"
      class="interacao__item"
    >
      <div class="flex items-start justify-between">
        <div class="flex items-center space-x-2">
          <img
            src="@/assets/icons/calendario.png"
            class="h-4 w-4 z-10"
            alt=""
          >
          <p class="text-xs text-gray-800">
            Lead Agendado
          </p>
        </div>
        <span class="text-xs text-default">Há 12 min</span>
      </div>
      <div class="py-2 px-6">
        <p class="text-xs font-light text-default">
          Agendado para: 25/12/2022
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { leadService } from '@/core/services/api/leads';
import { onMounted, ref } from 'vue';

const props = defineProps({
  leadId: {
    type: Number,
    required:true
  }
})


const loading = ref(false);
const getFeeds = async () => {
  try {
    loading.value = true;
    const {data} = await leadService.feeds(props.leadId);

  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  getFeeds();
})

</script>

<style scoped lang="scss">
.interacao {
  position: relative;
  &::before {
    content: "";
    height:100%;
    width: 2px;
    background: #EEE;
    position: absolute;
    top: 0;
    left:7px;
    z-index: 1;
  }
  &__item {
    min-height: 80px;
  }
}

</style>