<template>
  <div>
    <HeadPage>
      <RouteBack :route="{name:'Users'}">
        <h1 class="text-xl text-dark">
          {{ user.name }}
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
                <AvatarAccount
                  width="56"
                  height="56"
                />

                <div class="space-y-4">
                  <h3 class="text-2xl text-dark font-medium">
                    {{ user.name }}
                  </h3>
                  <p class="text-sm text-default font-light">
                    {{ user.profile_description }}
                  </p>
                  <div class="text-sm text-dark flex space-x-6">
                    <p>E-mail: {{ user.email }}</p>
                  </div>
                </div>
              </div>

              <div class="space-x-4 flex items-start">
                <Button
                  :redirect="{name: 'UpdateUser', params: {id}}"
                  variant="dark"
                  radius="full"
                  outline
                >
                  Editar Perfil
                </Button>
                <Button
                  variant="special"
                  radius="full"
                >
                  Desativar
                </Button>
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

<script lang="ts" setup>
import useNotifications from "@/composables/useNotifications";
import { User} from "@/core/interfaces/User";
import { api } from "@/services/api";
import { onMounted, ref } from "vue";
import RouteBack from "@/components/RouteBack.vue";
import PageLoading from "@/components/global/PageLoading.vue";
import Button from "@/components/UI/Button/Button.vue";
import AvatarAccount from "../../../components/AvatarAccount.vue";
import HeadPage from "@/components/HeadPage.vue";
import { fetchUser } from "@/core/services/api/users";

const props = defineProps({
  id: {
    type: [Number, String],
    required:true
  }
})

const loading = ref(false);
const { notifications } = useNotifications();
const user = ref<User>({
  email: "",
  name:"",
  profile_id: Number(),
  id:Number(),
  supervisor_id: Number(),
  status_description: "",
  status: 1,
  profile_description: ""
});

const getUser = async () => {
  try {
    loading.value = true;
    const {data} = await fetchUser(props.id as number);
    user.value = data
  } catch (error) {
    notifications.error(error);
  } finally {
    loading.value = false;
  }
}
onMounted(() => getUser())
</script>

<style>
</style>