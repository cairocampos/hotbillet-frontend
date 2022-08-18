<template>
  <section class="midias space-y-10">
    <div>
      <button
        class="text-blue-600 flex items-center space-x-2 mb-10"
        @click="modalEscolherMidia = true"
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
        <span class="text-sm">Imagens ou Vídeos</span>
      </button>

      <div class="space-y-4">
        <p class="text-sm">
          Imagens
        </p>
        <transition-group
          name="slide"
          tag="div"
          class="flex flex-wrap"
        >
          <div
            v-for="(image, index) in images "
            :key="index"
            class="produto__img w-36 h-36 relative m-2"
          >
            <ButtonClose
              class="z-5 absolute right-2 top-2 bg-gray-100 p-1 bg-opacity-50"
              :rounded="false"
              length="4"
              @clicked="removeImage(image)"
            />
            <img
              loading="lazy"
              :src="image.url"
              class="object-cover h-full rounded-md"
            >
          </div>
        </transition-group>
        <p
          v-show="!images || !images.length"
          class="text-default text-sm"
        >
          Nenhuma mídia adicionada.
        </p>
      </div>
    </div>

    <div>
      <div class="space-y-4">
        <p class="text-sm">
          Vídeos
        </p>
        <transition-group
          name="slide"
          tag="div"
          class="flex flex-wrap"
        >
          <Card
            v-for="(video, index) in videos"
            :key="index"
            class="w-1/4 m-2"
          >
            <template #header>
              <h3 class="text-sm font-medium">
                <!-- {{ video.nome }} -->
                Nomeaqui
              </h3>
              <ButtonClose
                length="4"
                class="p-2"
                @clicked="removeVideo(video)"
              >
                <span class="text-xs">Remover</span>
              </ButtonClose>
            </template>
            <template #body>
              <YoutubeThumbnail :source="video.url" />
            </template>
          </Card>
        </transition-group>
      </div>
      <p
        v-show="!videos || !videos.length"
        class="text-default text-sm"
      >
        Nenhuma mídia adicionada.
      </p>
    </div>


    <Modal
      v-model:open="modalEscolherMidia"
      screen="w-2/4"
      title="Adicionar Imagens e Vídeos"
    >
      <template #body>
        <input
          v-show="false"
          ref="inputFile"
          type="file"
          multiple
          @change="handleInputFile"
        >
        <div class="grid grid-cols-2 gap-6">
          <div
            class="flex flex-col space-y-4 bg-gray-200 p-4 rounded-md items-center cursor-pointer"
            @click="inputFile?.click()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-32 w-32 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>

            <h3>Imagens</h3>

            <p class="text-default">
              Upload do computador
            </p>
          </div>

          <div
            class="flex flex-col space-y-4 bg-gray-200 p-4 rounded-md items-center cursor-pointer"
            @click="showFormVideo"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-32 w-32 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
              />
            </svg>
            <h3>Vídeo</h3>

            <p class="text-default">
              Links externos
            </p>
          </div>
        </div>
      </template>
    </Modal>

    <Modal
      v-model:open="modalAdicionarVideo"
      screen="w-1/4"
      title="Adicionar Link de Vídeos"
    >
      <template #body>
        <form
          class="form-sm space-y-12"
          @submit.prevent="adicionaVideo"
        >
          <!-- <div class="form-group">
            <label class="label">Nome do vídeo</label>
            <input
              v-model="videoForm.nome"
              type="text"
              class="form-control form-control-line"
            />
          </div> -->
          <div class="form-group">
            <label class="label">Link do vídeo</label>
            <input
              v-model="videoForm.url"
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

<script lang="ts">
import useNotifications from '@/composables/useNotifications';
import { IProduct } from '@/interfaces/IProduct';
import { defineComponent, onMounted, PropType, ref, toRefs } from 'vue';
import { IMidiaTypes } from '@/interfaces/IMidia'

import useImage from '@/composables/midias/useImage'
import useVideo from '@/composables/midias/useVideo'
import YoutubeThumbnail from '@/components/youtube/YoutubeThumbnail.vue'
import { ProductMedia, MediaTypeEnum } from '@/core/interfaces/Product'
import { createMidias, fetchMidias } from '@/core/services/api/products';

interface IMidia {
  file_name?: string;
  type: IMidiaTypes,
  url?: string;
  description?: string;
  file?: File
}

type MidiaItem = {
  id: number;
  type: 'IMAGE' | 'VIDEO'
}

export default defineComponent({
  components: {
    YoutubeThumbnail
  },
  props: {
    product: {
      type: Object as PropType<IProduct>,
      required: true
    }
  },
  emits: ["change-step", "update:loading"],
  setup(props, { emit }) {
    const { product } = toRefs(props);
    const { notifications } = useNotifications();
    const files = ref<File[]>([]);
    const midias = ref<IMidia[]>([]);
    const midiasRemoved = ref<MidiaItem[]>([]);
    const inputFile = ref<HTMLInputElement>();
    const modalEscolherMidia = ref(false);
    const modalAdicionarVideo = ref(false);
    const videoForm = ref<ProductMedia>({ type: MediaTypeEnum.VIDEO, url: "", type_description: "VIDEO"});
    const { images, removeImage } = useImage(midiasRemoved);
    const { videos, removeVideo } = useVideo(midiasRemoved);
    const handleInputFile = () => {
      if (inputFile.value?.files?.length) {
        Array.from(inputFile.value?.files).forEach((file: File) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onloadend = (data) => {
            images.value.push({
              type: MediaTypeEnum.IMAGE,
              url: String(data.target?.result),
              type_description: "IMAGE"
            });
          };
          files.value.push(file);
          midias.value.push({
            file_name: file.name,
            type: "IMAGE",
            file: file
          });
        });
        modalEscolherMidia.value = false;
      }
    };
    const showFormVideo = () => {
      modalEscolherMidia.value = false;
      modalAdicionarVideo.value = true;
    };
    const adicionaVideo = () => {
      midias.value.push({
        type: "VIDEO",
        url: videoForm.value.url
      });
      videos.value.push(videoForm.value);
      videoForm.value = {
        type: MediaTypeEnum.VIDEO,
        type_description: "VIDEO",
        url: ""
      };
      modalAdicionarVideo.value = false;
    };
    const formDataFiles = () => {
      const formData = new FormData();
      midias.value.forEach((midia, key) => {
        formData.append(`midias[${key}][type]`, midia.type as string);
        if (midia.type === 'VIDEO') {
          formData.append(`midias[${key}][url]`, midia.url as string);
        } else {
          formData.append(`midias[${key}][file]`, midia.file as File)
        }
      })

      midiasRemoved.value.forEach((midia, key) => {
        formData.append(`deleted_ids[${key}]`, String(midia.id))
      })

      return formData;
    };
    const submitForm = async () => {
      try {
        const formData = formDataFiles();
        const { data } = await createMidias(product.value.id as number, formData);
        images.value = data.filter(item => item.type_description === 'IMAGE');
        videos.value = data.filter(item => item.type_description === 'VIDEO');
        midiasRemoved.value = [];
        notifications.success("Alterações efetuadas.");
      }
      catch (error) {
        notifications.error(error);
      }
      finally {
        emit("update:loading", false);
      }
    };

    const loading = ref(false)
    const getMidias = async () => {
      try {
        loading.value = true;
        const {data} = await fetchMidias(product.value.id as number);
        images.value = data.filter(item => item.type_description === 'IMAGE');
        videos.value = data.filter(item => item.type_description === 'VIDEO');
      } catch (error) {
        notifications.error(error);
      } finally {
        loading.value = false;
      }
    }

    onMounted(() => {
      getMidias();
    });
    return {
      inputFile,
      modalEscolherMidia,
      modalAdicionarVideo,
      handleInputFile,
      showFormVideo,
      images,
      videos,
      videoForm,
      submitForm,
      adicionaVideo,
      removeImage,
      removeVideo,
    };
  }
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