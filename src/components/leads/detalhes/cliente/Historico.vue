<template>
  <div>
    <MenuTab 
    :tabs="tabs"
    v-model:tabActive="tabActive"
    :secondary="true"
     />


    <section class="py-8 px-4">
      <transition name="slide" mode="out-in">
        <component :is="tabActive.component" :key="tabActive.label" />
      </transition>
    </section>
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/runtime-core'
import MenuTab from '@/components/MenuTab.vue'

import Interacao from './historico_tabs/Interacao.vue'
import Lead from './historico_tabs/Lead.vue'
import Cliente from './historico_tabs/Cliente.vue'

export default defineComponent({
  components: {
    MenuTab,
    Interacao,
    Lead,
    Cliente
  },
  setup() {
    const tabs = [
        {label: "Interação", component: 'Interacao'},
        {label: "Lead", component: 'Lead'},
        {label: "Cliente", component: 'Cliente'}
    ];

    const tabActive = ref(tabs[0])

    return {
        tabs,
        tabActive
    }
  }
})
</script>

<style>

</style>