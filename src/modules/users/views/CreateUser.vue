<template>
  <div class="mb-10">
    <HeadPage
      class="mb-10"
      title="Usuários"
    />

    <Form
      class="md:w-1/3 flex flex-col gap-6"
      @submit.prevent="save"
    >
      <div class="space-y-12">
        <TextField
          v-model="user.name"
          variant="secondary"
          label="Nome"
          label-class="text-xs"
          required
          :validator="{result, field: 'name'}"
        />

        <TextField
          v-model="user.email"
          variant="secondary"
          label-class="text-xs"
          label="Email"
          :validator="{result, field: 'email'}"
        />

        <Listbox
          v-model="user.profile_id"
          :options="profiles"
          label-name="description"
          key-name="id"
          label="Perfil"
          label-class="text-xs"
          variant="secondary"
          :validator="{result, field: 'profile_id'}"
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
        <Listbox
          v-if="user.profile_id == PROFILES.VENDEDOR && supervisors?.length"
          v-model="user.supervisor_id"
          :options="supervisors"
          label-name="name"
          key-name="id"
          label="Perfil"
          label-class="text-xs"
          variant="secondary"
          :validator="{result, field: 'supervisor_id'}"
        />
      </div>

      <div class="flex flex-col gap-4 md:gap-0 md:flex-row md:justify-between">
        <Button
          radius="full"
          :redirect="{name:'Users'}"
          variant="dark"
          outline
        >
          Cancelar
        </Button>
        <Button
          :loading="loading"
          loading-type="border"
          :disabled="loading || result.$invalid"
          radius="full"
          variant="dark"
          text-loading="Salvando..."
          type="submit"
        >
          Cadastrar
        </Button>
      </div>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import HeadPage from '@/components/HeadPage.vue'
import { useRouter } from 'vue-router'
import { ref, reactive, watch, onMounted } from 'vue';
import { User, UserData } from '@/core/interfaces/User';
import useNotifications from '@/composables/useNotifications';
import { api } from '@/services';
import Form from '@/components/UI/Form/Form.vue';
import TextField from '@/components/UI/Form/Input/TextField.vue';
import Button from '@/components/UI/Button/Button.vue';
import useValidate from 'vue-tiny-validate';
import { useFormHandler } from '@/composables/useFormHandler';
import Loading from '@/components/UI/Loading/Loading.vue'
import Text from '@/components/UI/Layout/Text.vue';
import { createUserFormRequest } from '../helpers';
import { fetchProfiles } from '@/core/services/api/profiles'
import { fetchUsers } from '@/core/services/api/users'
import {Profile} from '@/core/interfaces/Profile'
import { PROFILES } from '@/constants';
import Listbox from '@/components/UI/Listbox/Listbox.vue';

const { transform } = useFormHandler();
const { notifications } = useNotifications();
const router = useRouter();

const loading = ref(false);
const user = ref<UserData>({
  name: '',
  email:'',
  profile_id: Number(),
  supervisor_id: Number(),
});

const loadingSupervisors  = ref(false);
const supervisors = ref<User[]>()

const getSupervisors = async () => {
  try {
    loadingSupervisors.value = true;
    const { data: {data} } = await fetchUsers({profile_id: PROFILES.SUPERVISOR})
    supervisors.value = data
  } finally {
    loadingSupervisors.value = false;
  }
}

const profiles = ref<Profile[]>([])
const getProfiles = async () => {
  const {data} = await fetchProfiles();
  profiles.value = data;
}

const rules = reactive(createUserFormRequest);
const { result } = useValidate(user, rules, reactive({transform}));

const save = async () => {
  result.value.$test();
  if(result.value.$invalid) return;

  try {
    loading.value = true;
    await api.post('/users', user.value)
    router.push({name: "Users"})
    notifications.success('Usuário cadastrado.')
  } catch (error) {
    notifications.error(error);
  } finally {
    loading.value = false;
  }
}

watch(() => user.value.profile_id, profile_id => {
  if(profile_id == PROFILES.VENDEDOR) {
    user.value.supervisor_id = 1;
    getSupervisors();
    return
  }

  delete user.value.supervisor_id
});

onMounted(() => getProfiles());

</script>

<style scoped>
.separate {
  min-height: 10px;
  width: 2px;
}
</style>