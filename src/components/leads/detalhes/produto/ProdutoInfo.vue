<template>
  <Card>
      <template #header>
        <div class="w-full mb-2">
          <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <div class="w-16 h-16">
                  <img src="@/assets/fake/produto.png" class="object-cover w-full h-full rounded-full" />
                </div>
                <div>
                  <h3 class="text-dark text-lg font-medium">Just4You</h3>
                  <a href="#" target="_blank" class="text-xs flex items-center space-x-1 text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 transform rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    Link do Site
                  </a>
                </div>
                
              </div>
          </div>
        </div>
      </template>
      <template #body>
        <MenuTab :tabs="tabs" v-model:tabActive="tabActive"/>

        <section class="my-5 px-5">
          <transition name="slide" mode="out-in">
              <component :is="tabActive.component" :key="tabActive.label" />
          </transition>
        </section>
      </template>
  </Card>
</template>

<script>
import {defineComponent, ref} from 'vue';
import MenuTab from '@/components/MenuTab.vue';
import Dados from '@/components/produtos/tabs/Dados.vue';
import Links from '@/components/produtos/tabs/Links.vue';
import Midias from '@/components/produtos/tabs/Midias.vue';
import Ebooks from '@/components/produtos/tabs/Ebooks.vue';
import Faq from '@/components/produtos/tabs/Faq.vue';
import Comissionados from './Comissionados.vue';

export default defineComponent({
  components: {
    MenuTab,
    Dados,
    Links,
    Midias,
    Ebooks,
    Faq,
    Comissionados
  },
  setup() {
      const tabs = [
          {label: "Dados", component: 'Dados'},
          {label: "Links", component: 'Links'},
          {label: "Mídias", component: 'Midias'},
          {label: "Ebooks", component: 'Ebooks'},
          {label: "FAQ", component: 'Faq'},
          {label: "Comissionados", component: 'Comissionados'}
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