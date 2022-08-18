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

    <Loading v-if="loading" />

    <transition-group
      name="slide-fade"
      mode="out-in"
    >
      <div
        v-if="tabMidia == 'Imagens'"
        class="space-y-10"
      >
        <div>
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
      </div>
      <div
        v-else
        class="space-y-10"
      >
        <div>
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
                <p class="text-default whitespace-nowrap overflow-hidden midia__description text-ellipsis">
                  Produto milagroso para o seu cabelo...
                </p>
                <div class="flex items-center justify-between mt-2 whitespace-nowrap overflow-hidden text-ellipsis">
                  <a
                    :href="video.url"
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
      </div>
    </transition-group>
  </section>
</template>

<script lang="ts" setup>
import useNotifications from '@/composables/useNotifications';
import { ProductMedia } from '@/core/interfaces/Product';
import { fetchMidias } from '@/core/services/api/products'
import { IProduct } from '@/interfaces/IProduct';
import {onMounted, PropType, ref} from 'vue';
import Loading from '@/components/UI/Loading/Loading.vue';
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
const getMidias = async () => {
  try {
    loading.value = true;
    const {data} = await fetchMidias(props.product.id as number);
    videos.value = data.filter(item => item.type_description == 'VIDEO')
    images.value = data.filter(item => item.type_description == 'IMAGE')
  } catch (error) {
    notifications.error(error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => getMidias());

</script>

<style scoped lang="scss">
.midia {
    &__description, &__link {
        max-width: 100%;
        text-overflow: ellipsis;
    }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition:  all .3s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-from {
  transform: translateX(-20px);
}
.slide-fade-leave-to {
  transform: translateX(20px);
}
</style>