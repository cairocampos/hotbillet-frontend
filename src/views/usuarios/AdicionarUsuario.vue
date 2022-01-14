<template>
  <div>
    <HeadPage class="mb-10">
      <TitlePage>Usuários</TitlePage>
    </HeadPage>
    <form class="md:flex justify-between form-sm px-10">
      <div class="space-y-12">
          <div class="form-group">
              <label class="label">Nome</label>
              <input type="text" autocomplete="off" v-model="user.name" class="form-control form-control-line" />
          </div>
          <div class="form-group">
              <label class="label">Sobrenome</label>
              <input type="text" autocomplete="off" v-model="user.last_name" class="form-control form-control-line" />
          </div>
          <div class="form-group">
              <label class="label">Email</label>
              <input type="email" autocomplete="off" v-model="user.email" class="form-control form-control-line" />
          </div>
          <div class="form-group">
              <label class="label">Perfil</label>
              <select v-model="user.user_profile_id" class="form-control form-control-line">
                  <option v-for="profile in store.state.spec.profiles" :key="profile.id" :value="profile.id">
                    {{profile.description}}
                  </option>
              </select>
          </div>
          <div class="form-group" v-if="user.user_profile_id == store.state.static.profiles.VENDEDOR">
              <label class="label">Supervisor</label>
              <select v-model="user.user_profile_id" class="form-control form-control-line">
                  <option v-for="profile in store.state.spec.profiles" :key="profile.id" :value="profile.id">
                    {{profile.description}}
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
          class="btn btn-sm btn-blue rounded-full font-medium" @click.prevent="save" />
        <router-link :to="{name:'Usuarios'}" class="btn btn-sm btn-outline-secondary rounded-full">Cancelar</router-link>
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

export default defineComponent({
  components: {
    TitlePage
  },
  setup() {
    const { notifications } = useNotifications();
    const store = useDefaultStore;
    const router = useRouter();
    
    const loading = ref(false);
    const user = ref<IUser>({
      name: '',
      last_name:'',
      password:'',
      email:'',
      user_profile_id: 1
    });

    const save = async () => {
      try {
        loading.value = true;
        await api.post('/users', user.value)
        router.push({name: "Usuarios"})
        notifications.success('Usuário cadastrado.')
      } catch (error) {
        notifications.error('error');
      } finally {
        loading.value = false;
      }
    }

    return {
      store,
      save,
      user,
      loading
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