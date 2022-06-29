<template>
  <div class="login">
    <div class="login__wrapper">
      <div class="login-inside flex items-center justify-center h-screen">
        <div
          class="text-center py-16 space-y-10 w-full md:w-1/3 flex flex-col justify-between"
        >
          <div class="flex items-center justify-center mb-10">
            <h3 class="text-4xl text-secondary font-semibold mr-0">
              <img
                src="@/assets/logo.png"
                alt="Logo Hotbillet"
                width="250"
              />
            </h3>
          </div>
          <form
            class="form space-y-12"
            @submit.prevent="login"
          >
            <div class="form-group">
              <div
                class="input-group form-control text-white border-2 border-gray-50 rounded-md"
              >
                <div class="input-prepend mr-2">
                  <span class="text-white text-md font-light mr-4">
                    Login/Email
                  </span>
                </div>
                <input
                  v-model="email"
                  type="text"
                  class="w-100 bg-transparent outline-none"
                />
              </div>
            </div>

            <div class="form-group">
              <div
                class="input-group form-control text-white border-2 border-gray-50 rounded-md"
              >
                <div class="input-prepend mr-2">
                  <span class="text-white text-md font-light mr-4">
                    Senha
                  </span>
                </div>
                <input
                  v-model="password"
                  :type="exibirSenha ? 'text' : 'password'"
                  class="w-100 bg-transparent outline-none"
                />
                <div class="input-append">
                  <button
                    type="button"
                    class="align-middle"
                    @click="exibirSenha = !exibirSenha"
                  >
                    <svg
                      v-if="exibirSenha"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                    <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div class="form-group text-center">
              <div>
                <Button
                  size="md"
                  :loading="btnLoading"
                  variant="light"
                  :block="true"
                  radius="md"
                  type="submit"
                >
                  Entrar
                </Button>
              </div>
            </div>
            <div>
              <p class="text-sm text-gray-50">
                Esqueceu seu email ou senha ?
              </p>
              <a
                href="#"
                class="text-md text-white font-medium hover:underline"
              >Clique aqui</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { defineComponent } from "@vue/runtime-core";
import { ref } from "vue";
import { api } from "@/services/api";
import { useStore } from "@/store";
import Button from "@/components/UI/Button/Button.vue";
export default defineComponent({
  name: "Login",
  components: { Button },
  setup() {
    const store = useStore();
    const email = ref("admin@hotbillet.com");
    const password = ref("123456");
    const btnLoading = ref(false);
    const exibirSenha = ref(false);
    const login = async () => {
      try {
        btnLoading.value = true;
        await store.dispatch('auth/login', {
          email: email.value,
          password:password.value
        })
      } catch (error) {
        console.log(error);
      } finally {
        btnLoading.value = false;
      }
    };
    return {
      email,
      password,
      login,
      btnLoading,
      exibirSenha,
    };
  },
});
</script>

<style scoped lang="scss">
.login {
  background: url("../../../assets/images/bg-login.jpg") center center;
  background-size: cover;
  filter: saturate(100%);
  &__wrapper {
    height: inherit;
    width: inherit;
    background: linear-gradient(to left, #999, transparent);
  }
  &-inside {
    background-color: rgba(0, 0, 0, 0.7);
  }
  .form-control {
    background-color: rgba(0, 0, 0, 0.5);
  }
}

.input-group {
  position: relative;
}

.input-group::before {
  position: absolute;
  content: "";
  height: 100%;
  width: 6px;
  background-color: #006fd6;
  display: block;
  left: 0;
  border-radius: 6px;
}
</style>
