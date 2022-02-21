<template>
  <div>
    <HeadPage>
      <h1 class="text-2xl text-gray-600">
        Agenda
      </h1>
    </HeadPage>

    <NavTabHeader>
      <template #acessorios>
      </template>
    </NavTabHeader>

    <div class="mt-6 space-y-6 lg:space-y-0 lg:grid lg:grid-cols-3 gap-6 mb-16">
      <Card class="card-agenda">
        <template
          #header
        >
          <div class="text-default">
            <h3>Hoje, 12/03/2021</h3>
          </div>
          <div class="flex flex-col text-default items-end">
            <span class="font-semibold text-blue-500">07</span>
            <small class="text-xs">Agendamentos</small>
          </div>
        </template>

        <template
          #body
        >
          <div class="space-y-2 card-agenda__body">
            <div
              v-for="item in 5"
              :key="item"
              class="border rounded-sm p-4"
            >
              <div class="flex justify-between items-center mb-4">
                <h3 class="font-semilbold text-base">
                  Ana Clara Almeida Costa
                </h3>
                <span class="text-xs text-default">12:25</span>
              </div>
              <div class="flex items-center justify-between">
                <div class="text-default flex items-center justify-between space-x-2">
                  <img
                    src="@/assets/icons/carrinho-abandonado.svg"
                  />
                  <span class="text-xs">Abandono</span>
                </div>
                <div class="text-default flex items-center justify-between space-x-2">
                  <div class="h-6 w-6">
                    <img
                      class="object-contain"
                      src="@/assets/fake/produto.png"
                    />
                  </div>
                  <span class="text-xs">Amora Caps</span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </Card>

      <Card class="lg:col-span-2 overflow-y-auto card-agenda">
        <template #header>
          <div class="flex items-center space-x-6 text-default">
            <h3 class="font-semibold">
              Próximos Dias
            </h3>
            <span class="text-xs">Exibindo 05 dias futuros</span>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import NavTabHeader from "@/components/NavTabHeader.vue";

export default defineComponent({
  components: {
    NavTabHeader
}
})
</script>

<style scoped lang="scss">
.card-agenda {
  &__body {
    height: 580px;
  }
}
</style>