<template>
  <Modal
    v-model:open="modalAtivo"
    screen="w-1/2"
  >
    <template #header>
      <div class="flex items-center space-x-2">
        <div class="h-5 w-5 rounded-full bg-gray-200">
          <img
            src="@/assets/fake/produto.png"
            alt=""
            class="object-contain h-full w-full rounded-full"
          />
        </div>
        <div class="flex items-end space-x-2 divide-x divide-gray-200">
          <h3 class="text-default text-sm">
            {{ message.product.name }}
          </h3>
          <div
            v-if="message.events.length"
          >
            <div
              v-tooltip="message.events.map(event => event.name).join('\n')"
              class="flex items-center"
            >
              <EventIcon
                :event-id="message.events[0].id"
                class="h-5 ml-1"
              />
              <span class="font-light text-xs text-default pl-2 mt-1 white">{{ message.events[0].name }}</span>
              <span
                v-if="message.events.length > 1"
                class="text-xs text-zinc-400 ml-2"
              >
                + {{ message.events.length - 1 }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #body>
      <div class="mb-4 flex items-center space-x-4 text-xs text-color-base">
        <!-- <p><span class="font-semibold">Status:</span> Mensagem Automática</p>
        <p><span class="font-semibold">Tag:</span> Saudação</p> -->
      </div>
      <div>
        <pre class="text-xs text-color-base leading-5 whitespace-pre-wrap">{{ message.message }}</pre>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-between">
        <Button
          variant="danger"
          outline
          :loading="loading"
          @click="destroy(message)"
        >
          Remover
        </Button>
        <button
          v-copy="message.message"
          class="transition hover:bg-gray-200 rounded-md p-1 flex items-center space-x-2"
        >
          <img
            src="@/assets/icons/copy.svg"
            alt=""
          >
          <span class="text-color-base text-xs">Copiar Mensagem</span>
        </button>
      </div>
    </template>
  </Modal>
</template>

<script lang='ts' setup>
import useModal from '@/core/composables/useModal';
import { Message } from '@/core/interfaces/Message';
import { onMounted, PropType, ref, watch } from 'vue';
import Button from '@/components/UI/Button/Button.vue';
import useNotifications from '@/core/composables/useNotifications';
import {destroyMessage} from '@/core/services/api/products'
import useAlert from '@/core/composables/useAlert'
import EventIcon from '@/components/EventIcon.vue';
import Modal from '@/components/UI/Modal/Modal.vue';

const { modalAtivo,showModal } = useModal();


const props = defineProps({
  message: {
    type: Object as PropType<Message>,
    required:true
  }
})

const emits = defineEmits(['update:message', 'success']);

watch(modalAtivo, val => {
  if(!val) {
    emits('update:message', null);
  }
})


const {notifications} = useNotifications();
const {alerts} = useAlert();
const loading = ref(false);
const destroy = (message: Message) => {
 alerts.confirm('Deseja remover essa mensagem?')
  .then(async result => {
    if(result.isConfirmed) {
       try {
        loading.value = false;
        await destroyMessage(message.product_id, message.id);
        notifications.success('Mensagem removida com sucesso')
        emits('success');
        modalAtivo.value = false;
      } catch(error) {
        notifications.error(error)
      } finally {
        loading.value = false;
      }
    }
  })
}

onMounted(() => {
  modalAtivo.value = true;
})

</script>

<style lang='scss' scoped>
</style>