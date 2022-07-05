<template>
  <Box class="space-y-16 w-full">
    <Box class="flex items-center justify-between">
      <Heading></Heading>
      <div class="flex items-center space-x-4">
        <Button
          redirect="/companies/adicionar"
          variant="dark"
          radius="full"
        >
          Adicionar Produto
        </Button>
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
            variant="dark"
            :outline="true"
            block
            radius="full"
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
import Button from '@/components/UI/Button/Button.vue';
import CardProduto from '@/modules/products/components/CardProduto.vue';
import { IProductData } from '@/interfaces/IProduct';
import { api } from '@/services/api';
import useNotifications from '@/composables/useNotifications';
import NoRecords from '@/components/NoRecords.vue';
import PageLoading from '@/components/global/PageLoading.vue';
export default defineComponent({
  components: { Box, Heading, Button, CardProduto, Button, NoRecords, PageLoading },
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
        const {data} = await api.get<IProductData[]>(`/companies/${props.id}/products`)
        products.value = data
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