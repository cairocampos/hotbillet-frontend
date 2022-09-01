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
      <div class="flex justify-end">
        <Button
          variant="dark"
          :redirect="{name:'CreateUser'}"
          radius="full"
        >
          Cadastrar Usuário
        </Button>
      </div>
    </div>

    <Loading v-if="loading" />
    <Datatable
      v-else-if="users && users.length"
      :headers="headers"
      :items="users"
    >
      <template #status="{ item }">
        <span
          v-if="item.status == STATUS.ATIVO"
          class="bg-green-500 bg-opacity-80 text-white rounded-md px-2"
        >Ativo</span>
        <span
          v-else
          class="text-red-500 flex items-center space-x-2"
        >
          <PhFingerprint />
          <span>Desativado</span>
        </span>
      </template>
      <template #actions="{ item }">
        <router-link
          :to="{name: 'UserDetails',
                params:
                  {id:item.id}}"
          class="flex items-center text-xs border-l-2 border-gray-300"
        >
          <span class="mx-2 pl-4 font-medium">Ver</span> 
          <PhArrowRight
            class="text-lg"
          />
        </router-link>
      </template>
    </Datatable>
    <NoRecords v-else />
  </div>
</template>

<script lang="ts">
import TitlePage from '@/components/TitlePage.vue';
import HeadContent from '@/components/HeadContent.vue';
import {computed, defineComponent, onMounted, ref} from 'vue';
import { UserData } from '@/core/interfaces/User';
import { useDateTime } from '@/core/composables/useDateTime';
import { Header } from '@/core/interfaces/Datatable';
import Datatable from '@/components/UI/Datatable/Datatable.vue';
import {STATUS} from '@/core/constants';
import Button from '@/components/UI/Button/Button.vue';
import NoRecords from '@/components/NoRecords.vue';
import {PhFingerprint,PhArrowRight} from 'phosphor-vue'
import HeadPage from '@/components/HeadPage.vue';
import Loading from '@/components/UI/Loading/Loading.vue';
import {fetchUsers} from '@/core/services/api/users'
import { ucword } from '@/core/helpers'

export default defineComponent({
  components: {
    TitlePage,
    HeadContent,
    Datatable,
    Button,
    NoRecords,
    PhFingerprint,
    PhArrowRight,
    HeadPage,
    Loading
},
  setup() {
    const loading = ref(false);
    const { formatDateTimeISO } = useDateTime();
    const users = ref<UserData[]>()
    const headers = computed<Header[]>(() => {
      return [
        {
          text: "Nome",
          value: "name",
          colspan:2
        },
        {
          text: "Email",
          value: "email"
        },
        {
          text: "Data do cadastro",
          value: "created_at",
          format: (value:string) => formatDateTimeISO(value)
        },
        {
          text: "Status",
          value: "status"
        },
        {
          text: "Actions",
          value: "actions",
          align: "right",
          show: false
        }
      ];
    })

    const getUsers = async () => {
      try {
        loading.value = true;
        const response = await fetchUsers()
        users.value = response.data.data;
      } catch (error) {
        console.log(error)
      } finally {
        loading.value = false;
      }
    }

    onMounted(() => {
      getUsers();
    })

    return {
      formatDateTimeISO,
      users,
      loading,
      headers,
      ucword,
      STATUS
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