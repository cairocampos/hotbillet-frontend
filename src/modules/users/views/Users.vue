<template>
  <div>
    <HeadPage class="mb-10">
      <TitlePage>Usuários</TitlePage>
    </HeadPage>

    <HeadContent>
      <div class="flex justify-end w-full">
        <button class="flex items-center space-x-2 text-xs text-default">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>
          <span class="font-medium">Transferir Leads</span>
        </button>
      </div>
    </HeadContent>
    
    <div class="my-10 text-right">
      <router-link
        :to="{name: 'CreateUser'}"
        class="btn btn-sm btn-dark rounded-full py-2"
      >
        Cadastrar Usuário
      </router-link>
    </div>

    <PageLoading v-if="loading" />

    <table
      v-else-if="users && users.length"
      class="table table-white w-full text-sm mb-10"
    >
      <thead>
        <th>Nome</th>
        <th>E-mail</th>
        <th>Cadastrado em:</th>
        <th>Status</th>
        <th></th>
      </thead>
      <tbody>
        <tr
          v-for="(user, index) in users"
          :key="index"
        >
          <td class="flex items-center space-x-2">
            <img
              src="@/assets/fake/perfil.jpeg"
              alt=""
              class="object-cover h-10 w-10 rounded-full"
            />
            <span>{{ user.name }} {{ user.last_name }}</span>
          </td>
          <td>{{ user.email }}</td>
          <td>{{ formatDateIsoToBRL(user.created_at) }}</td>
          <td class="font-normal">
            <span v-if="user.status == 'ATIVO'">Ativo</span>
            <span
              v-else
              class="text-red-500 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Desativado
            </span>
          </td>
          <td align="right">
            <router-link
              :to="{name: 'Usuario',
                    params:
                      {id:user.id}}"
              class="flex items-center text-xs border-l-2 border-gray-300"
            >
              <span class="mx-2 pl-4 font-medium">Ver</span> 
              <svg
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
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>
      Nenhum registro encontrado.
    </p>
  </div>
</template>

<script lang="ts">
import TitlePage from '@/components/TitlePage.vue';
import HeadContent from '@/components/HeadContent.vue';

import {defineComponent, onMounted, ref} from 'vue';
import { IUserData } from '@/interfaces/IUser';
import { api } from '@/services';
import { useDateTime } from '@/composables/useDateTime';

export default defineComponent({
  components: {
    TitlePage,
    HeadContent
  },
  setup() {
    const loading = ref(false);
    const { formatDateIsoToBRL } = useDateTime();
    const users = ref<IUserData[]>()

    const fetchUsers = async () => {
      try {
        loading.value = true;
        const response = await api.get<{users: IUserData[]}>('/users')
        users.value = response.data.users;
      } catch (error) {
        console.log(error)
      } finally {
        loading.value = false;
      }
    }

    onMounted(() => {
      fetchUsers();
    })

    return {
      formatDateIsoToBRL,
      users,
      loading
    }
  }
})


</script>

<style scoped>

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}

.slide-enter-active,
.slide-leave-active {
  transition: all .3s;
}

</style>