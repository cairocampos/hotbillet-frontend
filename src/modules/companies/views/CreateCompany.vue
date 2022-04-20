<template>
  <Container>
    <HeadPage class="mb-10">
      <TitlePage>Cadastrar Empresa</TitlePage>
    </HeadPage>

    <Form class="md:flex justify-between px-10">
      <div class="space-y-8">
        <TextField
          v-model="user.name"
          variant="secondary"
          label="Nome da Empresa"
          placeholder="Ex: Hotbillet"
        />

        <Autocomplete
          v-model="user.user_profile_id"
          :options="store.state.spec.profiles"
          label-key="description"
          label-value="id"
          :bordered="false"
          label="Produtor"
        />

        <TextField
          v-model="user.last_name"
          variant="secondary"
          label="CPF/CNPJ"
          :mask="['###.###.###-##', '##.###.###/####-##']"
        />
        <div>
          <Text>
            Dados de Contato
          </Text>
        </div>
        <TextField
          v-model="user.email"
          variant="secondary"
          mask="(##) #####-####"
        >
          <template #left>
            <span>Telefone:</span>
          </template>
        </TextField>
        <TextField
          v-model="user.email"
          variant="secondary"
          mask="(##) #####-####"
        >
          <template #left>
            <span>Telefone 2:</span>
          </template>
        </TextField>
        <TextField
          v-model="user.email"
          variant="secondary"
        >
          <template #left>
            <span>E-mail:</span>
          </template>
        </TextField>
        <TextField
          v-model="user.email"
          variant="secondary"
        >
          <template #left>
            <span>Telefone:</span>
          </template>
        </TextField>

        <div>
          <Text>Informações Endereço</Text>
        </div>

        <TextField
          v-model="user.email"
          variant="secondary"
          label="CEP"
        />

        <TextField
          v-model="user.email"
          variant="secondary"
          label="CEP"
        />

        <FormInline>
          <TextField
            v-model="user.email"
            variant="secondary"
            label="Número"
          />

          <TextField
            v-model="user.email"
            variant="secondary"
            label="Complemento"
            placeholder="Ex: Apto 84B"
          />
        </FormInline>
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
            @click="save"
            @click.prevent="save"
          >
            Cadastrar
          </Button>
          <ButtonRouter
            :rounded="true"
            :to="{name:'Companies'}"
            variant="danger"
            :outline="true"
          >
            Cancelar
          </ButtonRouter>
        </div>
      </div>
    </Form>
  </Container>
</template>

<script lang="ts">
import TitlePage from '@/components/TitlePage.vue'
import { useRouter } from 'vue-router'
import { defineComponent, ref } from '@vue/runtime-core';
import { IUser } from '@/interfaces/IUser';
import useNotifications from '@/composables/useNotifications';
import { api } from '@/services';
import {useDefaultStore} from '@/store';
import useContants from '@/composables/useConstants';
import Button from '@/components/UI/Button/Button.vue';
import Form from '@/components/UI/Form/Form.vue';
import TextField from '@/components/UI/Form/Input/TextField.vue';
import ButtonRouter from '@/components/UI/Button/ButtonRouter.vue';
import Autocomplete from '@/components/UI/Autocomplete/Autocomplete.vue';
import Container from '@/components/UI/Layout/Container.vue';
import FormInline from '@/components/UI/Form/FormInline.vue';

export default defineComponent({
  components: {
    TitlePage,
    Button,
    Form,
    TextField,
    ButtonRouter,
    Autocomplete,
    Container,
    FormInline
},
  setup() {
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

    const save = async () => {
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