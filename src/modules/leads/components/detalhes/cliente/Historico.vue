<template>
  <div>
    <MenuTab 
      v-model:tabActive="tabActive"
      :tabs="tabs"
      :secondary="true"
    />
    <section class="py-8 px-4">
      <transition
        name="slide"
        mode="out-in"
      >
        <component
          :is="tabActive.component"
          :key="tabActive.label"
          :lead-id="lead.id"
        />
      </transition>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { shallowRef, ref, PropType } from 'vue'
import MenuTab from '@/components/MenuTab.vue'

import Interacao from './historico_tabs/Interacao.vue'
import Lead from './historico_tabs/Lead.vue'
import Cliente from './historico_tabs/Cliente.vue'
import { Lead as LeadInterface } from '@/core/interfaces/Lead'

const props = defineProps({
  lead: {
    type: Object as PropType<LeadInterface>,
    required:true
  }
})

const interacao = shallowRef(Interacao);
const leadtab = shallowRef(Lead);
const cliente = shallowRef(Cliente);

const tabs = [
  {label: "Interação", component: interacao},
  {label: "Lead", component: leadtab},
  {label: "Cliente", component: cliente}
];

const tabActive = ref(tabs[0])
</script>

<style>

</style>