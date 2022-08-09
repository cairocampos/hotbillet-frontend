<template>
  <div class="dados">
    <div>
      <h4 class="mb-4 text-md text-default font-semibold">
        Dados da Compra
      </h4>
      <ul class="text-sm text-default font-light">
        <li>
          <span>Motivo:</span> Abandono de Carrinho
        </li>
        <li>
          <span>Plataforma:</span> Monetizze
        </li>
        <li>
          <span>Código da Transação:</span> 123456789
        </li>
        <li>
          <span>Data:</span> 22/02/2021
        </li>
      </ul>
    </div>

    <div class="border-t-2 border-b-2 border-gray-200">
      <div class="flex items-center justify-between mb-4">
        <h4 class="text-md text-default font-semibold">
          Dados do Cliente
        </h4>
        <button class="text-blue-500 text-xs flex items-center space-x-1 font-light">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 underline"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          <span>Editar Telefone</span>
        </button>
      </div>
      <ul class="text-sm text-default font-light">
        <li>
          <span>Nome:</span> Cláudia Moreno da Silva
        </li>
        <li>
          <span>Telefone:</span> +55 11 98454-5100
        </li>
        <li>
          <span>Email:</span> claudiamoreno@gmail.com
        </li>
        <li>
          <span>CPF:</span> 003.454.568-45
        </li>
      </ul>
    </div>

    <div>
      <h4 class="mb-4 text-md text-default font-semibold">
        Endereço do Cliente
      </h4>
      <ul class="text-sm text-default font-light">
        <li>
          <span>logradouro:</span> Rua Sete de Setembro
        </li>
        <li>
          <span>Número:</span> 05
        </li>
        <li>
          <span>Bairro:</span> Flores
        </li>
        <li>
          <span>Cidade/UF:</span> São Paulo - SP
        </li>
        <li>
          <span>Cep:</span> 15645-582
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
export default {

}
</script>

<style scoped lang="scss">
.dados {
  & > div {
    padding: 1.5rem 1rem;
    font-size: 14px;
    font-weight: light;
    li span {
      color: #444;
    }
  }
}
</style>