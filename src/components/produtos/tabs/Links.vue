<template>
  <section class="links space-y-10">
    <div>
      <p class="text-default font-medium text-sm">
        Checkout
      </p>
      <table
        v-if="linksCheckout.length"
        class="table-white text-xs w-full lg:w-3/4"
      >
        <tbody>
          <tr
            v-for="link in linksCheckout"
            :key="link.id"
          >
            <td>{{ link.description }}</td>
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

    <div>
      <p class="text-default font-medium text-sm">
        Descontos
      </p>
      <table
        v-if="linksDesconto.length"
        class="table-white text-xs w-full lg:w-3/4"
      >
        <tbody>
          <tr
            v-for="link in linksDesconto"
            :key="link.id"
          >
            <td>{{ link.description }}</td>
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
  </section>
</template>

<script lang="ts">
import useConstants from "@/composables/useConstants";
import { IProduct } from "@/interfaces/IProduct"
import { computed, defineComponent, PropType, toRefs } from "vue"
export default defineComponent({
    props: {
        product: {
            type: Object as PropType<IProduct>,
            required:true
        }
    },
    setup(props) {
        const {LINKS} = useConstants();
        const { product } = toRefs(props);

        const linksCheckout = computed(() => {
            return product.value?.links?.filter(link => link.link_type == LINKS.CHECKOUT) ?? []
        })

        const linksDesconto = computed(() => {
            return product.value?.links?.filter(link => link.link_type == LINKS.DISCOUNT) ?? []
        })

        return {
            linksCheckout,
            linksDesconto
        }
    }
})
</script>

<style>

</style>