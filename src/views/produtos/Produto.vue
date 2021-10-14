<template>
  <div>
    <HeadPage class="mb-10">
      <h1 class="text-2xl text-gray-600">Adicionar Produto</h1>
    </HeadPage>

    <NavTabHeader :tabs="tabs" @change-tab="tab = $event"/>

    <section class="m-4 my-16">
      <component :is="tab.value"></component>
    </section>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";

import Dados from "@/components/produtos/tabs/Dados.vue";
import Links from "@/components/produtos/tabs/Links.vue";
import Midias from "@/components/produtos/tabs/Midias.vue";
import Ebooks from "@/components/produtos/tabs/Ebooks.vue";
import Faq from "@/components/produtos/tabs/Faq.vue";
import Conversao from "@/components/produtos/tabs/Conversao.vue";

import NavTabHeader from '@/components/NavTabHeader.vue';

export default defineComponent({
    components: {
        Dados,
        Links,
        Midias,
        Ebooks,
        Faq,
        Conversao,
        NavTabHeader
    },
    setup() {
        const tabs = ref([
            { label: "Dados", value: 'Dados'},
            { label: "Links", value: 'Links' },
            { label: "Mídias", value: 'Midias' },
            { label: "Ebooks", value: 'Ebooks' },
            { label: "Faq", value: 'Faq' },
            { label: "Conversão", value: 'Conversao' },
        ]);

        const tab = ref(tabs.value[0]);

        return {
            tabs, tab
        }
    }
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
</style>
