<template>
  <section class="coupons">
    <div>
      <button
        class="text-blue-600 flex items-center space-x-2 mb-10"
        @click="modalAdd = true"
      >
        <PhPlus size="20" />
        <span>Cupom</span>
      </button>

      <transition-group
        name="slide"
        tag="div"
        class="space-y-4"
      >
        <div class="md:grid md:grid-cols-2 md:gap-4">
          <div
            v-if="loading"
            class="w-max"
          >
            <PageLoading />
          </div>
          <Card
            v-for="(coupon, index) in coupons"
            :key="index"
          >
            <template #header>
              <h3 class="text-sm font-medium">
                {{ coupon.title }}
              </h3>
              <button
                class="text-red-500 text-xs font-medium"
                @click="remove(coupon)"
              >
                Remover
              </button>
            </template>
            <template #body>
              <ButtonCopy :text="coupon.code">
                <span class="test-xs text-zinc-500">{{ coupon.code }}</span>
              </ButtonCopy>
            </template>
          </Card>
        </div>
      </transition-group>
      <p
        v-show="!coupons || !coupons.length"
        class="text-default text-sm"
      >
        Nenhum cupom adicionado.
      </p>
    </div>

    <Modal
      v-model:open="modalAdd"
      screen="w-1/4"
      title="Adicionar Cupom"
    >
      <template #body>
        <form
          class="form-sm space-y-12"
          @submit.prevent="append"
        >
          <div class="form-group">
            <label class="label">Titulo</label>
            <input
              v-model="form.title"
              type="text"
              class="form-control form-control-line"
            />
          </div>
          <div class="form-group">
            <label class="label">Código</label>
            <input
              v-model="form.code"
              type="text"
              class="form-control form-control-line"
            />
          </div>
          <div class="text-center">
            <button class="btn btn-sm btn-dark rounded-full">
              Adicionar
            </button>
          </div>
        </form>
      </template>
    </Modal>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onMounted, PropType, toRefs } from "vue";
import { IProduct } from '@/interfaces/IProduct';
import {ProductCoupon} from '@/core/interfaces/Product'
import useNotifications from '@/composables/useNotifications';
import { PhPlus } from 'phosphor-vue'
import ButtonCopy from '@/components/UI/Button/ButtonCopy.vue';
import { createCoupons, fetchCoupons } from '@/core/services/api/products'

const props = defineProps({
  product: {
    type: Object as PropType<IProduct>,
    required: true
  },
  loading: {
    type: Boolean
  }
})
const emit = defineEmits(['change-step', 'update:loading']);
const { product } = toRefs(props)
const { notifications } = useNotifications();
const modalAdd = ref(false);
const coupons = ref<ProductCoupon[]>([]);
const deletedCoupons = ref<number[]>([])
const form = ref<ProductCoupon>({
  title: "",
  code: ""
})

const loading = ref(false)
const getCoupons = async () => {
  try {
    loading.value = true;
    const { data } = await fetchCoupons(product.value.id as number);
    coupons.value = data;
  } catch (error) {
    notifications.error(error)
  } finally {
    loading.value = false;
  }
}

const append = () => {
  modalAdd.value = false;
  coupons.value.push(form.value);
  form.value = {
    title: "",
    code: ""
  };
}

const remove = (item: ProductCoupon) => {
  const index = coupons.value.findIndex(link => link.code == item.code)
  coupons.value.splice(index, 1);
  if(item.id) {
    deletedCoupons.value.push(item.id);
  }
}

const submitForm = async () => {
  try {
    const { data } = await createCoupons(product.value.id as number, {
      coupons: coupons.value,
      deleted_ids: deletedCoupons.value
    })
    emit('change-step');
    notifications.success('Alterações efetuadas.');
    coupons.value = data
  } catch (error) {
    notifications.error(error)
  } finally {
    emit('update:loading', false);
  }
}

onMounted(() => {
  getCoupons();
})

defineExpose({
  submitForm
})
</script>

<style scoped lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition: all .3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>