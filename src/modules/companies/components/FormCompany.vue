<template>
  <Form
    class="md:grid md:grid-cols-2 md:gap-10 md:divide-x-2 lg:grid-cols-3"
    @submit.prevent="submitForm"
  >
    <div class="space-y-8 lg:col-span-2">
      <TextField
        v-model="company.company_name"
        variant="secondary"
        label="Nome da Empresa"
        placeholder="Ex: Hotbillet"
        :error="getInputError('company_name', result)"
        @input="testInput('company_name', result)"
      />

      <TextField
        v-model="company.cpf_cnpj"
        variant="secondary"
        label="CPF/CNPJ"
        :mask="['###.###.###-##', '##.###.###/####-##']"
        :error="getInputError('cpf_cnpj', result)"
        @input="testInput('cpf_cnpj', result)"
      />
      <Box>
        <Text>Dados de Contato</Text>
      </Box>
      <TextField
        v-model="company.tel1"
        variant="secondary"
        mask="(##) #####-####"
        label="Telefone"
        :error="getInputError('tel1', result)"
        @input="testInput('tel1', result)"
      />
      <TextField
        v-model="company.tel2"
        variant="secondary"
        mask="(##) #####-####"
        label="Telefone Secundário (opcional)"
      />
      <TextField
        v-model="company.email"
        variant="secondary"
        label="E-mail"
        :error="getInputError('email', result)"
        @input="testInput('email', result)"
      />

      <Box>
        <Text>Informações Endereço</Text>
      </Box>

      <InputCep
        v-model="company.cep"
        :error="getInputError('cep', result)"
        @zipcode-found="setAddress"
        @input="testInput('cep', result)"
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
          :error="getInputError('address', result)"
          @input="testInput('address', result)"
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
          :error="getInputError('district', result)"
          @input="testInput('district', result)"
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
          :error="getInputError('city', result)"
          @input="testInput('city', result)"
        />

        <Autocomplete
          v-model="company.state"
          :options="brazilianStates.map(item => ({id: item, label: item}))"
          label="Estado"
          :selected="{id: company.state, label:company.state}"
          :bordered="false"
          :error="getInputError('state', result)"
          @selected="testInput('state', result)"
        />
      </Grid>
    </div>

    <!-- <div class="hidden lg:block separate bg-gray-200 mx-4"></div> -->

    <div class="md:my-0">
      <div class="my-16 md:my-0 space-x-4 flex items-center justify-end">
        <Button
          :loading="loading"
          loading-type="border"
          :disabled="loading"
          radius="full"
          variant="dark"
          text-loading="Salvando..."
          type="submit"
        >
          Salvar
        </Button>
        <Button
          radius="full"
          :redirect="{ name: 'Companies' }"
          variant="dark"
          outline
        >
          Cancelar
        </Button>
      </div>
    </div>
  </Form>
</template>

<script lang="ts">
import TextField from "@/components/UI/Form/Input/TextField.vue";
import Text from '@/components/UI/Layout/Text.vue'
import { useFormHandler } from "@/composables/useFormHandler";
import useHelpers from "@/composables/useHelpers";
import { IViacep } from "@/interfaces/IViacep";
import { defineComponent, PropType, reactive, ref, toRefs, watch } from "vue";
import { ICompany } from "../interfaces/ICompany";
import Form from "@/components/UI/Form/Form.vue";
import ButtonRouter from "@/components/UI/Button/ButtonRouter.vue";
import Button from "@/components/UI/Button/Button.vue";
import Grid from "@/components/UI/Form/Grid.vue";
import InputCep from "./InputCep.vue";
import Box from "@/components/UI/Box/Box.vue";
import Autocomplete from "@/components/UI/Autocomplete/Autocomplete.vue";
import { Result } from "vue-tiny-validate";
export default defineComponent({
  components: { Form, TextField, ButtonRouter, Button, Grid, InputCep, Box, Text, Autocomplete },
  props: {
    modelValue: {
      type: Object as PropType<Omit<ICompany, "id">>,
      required: true,
    },
    result: {
      type: Object as PropType<Result>,
      required:true
    },
    loading: {
      type: Boolean,
      default:false
    }
  },
  emits: ["update:modelValue", "submit"],
  setup(props, { emit }) {
    const { modelValue } = toRefs(props)
    const inputAddressNumber = ref<typeof TextField>();
    const { onlyNumbers, brazilianStates } = useHelpers();
    const { getInputError, testInput } = useFormHandler();

    const company = reactive({...props.modelValue})
    
    watch(company, val => emit('update:modelValue', val))

    const setAddress = (dataCep: IViacep) => {
      emit("update:modelValue", {
        ...props.modelValue,
        district: dataCep.bairro,
        address: dataCep.logradouro,
        city: dataCep.localidade,
        state: dataCep.uf,
      });

      inputAddressNumber.value?.setFocus();
    };
    
    const submitForm = () => {
      props.result.$test();
      const dataSanitize: Omit<ICompany, 'id'> = {
        ...props.modelValue,
        tel1: onlyNumbers(props.modelValue.tel1),
        tel2: onlyNumbers(props.modelValue.tel2),
        cep: onlyNumbers(props.modelValue.cep),
        cpf_cnpj: onlyNumbers(props.modelValue.cpf_cnpj),
      }
      emit('update:modelValue', dataSanitize)
      emit('submit');
    }

    watch(modelValue, val => Object.assign(company, val));

    return {
      company,
      inputAddressNumber,
      setAddress,
      getInputError,
      testInput,
      brazilianStates,
      submitForm,
    };
  },
});
</script>

<style lang="scss" scoped></style>
