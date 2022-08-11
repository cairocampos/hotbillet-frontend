<template>
  <div class="mb-10">
    <HeadPage
      class="mb-10"
      title="Usuários"
    />

    <strong>resultado {{ result }}</strong>

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

        <Autocomplete
          v-model="user.profile_id"
          :options="[]"
          label-key="description"
          label-value="id"
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
        <Autocomplete
          v-if="user.profile_id == Profile.VENDEDOR && supervisors?.length"
          v-model="user.supervisor_id"
          :options="supervisors"
          label-key="name"
          label-value="id"
          label="Selecione um supervisor para vincular ao vendedor"
          label-class="text-xs"
          :searchable="true"
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
import { ref, reactive, watch } from 'vue';
import { IUser } from '@/interfaces/IUser';
import useNotifications from '@/composables/useNotifications';
import { api } from '@/services';
import Form from '@/components/UI/Form/Form.vue';
import TextField from '@/components/UI/Form/Input/TextField.vue';
import Button from '@/components/UI/Button/Button.vue';
import Autocomplete from '@/components/UI/Autocomplete/Autocomplete.vue';
import useValidate from 'vue-tiny-validate';
import { useFormHandler } from '@/composables/useFormHandler';
import { Profile } from '@/enums/constants';
import Loading from '@/components/UI/Loading/Loading.vue'
import Text from '@/components/UI/Layout/Text.vue';
import { createUserFormRequest } from '../helpers';

const { transform } = useFormHandler();
const { notifications } = useNotifications();
const router = useRouter();

const loading = ref(false);
const user = ref<IUser>({
  name: '',
  email:'',
  profile_id: Number(),
  supervisor_id: Number()
});

const loadingSupervisors  = ref(false);
const supervisors = ref<IUser[]>()

const fetchSupervisors = async () => {
  loadingSupervisors.value = true;
  const { data } = await api.get<{users: IUser[]}>(`/users/supervisor`)
  supervisors.value = data.users;
  loadingSupervisors.value = false;
}

const showPassword = ref(false);
const generatePassword = () => {
  const senha01 = Date.now().toString(36).slice(-6);
  const senha = senha01 + btoa(senha01);
  // user.value.password = senha;
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
  if(profile_id == Profile.VENDEDOR) {
    user.value.supervisor_id = 1;
    fetchSupervisors();
    return
  }

  delete user.value.supervisor_id
});

</script>

<style scoped>
.separate {
  min-height: 10px;
  width: 2px;
}
</style>