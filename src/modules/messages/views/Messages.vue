<template>
  <div>
    <HeadPage title="Mensagens" />
    <div class="container mx-auto">
      <button
        class="btn btn-sm btn-outline-secondary rounded-full py-1 px-4 flex items-center mb-10"
        @click="messageModal?.showModal()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <span>Mensagem</span>
      </button>
      <div>
        <div class="flex flex-wrap -mx-3">
          <div class="form-group md:w-1/4 px-3">
            <label class="label">Tag</label>
            <input
              type="text"
              class="form-control input-white input-sm"
            />
          </div>
          <div class="form-group md:w-1/4 px-3">
            <label class="label">Filtrar Produto</label>
            <div class="input-group border border-gray-200 px-2 input-sm bg-white">
              <div class="input-prepend mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                class="bg-transparent outline-none"
              >
            </div>
          </div>

          <div class="form-group md:w-1/4 px-3">
            <label class="label">Filtrar Transação</label>
            <input
              type="text"
              class="form-control input-white input-sm"
            />
          </div>
          <div class="form-group md:w-1/4 px-3">
            <label class="label">Filtrar Status</label>
            <input
              type="text"
              class="form-control input-white input-sm"
            />
          </div>
        </div>
        
        <div class="text-center m-10">
          <button class="btn btn-sm btn-dark rounded-full">
            Buscar
          </button>
        </div>
      </div>

      <h3 class="text-sm text-dark mb-4">
        Todas as Mensagens
      </h3>

      <div class="md:grid grid-cols-2 gap-4 mb-10">
        <Card
          v-for="item in 15"
          :key="item"
          class="mb-4 md:mb-0 mensagem cursor-pointer transition hover:shadow-md"
          @click="showDetails"
        >
          <template #header>
            <div class="flex justify-between items-center w-full">
              <div class="flex items-center space-x-2">
                <div class="h-6 w-6 rounded-full bg-gray-200">
                  <img
                    src="@/assets/fake/produto.png"
                    alt=""
                    class="object-contain h-full w-full rounded-full"
                  />
                </div>
                <div class="flex items-end space-x-2 divide-x divide-gray-200">
                  <h3 class="text-default text-sm">
                    Just4You
                  </h3>
                  <div class="flex items-center">
                    <img
                      src="@/assets/icons/boleto-vencido.svg"
                      alt=""
                      class="h-5 ml-1"
                    >
                    <span class="font-light text-xs text-default pl-2 mt-1">Boleto Vencido</span>
                  </div>
                </div>
              </div>

              <div class="flex items-center">
                <button class="text-xs text-blue-500 text-default px-2 font-light flex items-center">
                  <span class="underline">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3 w-3 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </span>
                  Editar
                </button>
                <button class="transition hover:bg-gray-200 rounded-md p-1">
                  <img
                    src="@/assets/icons/copy.svg"
                    alt=""
                  >
                </button>
              </div>
            </div>
          </template>

          <template #body>
            <p class="text-default font-light text-xs mensagem__description">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim, dolores.
            </p>
          </template>
        </Card>
      </div>
    </div>

    <ShowDetailsModal ref="modal" />

    <MessageModal ref="messageModal" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ShowDetailsModal from "../components/ShowDetailsModal.vue";
import MessageModal from "../components/MessageModal.vue";
import TitlePage from "@/components/UI/Layout/TitlePage.vue";
import HeadPage from "@/components/global/HeadPage.vue";

export default defineComponent({
  components: { ShowDetailsModal, MessageModal, TitlePage, HeadPage },
  setup() {
    const modal = ref<typeof ShowDetailsModal>();
    const messageModal = ref<typeof ShowDetailsModal>();
    const showDetails = () => {
      modal.value?.showModal();
    }

    return {
      modal,
      messageModal,
      showDetails
    }
  }
})
</script>

<style scoped lang="scss">
.mensagem {
  &__description {
    // max-width: ;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>