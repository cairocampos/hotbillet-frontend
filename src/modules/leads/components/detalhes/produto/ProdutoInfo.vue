<template>
  <Card>
    <template #header>
      <div
        v-if="product?.id"
        class="w-full mb-2"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <div class="w-16 h-16">
              <img
                :src="product.cover"
                class="object-cover w-full h-full rounded-full"
                @error="useFallbackImage"
              />
            </div>
            <div>
              <h3 class="text-dark text-lg font-medium">
                {{ product.name }}
              </h3>
              <a
                v-if="product.url"
                :href="product.url"
                target="_blank"
                class="text-xs flex items-center space-x-1 text-blue-500"
              >
                <PhLinkSimpleHorizontal size="20" />
                <span class="ml-2">Link do Site</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template
      v-if="product?.id"
      #body
    >
      <MenuTab
        v-model:tabActive="tabActive"
        :tabs="tabs"
      />

      <section class="my-5 px-5">
        <transition
          name="slide"
          mode="out-in"
        >
          <component
            :is="tabActive.component"
            :key="tabActive.label"
            :product="product"
            v-bind="tabActive.props"
          />
        </transition>
      </section>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import {onMounted, PropType, ref, shallowRef} from 'vue';
import MenuTab from '@/components/MenuTab.vue';
import Dados from '@/modules/products/components/tabs/Dados.vue';
import Links from '@/modules/products/components/tabs/Links.vue';
import Midias from '@/modules/products/components/tabs/Midias.vue';
import Ebooks from '@/modules/products/components/tabs/Ebooks.vue';
import Faq from '@/modules/products/components/tabs/Faq.vue';
import Comissionados from './Comissionados.vue';
import { Lead } from '@/core/interfaces/Lead';
import { Product } from '@/core/interfaces/Product';
import {productService} from '@/core/services/api/products'
import useFallbackImage from '@/core/composables/useFallbackImage';
import { PhLinkSimpleHorizontal } from 'phosphor-vue'

const props = defineProps({
  lead: {
    type: Object as PropType<Lead>,
    required:true
  }
})

const dadosTab = shallowRef(Dados);
const linksTab = shallowRef(Links);
const midiasTab = shallowRef(Midias);
const ebooksTab = shallowRef(Ebooks);
const faqTab = shallowRef(Faq);
const comissionadosTab = shallowRef(Comissionados);

const tabs = [
  {label: "Dados", component: dadosTab},
  {label: "Links", component: linksTab, props: {lead: true}},
  {label: "Mídias", component: midiasTab},
  {label: "Ebooks", component: ebooksTab},
  {label: "FAQ", component: faqTab},
  {label: "Comissionados", component: comissionadosTab}
];

const tabActive = ref(tabs[0])

const loading = ref(false)
const product = ref<Product>();
const getProduct = async () => {
  try {
    loading.value = true;
    const {data} = await productService.findById(props.lead.product_id);
    product.value = data
  } finally {
    loading.value = false;
  }
}

onMounted(() => getProduct());

</script>

<style>

</style>