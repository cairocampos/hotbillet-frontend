<template>
  <section class="links grid grid-cols-2 gap-6 divide-x-2 divide-solid justify-between">
    <div>
      <button
        class="text-blue-600 flex items-center space-x-2 mb-10"
        @click="exibirFormLinksModal(LINKS.CHECKOUT)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg> 
        <span>Checkout</span>
      </button>

      <transition-group
        name="slide"
        tag="div"
        class="space-y-4"
      >
        <Card
          v-for="(link, index) in linksCheckout"
          :key="index"
        >
          <template #header>
            <h3 class="text-sm font-medium">
              {{ link.description }}
            </h3>
            <button
              class="text-red-500 text-xs font-medium"
              @click="removerLink(link)"
            >
              Remover
            </button>
          </template>
          <template #body>
            <a
              href="#"
              class="text-link"
            >{{ link.url }}</a>
          </template>
        </Card>
      </transition-group>
      <p
        v-show="!links || !links.length"
        class="text-default text-sm"
      >
        Nenhum link adicionado.
      </p>
    </div>

    <div class="lg:pl-6">
      <button
        class="text-blue-600 flex items-center space-x-2 mb-10"
        @click="exibirFormLinksModal(LINKS.DISCOUNT)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg> 
        <span>Descontos</span>
      </button>

      <transition-group
        name="slide"
        tag="div"
        class="space-y-4"
      >
        <Card
          v-for="(link, index) in linksDesconto"
          :key="index"
        >
          <template #header>
            <h3 class="text-sm font-medium">
              {{ link.description }}
            </h3>
            <button
              class="text-red-500 text-xs font-medium"
              @click="removerLink(link)"
            >
              Remover
            </button>
          </template>
          <template #body>
            <a
              href="#"
              class="text-link"
            >{{ link.url }}</a>
          </template>
        </Card>
      </transition-group>
    </div>

    <Modal
      v-model:open="modalAdd"
      screen="w-1/4"
      title="Adicionar Link"
    >
      <template #body>
        <form
          class="form-sm space-y-12"
          @submit.prevent="adicionaLink"
        >
          <div class="form-group">
            <label class="label">Descrição</label>
            <input
              v-model="linkForm.description"
              type="text"
              class="form-control form-control-line"
            />
          </div>
          <div class="form-group">
            <label class="label">Link</label>
            <input
              v-model="linkForm.url"
              type="text"
              class="form-control form-control-line"
            />
          </div>
          <div class="text-center">
            <button class="btn btn-sm btn-dark rounded-full">
              Adicionar
            </button>
          </div>
        </form>
      </template>
    </Modal>
  </section>
</template>

<script lang="ts">
import {ref} from 'vue';
import { computed, defineComponent, onMounted, PropType, toRefs } from "@vue/runtime-core";
import { IProduct, IProductLink } from '@/interfaces/IProduct';
import { api } from '@/services';
import useNotifications from '@/composables/useNotifications';
import useConstants from '@/composables/useConstants';

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
        const { LINKS } = useConstants();
        const { product } = toRefs(props)
        const { notifications } = useNotifications();
        const modalAdd = ref(false);
        const links = ref<IProductLink[]>([]);
        const linksCheckout = computed(() => {
            return links.value.filter(link => link.link_type == LINKS.CHECKOUT);
        });

        const linksDesconto = computed(() => {
            return links.value.filter(link => link.link_type == LINKS.DISCOUNT);
        });

        const linkForm = ref<IProductLink>({description:"", url:"", link_type: LINKS.CHECKOUT})

        const adicionaLink = () => {
            modalAdd.value = false;
            links.value.push(linkForm.value);
            linkForm.value = {description:"", url:"", link_type: LINKS.CHECKOUT};
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
                const {data} = await api.put<IProduct>(`/products/${product.value.id}/links`, {links:links.value})
                emit('change-step');
                notifications.success('Alterações efetuadas.');
                links.value = data.links ?? []
            } catch (error) {
                notifications.error(error)
            } finally {
                emit('update:loading', false);
            }
        }

        onMounted(() => {
            if(product.value?.links) {
                links.value = product.value.links
            }
        })

        return {
            modalAdd,
            submitForm,
            links,
            linkForm,
            adicionaLink,
            linksCheckout,
            linksDesconto,
            exibirFormLinksModal,
            removerLink,
            LINKS
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