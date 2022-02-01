<template>
  <section class="links grid grid-cols-2 gap-6 divide-x-2 divide-solid justify-between">
    <div>
        <button class="text-blue-600 flex items-center space-x-2 mb-10" @click="exibirFormLinksModal('CHECKOUT')">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg> 
            <span>Checkout</span>
        </button>

        <transition-group name="slide" tag="div" class="space-y-4">
            <Card  v-for="(link, index) in linksCheckout" :key="index">
                <template #header>
                    <h3 class="text-sm font-medium">{{link.description}}</h3>
                    <button class="text-red-500 text-xs font-medium" @click="removerLink(link)">Remover</button>
                </template>
                <template #body>
                    <a href="#" class="text-link">{{link.URL}}</a>
                </template>
            </Card>
        </transition-group>
        <p class="text-default text-sm" v-show="!links || !links.length">Nenhum link adicionado.</p>
    </div>

    <div class="lg:pl-6">
        <button class="text-blue-600 flex items-center space-x-2 mb-10" @click="exibirFormLinksModal('DESCONTO')">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg> 
            <span>Descontos</span>
        </button>

        <transition-group name="slide" tag="div" class="space-y-4">
            <Card v-for="(link, index) in linksDesconto" :key="index">
                <template #header>
                    <h3 class="text-sm font-medium">{{link.description}}</h3>
                    <button class="text-red-500 text-xs font-medium" @click="removerLink(link)">Remover</button>
                </template>
                <template #body>
                    <a href="#" class="text-link">{{link.URL}}</a>
                </template>
            </Card>
        </transition-group>
    </div>

    <Modal v-model:open="modalAdd" screen="w-1/4" title="Adicionar Link">
        <template #body>
            <form @submit.prevent="adicionaLink" class="form-sm space-y-12">
                <div class="form-group">
                    <label class="label">Descrição</label>
                    <input type="text" class="form-control form-control-line" v-model="linkForm.description" />
                </div>
                <div class="form-group">
                    <label class="label">Link</label>
                    <input type="text" class="form-control form-control-line" v-model="linkForm.URL" />
                </div>
                <div class="text-center">
                    <button class="btn btn-sm btn-dark rounded-full">Adicionar</button>
                </div>
            </form>
        </template>
    </Modal>
    
  </section>
</template>

<script lang="ts">
import {ref} from 'vue';
import { computed, defineComponent, PropType, toRefs } from "@vue/runtime-core";
import { IProduct, IProductLink } from '@/interfaces/IProduct';
import { api } from '@/services';
import useNotifications from '@/composables/useNotifications';

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
        const { product } = toRefs(props)
        const { notifications } = useNotifications();
        const modalAdd = ref(false);
        const links = ref<IProductLink[]>([]);
        const linksCheckout = computed(() => {
            return links.value.filter(link => link.link_type == 'CHECKOUT');
        });

        const linksDesconto = computed(() => {
            return links.value.filter(link => link.link_type == 'DESCONTO');
        });

        const linkForm = ref<IProductLink>({description:"", URL:"", link_type:"CHECKOUT"})

        const adicionaLink = () => {
            modalAdd.value = false;
            links.value.push(linkForm.value);
            linkForm.value = {description:"", URL:"", link_type:"CHECKOUT"};
        }

        const exibirFormLinksModal = (tipo:string) => {
            linkForm.value.link_type = tipo;
            modalAdd.value = true;
        }

        const removerLink = (item:IProductLink) => {
            const index = links.value.findIndex(link => link.description == item.description)
            links.value.splice(index, 1);
        }

        const submitForm = async () => {
            try {
                await api.put(`/products/${product.value.id}/links`, {links:links.value})
                emit('change-step');
            } catch (error) {
                notifications.error(error)
            } finally {
                emit('update:loading', false);
            }
        }

        return {
            modalAdd,
            submitForm,
            links,
            linkForm,
            adicionaLink,
            linksCheckout,
            linksDesconto,
            exibirFormLinksModal,
            removerLink
        }
    }
});

</script>

<style scoped lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition: all .3s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

</style>