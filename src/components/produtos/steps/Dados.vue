<template>
  <form class="lg:grid lg:grid-cols-2 lg:gap-32 form-sm">

    <div class="space-y-12">
        <div class="form-group">
            <label for="" class="label">Nome do Produto</label>
            <input type="text" class="form-control form-control-line" v-model="form.name" />
        </div>
        <div class="form-group">
            <label for="" class="label">Subtitulo</label>
            <input type="text" class="form-control form-control-line" v-model="form.abbreviation" />
        </div>
        <div class="form-group">
            <label for="" class="label">Empresa</label>
            <input type="text" class="form-control form-control-line" v-model="form.company_id" />
        </div>
        <div class="form-group">
            <label for="" class="label">Link do Produto</label>
            <input type="text" class="form-control form-control-line" v-model="form.url" placeholder="Cole aqui a URL da página do produto" />
        </div>
        <div class="form-group">
            <label for="" class="label">Tipo de Produto</label>
            <select class="form-control form-control-line" v-model="form.product_type">
                <option v-for="product_type in PRODUCT_TYPE" :value="product_type" :key="product_type">
                {{product_type}}
                </option>
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
                <input type="text" v-maska="'(##) #####-####'" placeholder="(xx) xxxxx-xxxx" class="bg-transparent outline-none" v-model="form.support_tel">
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
                <input type="text" placeholder="suporte@suporte.com" class="bg-transparent outline-none" v-model="form.support_email">
            </div>
        </div>
        <div class="form-group">
            <label for="" class="label">Descrição do Produto</label>
            <textarea v-model="form.description" class="form-control form-control-line border rounded-sm" placeholder="Descreva o produto aqui" rows="10"></textarea>
        </div>
    </div>
      
  </form>
</template>

<script lang="ts">
import useConstants from "@/composables/useConstants";
import useNotifications from "@/composables/useNotifications";
import { IProduct, IProductData } from "@/interfaces/IProduct";
import { api } from "@/services";
import { defineComponent, onMounted, PropType, ref, toRefs } from "@vue/runtime-core";

export default defineComponent({
    props: {
        product: {
            type: Object as PropType<IProduct>,
            required:true
        },
        loading: {
            type: Boolean
        }
    },
    emits: ['change-step', 'update:loading'],
    setup(props, {emit}) {
        const { notifications } = useNotifications();
        const { product } = toRefs(props)
        const { PRODUCT_TYPE } = useConstants();
        const form = ref<IProductData>({
            name: '',
            abbreviation: '',
            company_id: 0,
            description:'',
            status:'ATIVO',
            product_type: 'FISICO',
            support_email: '',
            support_tel: '',
            url: ''
        });
        const submitForm = async () => {
            try {
                await api.put(`/products/${product.value.id}`, form.value)
                emit('change-step');
            } catch (error) {
                notifications.error(error)
            } finally {
                emit('update:loading', false);
            }
        }

        onMounted(() => {
            form.value = product.value
        })

        return {
            form,
            submitForm,
            PRODUCT_TYPE
        }
    }
});
</script>

<style>

</style>