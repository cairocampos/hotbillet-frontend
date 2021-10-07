<template>
  <section class="midias space-y-10">
    <div>
        <button class="text-blue-600 flex items-center space-x-2 mb-10" @click="modalEscolherMidia = true">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg> 
            <span class="text-sm">Imagens ou Vídeos</span>
        </button>
    
        <div class="space-y-4">
            <p class="text-sm">Imagens</p>
            <div class="flex flex-wrap">
                <div v-for="item in 5 " :key="item" class="produto__img w-36 h-36 relative m-2">
                    <ButtonClose  class="z-5 absolute right-2 top-2 bg-gray-100 p-1 bg-opacity-50" :rounded="false" length="4"/>
                    <img src="@/assets/fake/produto.png" alt="" class="object-cover h-full rounded-md">
                </div>
            </div>
        </div>
    </div>

    <div>
        <div class="space-y-4">
            <p class="text-sm">Vídeos</p>
            <div class="flex flex-wrap">
                <Card v-for="item in 5" :key="item" class="w-1/4 m-2">
                    <template #header>
                        <h3 class="text-sm font-medium">Checkout {{item}} </h3>
                        <ButtonClose length="4" class="p-2"/>
                    </template>
                    <template #body>
                        <a href="#" class="text-link">https://web.whatsapp.com/</a>
                    </template>
                </Card>
            </div>
        </div>
    </div>


    <Modal v-model:open="modalEscolherMidia" screen="w-2/4" title="Adicionar Imagens e Vídeos">
        <template #body>
            <input type="file" v-show="false" ref="inputFile" @change="handleInputFile">
            <div class="grid grid-cols-2 gap-6">
                <div class="flex flex-col space-y-4 bg-gray-200 p-4 rounded-md items-center cursor-pointer" @click="inputFile.click()">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-32 w-32 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>

                    <h3>Imagens</h3>

                    <p class="text-default">Upload do computador</p>
                </div>

                <div class="flex flex-col space-y-4 bg-gray-200 p-4 rounded-md items-center cursor-pointer" @click="showFormVideo">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-32 w-32 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                    </svg>
                    <h3>Vídeo</h3>

                    <p class="text-default">Links externos</p>
                </div>
            </div>
        </template>
    </Modal>

    <Modal v-model:open="modalAdicionarVideo" screen="w-1/4" title="Adicionar Link de Vídeos">
        <template #body>
            <form class="form-sm space-y-12">
                <div class="form-group">
                    <label class="label">Nome do vídeo</label>
                    <input type="text" class="form-control form-control-line" />
                </div>
                <div class="form-group">
                    <label class="label">Link do vídeo</label>
                    <input type="text" class="form-control form-control-line" />
                </div>
                <div class="text-center">
                    <button class="btn btn-sm btn-dark rounded-full">Adicionar</button>
                </div>
            </form>
        </template>
    </Modal>
    
  </section>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
const inputFile = ref<HTMLInputElement>()
const modalEscolherMidia = ref(false);
const modalAdicionarVideo = ref(false);

const handleInputFile = () => {
    console.log(inputFile.value?.files);
}

const showFormVideo = () => {
    modalEscolherMidia.value = false;
    modalAdicionarVideo.value = true;
}

</script>

<style scoped lang="scss">
</style>