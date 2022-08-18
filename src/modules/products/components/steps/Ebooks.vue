<template>
  <section class="links grid grid-cols-2 gap-6justify-between">
    <div>
      <button
        class="text-blue-600 flex items-center space-x-2 mb-10"
        @click="modals.create = true"
      >
        <PhPlus size="20" />
        <span class="text-sm">Ebooks</span>
      </button>

      <div class="space-y-4">
        <div
          v-if="loading"
          class="w-max"
        >
          <PageLoading />
        </div>
        <span
          v-else-if="!ebooks.length"
          class="text-zinc-500 text-sm"
        >Nenhum item encontrado</span>
        <Card
          v-for="item in ebooks"
          :key="item.id"
        >
          <template #header>
            <h3 class="text-sm font-medium">
              {{ item.title }}
            </h3>
            <button
              class="text-red-500 text-xs font-medium"
              @click="remove(item)"
            >
              Remover
            </button>
          </template>
          <template #body>
            <div
              v-if="item.id"
              class="text-ellipsis whitespace-nowrap overflow-hidden"
            >
              <a
                :href="item.url"
                target="_blank"
                class="text-link"
              >{{
                item.url
              }}</a>
            </div>
            <a
              v-else
              :href="item.url"
              target="_blank"
              class="text-xs text-blue-500"
            >
              Visualizar
            </a>
          </template>
        </Card>
      </div>
    </div>

    <Modal
      v-model:open="modals.create"
      screen="w-1/4"
      title="Adicionar Link de Ebook"
    >
      <template #body>
        <input
          v-show="false"
          ref="inputFile"
          type="file"
          accept="application/pdf"
          @change="handleInputFile($event.target?.files)"
        />
        <form
          class="form-sm space-y-12"
          @submit.prevent="checkForm"
        >
          <div class="form-group">
            <label class="label">Nome do Ebook</label>
            <input
              v-model="form.title"
              type="text"
              class="form-control form-control-line"
              :class="{ error: formHandler.has('description') }"
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
              <PhFilePdf
                size="40"
                class="text-gray-700"
              />

              <h3>Adicione um PDF</h3>
              <div
                v-if="form.file.size"
                class="text-center"
              >
                <span class="text-xs text-default">Arquivo selecionado</span>
                <br />
                <span>
                  {{ form.file.name }}
                </span>
              </div>

              <p class="text-default">
                Upload do computador
              </p>
            </div>
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
import { IProduct, IProductEbook } from "@/interfaces/IProduct";
import { onMounted, PropType, ref, toRefs } from "vue";
import { useFormHandler } from "@/composables/useFormHandler";
import useNotifications from "@/composables/useNotifications";
import InputInfo from "@/components/global/InputInfo.vue";
import { api } from "@/services/api";
import { PhPlus, PhFilePdf } from 'phosphor-vue'
import PageLoading from "@/components/global/PageLoading.vue";
import useLoading from "@/composables/useLoading";

const props = defineProps({
  product: {
    type: Object as PropType<IProduct>,
    required: true,
  }
})
const emit = defineEmits(['update:loading', 'change-step']);
const modals = ref({ create: false });
const { notifications } = useNotifications();
const inputFile = ref<HTMLInputElement>();
const { formHandler } = useFormHandler();

type Ebook = {
  id?:number;
  title:string;
  url:string;
  file: File;
}

const form = ref<Ebook>({
  title: "",
  url: "",
  file: new File([], "")
})

const loading = ref(false);
const ebooks = ref<Ebook[]>([])
const deletedEbooks = ref<number[]>([])
const fetchEbooks = async () => {
  try {
    loading.value = true;
    const {data} = await api.get<Ebook[]>(`/products/${props.product.id}/ebooks`);
    ebooks.value = data;
  } catch (error) {
    notifications.error(error);
  } finally {
    loading.value = false;
  }
}

const append = () => {
  ebooks.value.unshift({
    title: form.value.title,
    url: form.value.url,
    file: form.value.file
  })

  form.value = {
    file: new File([], ""),
    title: "",
    url:""
  }

  modals.value.create = false;
}

const checkForm = () => {
  if(!form.value.title) 
    return formHandler.record({description: "Campo obrigatório"});
  if(!inputFile.value?.files?.length) 
  return notifications.info(
    "Você precisa adicionar um arquivo para continuar"
  )

  append();
}

const remove = (item: IProductEbook) => {
  const index = ebooks.value?.findIndex(ebook => (ebook.url == item.url) && (ebook.title == item.title))
  if (index !== -1)
    ebooks.value?.splice(index, 1);

  if(item.id) {
    deletedEbooks.value.push(item.id)
  }
}

const handleInputFile = (files: FileList) => {
  if(files.length) {
    const file = Array.from(files)[0];
    form.value.file = file;
    form.value.url = URL.createObjectURL(file);
  }
}

const prepareForm = () => {
  const formData = new FormData();
  deletedEbooks.value.forEach((id, key) => {
    formData.append(`deleted_ids[${key}]`, String(id))
  })

  ebooks.value.filter(item => !item?.id)
    .forEach((item, key) => {
      formData.append(`ebooks[${key}][title]`, item.title);
      formData.append(`ebooks[${key}][url]`, item.url);
      formData.append(`ebooks[${key}][file]`, item.file);
    })

  return formData;
}

const submitForm = async () => {
  try {
    const formData = prepareForm();
    const {data} = await api.post<Ebook[]>(`/products/${props.product.id}/ebooks`, formData, {
      headers: {
        'Content-Type': "multipart/form-data"
      }
    })
    ebooks.value = data;
    notifications.success('Alterações efetuadas.')
  } catch (error) {
    notifications.error(error)
  } finally {
    emit('update:loading', false);
  }
}

onMounted(() => fetchEbooks());

defineExpose({submitForm})
</script>

<style></style>
