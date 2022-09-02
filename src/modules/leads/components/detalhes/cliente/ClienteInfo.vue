<template>
  <Card>
    <template #header>
      <div class="w-full mb-5">
        <div class="flex items-center justify-between">
          <h3 class="text-dark text-lg font-medium">
            {{ lead.customer.name }}
          </h3>
          <span class="text-xs font-light">
            Vendedor(a): <span class="text-zinc-800 font-semibold">{{ firstName(lead.seller.name) }}</span></span>
        </div>
        <span :class="['rounded-md text-xs px-1', customClass]">
          {{ lead.status_description }}
        </span>
      </div>
    </template>
    <template #body>
      <MenuTab
        v-model:tabActive="tabActive"
        :tabs="tabs"
      />

      <section class="my-5">
        <transition
          name="slide"
          mode="out-in"
        >
          <component
            :is="tabActive.component"
            :key="tabActive.label"
            :lead="lead"
          />
        </transition>
      </section>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import { PropType, ref, shallowRef } from "vue";
import Dados from './Dados.vue'
import Historico from './Historico.vue'
import Postback from './Postback.vue'
import MenuTab from '@/components/MenuTab.vue'
import { Lead } from "@/core/interfaces/Lead";
import { computed } from "@vue/reactivity";
import { LEAD_STATUS } from '@/core/constants'
import { firstName } from "@/core/helpers";

const props = defineProps({
  lead: {
    type: Object as PropType<Lead>,
    required:true
  }
})

const dados = shallowRef(Dados);
const historico = shallowRef(Historico);
const postback = shallowRef(Postback);

const tabs = ref([
  {label: "Dados", component: dados},
  {label: "Histórico", component: historico},
  {label: "Postback", component: postback}
])

const tabActive = ref(tabs.value[0])

const customClass = computed(() => {
  let clazz = "";
  switch (props.lead.status) {
    case LEAD_STATUS.AGUARDANDO_CONTATO:
      clazz = 'text-white bg-blue-500';
      break;
    case LEAD_STATUS.EM_NEGOCIACAO:
      clazz = 'text-white bg-blue-500';
      break;
    case LEAD_STATUS.CONTATO_AGENDADO:
      clazz = 'text-white bg-yellow-500';
      break;
    default:
      clazz = 'text-white bg-blue-500';
      break;
  }

  return clazz;
});

</script>

<style>

</style>