<template>
  <section class="links space-y-10">
    <Loading v-if="loading" />
    <div>
      <p class="text-dark font-medium text-sm mb-4">
        Perguntas Frequentes
      </p>

      <Text
        v-if="!faqs.length"
        size="xs"
        variant="default"
      >
        Sem registro
      </Text>

      <div class="lg:w-2/4 space-y-6">
        <div
          v-for="faq in faqs"
          :key="faq.id"
          :class="['px-4 py-2 cursor-pointer', { 'bg-white': faqAtivo == faq.id }]"
          @click="faqAtivo = faq.id ?? 0"
        >
          <div
            class="mb-2 flex items-center justify-between"
            :class="{ 'border-b': faqAtivo != faq.id }"
          >
            <p class="text-dark text-sm">
              {{ faq.title }}
            </p>
            <button
              v-if="faqAtivo == faq.id"
              v-copy="faq.description"
              class="btn btn-sm hover:bg-gray-200 rounded-md transition p-1"
            >
              <img
                src="@/assets/icons/copy.svg"
                alt=""
              />
            </button>
            <button
              v-else
              class="btn btn-sm hover:bg-gray-200 rounded-md transition p-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-default"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
          </div>
          <div
            v-show="faqAtivo == faq.id"
            class="text-default text-xs font-light faq__description"
          >
            {{ faq.description }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { IProduct, IProductFaq } from '@/interfaces/IProduct';
import { defineComponent, onMounted, PropType, ref } from 'vue';
import Text from '@/components/UI/Layout/Text.vue';
import { api } from '@/core/services/api/base';
import useNotifications from '@/core/composables/useNotifications';
import Loading from "@/components/UI/Loading/Loading.vue";

const props = defineProps({
  product: {
    type: Object as PropType<IProduct>,
    required: true
  }
})

const faqAtivo = ref(0);
const { notifications } = useNotifications();
const loading = ref(false)
const faqs = ref<IProductFaq[]>([])
const fetchProductLinks = async () => {
  try {
    loading.value = true;
    const { data } = await api.get<IProductFaq[]>(`/products/${props.product.id}/faqs`)
    faqs.value = data
  } catch (error) {
    notifications.error(error)
  } finally {
    loading.value = false;
  }
}

onMounted(() => fetchProductLinks())

</script>

<style lang="scss" scoped>
.faq {
  &__description {
    line-height: 1.8rem;
  }
}
</style>