<template>
  <div>
    <Loading v-if="loading" />
    <NoRecords
      v-else-if="!loading && !coupons.length"
      title="Nenhum cupom encontrado..."
    />

    <ListContainer>
      <List
        v-for="coupon in coupons"
        :key="coupon.id"
      >
        <ListItem>{{ coupon.title }}</ListItem>
        <ListItem>{{ coupon.code }}</ListItem>
        <ListItem>
          <ButtonCopy :text="coupon.code" />
        </ListItem>
      </List>
    </ListContainer>
  </div>
</template>

<script setup lang="ts">
import { IProduct } from '@/interfaces/IProduct';
import { onMounted, PropType, ref } from 'vue';
import Loading from '@/components/UI/Loading/Loading.vue';
import useNotifications from '@/core/composables/useNotifications';
import {fetchCoupons} from '@/core/services/api/products'
import NoRecords from '@/components/NoRecords.vue';
import { ProductCoupon } from '@/core/interfaces/Product'
import List from '@/components/UI/List/List.vue';
import ListItem from '@/components/UI/List/ListItem.vue';
import ButtonCopy from '@/components/UI/Button/ButtonCopy.vue';
import ListContainer from '@/components/UI/List/ListContainer.vue';

const props = defineProps({
  product: {
    type: Object as PropType<IProduct>,
    required:true
  }
})

const {notifications} = useNotifications();
const loading  = ref(false)

const coupons = ref<ProductCoupon[]>([])
const getCoupons = async () => {
  try {
    loading.value = true;
    const {data} = await fetchCoupons(props.product.id as number);
    coupons.value = data;
  } catch (error) {
    notifications.error(error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  getCoupons();
})

</script>

<style scoped>

</style>