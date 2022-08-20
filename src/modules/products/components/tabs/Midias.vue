<template>
  <section class="midias space-y-10">
    <ul class="flex items-center space-x-10 text-default text-xs">
      <li
        class="cursor-pointer pb-2"
        :class="{'border-b-2 border-gray-500': tabMidia == 'Ebooks'}"
        @click="tabMidia = 'Ebooks'"
      >
        Ebooks
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
        v-if="tabMidia == 'Ebooks'"
        class="space-y-10"
      >
        <table class="table-white text-xs w-full my-6">
          <tbody>
            <tr
              v-for="ebook in ebooks"
              :key="ebook.id"
            >
              <td>{{ ebook.title }}</td>
              <td class="text-default font-light">
                {{ ebook.url }}
              </td>
              <td
                align="right"
                class="flex items-center justify-end space-x-2"
              >
                <!-- <button class="btn btn-sm hover:bg-gray-200 p-1 rounded-md transition">
                <img
                  src="@/assets/icons/shared.svg"
                  alt=""
                >
              </button> -->
                <button
                  v-copy="ebook.url"
                  class="btn btn-sm hover:bg-gray-200 p-1 rounded-md transition"
                >
                  <img
                    src="@/assets/icons/copy.svg"
                    alt=""
                  >
                </button>
                <!-- <button class="btn btn-sm hover:bg-gray-200 p-1 rounded-md transition">
                <img
                  src="@/assets/icons/download.svg"
                  alt=""
                >
              </button> -->
                <a
                  :href="ebook.url"
                  target="_blank"
                  class="text-blue-500"
                >Abrir Link</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        v-else
        class="space-y-10"
      >
        <div>
          <NoRecords v-if="!videos.length" />
          <div class="flex flex-wrap">
            <div
              v-for="video in videos"
              :key="video.id"
              class="border m-2"
            >
              <YoutubeThumbnail :source="video.url" />
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
import YoutubeThumbnail from '@/components/youtube/YoutubeThumbnail.vue';
import NoRecords from '@/components/NoRecords.vue';
const tabMidia = ref('Ebooks');
const { notifications } = useNotifications()

const props = defineProps({
  product: {
    type: Object as PropType<IProduct>,
    required: true
  }
});

const ebooks = ref<ProductMedia[]>([]);
const videos = ref<ProductMedia[]>([]);

const loading = ref(false);
const getMidias = async () => {
  try {
    loading.value = true;
    const {data} = await fetchMidias(props.product.id as number);
    videos.value = data.filter(item => item.type_description == 'VIDEO')
    ebooks.value = data.filter(item => item.type_description == 'EBOOK')
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