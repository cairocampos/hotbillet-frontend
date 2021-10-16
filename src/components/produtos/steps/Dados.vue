<template>
  <form class="lg:grid lg:grid-cols-2 lg:gap-32 form-sm">

    <div class="space-y-12">
        <div class="form-group">
            <label for="" class="label">Nome do Produto</label>
            <input type="text" class="form-control form-control-line" />
        </div>
        <div class="form-group">
            <label for="" class="label">Subtitulo</label>
            <input type="text" class="form-control form-control-line" />
        </div>
        <div class="form-group">
            <label for="" class="label">Empresa</label>
            <input type="text" class="form-control form-control-line" />
        </div>
        <div class="form-group">
            <label for="" class="label">Link do Produto</label>
            <input type="text" class="form-control form-control-line" placeholder="Cole aqui a URL da página do produto" />
        </div>
        <div class="form-group">
            <label for="" class="label">Tipo de Produto</label>
            <select class="form-control form-control-line">
                <option value="">Digital</option>
            </select>
        </div>
    </div>

    <div class="mt-10 md:mt-0 space-y-12">
        <div class="form-group">
            <label class="label">Contato do Suporte</label>
            <div class="input-group input-group-line">
                <div class="input-prepend mr-2">
                    <span class="text-default">
                        Telefone:
                    </span>
                </div>
                <input type="text" v-maska="'(##) #####-####'" placeholder="(xx) xxxxx-xxxx" class="bg-transparent outline-none">
            </div>
        </div>
        <div class="form-group">
            <label class="label"></label>
            <div class="input-group input-group-line">
                <div class="input-prepend mr-2">
                    <span class="text-default">
                        Email:
                    </span>
                </div>
                <input type="text" placeholder="suporte@suporte.com" class="bg-transparent outline-none">
            </div>
        </div>
        <div class="form-group">
            <label for="" class="label">Descrição do Produto</label>
            <textarea class="form-control form-control-line border rounded-sm" placeholder="Descreva o produto aqui" rows="10"></textarea>
        </div>
    </div>
      
  </form>
</template>

<script lang="ts" setup>

</script>

<style>

</style>