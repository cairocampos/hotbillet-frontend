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
          label="Nome"
          required
          :validator="{result, field: 'name'}"
        />

        <TextField
          v-model="user.email"
          label="Email"
          required
          :validator="{result, field: 'email'}"
        />

        <AppSelect
          v-model="user.profile_id"
          :options="profiles"
          label="Perfil"
          key-name="description"
          required
        />

        <div
          v-if="loadingSupervisors"
          class="flex items-center gap-2"
        >
          <Spinner class="w-4 h-4" />
          <Text variant="default">
            Carregando...
          </Text>
        </div>
        <AppSelect
          v-if="user.profile_id == PROFILES.VENDEDOR && supervisors?.length"
          v-model="user.supervisor_id"
          :options="supervisors"
          label="Supervisor"
          required
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
import useNotifications from '@/core/composables/useNotifications';
import { api } from '@/core/services/api/base';
import Form from '@/components/UI/Form/Form.vue';
import TextField from '@/components/UI/Form/Input/TextField.vue';
import Button from '@/components/UI/Button/Button.vue';
import useValidate from 'vue-tiny-validate';
import { useFormHandler } from '@/core/composables/useFormHandler';
import Spinner from '@/components/UI/Spinner/Spinner.vue'
import Text from '@/components/UI/Layout/Text.vue';
import { createUserFormRequest } from '../helpers';
import { fetchProfiles } from '@/core/services/api/profiles'
import { fetchUsers } from '@/core/services/api/users'
import {Profile} from '@/core/interfaces/Profile'
import { PROFILES } from '@/core/constants';
import AppSelect from '@/components/UI/AppSelect/AppSelect.vue';

const { transform } = useFormHandler();
const { notifications } = useNotifications();
const router = useRouter();

const loading = ref(false);
const user = ref({
  name: '',
  email:'',
  profile_id: Number(),
  supervisor_id: 0,
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
    getSupervisors();
    return
  }

  // delete user.value.supervisor_id
});

onMounted(() => getProfiles());

</script>

<style scoped>
.separate {
  min-height: 10px;
  width: 2px;
}
</style>