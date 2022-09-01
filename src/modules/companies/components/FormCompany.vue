<template>
  <Form
    class="md:grid md:grid-cols-2 md:gap-10 md:divide-x-2 lg:grid-cols-3"
    @submit.prevent="submitForm"
  >
    <div class="space-y-8 lg:col-span-2">
      <TextField
        v-model="company.name"
        label="Nome da Empresa"
        placeholder="Ex: Hotbillet"
        :validator="{result, field: 'name'}"
        required
      />

      <TextField
        v-model="company.producer_name"
        label="Nome do responsável"
      />

      <TextField
        v-model="company.cnpj"
        label="CNPJ"
        :mask="['###.###.###-##', '##.###.###/####-##']"
        :validator="{result, field: 'cnpj'}"
        required
      />
      <Box>
        <Text>Dados de Contato</Text>
      </Box>
      <TextField
        v-model="company.support_phone"
        mask="(##) #####-####"
        label="Telefone"
        :validator="{result, field: 'support_phone'}"
      />
      <TextField
        v-model="company.support_email"
        label="E-mail"
        :validator="{result, field: 'support_email'}"
      />
    </div>

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

<script setup lang="ts">
import TextField from "@/components/UI/Form/Input/TextField.vue";
import Text from '@/components/UI/Layout/Text.vue'
import { PropType, reactive, toRefs, watch } from "vue";
import { ICompany } from "../interfaces/ICompany";
import Form from "@/components/UI/Form/Form.vue";
import Button from "@/components/UI/Button/Button.vue";
import Box from "@/components/UI/Box/Box.vue";
import { Result } from "vue-tiny-validate";

const props = defineProps({
  modelValue: {
    type: Object as PropType<Omit<ICompany, "id">>,
    required: true,
    },
  result: {
    type: Object as PropType<Result>,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(["update:modelValue", "submit"]);
const { modelValue } = toRefs(props)

const company = reactive({ ...props.modelValue })

watch(company, val => emit('update:modelValue', val))

const submitForm = () => {
  props.result.$test();
  emit('update:modelValue', props.modelValue)
  emit('submit');
}

watch(modelValue, val => Object.assign(company, val));

</script>

<style lang="scss" scoped>
</style>
