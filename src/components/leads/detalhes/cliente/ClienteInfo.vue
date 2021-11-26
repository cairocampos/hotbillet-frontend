<template>
    <Card>
        <template #header>
            <div class="w-full mb-5">
                <div class="flex items-center justify-between">
                    <h3 class="text-dark text-lg font-medium">Cláudia Moreno</h3>
                    <span class="text-xs font-light">Vendedor: Mateus</span>
                </div>
                <Badge text="Comprometeu-se" color="yellow" />
            </div>
        </template>
        <template #body>
            <MenuTab :tabs="tabs" v-model:tabActive="tabActive"/>

            <section class="my-5">
                <transition name="slide" mode="out-in">
                    <component :is="tabActive.component" :key="tabActive.label" />
                </transition>
            </section>

        </template>
    </Card>
</template>

<script>
import { defineComponent, ref } from "vue";
import Dados from './Dados.vue'
import Historico from './Historico.vue'
import Postback from './Postback.vue'
import MenuTab from '@/components/MenuTab.vue'

export default defineComponent({
    components: {
        Dados,
        Historico,
        Postback,
        MenuTab
    },
    setup() {
        const tabs = [
            {label: "Dados", component: 'Dados'},
            {label: "Histórico", component: 'Historico'},
            {label: "Postback", component: 'Postback'}
        ];

        const tabActive = ref(tabs[1])

        return {
            tabs,
            tabActive
        }
    }
})
</script>

<style>

</style>