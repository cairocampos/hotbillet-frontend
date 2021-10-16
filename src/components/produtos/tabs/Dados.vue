<template>
  <div class="space-y-10">

    <div class="grid grid-cols-3">

      <div>
          <p class="text-sm">Subtitulo</p>
          <span class="text-default text-xs">Shampoo milagroso</span>
      </div>

      <div>
          <p class="text-sm">Empresa</p>
          <span class="text-default text-xs">Hotbillet</span>
      </div>

      <div class="space-y-1">
          <p class="text-sm">Suporte do Fornecedor</p>
          <span class="text-default text-xs block">Email: suporte@hotbillet.com.br</span>
          <span class="text-default text-xs block">Telefone: 11 99568-5999</span>
      </div>

    </div>

    <div class="grid grid-cols-3">

      <div>
          <p class="text-sm">Link do Produto</p>
          <a href="#" target="_blank" class="text-blue-500 text-xs">www.just4you.com/shampoo</a>
      </div>

      <div>
          <p class="text-sm">Tipo</p>
          <span class="text-default text-xs">Físico</span>
      </div>

      <div>
          <p class="text-sm">Meios de Pagamento</p>
          <ul class="flex items-center space-x-2 text-default text-xs">
            <li class="flex items-center space-x-2"><img src="@/assets/icons/boleto.svg" alt=""> <span>Boleto</span></li>
            <li class="flex items-center space-x-2"><img src="@/assets/icons/boleto.svg" alt=""> <span>Cartão</span></li>
            <li class="flex items-center space-x-2"><img src="@/assets/icons/pix.svg" alt=""> <span>Pix</span></li>
          </ul>
      </div>

    </div>

    <div>
        <p class="text-sm">Descrição</p>
        <p class="text-xs text-default">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In magni et molestiae quaerat sequi nihil accusamus, deserunt qui laudantium illum odit aspernatur a quis temporibus sapiente veritatis illo, quae laboriosam!
        </p>
    </div>
    
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  setup() {
    //
  }
})
</script>

<style>

</style>