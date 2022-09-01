<template>
  <Form class="lg:grid lg:grid-cols-2 lg:gap-32 form-sm">
    <div class="space-y-12">
      <TextField
        v-model="form.name"
        label="Nome do produto"
        :validator="{result, field: 'name'}"
        required
      />

      <AppSelect
        v-model="form.company_id"
        :options="companies"
        label="Empresa"
        required
        :server="true"
        :loading="loading"
        @open="getCompanies()"
        @load-more="nextPage(() => getCompanies())"
        @search="getCompanies($event)"
      />
      <TextField
        v-model="form.url"
        label="Link da página do produto"
        :validator="{result, field: 'url'}"
      />
      <AppSelect
        v-model="form.type"
        label="Tipo do produto"
        required
        :options="Object.entries(PRODUCT_TYPE).map(([key,value]) => ({name: key, id: value}))"
      />
    </div>
    <div class="mt-10 md:mt-0 space-y-12">
      <TextField
        v-model="form.support_phone"
        label="Contato do suporte"
        placeholder="(XX) X XXXX-XXXX"
        mask="(##) # ####-####"
        :validator="{result, field: 'support_phone'}"
      >
        <template #left>
          <span>Telefone:</span>
        </template>
      </TextField>
      <TextField
        v-model="form.support_email"
        label="Email do suporte"
        placeholder="suporte@contato.com"
        :validator="{result, field: 'support_email'}"
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
import { Product } from '@/core/interfaces/Product';
import Form from '@/components/UI/Form/Form.vue';
import useValidate from 'vue-tiny-validate';
import TextField from '@/components/UI/Form/Input/TextField.vue';
import {PRODUCT_TYPE} from '@/core/constants';
import { api } from '@/core/services/api/base';
import useNotifications from '@/core/composables/useNotifications';
import { useRouter } from 'vue-router';
import { requiredField, validateEmail, validateUrl } from '@/core/helpers/formValidation'
import { fetchCompanies } from '@/core/services/api/companies';
import AppSelect from '@/components/UI/AppSelect/AppSelect.vue';
import { Company } from "@/core/interfaces/Company";
import usePagination from '@/core/composables/usePagination';
const { notifications } = useNotifications()
const router = useRouter()

const props = defineProps({
  loading: {
    type: Boolean,
    required:true
  }
})
const emit = defineEmits(['update:loading']);

const form = ref<Product>({
  name: "",
  company_id: Number(),
  url: "",
  type: PRODUCT_TYPE.DIGITAL,
  support_email: "",
  support_phone: "",
  description: "",
  status: 1,
  type_description: ""
});

const rules = reactive({
  name: requiredField(),
  url: [requiredField(), validateUrl()],
  company_id: requiredField(),
  support_email: [requiredField(), validateEmail()]
})

const {result} = useValidate(form, rules)

const submit = async () => {
  result.value.$test();
  if(result.value.$invalid) return;

  try {
    emit('update:loading', true)
    const { data } = await api.post("/products", form.value);
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


const loading = ref(false)
const {pagination, data: companies, nextPage} = usePagination<Company>();
const getCompanies = async (search = "") => {
  try {
    loading.value = true;
    const {data: {data, ...paginationProps}} = await fetchCompanies({
      search,
      page: pagination.value.current_page
    });
    companies.value = data;
    pagination.value = paginationProps
  } finally {
    loading.value = false;
  }
}

</script>

<style scoped>

</style>