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
        <span class="text-sm">Ebooks e Anexos</span>
      </button>

      <div class="space-y-4">
        <Card
          v-for="item in ebooks"
          :key="item.id"
        >
          <template #header>
            <h3 class="text-sm font-medium">
              {{ item.description }}
            </h3>
            <button class="text-red-500 text-xs font-medium">
              Remover
            </button>
          </template>
          <template #body>
            <!-- <p class="text-default text-xs mb-2">
              Descrição do Ebook
            </p> -->
            <a
              :href="item.url"
              target="_blank"
              class="text-link"
            >{{ item.url }}</a>
          </template>
        </Card>

        <Card
          v-for="(item, index) in newEbooks"
          :key="index"
        >
          <template #header>
            <h3 class="text-sm font-medium">
              {{ item.description }}
            </h3>
            <button class="text-red-500 text-xs font-medium">
              Remover
            </button>
          </template>
          <template #body>
            <Badge
              text="Novo"
              color="green"
            />
          </template>
        </Card>
      </div>
    </div>

    <Modal
      v-model:open="modalAdd"
      screen="w-1/4"
      title="Adicionar Link de Ebook"
    >
      <template #body>
        <input
          v-show="false"
          ref="inputFile"
          type="file"
          accept="application/pdf"
          @change="handleInputFile"
        >
        <form
          class="form-sm space-y-12"
          @submit.prevent="checkForm"
        >
          <div class="form-group">
            <label class="label">Nome do Ebook</label>
            <input
              v-model="ebook.description"
              type="text"
              class="form-control form-control-line"
              :class="{error: formHandler.has('description')}"
              @input="formHandler.clear('description')"
            />
            <InputInfo
              field="description"
              :handler="formHandler"
            />
          </div>
          <div>
            <div
              class="flex flex-col space-y-4 bg-gray-200 p-4 rounded-md items-center cursor-pointer"
              @click="inputFile?.click()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-16 w-16 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>

              <h3>Adicione um PDF</h3>
              <div
                v-if="ebook.file.size"
                class="text-center"
              >
                <span class="text-xs text-default">Arquivo selecionado</span>
                <br>
                <span>
                  {{ ebook.file.name }}
                </span>
              </div>

              <p class="text-default">
                Upload do computador
              </p>
            </div>
          </div>
          <div class="text-center">
            <button
              class="btn btn-sm btn-dark rounded-full"
            >
              Adicionar
            </button>
          </div>
        </form>
      </template>
    </Modal>
  </section>
</template>

<script lang="ts">
import { IProduct, IProductEbook } from '@/interfaces/IProduct';
import {IEbook} from '@/interfaces/IEbook';
import {defineComponent, onMounted, PropType, ref, toRefs} from 'vue';
import { useFormHandler } from '@/composables/useFormHandler';
import useNotifications from '@/composables/useNotifications';
import InputInfo from '@/components/global/InputInfo.vue';
import Badge from '../../global/Badge.vue';
import { api } from '@/services';
export default defineComponent({
    props: {
        product: {
            type: Object as PropType<IProduct>,
            required: true
        },
    },
    emits: ["update:loading", "change-step"],
    setup(props, { emit }) {
        const { product } = toRefs(props);
        const modalAdd = ref(false);
        const ebooks = ref<IProductEbook[]>();
        const newEbooks = ref<IEbook[]>([]);
        const inputFile = ref<HTMLInputElement>();
        const { formHandler } = useFormHandler();
        const ebook = ref<IEbook>({
          description: "",
          file: new File([], "")
        })
        const { notifications } = useNotifications();
        const handleInputFile = () => {
          if (inputFile.value?.files?.length) {
            const file = inputFile.value.files[0];
            ebook.value.file = file;
          }
        };
        const appendEbook = () => {
          newEbooks.value.push({
            description: ebook.value.description,
            file: ebook.value.file
          })

          ebook.value = {
            description:"",
            file: new File([], "")
          }

          modalAdd.value = false;
        };
        const checkForm = () => {
          if (!ebook.value.description)
            return formHandler.record({ "description": "Campo obrigatório" });
          if (!inputFile.value?.files?.length)
            return notifications.info("Você precisa informar um arquivo para continuar");
          appendEbook();
        };

        const prepareForm = () => {
          const formData = new FormData();

          newEbooks.value.forEach(item => {
            formData.append(`midias[description][]`, item.description);
            formData.append(`midias[file][]`, item.file);
          })

          return formData;
        }

        const submitForm = async () => {
          try {
            const formData = prepareForm();
            const {data} = await api.put<IProduct>(`/products/${product.value.id}/midias`, formData);
            emit('change-step');
            notifications.success('Alterações efetuadas.');
            ebooks.value = data.ebooks ?? []
            newEbooks.value = [];
          } catch (error) {
            notifications.error(error);
          } finally {
            emit('update:loading', false);
          }
        }

        onMounted(() => {
          if (product.value?.ebooks?.length) {
            ebooks.value = product.value.ebooks;
          }
        });
        return {
          ebook,
          modalAdd,
          ebooks,
          inputFile,
          handleInputFile,
          checkForm,
          formHandler,
          newEbooks,
          submitForm
        };
    },
    components: { InputInfo, Badge }
})
</script>

<style>

</style>