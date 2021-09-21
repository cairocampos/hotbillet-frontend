<template>
  <div class="min-h-screen w-full">
    <template v-if="!isLogin">
		<div class="flex">
		<Menu class="flex-shrink-0"/>
    <main id="main">
        <router-view v-slot="{Component}">
          <transition>
            <component :is="Component"></component>
          </transition>
        </router-view>
    </main>
		</div>
    </template>
    <router-view name="login" />
  </div>
</template>

<script lang="ts">
import Menu from '@/components/Menu.vue';
import {api} from '@/services';
import {computed, defineComponent, onMounted, ref} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default defineComponent({
  components: {
    Menu,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const isLogin = computed(() => {
      return route.name === 'Login'
    });

    // const buscaUsuario = async () => {
    //   try {
    //     const response = await api.get('/me');
    //     store.commit('UPDATE_USER', response.data.data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

    const open = ref<boolean>(false);

    setTimeout(() => {
      open.value = true
    }, 1000)

    return {
      isLogin,
      open
    }
  }
})
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');
html, body {
  font-family: 'Montserrat', sans-serif;
}
#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
#main {
  flex: 1 1 0%;
  min-height: 100vh;
  padding-left: 30px;
  padding-right: 30px;
}

::-webkit-scrollbar {
  width: 0.5em;
}
 
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
 
::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
}
</style>