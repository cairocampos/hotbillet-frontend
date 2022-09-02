<template>
  <section class="links space-y-10">
    <Loading v-if="loading" />
    <div>
      <p class="text-default font-medium text-sm mb-4">
        Ebooks
      </p>
      <div
        v-if="ebooks.length"
        class="flex items-center space-x-6"
      >
        <button class="space-x-2 flex items-center text-xs text-default">
          <img
            src="@/assets/icons/download.svg"
            alt=""
          >
          <span>Baixar Todos</span>
        </button>
        <button class="space-x-2 flex items-center text-xs text-default">
          <img
            src="@/assets/icons/shared.svg"
            alt=""
          >
          <span>Compartilhar Todos</span>
        </button>
      </div>
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
    <Text
      v-if="!ebooks.length && !loading"
      size="xs"
      variant="default"
    >
      Sem registro
    </Text>
  </section>
</template>

<script lang="ts" setup>
import { Product } from "@/core/interfaces/Product"
import { onMounted, PropType, ref } from "vue"
import Text from "@/components/UI/Layout/Text.vue"
import useNotifications from "@/core/composables/useNotifications";
import { fetchEbooks } from "@/core/services/api/products";
import { ProductEbook } from '@/core/interfaces/Product'
import Loading from "@/components/UI/Loading/Loading.vue";

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true
  }
});

const { notifications } = useNotifications();
const loading = ref(false)
const ebooks = ref<ProductEbook[]>([]);
const getEbooks = async () => {
  try {
    loading.value  = true;
    const {data} = await fetchEbooks(props.product.id as number);
    ebooks.value = data;
  } catch(error) {
    notifications.error(error)
  } finally {
    loading.value = false
  }
}

onMounted(() => getEbooks())

</script>

<style>

</style>