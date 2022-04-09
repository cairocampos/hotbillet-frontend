<template>
  <form class="lg:grid lg:grid-cols-2 lg:gap-32 form-sm">
    <div class="space-y-12">
      <div class="form-group">
        <label
          for=""
          class="label"
        >Nome do Produto</label>
        <input
          v-model="form.name"
          type="text"
          class="form-control form-control-line"
        />
      </div>
      <div class="form-group">
        <label
          for=""
          class="label"
        >Subtitulo</label>
        <input
          v-model="form.abbreviation"
          type="text"
          class="form-control form-control-line"
        />
      </div>
      <!-- <div class="form-group">
        <label
          for=""
          class="label"
        >Empresa</label>
        <input
          v-model="form.company_id"
          type="text"
          class="form-control form-control-line"
        />
      </div> -->
      <div class="form-group">
        <label class="label">
          Empresa
        </label>
        <AppSelect
          v-model="form.company_id"
          type="line"
          :options="[{label: 'Hotbillet', value: 1}]"
        />
      </div>
      <div class="form-group">
        <label
          for=""
          class="label"
        >Link do Produto</label>
        <input
          v-model="form.url"
          type="text"
          class="form-control form-control-line"
          placeholder="Cole aqui a URL da página do produto"
        />
      </div>
      <div class="form-group">
        <label
          for=""
          class="label"
        >Tipo de Produto</label>
        <select
          v-model="form.product_type"
          class="form-control form-control-line"
        >
          <option
            v-for="product_type in PRODUCT_TYPE"
            :key="product_type"
            :value="product_type"
          >
            {{ product_type }}
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
          <input
            v-model="form.support_tel"
            v-maska="'(##) #####-####'"
            type="text"
            placeholder="(xx) xxxxx-xxxx"
            class="bg-transparent outline-none"
          >
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
          <input
            v-model="form.support_email"
            type="text"
            placeholder="suporte@suporte.com"
            class="bg-transparent outline-none"
          >
        </div>
      </div>
      <div class="form-group">
        <label
          for=""
          class="label"
        >Descrição do Produto</label>
        <textarea
          v-model="form.description"
          class="form-control form-control-line border rounded-sm"
          placeholder="Descreva o produto aqui"
          rows="10"
        ></textarea>
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
import AppSelect from "@/components/global/AppSelect.vue";

export default defineComponent({
  components: { AppSelect },
    props: {
        product: {
            type: Object as PropType<IProduct>,
            required: true
        },
        loading: {
            type: Boolean
        }
    },
    emits: ["change-step", "update:loading"],
    setup(props, { emit }) {
        const { notifications } = useNotifications();
        const { product } = toRefs(props);
        const { PRODUCT_TYPE } = useConstants();
        const form = ref<IProductData>({
            name: "",
            abbreviation: "",
            company_id: 1,
            description: "",
            status: "ATIVO",
            product_type: "FISICO",
            support_email: "",
            support_tel: "",
            url: ""
        });
        const submitForm = async () => {
            try {
                await api.put(`/products/${product.value.id}`, form.value);
                emit("change-step");
            }
            catch (error) {
                notifications.error(error);
            }
            finally {
                emit("update:loading", false);
            }
        };
        onMounted(() => {
            form.value = product.value;
        });
        return {
            form,
            submitForm,
            PRODUCT_TYPE
        };
    },
});
</script>

<style>

</style>