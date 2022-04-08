<template>
  <div class="flex space-x-4 mx-4 border-b border-gray-400 pb-6">
    <div class="h-16 w-16 rounded-full bg-gradient-to-r from-yellow-500 to-red-700 p-1">
      <img
        src="@/assets/fake/perfil.jpeg"
        class="rounded-full"
      >
    </div>

    <div class="flex flex-col">
      <p class="text-white text-xs text__username">
        Olá, {{ username }}
      </p>
      <span class="text-gray-50 text-xs font-light">Bem-vindo!</span>
      <router-link
        to="/perfil"
        class="text-xs mt-2 text-blue-500 font-bold"
      >
        Minha Conta
      </router-link>
    </div>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent } from 'vue';
export default defineComponent({
  setup() {
    const username = computed(() => 'Cairo')

    return {
      username
    }
  }
})
</script>

<style lang='scss' scoped>
</style>