<template>
  <section class="links space-y-10">
    <div>
      <p class="text-default font-medium text-sm mb-4">
        Ebooks
      </p>
      <Text
        v-if="!product.ebooks?.length"
        size="xs"
        variant="default"
      >
        Sem registro
      </Text>
      <div
        v-else
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
      <table class="table-white text-xs w-full lg:w-3/4">
        <tbody>
          <tr
            v-for="ebook in product.ebooks"
            :key="ebook.id"
          >
            <td>{{ ebook.description }}</td>
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
  </section>
</template>

<script lang="ts">
import { IProduct } from "@/interfaces/IProduct"
import { defineComponent, PropType } from "vue"
import Text from "@/components/UI/Layout/Text.vue"
export default defineComponent({
    props: {
        product: {
            type: Object as PropType<IProduct>,
            required: true
        }
    },
    setup() {
        //
    },
    components: { Text }
})
</script>

<style>

</style>