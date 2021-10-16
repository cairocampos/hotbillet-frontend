<template>
    <section class="links space-y-10">
        <div>
            <p class="text-dark font-medium text-sm mb-4">Perguntas Frequentes</p>
            
            <div class="lg:w-2/4 space-y-6">
                <div 
                    v-for="item in 5" :key="item" 
                    :class="['px-4 py-2 cursor-pointer', {'bg-white':faqAtivo == item}]"
                    @click="faqAtivo = item"
                    >
                    <div class="mb-2 flex items-center justify-between">
                        <p class="text-dark text-sm">Faq {{item}}</p>
                        <button class="btn btn-sm hover:bg-gray-200 rounded-md transition p-1" v-copy="'Ok'">
                            <img src="@/assets/icons/copy.svg" alt="" v-if="faqAtivo == item" />
                            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-default" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </button>
                    </div>
                    <div class="text-default text-xs font-light faq__description" v-show="faqAtivo == item">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, aliquid. Mollitia deserunt voluptatum maxime? Harum, quod aliquid.
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';

export default defineComponent({
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