<template>
  <div class="rounded-md overflow-hidden bg-white cursor-pointer hover:shadow-lg card pb-4"
    @click="router.push({name:'Produto', params: {id:product?.id}})">
    <div class="w-full card__image">
        <img src="@/assets/fake/produto.png" class="h-full">
    </div>
    <div>
        <div class="p-4 flex items-center justify-between">
            <h1 class="text-sm justify-between font-bold text-color-base">{{product?.name}}</h1>
            <div class="text-xs text-blue-500 flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <a :href="product?.url" target="_blank">Link</a>
            </div>
        </div>
        <!-- <div class="text-center">
            <button class="btn border-2 border-blue-500 text-blue-500 rounded-full">Ativar Produto</button>
        </div> -->
    </div>
</div>
</template>

<script lang="ts">
import { IProductData } from "@/interfaces/IProduct";
import { defineComponent, PropType } from "@vue/runtime-core"
import { useRouter } from "vue-router"

export default defineComponent({
    props: {
        product: {
            type: Object as PropType<IProductData>
        }
    },
    setup() {
        const router = useRouter();
        return {router}
    }
})
</script>

<style lang="scss" scoped>
.card {
    min-height: 324px;
    &__image {
        height: 220px;
        img {
            object-fit: cover;
        }
    }
}
</style>
