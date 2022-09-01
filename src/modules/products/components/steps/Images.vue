<template>
  <section class="links gap-6 justify-between">
    <div>
      <input
        v-show="false"
        ref="inputFile"
        type="file"
        multiple
        accept="image/png,image/jpg,image/jpeg"
        @change="handleInputFile"
      />
      <button
        class="text-blue-600 flex items-center space-x-2 mb-10"
        @click="inputFile?.click()"
      >
        <PhPlus size="20" />
        <span class="text-sm">images</span>
      </button>

      <div class="space-y-4">
        <div
          v-if="loading"
          class="w-max"
        >
          <Loading />
        </div>
        <span
          v-else-if="!images.length"
          class="text-zinc-500 text-sm"
        >Nenhum item encontrado</span>
        <div>
          <div class="flex flex-wrap">
            <div
              v-for="image in images"
              :key="image.id"
              class="produto__img w-52 h-52 relative m-2 flex items-center justify-center bg-zinc-200 group"
            >
              <div class="z-5 absolute right-2 top-2 bg-gray-100 p-1 bg-opacity-50 rounded-md">
                <!-- <ButtonClose
                  length="4"
                  @clicked="remove(image)"
                /> -->
              </div>
              <Spinner
                v-if="image.loading"
                class="absolute"
              />
              <button
                v-if="!image.cover"
                class="absolute invisible bg-black bg-opacity-20 text-zinc-200 p-4 rounded-md text-sm hover:ring-2 group-hover:visible"
                @click="setCover(image)"
              >
                Definir como capa
              </button>
              <span
                v-else
                class="absolute top-2 left-2 bg-blue-500 text-zinc-200 p-4 rounded-md text-sm"
              >
                <PhCrown />
              </span>
              <img
                :src="image.url"
                class="object-cover h-full rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { IProduct } from "@/interfaces/IProduct";
import { onMounted, PropType, ref } from "vue";
import useNotifications from "@/core/composables/useNotifications";
import { api } from "@/core/services/api/base";
import { PhPlus, PhCrown } from 'phosphor-vue'
import Loading from '@/components/UI/Loading/Loading.vue';
import {ProductImage} from '@/core/interfaces/Product'
import { fetchImages } from '@/core/services/api/products'
import {generateId} from '@/core/helpers'
// import ButtonClose from "@/components/global/ButtonClose.vue";
import Spinner from "@/components/UI/Spinner/Spinner.vue";

const props = defineProps({
  product: {
    type: Object as PropType<IProduct>,
    required: true,
  }
})
const emit = defineEmits(['update:loading', 'change-step']);
const { notifications } = useNotifications();
const inputFile = ref<HTMLInputElement>();

interface Image extends ProductImage {
  file?: File;
  loading?: boolean;
  hash?: string;
}

const loading = ref(false);
const images = ref<Image[]>([])
const cover_id = ref<number>();
const deletedImages = ref<number[]>([])
const getImages = async () => {
  try {
    loading.value = true;
    const {data} = await fetchImages(props.product.id as number)
    images.value = data;
  } catch (error) {
    notifications.error(error);
  } finally {
    loading.value = false;
  }
}

const remove = (item: Image) => {
  const index = images.value?.findIndex(image => {
    if(image.id && item.id) {
      return image.id == item.id
    }
    return image.url == item.url
  })
  if (index !== -1)
    images.value?.splice(index, 1);

  if(item.id) {
    deletedImages.value.push(item.id)
  }
}

const fileReader = (file: File, hash:string) => {
  const imageIndex = images.value.findIndex(image => image.hash === hash);
  if(imageIndex === -1) return;
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onloadend = (data) => {
    const url = String(data.target?.result);
    images.value[imageIndex] = {
      ...images.value[imageIndex],
      url,
      loading:false
    }
  };
}

const handleInputFile = (event: Event) => {
  const {files} =  event.target as HTMLInputElement
  if(files && files.length) {
    Array.from(files).forEach(file => {
      const hash = generateId()
      images.value.push({
        cover:false,
        url: "",
        loading:true,
        hash,
        file
      });

      fileReader(file, hash)
    });
  }
}

const prepareForm = () => {
  const formData = new FormData();
  deletedImages.value.forEach((id, key) => {
    formData.append(`deleted_ids[${key}]`, String(id))
  })

  images.value.filter(item => !item?.id && item.file)
    .forEach((item, key) => {
      formData.append(`images[${key}][file]`, item.file as File);
      formData.append(`images[${key}][cover]`, String(item?.cover ? 1 : 0));
    })

  if(cover_id.value) {
    formData.append('cover_id', String(cover_id.value));
  }

  return formData;
}

const submitForm = async () => {
  try {
    const formData = prepareForm();
    const {data} = await api.post<Image[]>(`/products/${props.product.id}/images`, formData, {
      headers: {
        'Content-Type': "multipart/form-data"
      }
    })
    images.value = data;
    notifications.success('Alterações efetuadas.')
  } catch (error) {
    notifications.error(error)
  } finally {
    emit('update:loading', false);
  }
}

const setCover = (image: Image) => {
  const imageIndex = images.value.findIndex(item => item.url == image.url);

  if(imageIndex !== -1) {
    images.value = images.value.map(item => ({
      ...item,
      cover:false
    }))
    images.value[imageIndex].cover = true;
    if(image.id) {
      cover_id.value = image.id
    }
  }
}

onMounted(() => getImages());

defineExpose({submitForm})
</script>

<style></style>
