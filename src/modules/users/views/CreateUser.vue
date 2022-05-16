<template>
  <div class="mb-10">
    <HeadPage
      class="mb-10"
      title="Usuários"
    />

    <Form
      class="md:flex justify-between px-10"
      @submit.prevent="save"
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
          variant="secondary"
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
            Cadastrar
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

<script lang="ts">
import HeadPage from '@/components/HeadPage.vue'
import { useRouter } from 'vue-router'
import { defineComponent, ref, reactive, watch } from 'vue';
import { IUser } from '@/interfaces/IUser';
import useNotifications from '@/composables/useNotifications';
import { api } from '@/services';
import {useDefaultStore} from '@/store';
import InputGroup from '@/components/InputGroup.vue';
import Form from '@/components/UI/Form/Form.vue';
import TextField from '@/components/UI/Form/Input/TextField.vue';
import Button from '@/components/UI/Button/Button.vue';
import Autocomplete from '@/components/UI/Autocomplete/Autocomplete.vue';
import { FORM } from '@/constants/messages';
import useValidate from 'vue-tiny-validate';
import { useFormHandler } from '@/composables/useFormHandler';
import { Profile } from '@/enums/constants';
import Loading from '@/components/UI/Loading/Loading.vue'
import Text from '@/components/UI/Layout/Text.vue';
import { createUserFormRequest } from '../helpers';

export default defineComponent({
  components: {
    InputGroup,
    Button,
    Form,
    TextField,
    Autocomplete,
    HeadPage,
    Loading,
    Text
},
  setup() {
    const { getInputError, testInput } = useFormHandler();
    const { notifications } = useNotifications();
    const store = useDefaultStore;
    const router = useRouter();
    
    const loading = ref(false);
    const user = ref<IUser>({
      name: '',
      last_name:'',
      password:'',
      email:'',
      user_profile_id: Profile.SUPERVISOR
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
      user.value.password = senha;
    }

    const rules = reactive(createUserFormRequest);
    const { result } = useValidate(user, rules);

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

    watch(() => user.value.user_profile_id, profile_id => {
      if(profile_id == Profile.VENDEDOR) {
        user.value.supervisor_id = 1;
        fetchSupervisors();
        return
      }

      delete user.value.supervisor_id
    });

    return {
      result,
      getInputError,
      testInput,
      store,
      save,
      user,
      loading,
      showPassword,
      generatePassword,
      supervisors,
      Profile,
      loadingSupervisors
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