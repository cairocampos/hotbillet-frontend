<template>
  <div class="login">
      <div class="login-inside flex items-center justify-center h-screen">
        <div class="text-center py-16 space-y-10 w-full md:w-1/3 flex flex-col justify-between">
          <div class="flex items-center justify-center mb-10">
              <h3 class="text-4xl text-secondary font-semibold mr-0">
                <img src="@/assets/logo.png" alt="Logo Hotbillet" width="200">
              </h3>
          </div>
          <form class="form space-y-12" @submit.prevent="login">
              <div class="form-group">
                  <input v-model="email" 
                    type="text" 
                    placeholder="Email" 
                    class="form-control text-white border-2 border-gray-50 rounded-md" />
              </div>
              <div class="form-group">
                  <input 
                    v-model="password" 
                    type="password" 
                    placeholder="Senha" 
                    class="form-control text-white border-2 border-gray-50 rounded-md" />
              </div>
              <div class="form-group text-center">
                  <div>
                    <button v-if="btnLoading">
                      <ButtonLoading class="w-12 h-12"/>
                    </button>
                    <button v-else class="btn btn-circle btn-secondary" @click="login()">
                      <span>Entrar</span>
                    </button>
                  </div>
              </div>
              <div>
                <p class="text-sm text-gray-50">Esqueceu seu email ou senha ?</p>
                <a href="#" class="text-md text-white font-medium hover:underline">Clique aqui</a>
              </div>
          </form>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import {useRouter} from 'vue-router'
import { defineComponent } from "@vue/runtime-core"
import {ref} from 'vue';
import { api } from '@/services';
import { useStore } from 'vuex';

interface ILogin {
  jwt_access:string;
  jwt_refresh:string;
}

export default defineComponent({
  name: 'Login',
    setup() {
      const router = useRouter();
      const store = useStore();
      const email = ref("company1@hotbillet.com.br");
      const password = ref("123456");
      const btnLoading = ref(false);

      const login = async () => {
        try {
          btnLoading.value = true;
          const response = await api.post<ILogin>('/login', {
            email:email.value,
            password:password.value,
          });


          store.dispatch('usuario/defineUsuario', response.data);
          router.push({name:"Dashboard"})
        } catch (error) {
          console.log(error)
        } finally {
          btnLoading.value = false;
        }
      }

      return {
          email,
          password,
          login,
          btnLoading
      }
    }
})
</script>

<style scoped lang="scss">
.login {
  background: url('../../assets/images/bg-login.jpg') center center;
  filter:saturate(100%);
  &-inside {
    background-color: rgba(0,0,0,0.7);
  }
  .form-control {
    background-color: rgba(0,0,0,.5);
  }
}
</style>