<template>
  <Modal
    v-model:open="modalAtivo"
    title="Editar Mensagem"
    screen="w-2/4"
    :loading="!!Object.keys(isLoading).find(item => item)"
  >
    <template #body>
      <div class="space-y-6 h-[500px] overflow-y-scroll px-4">
        <AppSelect
          v-model="form.product_id"
          label="Associar ao Produto"
          :options="products"
          :selected="productSelected"
          @open="getProducts()"
        />
        <AppSelect
          v-model="form.event_ids"
          label="Tipos de Transações"
          :options="events"
          :multiple="true"
          key-name="name"
          key-value="id"
        />
        <div class="rounded bg-zinc-200 p-2 text-sm">
          <strong>#nome_comprador:</strong> Nome do cliente <br>
          <strong>#nome_vendedor:</strong> Nome do vendedor <br>
          <strong>#link_boleto:</strong> Url do boleto <br>
          <strong>#linha_dig:</strong> Linha digitável do boleto
        </div>
        <textarea
          v-model="form.message"
          placeholder="Digite aqui a sua mensagem..."
          class="outline-none w-full border rounded p-2 resize-none"
          rows="10"
        ></textarea>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-center">
        <Button
          variant="dark"
          :disabled="formDisabled"
          :loading="loading"
          @click="save()"
        >
          Atualiar
        </Button>
      </div>
    </template>
  </Modal>
</template>

<script lang='ts' setup>
import useModal from '@/core/composables/useModal';
import { computed, onMounted, PropType, ref, watch } from 'vue';
import {fetchProducts, fetchProduct} from '@/core/services/api/products'
import {fetchEvents} from '@/core/services/api/events'
import { Product } from '@/core/interfaces/Product';
import Button from '@/components/UI/Button/Button.vue';
import { Event } from '@/core/interfaces/Event';
import useNotifications from '@/core/composables/useNotifications';
import {updateMessage } from '@/core/services/api/products'
import { Message } from '@/core/interfaces/Message';
import Modal from '@/components/UI/Modal/Modal.vue';
import AppSelect from '@/components/UI/AppSelect/AppSelect.vue';
import useLoading from '@/core/composables/useLoading';

const props = defineProps({
  message: {
    type: Object as PropType<Message>,
    required:true
  }
})

const emits = defineEmits(['success', 'update:message'])

const { modalAtivo,showModal } = useModal();
const {isLoading} = useLoading();

const form = ref({
  product_id: props.message.product_id,
  event_ids: props.message.events.map(event => event.id),
  message: props.message.message
})


const products = ref<Product[]>([]);
const events = ref<Event[]>([]);

const getProducts = async () => {
  const {data: {data}} = await fetchProducts();
  products.value = data
}

const getEvents = async () => {
  const {data} = await fetchEvents();
  events.value = data
}

const productSelected = ref<Product>();
const getProduct = async () => {
  const {data} = await fetchProduct(props.message.product_id)
  productSelected.value = data;
}

watch(modalAtivo, val => {
  if(!val) {
    emits('update:message', null);
  }
})

onMounted(() => {
  modalAtivo.value = true;
  getProduct();
  getEvents();
});

const formDisabled = computed(() => {
  return !(form.value.event_ids.length && form.value.product_id && form.value.message.length >= 3)
})

const {notifications} = useNotifications();
const loading = ref(false);
const save = async () => {
  try {
    loading.value = true;
    await updateMessage(props.message.product_id, props.message.id, form.value);
    notifications.success('Mensagem atualizada com sucesso!');
    modalAtivo.value = false
    emits('success');
  } catch(error) {
    notifications.error(error)
  } finally {
    loading.value = false;
  }
}

defineExpose({
  showModal
})

</script>

<style lang='scss' scoped>
</style>  