<template>
  <div>
    <HeadPage title="Mensagens" />
    <div class="container mx-auto">
      <Button
        variant="dark"
        outline
        @click="modalCreateMessageActive = true"
      >
        <PhPlus />
        Mensagem
      </Button>
      
      <MessageFormFilter class="mt-8" />

      <h3 class="text-sm text-dark mb-4">
        Todas as Mensagens
      </h3>

      <Loading v-if="loading" />

      <div class="md:grid grid-cols-2 gap-4 mb-10">
        <CardMessage
          v-for="message in messages"
          :key="message.id"
          :message="message"
          @click="messageSelected = message"
          @edit="messageEditSelected = $event"
        />
      </div>
    </div>

    <ShowDetailsModal
      v-if="messageSelected && Object.values(messageSelected).length"
      ref="modal"
      v-model:message="messageSelected"
      @success="getMessages()"
    />

    <MessageModal
      v-if="modalCreateMessageActive"
      @close="modalCreateMessageActive = false"
      @success="getMessages()"
    />

    <MessageUpdateModal
      v-if="messageEditSelected && Object.values(messageEditSelected).length"
      v-model:message="messageEditSelected"
      @success="getMessages()"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted, ref } from "vue";
import ShowDetailsModal from "../components/ShowDetailsModal.vue";
import MessageModal from "../components/MessageModal.vue";
import HeadPage from "@/components/HeadPage.vue";
import CardMessage from "../components/CardMessage.vue";
import MessageFormFilter from "../components/MessageFormFilter.vue";
import { PhPlus } from "phosphor-vue";
import Button from "@/components/UI/Button/Button.vue";
import { fetchMessages } from "@/core/services/api/messages";
import { Message } from "@/core/interfaces/Message";
import useNotifications from "@/core/composables/useNotifications";
import Loading from '@/components/UI/Loading/Loading.vue'
import MessageUpdateModal from "../components/MessageUpdateModal.vue";

const modal = ref<typeof ShowDetailsModal>();
const messageModal = ref<typeof ShowDetailsModal>();
const messageSelected = ref<Message>()
const messageEditSelected = ref<Message>()

const modalCreateMessageActive = ref(false)

const {notifications} = useNotifications();
const messages = ref<Message[]>([]);
const loading = ref(false)
const getMessages = async () => {
  try {
    loading.value = true;
    const {data: {data}} = await fetchMessages();
    messages.value = data;
  } catch(error) {
    notifications.error(error)
  } finally { 
    loading.value = false;
  }
}

onMounted(() => {
  getMessages();
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