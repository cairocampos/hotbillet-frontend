<template>
  <Container>
    <HeadPage>
      <RouteBack title="Atualizar Empresa" />
    </HeadPage>
    <Loading v-if="loading.primary" />
    <FormCompany
      v-else
      v-model="company"
      :result="result"
      :loading="loading.secondary"
      @submit="updateCompany"
    />
  </Container>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "@vue/runtime-core";
import useNotifications from "@/composables/useNotifications";
import { api } from "@/services/api";
import Container from "@/components/UI/Layout/Container.vue";
import { ICompany } from "../interfaces/ICompany";
import { useRouter } from "vue-router";
import useValidate from 'vue-tiny-validate'
import {createCompanyRules} from '../validate'
import FormCompany from "../components/FormCompany.vue";
import Loading from "@/components/UI/Loading/Loading.vue";
import useLoading from "@/composables/useLoading";
import RouteBack from "@/components/RouteBack.vue";
import HeadPage from "@/components/HeadPage.vue";
export default defineComponent({
  components: {
    Container,
    FormCompany,
    Loading,
    RouteBack,
    HeadPage
},
  props: {
    id: {
      type: [Number,String],
      required:true
    }
  },
  setup(props) {
    const router = useRouter();
    const {loading} = useLoading()
    const {notifications} = useNotifications();

    const company = ref<Omit<ICompany, "id">>({
      name: "",
      cnpj: "",
      support_email: "",
      support_phone: "",
    });

    const fetchCompany = async () => {
      try {
        loading.value.primary = true;
        const {data} = await api.get<ICompany>(`/companies/${props.id}`)
        company.value = data;
      } catch (error) {
        notifications.error(error);
      } finally {
        loading.value.primary = false
      }
    }

    const rules = reactive(createCompanyRules);
    const { result } = useValidate(company, rules);

    const updateCompany = async () => {
      if(result.value.$invalid)
        return notifications.info('Favor verificar os campos do formulário.');
      try {
        loading.value.secondary = true;
        await api.put<{company: ICompany}>(`/companies/${props.id}`, company.value);
        notifications.success('Empresa atualizada!');
        router.go(-1);
      } catch (error) {
        notifications.error(error);
      } finally {
        loading.value.secondary = false;
      }
    }

    onMounted(() => fetchCompany());

    return {
      loading,
      company,
      result,
      updateCompany
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
