<template>
  <div>
    <HeadPage>
      <h1 class="text-2xl text-gray-600">
        Meu Perfil
      </h1>
    </HeadPage>

    <div>
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
                    <!-- {{ usuario.name }} -->
                    nome
                  </h3>
                  <p class="text-sm text-default font-light">
                    <!-- {{ usuario.profile }} -->
                    Perfil
                  </p>
                  <div class="text-sm text-dark flex space-x-6">
                    <p>E-mail: email@email.com</p>
                    <p>Telefone: (33) 9 9140-9852</p>
                  </div>
                </div>
              </div>

              <div>
                <button class="btn btn-sm btn-dark rounded-full">
                  Editar Perfil
                </button>
              </div>
            </div>
            <div class="text-right">
              <button class="text-default text-xs font-medium">
                <div class="flex items-center space-x-2">
                  <img
                    src="@/assets/icons/sync.svg"
                    alt=""
                  >
                  <span>Redefinir Senha</span>
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
import { defineComponent, computed } from "vue";
// import { useStore } from "vuex";

export default defineComponent({
  setup() {
    // const store = useStore();
    const usuario = computed(() => {
      return {}
      // const {name = '', profile = '', email = '', phone = ''} = store.state['usuario'].usuario;
      // return {    
      //   name,
      //   profile,
      //   email,
      //   phone
      // }
    })

    return {
      usuario
    }
  }
})
</script>

<style>
</style>