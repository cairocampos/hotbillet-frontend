<template>
  <Box class="space-y-16 w-full">
    <Box class="flex items-center justify-between">
      <Heading>Hotbillet</Heading>
      <div class="flex items-center space-x-4">
        <ButtonRouter
          to="/companies/adicionar"
          variant="dark"
          :rounded="true"
        >
          Adicionar Produto
        </ButtonRouter>
      </div>
    </Box>

    <div class="space-y-4 lg:space-y-0 md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-6">
      <CardProduto
        v-for="product in fakeProducts"
        :key="product.name"
        :product="product"
      >
        <div class="px-4">
          <Button
            variant="danger"
            :outline="true"
            :blocked="true"
            :rounded="true"
          >
            Pausar Produto
          </Button>
        </div>
      </CardProduto>
    </div>
  </Box>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import Box from '@/components/UI/Box/Box.vue';
import Heading from '@/components/UI/Layout/Heading.vue';
import ButtonRouter from '@/components/UI/Button/ButtonRouter.vue';
import CardProduto from '@/modules/products/components/CardProduto.vue';
import { IProductData } from '@/interfaces/IProduct';
import Button from '@/components/UI/Button/Button.vue';
export default defineComponent({
  components: { Box, Heading, ButtonRouter, CardProduto, Button },
  setup() {
    const fakeProducts: IProductData[] = [
      {id:1, name:"Teste", abbreviation: "teste",description: "", product_type: 'DIGITAL', status: 'ATIVO', url:""}
    ];
    const inactivateCompany = () => {
      //
    }

    return {
      inactivateCompany,
      fakeProducts
    }
  }
})
</script>

<style lang='scss' scoped>
</style>