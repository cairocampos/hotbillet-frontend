<template>
    <section class="links space-y-10">
        <div>
            <p class="text-default font-medium text-sm">Links</p>
            <table class="table-white text-xs w-full lg:w-3/4">
                <tbody>
                    <tr v-for="item in 2" :key="item">
                        <td>Checkout</td>
                        <td class="text-default font-light">just4you.com/carrinho</td>
                        <td align="right" class="flex items-center justify-end space-x-2">
                            <button class="btn btn-sm hover:bg-gray-200 p-1 rounded-md transition">
                                <img src="@/assets/icons/shared.svg" alt="">
                            </button>
                            <button class="btn btn-sm hover:bg-gray-200 p-1 rounded-md transition" v-copy="'Link aqui'">
                                <img src="@/assets/icons/copy.svg" alt="">
                            </button>
                            <a href="#" target="_blank" class="text-blue-500">Abrir Link</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div>
            <p class="text-default font-medium text-sm">Descontos</p>
            <table class="table-white text-xs w-full lg:w-3/4">
                <tbody>
                    <tr v-for="item in 2" :key="item">
                        <td>4 Potes + 5 Revitalize Hialuronic</td>
                        <td align="right" class="flex items-center justify-end space-x-2">
                            <button class="btn btn-sm hover:bg-gray-200 p-1 rounded-md transition">
                                <img src="@/assets/icons/shared.svg" alt="">
                            </button>
                            <button class="btn btn-sm hover:bg-gray-200 p-1 rounded-md transition">
                                <img src="@/assets/icons/copy.svg" alt="">
                            </button>
                            <a href="#" target="_blank" class="text-blue-500">Abrir Link</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<script lang="ts" setup>
import {ref} from 'vue';

const modalAdd = ref(false);
</script>

<style>

</style>