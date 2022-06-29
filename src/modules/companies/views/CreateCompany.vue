<template>
  <Container>
    <HeadPage title="Cadastrar Empresa" />
    <FormCompany
      v-model="company"
      :result="result"
      :loading="loading"
      @submit="createCompany"
    />
  </Container>
</template>

<script lang="ts">
import TitlePage from "@/components/TitlePage.vue";
import { defineComponent, reactive, ref } from "@vue/runtime-core";
import useNotifications from "@/composables/useNotifications";
import { api } from "@/services/api";
import Container from "@/components/UI/Layout/Container.vue";
import { ICompany } from "../interfaces/ICompany";
import { useRouter } from "vue-router";
import useValidate from 'vue-tiny-validate'
import {createCompanyRules} from '../validate'
import FormCompany from "../components/FormCompany.vue";
import HeadPage from "@/components/global/HeadPage.vue";
export default defineComponent({
  components: {
    TitlePage,
    Container,
    FormCompany,
    HeadPage
},
  setup() {
    const router = useRouter();
    const loading = ref(false)
    const {notifications} = useNotifications();

    const company = ref<Omit<ICompany, "id">>({
      company_name: "",
      cpf_cnpj: "",
      email: "",
      tel1: "",
      tel2: "",
      cep: "",
      address: "",
      address_number: "",
      complement: "",
      district: "",
      city: "",
      state: "",
    });

    const rules = reactive(createCompanyRules);
    const { result } = useValidate(company, rules);

    const createCompany = async () => {
      if(result.value.$invalid)
        return notifications.info('Favor verificar os campos do formulário.');
      try {
        loading.value = true;
        await api.post<{company: ICompany}>('/companies', company.value);
        notifications.success('Empresa criada!');
        router.go(-1);
      } catch (error) {
        notifications.error(error);
      } finally {
        loading.value = false;
      }
    }

    return {
      loading,
      company,
      result,
      createCompany
    }
  },
});
</script>

<style scoped>
.separate {
  min-height: 10px;
  width: 2px;
}
</style>
