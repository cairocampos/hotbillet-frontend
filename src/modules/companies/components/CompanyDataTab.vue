<template>
  <Box class="space-y-16 w-full">
    <Box class="flex items-center justify-between">
      <Heading>Hotbillet</Heading>
      <div class="flex items-center space-x-4">
        <ButtonRouter
          to="/companies"
          variant="dark"
          :outline="true"
          :rounded="true"
        >
          Editar Empresa
        </ButtonRouter>
        <Button
          variant="special"
          :rounded="true"
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
          Afiliado tal da Costa
        </Text>
        <a
          href="#"
          target="_blank"
          class="text-xs text-blue-500"
        >Acessar o site</a>
      </Box>
      <Box class="flex flex-col">
        <Text
          size="xs"
          variant="default"
        >
          Suporte do Fornecedor
        </Text>
        <Text size="sm">
          Email: suporte@suporte.com
        </Text>
        <Text size="sm">
          Telefone: 33 9999-5487
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
          Hotbillet
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
import { defineComponent } from 'vue';
import Box from '@/components/UI/Box/Box.vue';
import Heading from '@/components/UI/Layout/Heading.vue';
import Button from '@/components/UI/Button/Button.vue';
import ButtonRouter from '@/components/UI/Button/ButtonRouter.vue';
import Text from '@/components/UI/Layout/Text.vue';
export default defineComponent({
  components: { Box, Heading, Button, ButtonRouter, Text },
  setup() {
    const inactivateCompany = () => {
      //
    }

    return {
      inactivateCompany
    }
  }
})
</script>

<style lang='scss' scoped>
</style>