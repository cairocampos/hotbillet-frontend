<template>
  <section class="links lg:grid lg:grid-cols-2">
    <div>
      <button
        class="text-blue-600 flex items-center space-x-2 mb-10"
        @click="modalAdd = true"
      >
        <PhPlus />
        <span class="text-sm">Perguntas e Respostas</span>
      </button>

      <div class="space-y-4">
        <div
          v-if="loading"
          class="w-max"
        >
          <Loading />
        </div>
        <span
          v-else-if="!faqs.length"
          class="text-zinc-500 text-sm"
        >Nenhum item encontrado</span>
        <Card
          v-for="(faqItem, index) in faqs"
          :key="index"
        >
          <template #header>
            <h3 class="text-sm font-medium">
              {{ faqItem.title }}
            </h3>
            <button
              class="text-red-500 text-xs font-medium"
              @click="remove(faqItem)"
            >
              Remover
            </button>
          </template>
          <template #body>
            <p class="text-default text-xs">
              {{ faqItem.description }}
            </p>
          </template>
        </Card>
      </div>
    </div>

    <Modal
      v-model:open="modalAdd"
      screen="w-full lg:w-2/4"
      title="Novo FAQ"
    >
      <template #body>
        <form
          class="form-sm space-y-12"
          @submit.prevent="append()"
        >
          <div class="form-group">
            <label class="label">Titulo</label>
            <input
              v-model="faq.title"
              type="text"
              class="form-control form-control-line"
              :class="{ error: formHandler.has('title') }"
              @input="formHandler.clear('title')"
            />
            <InputInfo
              field="title"
              :handler="formHandler"
            />
          </div>
          <div class="form-group">
            <label
              for=""
              class="label"
            >Descrição</label>
            <textarea
              v-model="faq.description"
              class="form-control form-control-line border rounded-sm"
              rows="10"
              :class="{ error: formHandler.has('description') }"
              @input="formHandler.clear('description')"
            ></textarea>
            <InputInfo
              field="description"
              :handler="formHandler"
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
import { useFormHandler } from '@/composables/useFormHandler';
import useNotifications from '@/composables/useNotifications';
import { IProduct, IProductFaq } from '@/interfaces/IProduct';
import { api } from '@/services/api';
import { onMounted, PropType, ref, toRefs } from 'vue';
import { PhPlus } from 'phosphor-vue'
import Loading from '@/components/UI/Loading/Loading.vue';
import Modal from '@/components/UI/Modal/Modal.vue';

const props = defineProps({
  product: {
    type: Object as PropType<IProduct>,
    required: true
  },
  loading: {
    type: Boolean
  }
})
const emit = defineEmits(['update:loading', 'change-step']);
const { formHandler } = useFormHandler();
const { notifications } = useNotifications();
const { product } = toRefs(props)
const modalAdd = ref(false);
const faqs = ref<IProductFaq[]>([])
const deletedFaqs = ref<number[]>([])
const faq = ref<IProductFaq>({
  title: '',
  description: ''
});

const loading = ref(false)
const fetchFaqs = async () => {
  try {
    loading.value = true;
    const { data } = await api.get<IProductFaq[]>(`/products/${props.product.id}/faqs`)
    faqs.value = data;
  } catch (error) {
    notifications.error(error)
  } finally {
    loading.value = false;
  }
}

const checkForm = () => {
  const errors: { [key: string]: string } = {};
  const { title, description } = faq.value;
  if (!title) errors['title'] = 'Campo obrigatório'
  if (!description) errors['description'] = 'Campo obrigatório'

  if (Object.keys(errors).length) {
    formHandler.record(errors);
  }
}

const append = () => {
  checkForm();
  if (formHandler.any()) return;
  console.log(faq.value)
  modalAdd.value = false;
  faqs.value?.unshift(faq.value);
  faq.value = {
    title: '',
    description: ''
  }
}

const remove = (item: IProductFaq) => {
  const index = faqs.value?.findIndex(faq => faq.description == item.description)
  if (index !== -1)
    faqs.value?.splice(index, 1);

  if(item.id) {
    deletedFaqs.value.push(item.id)
  }
}

const submitForm = async () => {
  try {
    const { data } = await api.put<IProductFaq[]>(`/products/${product.value.id}/faqs`, {
      faqs: faqs.value,
      deleted_ids: deletedFaqs.value
    })
    emit('change-step');
    notifications.success('Alterações efetuadas.')
    faqs.value = data;
  } catch (error) {
    notifications.error(error)
  } finally {
    emit('update:loading', false);
  }
}

onMounted(() => {
  fetchFaqs();
});

defineExpose({
  submitForm
})
</script>

<style>
</style>