<template>
  <div>
    <HeadPage>
      <RouteBack :route="{name:'Usuarios'}">
        <h1 class="text-xl text-dark">
          {{ usuario.name }}
        </h1>
      </RouteBack>
    </HeadPage>

    <PageLoading v-if="loading" />
    <div v-else>
      <Card>
        <template #body>
          <div class="p-4">
            <div class="flex justify-between">
              <div class="flex space-x-10">
                <div class="w-56 h-56 bg-gradient-to-r from-yellow-500 to-red-700 p-1 rounded-full">
                  <img
                    src="@/assets/fake/perfil.jpeg"
                    alt=""
                    class="object-cover w-100 rounded-full"
                  >
                </div>

                <div class="space-y-4">
                  <h3 class="text-2xl text-dark font-medium">
                    {{ usuario.name }}
                  </h3>
                  <p class="text-sm text-default font-light">
                    {{ profileName }}
                  </p>
                  <div class="text-sm text-dark flex space-x-6">
                    <p>E-mail: {{ usuario.email }}</p>
                  </div>
                </div>
              </div>

              <div class="space-x-4">
                <button class="btn btn-sm btn-outline-secondary rounded-full">
                  Editar Perfil
                </button>
                <button class="btn btn-sm btn-primary rounded-full">
                  Desativar
                </button>
              </div>
            </div>
            <div class="text-right divide-x-2">
              <button class="text-default text-xs font-medium px-4">
                <div class="flex items-center space-x-2">
                  <img
                    src="@/assets/icons/sync.svg"
                    alt=""
                  >
                  <span>Redefinir Senha</span>
                </div>
              </button>
              <button class="text-default text-xs font-medium px-4">
                <div class="flex items-center space-x-2">
                  <img
                    src="@/assets/icons/login.svg"
                    alt=""
                  >
                  <span>Acessar como Usuário</span>
                </div>
              </button>
              <button class="text-default text-xs font-medium px-4">
                <div class="flex items-center space-x-2">
                  <img
                    src="@/assets/icons/switch-horizontal.svg"
                    alt=""
                  >
                  <span>Transferir Leads</span>
                </div>
              </button>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import useNotifications from "@/composables/useNotifications";
import { IUser } from "@/interfaces/IUser";
import { api } from "@/services";
import { defineComponent, computed, onMounted, ref } from "vue";
import RouteBack from "@/components/RouteBack.vue";
import PageLoading from "@/components/global/PageLoading.vue";
import useConstants from "@/composables/useConstants";

export default defineComponent({
  components: { RouteBack, PageLoading },
  props: {
    id: {
      type: Number,
      required:true
    }
  },
  setup(props) {
    const { PROFILES_NAME } = useConstants();
    const loading = ref(false);
    const { notifications } = useNotifications();
    const usuario = ref<IUser>({
      email: "",
      last_name:"",
      name:"",
      user_profile_id:0,
      company_id:0,
      id:0,
      supervisor_id:0,
    });

    const fetchUser = async () => {
      try {
        loading.value = true;
        const {data} = await api.get<{user: IUser}>(`/users/${props.id}`);
        usuario.value = data.user
      } catch (error) {
        notifications.error(error);
      } finally {
        loading.value = false;
      }
    }

    const profileName = computed(() => {
      if(usuario.value.user_profile_id) {
        return PROFILES_NAME[usuario.value.user_profile_id];
      }

      return '';
    });


    onMounted(() => fetchUser())


    return {
      usuario,
      loading,
      profileName
    };
  }
})
</script>

<style>
</style>