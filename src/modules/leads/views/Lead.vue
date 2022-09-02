<template>
  <div>
    <HeadPage class="mb-10">
      <RouteBack
        :route="{name:'Leads'}"
        class="h-8"
      >
        <h1 class="text-xl text-dark">
          {{ lead?.customer.name }}
        </h1>
        <template #extras>
          <div
            v-if="lead"
            class="mx-4 px-4 flex items-center space-x-2 border-l-2 border-r-2 border-gray-300 h-full"
          >
            <EventIcon
              :event-id="lead?.event_id"
              class="w-8 h-8"
            />
            <span class="text-xs text-default">{{ lead.event.name }}</span>
          </div>

          <div class="space-x-3">
            <button
              v-tooltip="{text:'Enviar mensagem Whatsapp', position:'bottom'}"
              class="bg-white p-1 shadow-md rounded-md"
            >
              <PhWhatsappLogo size="20" />
            </button>

            <!-- <button class="bg-white p-1 shadow-md rounded-md" v-tooltip="{text:'Enviar SMS', position:'bottom'}">
              <img src="@/assets/icons/whatsapp.png" alt="" class="w-5 h-5" />
              <span class="h-5 w-5 text-xs">SMS</span>
            </button> -->

            <button
              v-tooltip="{text:'Enviar Email', position:'bottom'}"
              class="bg-white p-1 shadow-md rounded-md"
            >
              <PhEnvelope size="20" />
            </button>

            <button
              v-tooltip="{text:'Fazer uma Ligação', position:'bottom'}"
              class="bg-white p-1 shadow-md rounded-md"
            >
              <PhPhone size="20" />
            </button>

            <button
              v-tooltip="{text:'Agendar Contato', position:'bottom'}"
              class="bg-white p-1 shadow-md rounded-md"
            >
              <PhCalendar size="20" />
            </button>
          </div>
        </template>
      </RouteBack>
    </HeadPage>

    <Loading v-if="loading" />
    <div
      v-else-if="lead"
      class="sm:space-y-8 lg:flex lg:space-y-0 lg:space-x-4 mb-10"
    >
      <ClienteInfo
        class="lg:w-5/12"
        :lead="lead"
      />
      <ProdutoInfo
        class="lg:w-2/3"
        :lead="lead"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import RouteBack from '@/components/RouteBack.vue'
import ClienteInfo from '../components/detalhes/cliente/ClienteInfo.vue'
import ProdutoInfo from '../components/detalhes/produto/ProdutoInfo.vue'
import HeadPage from "@/components/HeadPage.vue";
import { onMounted, ref } from 'vue';
import { Lead } from '@/core/interfaces/Lead';
import { leadService } from '@/core/services/api/leads';
import useNotifications from '@/core/composables/useNotifications';
import EventIcon from '@/components/EventIcon.vue';
import { PhPhone, PhEnvelope, PhWhatsappLogo, PhCalendar } from 'phosphor-vue';
import Loading from '@/components/UI/Loading/Loading.vue';

const props = defineProps({
  id: {
    type: Number,
    required:true
  }
})
const { notifications } = useNotifications()
const loading = ref(false);
const lead = ref<Lead>()
const getLead = async () => {
  try {
    loading.value = true;
    const {data} = await leadService.findById(props.id)
    lead.value = data;
  } catch (error) {
    notifications.error(error);
  } finally {
    loading.value = false;
  }
}


onMounted(() => {
  getLead()
})

</script>

<style scoped lang="scss">
.steps {
  &::after {
    top: 14px;
    content: "";
    display: block;
    height: 2px;
    width: 100%;
    position: absolute;
    background: #eee;
  }
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all .3s;
}


.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

</style>
