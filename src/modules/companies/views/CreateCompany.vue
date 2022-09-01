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

<script setup lang="ts">
import { reactive, ref } from "@vue/runtime-core";
import useNotifications from "@/core/composables/useNotifications";
import { api } from "@/core/services/api/base";
import Container from "@/components/UI/Layout/Container.vue";
import { Company } from "@/core/interfaces/Company";
import { useRouter } from "vue-router";
import useValidate from 'vue-tiny-validate'
import FormCompany from "../components/FormCompany.vue";
import HeadPage from "@/components/HeadPage.vue";
import { requiredField, validateCnpj, validateEmail } from "@/core/helpers/formValidation";

const router = useRouter();
const loading = ref(false)
const {notifications} = useNotifications();

const company = ref<Omit<Company, "id">>({
  name: "",
  cnpj: "",
  support_email: "",
  support_phone:"",
  producer_name:""
});

const rules = reactive({
  name: [requiredField()],
  cnpj: [requiredField(), validateCnpj()],
  support_phone: [requiredField()],
  support_email: [requiredField(), validateEmail()],
});
const { result } = useValidate(company, rules);

const createCompany = async () => {
  if(result.value.$invalid)
    return notifications.info('Favor verificar os campos do formulário.');
  try {
    loading.value = true;
    await api.post<{company: Company}>('/companies', company.value);
    notifications.success('Empresa criada!');
    router.go(-1);
  } catch (error) {
    notifications.error(error);
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.separate {
  min-height: 10px;
  width: 2px;
}
</style>
