<template>
  <section class="midias space-y-10">
    <ul class="flex items-center space-x-10 text-default text-xs">
      <li
        class="cursor-pointer pb-2"
        :class="{'border-b-2 border-gray-500': tabMidia == 'Imagens'}"
        @click="tabMidia = 'Imagens'"
      >
        Imagens
      </li>
      <li
        class="cursor-pointer pb-2"
        :class="{'border-b-2 border-gray-500': tabMidia == 'Videos'}"
        @click="tabMidia = 'Videos'"
      >
        Vídeos
      </li>
    </ul>

    <transition-group
      name="slide-fade"
      mode="out-in"
    >
      <div
        v-if="tabMidia == 'Imagens'"
        class="space-y-10"
      >
        <div>
          <p class="text-default font-medium text-sm">
            Produto
          </p>
          <div class="flex flex-wrap">
            <div
              v-for="image in images"
              :key="image.id"
              class="produto__img w-36 h-36 relative m-2"
            >
              <button class="z-5 absolute right-2 top-2 bg-gray-100 p-1 bg-opacity-50 rounded-md">
                <img
                  src="@/assets/icons/shared.svg"
                  alt=""
                >
              </button>
              <img
                :src="image.url"
                class="object-cover h-full rounded-md"
              >
            </div>
          </div>
        </div>

        <div>
          <p class="text-default font-medium text-sm">
            Brindes
          </p>
          <div class="flex flex-wrap">
            <div
              v-for="image in images"
              :key="image.id"
              class="produto__img w-36 h-36 relative m-2"
            >
              <button class="z-5 absolute right-2 top-2 bg-gray-100 p-1 bg-opacity-50 rounded-md">
                <img
                  src="@/assets/icons/shared.svg"
                  alt=""
                >
              </button>
              <img
                :src="image.url"
                alt=""
                class="object-cover h-full rounded-md"
              >
            </div>
          </div>        
        </div>
      </div>
      <div
        v-else
        class="space-y-10"
      >
        <div>
          <p class="text-default font-medium text-sm">
            Youtube
          </p>
          <div class="flex flex-wrap">
            <div
              v-for="video in videos"
              :key="video.id"
              class="w-52 border m-2"
            >
              <div class="produto__img relative">
                <button class="z-5 absolute right-2 top-2 bg-gray-100 p-1 bg-opacity-50 rounded-md">
                  <img
                    src="@/assets/icons/shared.svg"
                    alt=""
                  >
                </button>
                <img
                  src="@/assets/fake/produto.png"
                  alt=""
                  class="object-cover h-40"
                >
              </div>
              <div class="text-xs p-2">
                <p class="text-default whitespace-nowrap overflow-hidden midia__description">
                  Produto milagroso para o seu cabelo...
                </p>
                <div class="flex items-center justify-between mt-2">
                  <a
                    href=""
                    target="_blank"
                    class="text-blue-500 midia__link"
                  >{{ video.url }}</a>
                  <button>
                    <img
                      src="@/assets/icons/copy.svg"
                      alt=""
                    >
                  </button>
                </div>
              </div>
            </div>
          </div>    
        </div>

        <div>
          <p class="text-default font-medium text-sm">
            Vimeo
          </p>
          <div class="flex flex-wrap">
            <div
              v-for="item in 6"
              :key="item"
              class="w-52 border m-2"
            >
              <div class="produto__img relative">
                <button class="z-5 absolute right-2 top-2 bg-gray-100 p-1 bg-opacity-50 rounded-md">
                  <img
                    src="@/assets/icons/shared.svg"
                    alt=""
                  >
                </button>
                <img
                  src="@/assets/fake/produto.png"
                  alt=""
                  class="object-cover h-40"
                >
              </div>
              <div class="text-xs p-2">
                <p class="text-default whitespace-nowrap overflow-hidden midia__description">
                  Produto milagroso para o seu cabelo...
                </p>
                <div class="flex items-center justify-between mt-2">
                  <a
                    href=""
                    target="_blank"
                    class="text-blue-500 midia__link"
                  >https://vimeo.com</a>
                  <button>
                    <img
                      src="@/assets/icons/copy.svg"
                      alt=""
                    >
                  </button>
                </div>
              </div>
            </div>
          </div>    
        </div>
      </div>
    </transition-group>
  </section>
</template>

<script lang="ts" setup>
import useNotifications from '@/composables/useNotifications';
import { ProductMedia } from '@/core/interfaces/Product';
import { fetchMidias } from '@/core/services/api/products'
import { IProduct } from '@/interfaces/IProduct';
import {PropType, ref} from 'vue';
const tabMidia = ref('Imagens');
const { notifications } = useNotifications()

const props = defineProps({
  product: {
    type: Object as PropType<IProduct>,
    required: true
  }
});

const videos = ref<ProductMedia[]>([]);
const images = ref<ProductMedia[]>([]);

const loading = ref(false);
(async () => {
  try {
    loading.value = true;
    const {data} = await fetchMidias(props.product.id as number);
    videos.value = data.filter(item => item.type_description == 'VIDEO')
    images.value = data.filter(item => item.type_description == 'IMAGE')
  } catch (error) {
    notifications.error(error);
  } finally {
    loading.value = true;
  }
})()

</script>

<style scoped lang="scss">
.midia {
    &__description, &__link {
        max-width: 100%;
        text-overflow: ellipsis;
    }
}


.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>