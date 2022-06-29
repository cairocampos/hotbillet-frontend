<template>
  <div class="mb-10">
    <HeadPage>
      <RouteBack
        :route="{name: 'UserDetails', params: {id}}"
        :title="user.name ?? 'Carregando...'"
      />
    </HeadPage>

    <PageLoading v-if="loadingUser" />
    <Form
      v-else
      class="md:flex justify-between px-10"
      @submit.prevent="updateUser"
    >
      <div class="space-y-12">
        <TextField
          v-model="user.name"
          variant="secondary"
          label="Nome"
          label-class="text-xs"
          :error="getInputError('name', result)"
          @input="testInput('name', result)"
        />

        <TextField
          v-model="user.last_name"
          variant="secondary"
          label="Sobrenome"
          label-class="text-xs"
          :error="getInputError('last_name', result)"
          @input="testInput('last_name', result)"
        />

        <TextField
          v-model="user.email"
          variant="secondary"
          label-class="text-xs"
          label="Email"
          :error="getInputError('email', result)"
          @input="testInput('email', result)"
        />

        <Autocomplete
          v-model="user.user_profile_id"
          :options="store.state.spec.profiles"
          label-key="description"
          label-value="id"
          label="Perfil"
          label-class="text-xs"
          :error="getInputError('user_profile_id', result)"
          @selected="testInput('user_profile_id', result)"
        />

        <div
          v-if="loadingSupervisors"
          class="flex items-center gap-2"
        >
          <Loading class="w-4 h-4" />
          <Text variant="default">
            Carregando...
          </Text>
        </div>
        <Autocomplete
          v-if="user.user_profile_id == Profile.VENDEDOR && supervisors?.length"
          v-model="user.supervisor_id"
          :options="supervisors"
          label-key="name"
          label-value="id"
          label="Selecione um supervisor para vincular ao vendedor"
          label-class="text-xs"
          :searchable="true"
        />
      </div>
      
      <div class="hidden lg:block separate bg-gray-200"></div>

      <div class="my-10 md:my-0">
        <div class="space-x-4 flex items-center">
          <Button
            :loading="loading"
            loading-type="border"
            :disabled="loading"
            radius="full"
            variant="dark"
            text-loading="Salvando..."
            type="submit"
          >
            Atualizar
          </Button>
          <Button
            radius="full"
            :redirect="{name:'Users'}"
            variant="dark"
            outline
          >
            Cancelar
          </Button>
        </div>
      </div>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import HeadPage from '@/components/HeadPage.vue'
import { useRouter } from 'vue-router'
import { ref, reactive, watch, onMounted } from 'vue';
import { IUser } from '@/interfaces/IUser';
import useNotifications from '@/composables/useNotifications';
import { api } from '@/services/api';
import {useStore} from '@/store';
import Form from '@/components/UI/Form/Form.vue';
import TextField from '@/components/UI/Form/Input/TextField.vue';
import Button from '@/components/UI/Button/Button.vue';
import Autocomplete from '@/components/UI/Autocomplete/Autocomplete.vue';
import useValidate from 'vue-tiny-validate';
import { Profile } from '@/enums/constants';
import Loading from '@/components/UI/Loading/Loading.vue'
import Text from '@/components/UI/Layout/Text.vue';
import { userFormRequest } from '../helpers';
import PageLoading from '@/components/global/PageLoading.vue';
import RouteBack from '@/components/RouteBack.vue';
import { getInputError, testInput } from '@/helpers/formValidation'

const props = defineProps({
  id: {
    type: [Number,String],
    required:true
  }
})

const { notifications } = useNotifications();
const store = useStore();
const router = useRouter();
const loading = ref(false);
const user = ref<IUser>({
  name: '',
  last_name:'',
  email:'',
  user_profile_id: Profile.SUPERVISOR,
  supervisor_id: 0
});

const loadingUser = ref(false)
const fetchUser = async () => {
  try {
    loadingUser.value = true;
    const {data} = await api.get<{user: IUser}>(`/users/${props.id}`);
    user.value = data.user
  } catch (error) {
    notifications.error(error)
  } finally {
    loadingUser.value = false;
  }
}

const loadingSupervisors  = ref(false);
const supervisors = ref<IUser[]>()
const fetchSupervisors = async () => {
  loadingSupervisors.value = true;
  const { data } = await api.get<{users: IUser[]}>(`/users/supervisor`)
  supervisors.value = data.users;
  loadingSupervisors.value = false;
}

const rules = reactive(userFormRequest);
const { result } = useValidate(user, rules);

const updateUser = async () => {
  result.value.$test();
  if(result.value.$invalid) return;

  try {
    loading.value = true;
    await api.put(`/users/${props.id}`, user.value)
    router.push({name: "UserDetails", params: {id: props.id}})
    notifications.success('Usuário atualizado.')
  } catch (error) {
    notifications.error(error);
  } finally {
    loading.value = false;
  }
}

watch(() => user.value.user_profile_id, profile_id => {
  if(profile_id == Profile.VENDEDOR) {
    fetchSupervisors();
    return
  }

  delete user.value.supervisor_id
});

onMounted(() => fetchUser());
</script>

<style scoped>
.separate {
  min-height: 10px;
  width: 2px;
}
</style>