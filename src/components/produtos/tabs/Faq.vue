<template>
  <section class="links grid grid-cols-2 gap-6justify-between">
    <div>
        <button class="text-blue-600 flex items-center space-x-2 mb-10" @click="modalAdd = true">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg> 
            <span class="text-sm">Perguntas e Respostas</span>
        </button>

        <div class="space-y-4">
            <Card v-for="item in 5" :key="item">
                <template #header>
                    <h3 class="text-sm font-medium">Faq {{item}} </h3>
                    <button class="text-red-500 text-xs font-medium">Remover</button>
                </template>
                <template #body>
                    <p class="text-default text-xs">Descrição do Ebook</p>
                </template>
            </Card>
        </div>
    </div>

    <Modal v-model:open="modalAdd" screen="w-1/4" title="Adicionar Link de Ebook">
        <template #body>
            <form class="form-sm space-y-12">
                <div class="form-group">
                    <label class="label">Nome do Ebook</label>
                    <input type="text" class="form-control form-control-line" />
                </div>
                <div class="form-group">
                    <label class="label">Link do Ebook</label>
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

const modalAdd = ref(false);
</script>

<style>

</style>