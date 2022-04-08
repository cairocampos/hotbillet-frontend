<template>
  <section class="links space-y-10">
    <div>
      <p class="text-dark font-medium text-sm mb-4">
        Perguntas Frequentes
      </p>
            
      <div class="lg:w-2/4 space-y-6">
        <div 
          v-for="faq in product.faqs"
          :key="faq.id" 
          :class="['px-4 py-2 cursor-pointer', {'bg-white':faqAtivo == faq.id}]"
          @click="faqAtivo = faq.id ?? 0"
        >
          <div
            class="mb-2 flex items-center justify-between"
            :class="{'border-b': faqAtivo != faq.id}"
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

<script lang="ts">
import { IProduct } from '@/interfaces/IProduct';
import {defineComponent, PropType, ref} from 'vue';

export default defineComponent({
    props: {
        product: {
            type: Object as PropType<IProduct>,
            required:true
        }
    },
    setup() {
        const faqAtivo = ref(0);

        return {
            faqAtivo
        }
    } 
});

</script>

<style lang="scss" scoped>

.faq {
    &__description {
        line-height: 1.8rem;
    }
}

</style>