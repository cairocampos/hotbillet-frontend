<template>
  <aside class="menu flex flex-col">

    <div class="mx-4 my-10 text-center border-b border-gray-400 pb-6">
      <img src="@/assets/logo.png" alt="" width="135" class="mx-auto">
    </div>

    <div class="flex space-x-4 mx-4 border-b border-gray-400 pb-6">

      <div class="h-16 w-16 rounded-full bg-gradient-to-r from-yellow-500 to-red-700 p-1">
        <img src="@/assets/fake/perfil.jpeg" class="rounded-full">
      </div>

      <div class="flex flex-col">
        <p class="text-white text-xs text__username">Olá, {{username}}</p>
        <span class="text-gray-50 text-xs font-light">Bem-vindo!</span>
        <router-link to="/" class="text-xs mt-2 text-blue-500 font-bold">Minha Conta</router-link>
      </div>

    </div>

    <MenuItems />

  </aside>
</template>

<script>
import { mapGetters } from 'vuex'
import MenuItems from './MenuItems.vue'
export default {
  components: {
    MenuItems
  },
  computed: {
    ...mapGetters({username: 'usuario/getNomeUsuario'})
  }
}
</script>

<style lang="scss" scoped>
.menu {
  width: 225px;
  background-color: #2F2D2C;
  min-height: 100vh;
}

.text__username {
  max-width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>