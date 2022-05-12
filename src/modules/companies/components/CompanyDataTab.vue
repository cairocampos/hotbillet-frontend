<template>
  <Box class="space-y-16 w-full">
    <Box class="flex items-center justify-between">
      <Heading>
        {{ company.company_name }}
      </Heading>
      <div class="flex items-center space-x-4">
        <Button
          :redirect="{name: 'UpdateCompany', props: {id: company.id}}"
          variant="dark"
          outline
          radius="full"
        >
          Editar Empresa
        </Button>
        <Button
          variant="special"
          radius="full"
          @click="inactivateCompany"
        >
          Inativar
        </Button>
      </div>
    </Box>

    <Box class="md:grid md:grid-cols-4">
      <Box class="flex flex-col">
        <Text
          size="xs"
          variant="default"
        >
          Vendido por
        </Text>
        <Text size="sm">
          {{ company.company_name }}
        </Text>
        <!-- <a
          href="#"
          target="_blank"
          class="text-xs text-blue-500"
        >Acessar o site</a> -->
      </Box>
      <Box class="flex flex-col">
        <Text
          size="xs"
          variant="default"
        >
          Suporte do Fornecedor
        </Text>
        <Text size="sm">
          Email: {{ company.email }}
        </Text>
        <Text size="sm">
          Telefone: {{ maskPhone(company.tel1) }}
        </Text>
      </Box>
    </Box>

    <Box class="md:grid md:grid-cols-4">
      <Box class="flex flex-col">
        <Text
          size="xs"
          variant="default"
        >
          Produzido por
        </Text>
        <Text size="sm">
          {{ company.company_name }}
        </Text>
      </Box>
      <Box class="flex flex-col">
        <Text
          size="xs"
          variant="default"
        >
          Meios de Pagamento
        </Text>

        <Box class="mt-2 flex items-center space-x-2">
          <div class="flex items-center space-x-1">
            <img
              src="@/assets/icons/boleto.svg"
              alt=""
            >
            <Text
              size="xs"
              variant="default"
            >
              Boleto
            </Text>
          </div>
          <div class="flex items-center space-x-1">
            <img
              src="@/assets/icons/pix.svg"
              alt=""
            >
            <Text
              size="xs"
              variant="default"
            >
              Pix
            </Text>
          </div>
        </Box>
      </Box>
    </Box>
  </Box>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue';
import Box from '@/components/UI/Box/Box.vue';
import Heading from '@/components/UI/Layout/Heading.vue';
import Button from '@/components/UI/Button/Button.vue';
import Text from '@/components/UI/Layout/Text.vue';
import { ICompany } from '../interfaces/ICompany';
import { maskPhone } from '@/helpers'
export default defineComponent({
  components: { Box, Heading, Button, Text },
  props: {
    company: {
      type: Object as PropType<ICompany>,
      required:true
    }
  },
  setup() {
    const inactivateCompany = () => {
      //
    }  

    return {
      inactivateCompany,
      maskPhone
    }
  }
})
</script>

<style lang='scss' scoped>
</style>