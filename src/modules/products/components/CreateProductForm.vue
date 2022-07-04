<template>
  <Form class="lg:grid lg:grid-cols-2 lg:gap-32 form-sm">
    <div class="space-y-12">
      <TextField
        v-model="form.name"
        label="Nome do produto"
        variant="secondary"
        label-class="text-xs"
        :error="getInputError('name', result)"
        @input="testInput('name', result)"
      />
      <Autocomplete
        v-model="form.company_id"
        label="Empresa"
        variant="secondary"
        label-class="text-xs"
        :error="getInputError('company_id', result)"
        :config="companiesConfig"
        @input="testInput('company_id', result)"
      />
      <TextField
        v-model="form.url"
        label="Link da página do produto"
        variant="secondary"
        label-class="text-xs"
        :error="getInputError('url', result)"
        @input="testInput('url', result)"
      />
      <Listbox
        v-model="form.type"
        :options="Object.entries(PRODUCT_TYPE).map(([key,value]) => ({label: key, value: value}))"
        label="Tipo do produto"
        variant="secondary"
      />
    </div>
    <div class="mt-10 md:mt-0 space-y-12">
      <TextField
        v-model="form.support_phone"
        label="Contato do suporte"
        placeholder="(XX) X XXXX-XXXX"
        mask="(##) # ####-####"
        variant="secondary"
        label-class="text-xs"
        :error="getInputError('support_tel', result)"
        @input="testInput('support_tel', result)"
      >
        <template #left>
          <span>Telefone:</span>
        </template>
      </TextField>
      <TextField
        v-model="form.support_email"
        label="Email do suporte"
        variant="secondary"
        label-class="text-xs"
        placeholder="suporte@contato.com"
        :error="getInputError('support_email', result)"
        @input="testInput('support_email', result)"
      >
        <template #left>
          <span>Email:</span>
        </template>
      </TextField>
      <div class="form-group">
        <label
          for=""
          class="label"
        >Descrição do Produto</label>
        <textarea
          v-model="form.description"
          class="form-control form-control-line border rounded-sm"
          placeholder="Descreva o produto aqui"
          rows="10"
        />
      </div>
    </div>
  </Form>
</template>

<script setup lang="ts">
import {ref, reactive} from 'vue'
import { IProduct, IProductData } from '@/interfaces/IProduct';
import Form from '@/components/UI/Form/Form.vue';
import useValidate from 'vue-tiny-validate';
import TextField from '@/components/UI/Form/Input/TextField.vue';
import Autocomplete, {AutocompleteConfig} from '@/components/UI/Autocomplete/Autocomplete.vue';
import useConstants from '@/composables/useConstants';
import { api } from '@/services/api';
import useNotifications from '@/composables/useNotifications';
import { useRouter } from 'vue-router';
import { getInputError,testInput, requiredField, validateUrl } from '@/helpers/formValidation'
import Listbox from '@/components/UI/Listbox/Listbox.vue';
const { PRODUCT_TYPE } = useConstants()
const { notifications } = useNotifications()
const router = useRouter()

const props = defineProps({
  loading: {
    type: Boolean,
    required:true
  }
})
const emit = defineEmits(['update:loading']);

const form = ref<IProductData>({
  name: "",
  company_id: Number(),
  url: "",
  type: PRODUCT_TYPE.DIGITAL,
  support_email: "",
  support_phone: "",
  description: "",
  status: 1
});

const rules = reactive({
  name: requiredField(),
  url: [requiredField(), validateUrl()],
  company_id: requiredField()
})

const {result} = useValidate(form, rules)

const submit = async () => {
  result.value.$test();
  if(result.value.$invalid) return;

  try {
    emit('update:loading', true)
    const { data } = await api.post<IProduct>("/products", form.value);
    notifications.success("Continue cadastrando os dados do seu produto.");
    router.push({
      name: "UpdateProduct",
      params: { id: data.id },
      query: { redirect: 1 },
    });
  }
  catch (error) {
    notifications.error(error);
  }
  finally {
    emit('update:loading', false)
  }
};

defineExpose({submit})

const companiesConfig: AutocompleteConfig = {
  url: "/companies",
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

</script>

<style scoped>

</style>