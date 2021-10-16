<template>
  <div>
    <HeadPage>
      <h1 class="text-2xl text-gray-600">Mensagens</h1>
    </HeadPage>
    <div class="container mx-auto">

      <div>
        <div class="space-x-4 flex">
          <div class="form-group">
            <label class="label">Tag</label>
            <input type="text" class=""/>
          </div>
          <div class="form-group">
            <label class="label">Filtrar Produto</label>
            <input type="text" class=""/>
          </div>
          <div class="form-group">
            <label class="label">Filtrar Transação</label>
            <input type="text" class=""/>
          </div>
          <div class="form-group">
            <label class="label">Filtrar Status</label>
            <input type="text" class=""/>
          </div>
        </div>
        
        <div class="text-center m-10">
          <button class="btn btn-sm btn-dark rounded-full">Buscar</button>
        </div>
      </div>

      <h3 class="text-sm text-dark mb-4">Todas as Mensagens</h3>

      <div class="md:grid grid-cols-2 gap-4">
        <Card v-for="item in 15" :key="item" class="mb-4 md:mb-0 mensagem">
          <template #header>
            <div class="flex justify-between items-center w-full">
              <div class="flex items-center space-x-2">
                <div class="h-6 w-6 rounded-full bg-gray-200">
                  <!-- <img src="@/assets/fake/produto.png" alt="" class="object-contain w-16 h-16 rounded-full" /> -->
                </div>
                <div class="flex items-end space-x-2 divide-x divide-gray-200">
                  <h3 class="text-default text-sm">Just4You</h3>
                  <span class="font-light text-xs text-default pl-2">Boleto Vencido</span>
                </div>
              </div>

              <button class="transition hover:bg-gray-200 rounded-md p-1" v-copy="'Ok'">
                <img src="@/assets/icons/copy.svg" alt="">
              </button>

            </div>
          </template>

          <template #body>
            <p class="text-default font-light text-xs mensagem__description">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim, dolores.
            </p>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
})
</script>

<style scoped lang="scss">
.mensagem {
  &__description {
    // max-width: ;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>