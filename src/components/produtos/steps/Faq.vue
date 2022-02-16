<template>
  <section class="links grid grid-cols-2 gap-6justify-between">
    <div>
      <button
        class="text-blue-600 flex items-center space-x-2 mb-10"
        @click="modalAdd = true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg> 
        <span class="text-sm">Perguntas e Respostas</span>
      </button>

      <div class="space-y-4">
        <Card
          v-for="(faq, index) in faqs"
          :key="index"
        >
          <template #header>
            <h3 class="text-sm font-medium">
              {{ faq.title }}
            </h3>
            <button
              class="text-red-500 text-xs font-medium"
              @click="removeFaq(faq)"
            >
              Remover
            </button>
          </template>
          <template #body>
            <p class="text-default text-xs">
              {{ faq.description }}
            </p>
          </template>
        </Card>
      </div>
    </div>

    <Modal
      v-model:open="modalAdd"
      screen="w-2/4"
      title="Novo FAQ"
    >
      <template #body>
        <form
          class="form-sm space-y-12"
          @submit.prevent="appendFaq()"
        >
          <div class="form-group">
            <label class="label">Titulo</label>
            <input
              v-model="faq.title"
              type="text"
              class="form-control form-control-line"
              :class="{error: formHandler.has('title')}"
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
              :class="{error: formHandler.has('description')}"
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

<script lang="ts">
import { useFormHandler } from '@/composables/useFormHandler';
import useNotifications from '@/composables/useNotifications';
import { IProduct, IProductFaq } from '@/interfaces/IProduct';
import { api } from '@/services';
import {defineComponent, onMounted, PropType, ref, toRefs} from 'vue';
export default defineComponent({
    props: {
        product: {
            type: Object as PropType<IProduct>,
            required:true
        },
        loading: {
            type: Boolean
        }
    },
    emits:['update:loading', 'change-step'],
    setup(props, {emit}) {
        const { formHandler } = useFormHandler();
        const { notifications } = useNotifications();
        const { product } = toRefs(props)
        const modalAdd = ref(false);
        const faqs = ref<IProductFaq[]>([])
        const faq = ref<IProductFaq>({
            title: '',
            description: ''
        });

        const checkForm = () => {
            const errors: {[key: string]: string} = {};
            const { title, description } = faq.value;
            if(!title) errors['title'] = 'Campo obrigatório'
            if(!description) errors['description'] = 'Campo obrigatório'

            if(Object.keys(errors).length) {
                formHandler.record(errors);
            }
        }

        const appendFaq = () => {
            checkForm();
            if(formHandler.any()) return;
            console.log(faq.value)
            modalAdd.value = false;
            faqs.value?.push(faq.value);
            faq.value = {
                title: '',
                description: ''
            }
        }

        const removeFaq = (item:IProductFaq) => {
            const index = faqs.value?.findIndex(faq => faq.description == item.description)
            console.log(index);
            if(index !== -1)
                faqs.value?.splice(index, 1);
        }

        const submitForm = async () => {
            try {
                const {data} = await api.put<IProduct>(`/products/${product.value.id}/faqs`, {faqs:faqs.value})
                emit('change-step');
                notifications.success('Alterações efetuadas.')
                faqs.value = data.faqs ?? [];
            } catch (error) {
                notifications.error(error)
            } finally {
                emit('update:loading', false);
            }
        }

        onMounted(() => {
            if(product.value?.faqs) {
                faqs.value = product.value.faqs
            }
        });

        return {
            modalAdd,
            faq,
            faqs,
            appendFaq,
            removeFaq,
            submitForm,
            formHandler
        }
    }
})
</script>

<style>

</style>