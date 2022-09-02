<template>
  <section class="links space-y-10">
    <Suspense>
      <div>
        <p class="text-default font-medium text-sm">
          Checkout
        </p>
        <table
          v-if="links.length"
          :class="[`table-white text-xs w-full ${lead ? 'w-full' : 'lg:w-3/4'}`]"
        >
          <tbody>
            <tr
              v-for="link in links"
              :key="link.id"
            >
              <td>{{ link.name }}</td>
              <td class="text-default font-light">
                {{ link.url }}
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
                  v-copy="link.url"
                  class="btn btn-sm hover:bg-gray-200 p-1 rounded-md transition"
                >
                  <img
                    src="@/assets/icons/copy.svg"
                    alt=""
                  >
                </button>
                <a
                  :href="link.url"
                  target="_blank"
                  class="text-blue-500"
                >Abrir Link</a>
              </td>
            </tr>
          </tbody>
        </table>
        <p
          v-else
          class="text-xs text-default"
        >
          Sem registros.
        </p>
      </div>
      <template #fallback>
        Loading...
      </template>
    </Suspense>
  </section>
</template>

<script setup lang="ts">
import useNotifications from "@/core/composables/useNotifications";
import { Product, ProductLink } from "@/core/interfaces/Product"
import { api } from "@/core/services/api/base";
import { onMounted, PropType, ref, Suspense } from "vue"

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true
  },
  lead: {
    type: Boolean,
    default:false
  }
});

const { notifications } = useNotifications();
const links = ref<ProductLink[]>([])
const fetchProductLinks = async () => {
  try {
    const { data } = await api.get<ProductLink[]>(`/products/${props.product.id}/links`)
    links.value = data
  } catch (error) {
    notifications.error(error)
  }
}

onMounted(() => fetchProductLinks())

</script>

<style>
</style>