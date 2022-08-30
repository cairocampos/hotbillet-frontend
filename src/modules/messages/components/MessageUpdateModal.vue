<template>
  <Modal
    v-model:open="modalAtivo"
    title="Adicionar Mensagem"
    screen="w-2/4"
  >
    <template #body>
      <div class="space-y-6 h-[500px] overflow-y-scroll px-4">
        <Autocomplete
          v-model="form.product_id"
          label="Associar ao Produto"
          variant="secondary"
          label-class="text-xs"
          :config="config"
          :selected="productSelected"
        />
        <Select2
          v-model="form.event_ids"
          multiple
          label="Tipos de Transações"
          :options="events"
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
          Adicionar
        </Button>
      </div>
    </template>
  </Modal>
</template>

<script lang='ts' setup>
import useModal from '@/composables/useModal';
import Select2 from '@/components/UI/Select2/Select2.vue';
import { computed, onMounted, PropType, ref, watch } from 'vue';
import {fetchProducts} from '@/core/services/api/products'
import {fetchEvents} from '@/core/services/api/events'
import { IProduct } from '@/interfaces/IProduct';
import Button from '@/components/UI/Button/Button.vue';
import { Event } from '@/core/interfaces/Event';
import { AutocompleteConfig } from '@/components/UI/Autocomplete/Autocomplete.vue';
import Autocomplete from '@/components/UI/Autocomplete/Autocomplete.vue';
import useNotifications from '@/composables/useNotifications';
import {updateMessage } from '@/core/services/api/products'
import { CreateMessage, Message } from '@/core/interfaces/Message';
import { api } from '@/services/api';
import Modal from '@/components/UI/Modal/Modal.vue';

const props = defineProps({
  message: {
    type: Object as PropType<Message>,
    required:true
  }
})

const emits = defineEmits(['success', 'update:message'])

const { modalAtivo,showModal } = useModal();


const form = ref({
  product_id: props.message.product_id,
  event_ids: props.message.events.map(event => event.id),
  message: props.message.message
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

const productSelected = ref<{id:number;text:string}>();
const getProduct = async () => {
  const {data} = await api.get(`/products/${props.message.product_id}`)
  productSelected.value = {
    id: data.id,
    text: data.name
  };
}

watch(modalAtivo, val => {
  if(!val) {
    emits('update:message', null);
  }
})

onMounted(() => {
  modalAtivo.value = true;
  getProduct();
  getProducts();
  getEvents();
});

const config: AutocompleteConfig = {
  url: "/products",
  processResults: (data) => {
    const items = data.data.map(item => ({
      id: item.id,
      text: item.name
    }));
    return {
      results: items,
      pagination: {
        more: (data.last_page > data.current_page)
      }
    }
  }
}

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