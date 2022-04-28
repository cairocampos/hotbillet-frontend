<template>
  <Box class="space-y-16 w-full">
    <Box class="flex items-center justify-between">
      <Heading></Heading>
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

    <PageLoading v-if="loading" />
    <div class="space-y-4 lg:space-y-0 md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-6">
      <CardProduto
        v-for="product in products"
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
    <NoRecords v-if="!loading && !products.length" />
  </Box>
</template>

<script lang='ts'>
import { defineComponent, onMounted, ref } from 'vue';
import Box from '@/components/UI/Box/Box.vue';
import Heading from '@/components/UI/Layout/Heading.vue';
import ButtonRouter from '@/components/UI/Button/ButtonRouter.vue';
import CardProduto from '@/modules/products/components/CardProduto.vue';
import { IProductData } from '@/interfaces/IProduct';
import Button from '@/components/UI/Button/Button.vue';
import { api } from '@/services';
import useNotifications from '@/composables/useNotifications';
import NoRecords from '@/components/NoRecords.vue';
export default defineComponent({
  components: { Box, Heading, ButtonRouter, CardProduto, Button, NoRecords },
  props: {
    id: {
      type: [Number,String],
      required:true
    }
  },
  setup(props) {
    const loading = ref(false)
    const {notifications} = useNotifications();
    const products = ref<IProductData[]>([]);

    const fetchProducts = async () => {
      try {
        loading.value = true;
        const {data} = await api.get<{products: IProductData[]}>(`/companies/${props.id}/products`)
        products.value = data.products
        await Promise.resolve(setTimeout(() => null, 150000))
      } catch (error) {
        notifications.error(error)
      } finally {
        loading.value = false;
      }
    }

    onMounted(() => fetchProducts());

    return {
      loading,
      products
    }
  }
})
</script>

<style lang='scss' scoped>
</style>