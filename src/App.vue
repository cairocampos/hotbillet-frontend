<template>
  <div class="min-h-screen w-full">
    <Notify />

    <!-- <LoadingPage v-model="obj" /> -->

    <template v-if="!isLogin">
      <div class="w-full bg-gray-100 text-right px-6 flex items-center justify-end py-2 md:hidden">
        <button class="p-2 bg-gray-200 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
		<div class="flex">
		<Menu class="flex-shrink-0"/>
    <main id="main">
        <router-view v-slot="{Component}">
          <transition name="slide" mode="out-in">
            <component :is="Component" :key="$route.path"></component>
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
// import {api} from '@/services';
import {computed, defineComponent, onMounted, ref} from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import Alert from '@/components/Alert.vue'
// import LoadingPage from '@/components/LoadingPage.vue'

import Notify from '@/components/Notify.vue';

export default defineComponent({
  components: {
    Menu,
    Alert,
    Notify
  },
  setup() {
    const store = useStore();
    const route = useRoute();

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

    onMounted(() => {
      store.dispatch('usuario/getJwtData')
      store.dispatch('loadSpec');
    })

    setTimeout(() => {
      open.value = true
    }, 1000)

    return {
      isLogin,
      open,
      store,
      obj: {show:true}
    }
  }
})
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
html, body {
  font-family: 'Poppins', sans-serif;
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

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.slide-leave-to {
  transform: translateX(20px);
}

.slide-enter-active,
.slide-leave-active {
  transition: all .3s;
}
</style>