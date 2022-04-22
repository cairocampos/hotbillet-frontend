<template>
  <Container>
    <HeadPage class="mb-10">
      <TitlePage>Cadastrar Empresa</TitlePage>
    </HeadPage>

    <Form class="md:grid md:grid-cols-2 md:gap-10 md:divide-x-2 lg:grid-cols-3">
      <div class="space-y-8 lg:col-span-2">
        <TextField
          v-model="company.company_name"
          variant="secondary"
          label="Nome da Empresa"
          placeholder="Ex: Hotbillet"
          :error="getInputError('company_name', result)"
          @input="result.$test"
        />

        <TextField
          v-model="company.cpf_cnpj"
          variant="secondary"
          label="CPF/CNPJ"
          :mask="['###.###.###-##', '##.###.###/####-##']"
        />
        <Box>
          <Text> Dados de Contato </Text>
        </Box>
        <TextField
          v-model="company.tel1"
          variant="secondary"
          mask="(##) #####-####"
          label="Telefone"
        />
        <TextField
          v-model="company.tel2"
          variant="secondary"
          mask="(##) #####-####"
          label="Telefone Secundário"
        />
        <TextField
          v-model="company.email"
          variant="secondary"
          label="E-mail"
        />

        <Box>
          <Text>Informações Endereço</Text>
        </Box>
        
        <InputCep
          v-model="company.cep"
          @zipcode-found="setAddress"
        />

        <Grid
          :cols="1"
          :md="{ cols: 3, gap: 4 }"
        >
          <TextField
            v-model="company.address"
            variant="secondary"
            label="Logradouro"
            class="col-span-2"
          />

          <TextField
            ref="inputAddressNumber"
            v-model="company.address_number"
            variant="secondary"
            label="Número"
          />
        </Grid>
        <Grid
          :cols="1"
          :md="{ cols: 3, gap: 4 }"
        >
          <TextField
            v-model="company.district"
            variant="secondary"
            label="Bairro"
            class="col-span-2"
          />

          <TextField
            v-model="company.complement"
            variant="secondary"
            label="Complemento"
            placeholder="Ex: Apto 84B"
          />
        </Grid>
        <Grid
          :cols="1"
          :md="{ cols: 3, gap: 4 }"
        >
          <TextField
            v-model="company.city"
            variant="secondary"
            label="Cidade"
            class="col-span-2"
          />

          <TextField
            v-model="company.state"
            variant="secondary"
            label="Estado"
            mask="AA"
          />
        </Grid>
      </div>

      <!-- <div class="hidden lg:block separate bg-gray-200 mx-4"></div> -->

      <div class="md:my-0">
        <div class="my-16 md:my-0 space-x-4 flex items-center justify-end">
          <Button
            :loading="loading.primary"
            loading-type="border"
            :disabled="loading.primary"
            :rounded="true"
            variant="info"
            text-loading="Salvando..."
            @click="createCompany"
            @click.prevent="createCompany"
          >
            Cadastrar
          </Button>
          <ButtonRouter
            :rounded="true"
            :to="{ name: 'Companies' }"
            variant="danger"
            :outline="true"
          >
            Cancelar
          </ButtonRouter>
        </div>
      </div>
    </Form>
  </Container>
</template>

<script lang="ts">
import TitlePage from "@/components/TitlePage.vue";
import { defineComponent, reactive, ref } from "@vue/runtime-core";
import useNotifications from "@/composables/useNotifications";
import { api } from "@/services";
import { useDefaultStore } from "@/store";
import Button from "@/components/UI/Button/Button.vue";
import Form from "@/components/UI/Form/Form.vue";
import TextField from "@/components/UI/Form/Input/TextField.vue";
import Text from "@/components/UI/Layout/Text.vue";
import ButtonRouter from "@/components/UI/Button/ButtonRouter.vue";
import Container from "@/components/UI/Layout/Container.vue";
import Grid from "@/components/UI/Form/Grid.vue";
import Box from "@/components/UI/Box/Box.vue";
import { ICompany } from "../interfaces/ICompany";
import useLoading from "@/composables/useLoading";
import InputCep from "../components/InputCep.vue";
import { IViacep } from "@/interfaces/IViacep";
import { useRouter } from "vue-router";
import { onlyNumbers } from '@/helpers'
import useValidate from 'vue-tiny-validate'
import { MESSAGE_VALIDATE } from "@/contants";
import { useFormHandler } from "@/composables/useFormHandler";
export default defineComponent({
  components: {
    TitlePage,
    Button,
    Form,
    TextField,
    ButtonRouter,
    Container,
    Grid,
    Box,
    InputCep,
    Text
},
  setup() {
    const { notifications } = useNotifications();
    const store = useDefaultStore;
    const router = useRouter()
    const { loading } = useLoading();
    const inputAddressNumber = ref<typeof TextField>()
    const { getInputError } = useFormHandler()
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

    const rules = reactive({
      company_name: {
        name: "required",
        test: (value:string) => Boolean(value),
        message: MESSAGE_VALIDATE.REQUIRED
      }
    })
    const {result} = useValidate(company, rules)

    const createCompany = async () => {
      try {
        loading.value.primary = true;
        await api.post<{company: ICompany}>('/companies', {
          ...company.value,
          cep: onlyNumbers(company.value.cep),
          tel1: onlyNumbers(company.value.tel1),
          tel2: onlyNumbers(company.value.tel2),
          cpf_cnpj: onlyNumbers(company.value.cpf_cnpj),
        });
        notifications.success('Empresa criada!');
        router.go(-1);
      } catch (error) {
        notifications.error(error);
      } finally {
        loading.value.primary = false;
      }
    };

    const setAddress = (dataCep: IViacep) => {
      company.value = {
        ...company.value,
        district: dataCep.bairro,
        address: dataCep.logradouro,
        city: dataCep.localidade,
        state: dataCep.uf
      }

      inputAddressNumber.value?.setFocus()
    }

    return {
      store,
      createCompany,
      company,
      loading,
      inputAddressNumber,
      setAddress,
      result,
      getInputError
    };
  },
});
</script>

<style scoped>
.separate {
  min-height: 10px;
  width: 2px;
}
</style>
