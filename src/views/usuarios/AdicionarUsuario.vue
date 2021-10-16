<template>
  <div>
    <HeadPage class="mb-10">
      <TitlePage>Usuários</TitlePage>
    </HeadPage>
    <form class="md:flex justify-between form-sm px-10">
      <div class="space-y-12">
          <div class="form-group">
              <label for="" class="label">Nome do Usuário</label>
              <input type="text" class="form-control form-control-line" />
          </div>
          <div class="form-group">
              <label for="" class="label">Email</label>
              <input type="text" class="form-control form-control-line" />
          </div>
          <div class="form-group">
              <label for="" class="label">Perfil</label>
              <select class="form-control form-control-line">
                  <option value="">Vendedor</option>
                  <option value="">Admin</option>
              </select>
          </div>
          <div class="form-group">
              <label for="" class="label">Associar Produto ao Vendedor</label>
              <select class="form-control form-control-line">
                  <option value="">Boleto Impresso</option>
              </select>
          </div>
          <div class="form-group">
              <label for="" class="label">Associar Tipo de Transações de Produto</label>
              <select class="form-control form-control-line">
                  <option value="">Boleto Impresso</option>
              </select>
          </div>
      </div>

      <div class="hidden lg:block separate bg-gray-200"></div>

      <div class="my-10 md:my-0 space-x-4">
        <button class="btn btn-sm btn-blue rounded-full font-medium" @click.prevent="cadastrar">Cadastrar</button>
        <router-link :to="{name:'Usuarios'}" class="btn btn-sm btn-outline-secondary rounded-full">Cancelar</router-link>
      </div>
        
    </form>
  </div>
</template>

<script lang="ts" setup>
import TitlePage from '@/components/TitlePage.vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
const store = useStore();
const router = useRouter();


const cadastrar = () => {
  router.push({name: "Usuarios"})
  store.commit('alerta/UPDATE_ALERTA', {text: "Usuário cadastrado", type:"success", show:true});
}
</script>

<style scoped>
.separate {
  min-height: 10px;
  width: 2px;
}
</style>