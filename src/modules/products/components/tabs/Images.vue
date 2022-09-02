<template>
  <section class="midias space-y-10">
    <Loading v-if="loading" />
    <NoRecords v-else-if="!images.length" />
    <div class="flex flex-wrap">
      <div
        v-for="image in images"
        :key="image.id"
        class="produto__img w-52 h-52 relative m-2 bg-zinc-200"
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
  </section>
</template>

<script lang="ts" setup>
import useNotifications from '@/core/composables/useNotifications';
import { ProductImage } from '@/core/interfaces/Product';
import { fetchImages } from '@/core/services/api/products'
import { Product } from '@/core/interfaces/Product';
import {onMounted, PropType, ref} from 'vue';
import Loading from '@/components/UI/Loading/Loading.vue';
import NoRecords from '@/components/NoRecords.vue';
const { notifications } = useNotifications()

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true
  }
});

const images = ref<ProductImage[]>([]);

const loading = ref(false);
const getMidias = async () => {
  try {
    loading.value = true;
    const {data} = await fetchImages(props.product.id as number);
    images.value = data
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