<template>
  <div>
    <HeadPage class="mb-10">
      <TitlePage>Usuários</TitlePage>
    </HeadPage>

    <Form class="md:flex justify-between px-10">
      <div class="space-y-12">
        <TextField
          v-model="user.name"
          variant="secondary"
          label="Nome"
          :error="getInputError('name', result)"
          @input="testInput('name', result)"
        />

        <TextField
          v-model="user.last_name"
          variant="secondary"
          label="Sobrenome"
          :error="getInputError('last_name', result)"
          @input="testInput('last_name', result)"
        />

        <TextField
          v-model="user.email"
          variant="secondary"
          label="Email"
          :error="getInputError('email', result)"
          @input="testInput('email', result)"
        />

        <Autocomplete
          v-model="user.user_profile_id"
          :options="store.state.spec.profiles"
          label-key="description"
          label-value="id"
          :bordered="false"
          label="Perfil"
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
            :rounded="true"
            variant="info"
            text-loading="Salvando..."
            @click.prevent="save"
          >
            Cadastrar
          </Button>
          <ButtonRouter
            :rounded="true"
            :to="{name:'Users'}"
            variant="danger"
            :outline="true"
          >
            Cancelar
          </ButtonRouter>
        </div>
      </div>
    </Form>
  </div>
</template>

<script lang="ts">
import TitlePage from '@/components/TitlePage.vue'
import { useRouter } from 'vue-router'
import { defineComponent, ref, reactive } from '@vue/runtime-core';
import { IUser } from '@/interfaces/IUser';
import useNotifications from '@/composables/useNotifications';
import { api } from '@/services';
import {useDefaultStore} from '@/store';
import InputGroup from '@/components/InputGroup.vue';
import useContants from '@/composables/useConstants';
import Button from '@/components/UI/Button/Button.vue';
import Form from '@/components/UI/Form/Form.vue';
import TextField from '@/components/UI/Form/Input/TextField.vue';
import ButtonRouter from '@/components/UI/Button/ButtonRouter.vue';
import Autocomplete from '@/components/UI/Autocomplete/Autocomplete.vue';
import { FORM } from '@/constants/messages';
import useValidate from 'vue-tiny-validate';
import { useFormHandler } from '@/composables/useFormHandler';

export default defineComponent({
  components: {
    TitlePage,
    InputGroup,
    Button,
    Form,
    TextField,
    ButtonRouter,
    Autocomplete
},
  setup() {
    const { getInputError, testInput } = useFormHandler();
    const { notifications } = useNotifications();
    const store = useDefaultStore;
    const router = useRouter();
    const {PROFILES} = useContants();
    
    const loading = ref(false);
    const user = ref<IUser>({
      name: '',
      last_name:'',
      password:'',
      email:'',
      user_profile_id: 1
    });

    const showPassword = ref(false);
    const generatePassword = () => {
      const senha01 = Date.now().toString(36).slice(-6);
      const senha = senha01 + btoa(senha01);
      user.value.password = senha;
    }

    const rules = reactive({
      email: [
        {
          name: "required",
          test: (email:string) => Boolean(email),
          message: FORM.REQUIRED
        },
        {
          name: "valid",
          test: (email:string) => /\@/.test(email),
          message: FORM.EMAIL_INVALID
        }
      ],
      name: {
        name: "required",
        test: (name:string) => Boolean(name),
        message: FORM.REQUIRED
      },
      last_name: {
        name: "required",
        test: (last_name:string) => Boolean(last_name),
        message: FORM.REQUIRED
      },
      password: {
        name: "required",
        test: (password:string) => Boolean(password),
        message: FORM.REQUIRED
      }
    });
    const { result } = useValidate(user, rules);

    const save = async () => {
      result.value.$test();
      if(result.value.$invalid) return;

      try {
        loading.value = true;
        await api.post('/users', user.value)
        router.push({name: "Usuarios"})
        notifications.success('Usuário cadastrado.')
      } catch (error) {
        notifications.error(error);
      } finally {
        loading.value = false;
      }
    }

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
      PROFILES
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