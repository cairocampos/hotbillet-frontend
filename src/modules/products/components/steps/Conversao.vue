<template>
  <div class="grid md:grid-cols-2 gap-6">
    <div class="space-y-4">
      <div class="flex items-center gap-4">
        <SelectField
          :options="commisionTypes"
          label="Tipo"
          variant="secondary"
        />

        <TextField
          v-model="form.comission_value"
          label="Comissão"
          variant="secondary"
        />
      </div>
      <div class="space-y-2v">
        <LoadingText
          v-if="loading.events"
          text="Carregando transações..."
        />

        <Checkbox
          v-model="form.events"
          :options="events"
          label="Tipo de eventos"
          key-name="name"
          key-value="id"
        />
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <div>
        <InputRadio
          v-model="form.type"
          label="Quero atender..."
          :options="[{id:1, name: 'Todos os produtos'}, {id: 2, name: 'Produto específicos'}]"
          key-value="id"
          key-name="name"
          row
        />
      </div>
      <div class="flex gap-2 items-center">
        <Listbox
          v-model="checkout.id"
          variant="secondary"
          label="Selecione a plataforma"
          :options="platforms"
          label-name="name"
          key-name="id"
          searchable
        />

        <TextField
          v-if="form.type !== 1"
          v-model="checkout.code"
          label="Código"
          variant="secondary"
        />

        <div
          v-if="form.type !== 1"
          class="flex items-end text-blue-500"
        >
          <Button
            variant="link"
            size="md"
            radius="md"
            @click="appendCheckout"
          >
            <PhPlus />
            <span>Adicionar</span>
          </Button>
        </div>
      </div>

      <ListContainer class="mt-4 md:w-full">
        <List
          v-for="(checkout, index) in form.integrations"
          :key="index"
        >
          <ListItem>{{ platformName(checkout.platform_id) }}</ListItem>
          <ListItem>{{ checkout.product_code }}</ListItem>
          <ListItem>
            <button
              class="text-red-500 text-xs font-medium"
              @click="deleteCheckout(index)"
            >
              Remover
            </button>
          </ListItem>
        </List>
      </ListContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, PropType, ref } from 'vue';
import useNotifications from '@/core/composables/useNotifications';
import TextField from '@/components/UI/Form/Input/TextField.vue';
import Button from '@/components/UI/Button/Button.vue';
import Checkbox from '@/components/UI/Form/Input/Checkbox/Checkbox.vue';
import LoadingText from '@/components/UI/Loading/LoadingText.vue';
import SelectField from '@/components/UI/Form/SelectField/SelectField.vue';
import { PhPlus } from 'phosphor-vue'
import { fetchEvents } from '@/core/services/api/events';
import { Event } from '@/core/interfaces/Event';
import { Platform } from '@/core/interfaces/Platform';
import { fetchPlatforms } from '@/core/services/api/platforms';
import Listbox from '@/components/UI/Listbox/Listbox.vue';
import ListContainer from '@/components/UI/List/ListContainer.vue';
import List from '@/components/UI/List/List.vue';
import ListItem from '@/components/UI/List/ListItem.vue';
import InputRadio from '@/components/UI/Form/Input/InputRadio/InputRadio.vue';
import {createIntegration} from '@/core/services/api/products'
import { IProduct } from '@/interfaces/IProduct';

const props = defineProps({
  product: {
    type: Object as PropType<IProduct>,
    required: true
  },
  loading: {
    type: Boolean
  }
})

const emit = defineEmits(['update:loading', 'change-step'])

const checkout = ref({
  id:0,
  code: ""
})

type Integration = {
  comission_type: string;
  comission_value: number;
  type: 1|2,
  events: number[],
  integrations?: {
    platform_id: number,
    product_code: string;
  }[],
  platform_id?:number
}

const form = ref<Integration>({
  comission_type: "percentage",
  comission_value: 0,
  type: 1,
  events: [],
  integrations: []
})

const appendCheckout = () => {
  if(!checkout.value.id) {
    return notifications.info('Selecione uma plataforma!')
  }
  if(!checkout.value.code.trim()) {
    return notifications.info('Informe o código do produto!')
  }


  const findIndex = form.value.integrations?.findIndex(
    item => (item.product_code == checkout.value.code && item.platform_id == checkout.value.id)
  );

  if(findIndex !== -1) {
    notifications.warning('O código para essa plataforma já está incluído.')
    return
  }

  form.value.integrations?.push({
    platform_id: checkout.value.id,
    product_code: checkout.value.code
  })
  checkout.value.code = ""
}

const deleteCheckout = (index:number) => {
  form.value.integrations?.splice(index, 1)
}

const {notifications} = useNotifications();
const loading = ref({
  companies: false,
  events: false,
  transactionTypes: false
});

const events = ref<Event[]>([])
const getEvents = async () => {
  try {
    loading.value.events = true;
    const {data} = await fetchEvents();
    events.value = data
  } catch(error) {
    notifications.error(error);
  } finally {
    loading.value.events = false;
  }
}

const platforms = ref<Platform[]>([])
const getPlatforms = async () => {
  try {
    loading.value.events = true;
    const {data} = await fetchPlatforms();
    platforms.value = data
  } catch(error) {
    notifications.error(error);
  } finally {
    loading.value.events = false;
  }
}

const platformName = (id:number) => platforms.value.find(platform => platform.id === id)?.name

const commisionTypes = [
  {
    label: "Porcentagem",
    value: "percentage"
  },
  {
    label: "Valor Fixo",
    value: "fixed"
  }
];

const formData = computed(() => {
  if(form.value.type === 1) {
    if(!checkout.value.id) {
      notifications.warning('Selecione uma plataforma!')
    }

    if(!form.value.events.length) {
      notifications.warning('É necessário definir pelo menos 1 evento.')
    }

    return {
      ...form.value,
      platform_id: checkout.value.id
    }
  }

  return form.value;
});

const submitForm = async () => {
  try {
    await createIntegration(props.product.id as  number, formData.value);
    emit("change-step");
  }
  catch (error) {
    notifications.error(error);
  }
  finally {
    emit("update:loading", false);
  }
};

onMounted(() => {
  getEvents();
  getPlatforms();
});

defineExpose({
  submitForm
})
</script>

<style scoped>

</style>