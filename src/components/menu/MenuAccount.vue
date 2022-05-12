<template>
  <div class="flex space-x-4 mx-4 border-b border-gray-400 pb-6">
    <AvatarAccount
      width="16"
      height="16"
    />

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
import AvatarAccount from '../AvatarAccount.vue';
export default defineComponent({
    components: { AvatarAccount },
    setup() {
        const username = computed(() => "Cairo");
        return {
            username
        };
    }
})
</script>

<style lang='scss' scoped>
.avatar {
  background: linear-gradient(230.64deg, #E31E22 17.24%, #FF7800 82.83%);
}
</style>