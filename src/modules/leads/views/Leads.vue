<template>
  <div>
    <HeadPage>
      <h1 class="text-2xl text-gray-600">
        Leads
      </h1>
    </HeadPage>

    <NavTabHeader
      v-model:tabActive="tabActive"
      :tabs="tabs"
    >
      <template #acessorios>
        <button
          class="flex items-center space-x-2 text-sm text-default"
          @click="habilitarFiltro = !habilitarFiltro"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 icone__filtro mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
          Filtrar
        </button>
      </template>
    </NavTabHeader>

    <section>
      <transition
        name="slide"
        mode="out-in"
      >
        <component
          :is="tabActive.component"
          :key="tabActive.label"
        />      
      </transition>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import NavTabHeader from '@/components/NavTabHeader.vue';
import TableLeads from '../components/TableLeads.vue';
import UploadManual from '../components/UploadManual.vue';
import Atendimento from '../components/Atendimento.vue';
import HeadPage from "@/components/HeadPage.vue";
export default defineComponent({
  components: {
    NavTabHeader,
    TableLeads,
    UploadManual,
    Atendimento,
    HeadPage
  },
  setup() {
    const habilitarFiltro = ref(false)
    const tabs = [
      {label: "Em Atendimento", component: 'Atendimento'},
      {label: "Leads", component: 'TableLeads'},
      {label: "Adicionar Leads", component: 'UploadManual'}
    ];

    const tabActive = ref(tabs[1])

    return {
      habilitarFiltro,
      tabs,
      tabActive
    }
  }
})
</script>

<style lang="scss" scoped>

</style>