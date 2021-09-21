<template>
  <div class="p-4 grid grid-cols-3 gap-6 rounded-md divide-x bg-white mt-4 divide-gray-300">

    <div class="space-y-4 p-4">
    <div class="form-group">
        <span class="text-sm text-default">Filtrar Plataforma de Venda</span>
        <select class="form-control bg-transparent border-b-2 border-gray-200">
        <option value="">Monetizze</option>
        </select>
    </div>
    <div class="form-group">
        <span class="text-sm text-default">Filtrar Faixa de Preço</span>
        <div class="flex items-center space-x-2">
        <div class="form-group">
            <label class="label">De</label>
            <input type="text" class="form-control bg-white border border-gray-400 rounded-md">
        </div>
        <div class="form-group">
            <label class="label">Até</label>
            <input type="text" class="form-control bg-white border border-gray-400 rounded-md">
        </div>
        </div>
    </div>
    </div>

    <div class="space-y-4 p-4">
        <div class="form-group">
            <span class="text-sm text-default">Meios de Pagamento</span>
            <div class="form-check">
                <input type="checkbox" id="boleto">
                <label for="boleto" class="label">Boleto</label>
            </div>
            <div class="form-check">
                <input type="checkbox" id="boleto">
                <label for="boleto" class="label">Pix</label>
            </div>
            <div class="form-check">
                <input type="checkbox" id="boleto">
                <label for="boleto" class="label">Cartão</label>
            </div>
            <div class="form-check">
                <input type="checkbox" id="boleto">
                <label for="boleto" class="label">Transferência</label>
            </div>
        </div>
    </div>

    <div class="space-y-4 p-4">
        <div class="form-group">
            <span class="text-sm text-default">Teste</span>
            <SelectInput />
            
        </div>
    </div>

</div>
</template>


<script lang="ts" setup>
</script>

<style>
input:checked:after{
background-color:green;
}
</style>
