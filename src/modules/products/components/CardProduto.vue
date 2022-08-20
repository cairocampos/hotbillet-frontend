<template>
  <div
    class="rounded-md overflow-hidden bg-white cursor-pointer hover:shadow-lg card pb-4"
    @click="router.push({name:'Product', params: {id:product?.id}})"
  >
    <div class="w-full card__image">
      <img
        :src="product.cover"
        class="h-full object-cover w-full"
        @error="fallbackImage"
      >
    </div>
    <div>
      <div class="p-4 flex items-center justify-between">
        <h1 class="text-sm justify-between font-semibold text-color-base">
          {{ product?.name }}
        </h1>
        <div class="text-xs text-blue-500 flex flex-col items-center">
          <PhLinkSimpleHorizontal size="16" />
          <a
            :href="product?.url"
            target="_blank"
          >Link</a>
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IProductData } from "@/interfaces/IProduct";
import { PropType } from "@vue/runtime-core"
import { useRouter } from "vue-router"
import defaultImage from '../../../assets/images/default.png'
import { PhLinkSimpleHorizontal } from "phosphor-vue";

const props = defineProps({
  product: {
    type: Object as PropType<IProductData>,
    required:true
  }
})
const router = useRouter();
const fallbackImage = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = defaultImage
}
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
