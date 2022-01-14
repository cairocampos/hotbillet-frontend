<template>
    <section class="links space-y-10">
        <div>
            <p class="text-default font-medium text-sm mb-4">Ebooks</p>
            <div class="flex items-center space-x-6">
                <button class="space-x-2 flex items-center text-xs text-default">
                    <img src="@/assets/icons/download.svg" alt="">
                    <span>Baixar Todos</span>
                </button>
                <button class="space-x-2 flex items-center text-xs text-default">
                    <img src="@/assets/icons/shared.svg" alt="">
                    <span>Compartilhar Todos</span>
                </button>
            </div>
            <table class="table-white text-xs w-full lg:w-3/4">
                <tbody>
                    <tr v-for="item in 2" :key="item">
                        <td>Bônus</td>
                        <td class="text-default font-light">just4you.com/ebook.pdf</td>
                        <td align="right" class="flex items-center justify-end space-x-2">
                            <button class="btn btn-sm hover:bg-gray-200 p-1 rounded-md transition">
                                <img src="@/assets/icons/shared.svg" alt="">
                            </button>
                            <button class="btn btn-sm hover:bg-gray-200 p-1 rounded-md transition">
                                <img src="@/assets/icons/download.svg" alt="">
                            </button>
                            <a href="#" target="_blank" class="text-blue-500">Abrir Link</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
    setup() {
        //
    }
})
</script>

<style>

</style>