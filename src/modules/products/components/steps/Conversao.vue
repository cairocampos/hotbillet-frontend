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
      <div class="flex gap-2 items-center">
        <Listbox
          v-model="checkout.id"
          variant="secondary"
          label="Plataforma"
          :options="platforms"
          label-name="name"
          key-name="id"
          searchable
        />

        <TextField
          v-model="checkout.code"
          label="Código"
          variant="secondary"
        />

        <div class="flex items-end text-blue-500">
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
import { onMounted, ref } from 'vue';
import useNotifications from '@/composables/useNotifications';
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

const checkout = ref({
  id:0,
  code: ""
})

type Integration = {
  comission_type: string;
  comission_value: number;
  type: 1|2,
  events: number[],
  integrations: {
    platform_id: number,
    product_code: string;
  }[]
}

const form = ref<Integration>({
  comission_type: "percentage",
  comission_value: 0,
  type: 1,
  events: [],
  integrations: []
})

const appendCheckout = () => {
  if(!checkout.value.id || !checkout.value.code.trim())
    return notifications.info('Dados inválidos.')


  const findIndex = form.value.integrations.findIndex(
    item => (item.product_code == checkout.value.code && item.platform_id == checkout.value.id)
  );

  if(findIndex !== -1) {
    notifications.warning('O código para essa plataforma já está incluído.')
    return
  }

  form.value.integrations.push({
    platform_id: checkout.value.id,
    product_code: checkout.value.code
  })
  checkout.value.code = ""
}

const deleteCheckout = (index:number) => {
  form.value.integrations.splice(index, 1)
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


onMounted(() => {
  getEvents();
  getPlatforms();
});
</script>

<style scoped>

</style>