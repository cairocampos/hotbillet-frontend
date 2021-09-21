<template>
  <aside class="menu flex flex-col">

    <div class="mx-4 my-6 text-center border-b border-gray-400 pb-6">
      <img src="@/assets/logo.png" alt="" width="150" class="mx-auto">
    </div>

    <div class="flex space-x-4 mx-4 border-b border-gray-400 pb-6">

      <div class="h-20 w-20 rounded-full bg-gradient-to-r from-yellow-500 to-red-700 p-1">
        <img src="@/assets/fake/perfil.jpeg" class="rounded-full">
      </div>

      <div class="flex flex-col">
        <p class="text-white">Olá, Marcos</p>
        <span class="text-gray-50 text-xs font-light">Bem-vindo!</span>
        <router-link to="/" class="text-xs mt-2 text-blue-500 font-bold">Minha Conta</router-link>
      </div>

    </div>

    <MenuItems />

  </aside>
</template>

<script>
import MenuItems from './MenuItems.vue'
export default {
  components: {
    MenuItems
  }
}
</script>

<style lang="scss" scoped>
.menu {
  width: 260px;
  background-color: #2F2D2C;
  min-height: 100vh;
}
</style>