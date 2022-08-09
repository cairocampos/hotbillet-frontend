<template>
  <Form
    class="md:grid md:grid-cols-2 md:gap-10 md:divide-x-2 lg:grid-cols-3"
    @submit.prevent="submitForm"
  >
    <div class="space-y-8 lg:col-span-2">
      <TextField
        v-model="company.name"
        variant="secondary"
        label="Nome da Empresa"
        placeholder="Ex: Hotbillet"
        :error="getInputError('name', result)"
        @input="testInput('name', result)"
      />

      <TextField
        v-model="company.producer_name"
        variant="secondary"
        label="Nome do responsável"
      />

      <TextField
        v-model="company.cnpj"
        variant="secondary"
        label="CNPJ"
        :mask="['###.###.###-##', '##.###.###/####-##']"
        :error="getInputError('cnpj', result)"
        @input="testInput('cnpj', result)"
      />
      <Box>
        <Text>Dados de Contato</Text>
      </Box>
      <TextField
        v-model="company.support_phone"
        variant="secondary"
        mask="(##) #####-####"
        label="Telefone"
        :error="getInputError('support_phone', result)"
        @input="testInput('support_phone', result)"
      />
      <TextField
        v-model="company.support_email"
        variant="secondary"
        label="E-mail"
        :error="getInputError('support_email', result)"
        @input="testInput('support_email', result)"
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
import { useFormHandler } from "@/composables/useFormHandler";
import { PropType, reactive, ref, toRefs, watch } from "vue";
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
const { getInputError, testInput } = useFormHandler();

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
