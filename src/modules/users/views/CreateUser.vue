<template>
  <div>
    <HeadPage class="mb-10">
      <TitlePage>Usuários</TitlePage>
    </HeadPage>
    <form class="md:flex justify-between form-sm px-10">
      <div class="space-y-12">
        <div class="form-group">
          <label class="label">Nome</label>
          <input
            v-model="user.name"
            type="text"
            autocomplete="off"
            class="form-control form-control-line"
          />
        </div>
        <div class="form-group">
          <label class="label">Sobrenome</label>
          <input
            v-model="user.last_name"
            type="text"
            autocomplete="off"
            class="form-control form-control-line"
          />
        </div>
        <div class="form-group">
          <label class="label">Email</label>
          <input
            v-model="user.email"
            type="email"
            autocomplete="off"
            class="form-control form-control-line"
          />
        </div>
        <InputGroup
          label="Senha"
          class-custom="border-b border-gray-400"
          label-class="text-xs text-default"
        >
          <template #input>
            <input
              v-model="user.password"
              :type="showPassword ? 'text' : 'password'"
              class="w-100 bg-transparent outline-none"
            />
          </template>

          <template #prepend>
            <button
              type="button"
              class="align-middle"
              @click="generatePassword"
            >
              <span class="text-xs text-default">Gerar Senha</span>                    
            </button>
          </template>
          <template #append>
            <button
              type="button"
              class="align-middle"
              @click="showPassword = !showPassword"
            >
              <svg
                v-if="showPassword"
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
          </template>
        </InputGroup>
          
        <div class="form-group">
          <label class="label">Perfil</label>
          <select
            v-model="user.user_profile_id"
            class="form-control form-control-line"
          >
            <option
              v-for="profile in store.state.spec.profiles"
              :key="profile.id"
              :value="profile.id"
            >
              {{ profile.description }}
            </option>
          </select>
        </div>
        <div
          v-if="user.user_profile_id == PROFILES.VENDEDOR"
          class="form-group"
        >
          <label class="label">Supervisor</label>
          <select
            v-model="user.user_profile_id"
            class="form-control form-control-line"
          >
            <option
              v-for="profile in store.state.spec.profiles"
              :key="profile.id"
              :value="profile.id"
            >
              {{ profile.description }}
            </option>
          </select>
        </div>
        <!-- <div class="form-group">
              <label class="label">Associar Produto ao Vendedor</label>
              <select class="form-control form-control-line">
                  <option value="">Boleto Impresso</option>
              </select>
          </div> -->
      </div>

      <div class="hidden lg:block separate bg-gray-200"></div>

      <div class="my-10 md:my-0 space-x-4">
        <Button
          title="Cadastrar"
          :loading="loading"
          :disabled="loading"
          class="btn btn-sm btn-blue rounded-full font-medium"
          @click="save"
          @click.prevent="save"
        />
        <router-link
          :to="{name:'Usuarios'}"
          class="btn btn-sm btn-outline-secondary rounded-full"
        >
          Cancelar
        </router-link>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import TitlePage from '@/components/TitlePage.vue'
import { useRouter } from 'vue-router'
import { defineComponent, ref } from '@vue/runtime-core';
import { IUser } from '@/interfaces/IUser';
import useNotifications from '@/composables/useNotifications';
import { api } from '@/services';
import {useDefaultStore} from '@/store';
import InputGroup from '@/components/InputGroup.vue';
import useContants from '@/composables/useConstants';

export default defineComponent({
  components: {
    TitlePage,
    InputGroup
  },
  setup() {
    const { notifications } = useNotifications();
    const store = useDefaultStore;
    const router = useRouter();
    const {PROFILES} = useContants();
    
    const loading = ref(false);
    const user = ref<IUser>({
      name: '',
      last_name:'',
      password:'',
      email:'',
      user_profile_id: 1
    });

    const showPassword = ref(false);
    const generatePassword = () => {
      const senha01 = Date.now().toString(36).slice(-6);
      const senha = senha01 + btoa(senha01);
      user.value.password = senha;
    }

    const save = async () => {
      try {
        loading.value = true;
        await api.post('/users', user.value)
        router.push({name: "Usuarios"})
        notifications.success('Usuário cadastrado.')
      } catch (error) {
        notifications.error(error);
      } finally {
        loading.value = false;
      }
    }

    return {
      store,
      save,
      user,
      loading,
      showPassword,
      generatePassword,
      PROFILES
    }
  }
})
</script>

<style scoped>
.separate {
  min-height: 10px;
  width: 2px;
}
</style>