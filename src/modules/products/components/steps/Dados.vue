<template>
  <form class="lg:grid lg:grid-cols-2 lg:gap-32 form-sm">
    <div class="space-y-12">
      <TextField
        v-model="form.name"
        label="Nome do Produto"
      />
      <AppSelect
        v-model="form.company_id"
        :options="companies"
        label="Empresa"
        required
        :server="true"
        :loading="loadingCompany"
        :selected="companySelected"
        @open="getCompanies()"
        @load-more="nextPage(() => getCompanies())"
        @search="getCompanies($event)"
      />
      <TextField
        v-model="form.url"
        label="Link do Produto"
        placeholder="Cole aqui a URL da página do produto"
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
        ></textarea>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import {PRODUCT_TYPE, STATUS} from '@/core/constants'
import useNotifications from "@/core/composables/useNotifications";
import { Product } from "@/core/interfaces/Product";
import { api } from "@/core/services/api/base";
import { defineComponent, onMounted, PropType, ref, toRefs,reactive } from "vue";
import TextField from "@/components/UI/Form/Input/TextField.vue";
import AppSelect from "@/components/UI/AppSelect/AppSelect.vue";
import { fetchCompanies, fetchCompany } from "@/core/services/api/companies";
import usePagination from "@/core/composables/usePagination";
import { Company } from "@/core/interfaces/Company";
import { requiredField, validateEmail, validateUrl } from '@/core/helpers/formValidation';
import useValidate from 'vue-tiny-validate';

export default defineComponent({
  components: { TextField, AppSelect },
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true
    },
    loading: {
      type: Boolean
    }
  },
  emits: ["change-step", "update:loading"],
  setup(props, { emit }) {
    const { notifications } = useNotifications();
    const { product } = toRefs(props);
    const form = ref<Product>({
      type: PRODUCT_TYPE.DIGITAL,
      name: "",
      company_id: Number(),
      description: "",
      status: STATUS.ATIVO,
      support_email: "",
      support_phone: "",
      url: "",
      type_description: "",
    });

    const rules = reactive({
      name: requiredField(),
      url: [requiredField(), validateUrl()],
      company_id: requiredField(),
      support_email: [requiredField(), validateEmail()]
    })

    const {result} = useValidate(form, rules)

    const submitForm = async () => {
      try {
        await api.put(`/products/${product.value.id}`, form.value);
        emit("change-step");
      }
      catch (error) {
        notifications.error(error);
      }
      finally {
        emit("update:loading", false);
      }
    };

    const companySelected = ref<{id:number;text:string}>();
    const getCompany = async () => {
      const {data} = await fetchCompany(props.product.company_id as number)
      companySelected.value = data;
    }

    const loadingCompany = ref(false)
    const {pagination, data: companies, nextPage} = usePagination<Company>();
    const getCompanies = async (search = "") => {
      try {
        loadingCompany.value = true;
        const {data: {data, ...paginationProps}} = await fetchCompanies({
          search,
          page: pagination.value.current_page
        });
        companies.value = data;
        pagination.value = paginationProps
      } finally {
        loadingCompany.value = false;
      }
    }

    onMounted(() => {
      form.value = product.value;
      getCompany();
    });
    return {
      form,
      submitForm,
      PRODUCT_TYPE,
      companySelected,
      loadingCompany,
      getCompanies,
      nextPage,
      companies,
      result
    };
  },
});
</script>

<style>
</style>