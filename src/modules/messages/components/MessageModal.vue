<template>
  <Modal
    v-model:open="modalAtivo"
    title="Adicionar Mensagem"
    screen="w-2/4"
  >
    <template #body>
      <div class="space-y-6 h-[500px] overflow-y-scroll px-4">
        <AppSelect
          v-model="form.product_id"
          label="Associar ao Produto"
          :options="products"
          :multiple="true"
          key-name="name"
          key-value="id"
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
          rows="5"
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
          Adicionar
        </Button>
      </div>
    </template>
  </Modal>
</template>

<script lang='ts' setup>
import useModal from '@/core/composables/useModal';
import Select2 from '@/components/UI/Select2/Select2.vue';
import { computed, onMounted, ref, watch } from 'vue';
import {fetchProducts} from '@/core/services/api/products'
import {fetchEvents} from '@/core/services/api/events'
import { IProduct } from '@/interfaces/IProduct';
import Button from '@/components/UI/Button/Button.vue';
import { Event } from '@/core/interfaces/Event';
import { AutocompleteConfig } from '@/components/UI/Autocomplete/Autocomplete.vue';
import Autocomplete from '../../../components/UI/Autocomplete/Autocomplete.vue';
import useNotifications from '@/core/composables/useNotifications';
import {createMessage} from '@/core/services/api/products'
import Modal from '@/components/UI/Modal/Modal.vue'
import AppSelect from '@/components/UI/AppSelect/AppSelect.vue';

const emit = defineEmits(['success', 'close'])

const { modalAtivo,showModal } = useModal();

const form = ref({
  product_id: 0,
  event_ids: [],
  message: ""
})


const products = ref<IProduct[]>([]);
const events = ref<Event[]>([]);

const getProducts = async () => {
  const {data: {data}} = await fetchProducts();
  products.value = data
}

const getEvents = async () => {
  const {data} = await fetchEvents();
  events.value = data
}

watch(modalAtivo, val => {
  if(!val) {
    emit('close')
  }
})

onMounted(() => {
  getProducts();
  getEvents();

  modalAtivo.value = true;
})

const formDisabled = computed(() => {
  return !(form.value.event_ids.length && form.value.product_id && form.value.message.length >= 3)
})


const {notifications} = useNotifications();
const loading = ref(false);
const save = async () => {
  try {
    loading.value = true;
    await createMessage(form.value.product_id, form.value);
    notifications.success('Mensagem registrada com sucesso!');
    modalAtivo.value = false
    emit('success');
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