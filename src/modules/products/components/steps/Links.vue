<template>
  <section class="links">
    <div>
      <button
        class="text-blue-600 flex items-center space-x-2 mb-10"
        @click="modalAdd = true"
      >
        <PhPlus size="20" />
        <span>Checkout</span>
      </button>

      <transition-group
        name="slide"
        tag="div"
        class="space-y-4"
      >
        <div class="md:grid md:grid-cols-2 md:gap-4">
          <Card
            v-for="(link, index) in links"
            :key="index"
          >
            <template #header>
              <h3 class="text-sm font-medium">
                {{ link.name }}
              </h3>
              <button
                class="text-red-500 text-xs font-medium"
                @click="remove(link)"
              >
                Remover
              </button>
            </template>
            <template #body>
              <a
                v-tooltip="'Clique para acessar'"
                :href="link.url"
                class="text-link"
                target="_blank"
              >{{ link.url }}</a>
            </template>
          </Card>
        </div>
      </transition-group>
      <p
        v-show="!links || !links.length"
        class="text-default text-sm"
      >
        Nenhum link adicionado.
      </p>
    </div>

    <Modal
      v-model:open="modalAdd"
      screen="w-1/4"
      title="Adicionar Link"
    >
      <template #body>
        <form
          class="form-sm space-y-12"
          @submit.prevent="append"
        >
          <div class="form-group">
            <label class="label">Descrição</label>
            <input
              v-model="linkForm.name"
              type="text"
              class="form-control form-control-line"
            />
          </div>
          <div class="form-group">
            <label class="label">Link</label>
            <input
              v-model="linkForm.url"
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
import { IProduct, IProductLink } from '@/interfaces/IProduct';
import { api } from '@/services/api';
import useNotifications from '@/composables/useNotifications';
import { PhPlus } from 'phosphor-vue'

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
const links = ref<IProductLink[]>([]);
const deletedLinks = ref<number[]>([])
const linkForm = ref<IProductLink>({
  name: "",
  url: ""
})


const fetchLinks = async () => {
  try {
    const { data } = await api.get<IProductLink[]>(`/products/${props.product.id}/links`);
    links.value = data;
  } catch (error) {
    notifications.error(error)
  } finally {
    //
  }
}

const append = () => {
  modalAdd.value = false;
  links.value.push(linkForm.value);
  linkForm.value = {
    name: "",
    url: ""
  };
}

const remove = (item: IProductLink) => {
  const index = links.value.findIndex(link => link.name == item.name)
  links.value.splice(index, 1);
  if(item.id) {
    deletedLinks.value.push(item.id);
  }
}

const submitForm = async () => {
  try {
    const { data } = await api.put<IProductLink[]>(`/products/${product.value.id}/links`, {
      links: links.value,
      deleted_ids: deletedLinks.value
    });
    emit('change-step');
    notifications.success('Alterações efetuadas.');
    links.value = data
  } catch (error) {
    notifications.error(error)
  } finally {
    emit('update:loading', false);
  }
}

onMounted(() => {
  fetchLinks();
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