<template>
  <Form
    vertical="8"
    class="w-full"
  >
    <!-- <Button
      variant="link"
    >
      Quer saber como funciona ?
    </Button> -->
    <FormSection title="Dados de integração" />
    <Grid
      :cols="2"
      :md="{cols:1}"
    >
      <Autocomplete
        v-model="form.company_id"
        variant="secondary"
        label="Selecione a empresa"
        :options="companies"
        label-key="name"
        label-value="id"
      />

      <Autocomplete
        v-model="form.company_id"
        variant="secondary"
        label="Selecione o produto"
        :options="companies"
        label-key="name"
        label-value="id"
      />
    </Grid>

    <FormSection title="Dados da plataforma" />
    <Grid
      :cols="3"
    >
      <Autocomplete
        v-model="checkout.id"
        variant="secondary"
        label="Selecione a plataforma de integração"
        :options="checkouts"
        label-key="name"
        label-value="id"
        searchable
      />

      <TextField
        v-model="checkout.code"
        label="Código do produto na plataforma"
        variant="secondary"
      />

      <div class="flex items-end">
        <Button
          variant="dark"
          size="sm"
          radius="md"
          @click="appendCheckout"
        >
          <PhPlus />
        </Button>
      </div>
    </Grid>


    <div class="space-y-4">
      <Grid
        v-for="(checkoutItem, index) in form.checkouts"
        :key="index"
        cols="3"
      >
        <div class="bg-zinc-200 rounded-md p-2 text-zinc-700 flex flex-col">
          {{ checkouts[checkoutItem.id].name }}
          <span class="text-xs text-zinc-400">Plataforma</span>
        </div>
        <div class="bg-zinc-200 rounded-md p-2 text-zinc-700 flex flex-col">
          {{ checkoutItem.code }}
          <span class="text-xs text-zinc-400">Código</span>
        </div>
        <div class="flex items-center">
          <Button
            variant="danger"
            radius="md"
            @click="deleteCheckout(index)"
          >
            <PhTrash />
          </Button>
        </div>
      </Grid>
    </div>

    <FormSection title="Quais transações você deseja processar?" />
    <div class="space-y-2">
      <LoadingText
        v-if="loading.transactionTypes"
        text="Carregando transações..."
      />
      <Checkbox
        v-for="transaction in transactionTypes"
        :key="transaction.id"
        v-model="form.company_id"
        :label="transaction.desc"
        :value="transaction.id"
      />
    </div>

    <FormSection title="Comissionamento" />
    <div class="flex items-center gap-8">
      <SelectField
        :options="commisionTypes"
        label="Tipo"
        variant="secondary"
      />

      <TextField
        v-model="form.company_id"
        label="Comissão"
        variant="secondary"
      />
    </div>

    <Button
      variant="dark"
      size="lg"
      radius="md"
      block
    >
      Salvar
    </Button>
  </Form>
</template>

<script setup lang="ts">
import Form from '@/components/UI/Form/Form.vue';
import Autocomplete from '@/components/UI/Autocomplete/Autocomplete.vue';
import {fetchCompanies} from '@/modules/companies/services'
import { onMounted, ref } from 'vue';
import { ICompanySimple } from '@/modules/companies/interfaces/ICompany';
import {ICheckout} from '../../interfaces/ICheckout'
import useNotifications from '@/composables/useNotifications';
import { fetchCheckouts, fetchTransactionTypes } from '../../services'
import Grid from '@/components/UI/Form/Grid.vue';
import TextField from '@/components/UI/Form/Input/TextField.vue';
import Button from '@/components/UI/Button/Button.vue';
import FormSection from '@/components/UI/Form/FormSection/FormSection.vue';
import { ITransactionTypes } from '../../interfaces/ITransaction';
import Checkbox from '@/components/UI/Form/Input/Checkbox/Checkbox.vue';
import LoadingText from '@/components/UI/Loading/LoadingText.vue';
import SelectField from '@/components/UI/Form/SelectField/SelectField.vue';
import { PhPlus, PhTrash } from 'phosphor-vue'

const checkout = ref({
  id:0,
  code: ""
})

type Integration = {
  comission_type: string;
  comission_value:number;
  transaction_types: number[]
  checkouts: {id:number; code:string;}[],
  company_id: number
}

const form = ref<Integration>({
  comission_type: "percentage",
  comission_value: 0,
  transaction_types: [],
  checkouts: [],
  company_id: 0
})

const appendCheckout = () => {
  if(!checkout.value.id || !checkout.value.code.trim())
    return notifications.info('Dados inválidos.')


  const findIndex = form.value.checkouts.findIndex(
    item => (item.code == checkout.value.code && item.id == checkout.value.id)
  );

  if(findIndex !== -1) {
    notifications.warning('O código para essa plataforma já está incluído.')
    return
  }

  form.value.checkouts.push(checkout.value)
  checkout.value = {
    id: 0,
    code: ""
  }

}

const deleteCheckout = (index:number) => {
  form.value.checkouts.splice(index, 1)
}

const {notifications} = useNotifications();
const loading = ref({
  companies: false,
  checkouts: false,
  transactionTypes: false
});
const companies = ref<ICompanySimple[]>([])
const getCompanies = async () => {
  try {
    loading.value.companies = true;
    const {data} = await fetchCompanies();
    companies.value = data.companies
  } catch(error) {
    notifications.error(error);
  } finally {
    loading.value.companies = false;
  }
}

const checkouts = ref<ICheckout[]>([])
const getCheckouts = async () => {
  try {
    loading.value.checkouts = true;
    const {data} = await fetchCheckouts();
    checkouts.value = data.checkouts
  } catch(error) {
    notifications.error(error);
  } finally {
    loading.value.checkouts = false;
  }
}

const transactionTypes = ref<ITransactionTypes[]>([])
const getTransactionTypes = async () => {
  try {
    loading.value.transactionTypes = true;
    const {data} = await fetchTransactionTypes();
    transactionTypes.value = data.transactions_types.sort()
  } catch(error) {
    notifications.error(error);
  } finally {
    loading.value.transactionTypes = false;
  }
}

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
  getCompanies()
  getCheckouts()
  getTransactionTypes()
});
</script>

<style scoped>

</style>