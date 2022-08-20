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
      <!-- <div class="form-group">
        <label class="label">
          Empresa
        </label>
        <AppSelect
          v-model="form.company_id"
          type="line"
          :options="[{ label: 'Hotbillet', value: 1 }]"
        />
      </div> -->
      <Autocomplete
        v-model="form.company_id"
        :config="companiesConfig"
        label="Empresa"
        :selected="companySelected"
      />
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
          v-model="form.type"
          class="form-control form-control-line"
        >
          <option
            v-for="[key, value] in Object.entries(PRODUCT_TYPE)"
            :key="key"
            :value="value"
          >
            {{ key }}
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
            v-model="form.support_phone"
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
import { api } from "@/services/api";
import { defineComponent, onMounted, PropType, ref, toRefs } from "@vue/runtime-core";
import AppSelect from "@/components/global/AppSelect.vue";
import { AutocompleteConfig } from "@/components/UI/Autocomplete/Autocomplete.vue";
import Autocomplete from "../../../../components/UI/Autocomplete/Autocomplete.vue";
import { ICompany } from "@/modules/companies/interfaces/ICompany";

export default defineComponent({
  components: { AppSelect, Autocomplete },
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
      type: 1,
      name: "",
      company_id: 1,
      description: "",
      status: 1,
      support_email: "",
      support_phone: "",
      url: "",
      type_description: "",
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


    const companySelected = ref<{id:number;text:string}>();
    const fetchCompany = async () => {
      const {data} = await api.get(`/companies/${props.product.company_id}`)
      companySelected.value = {
        id: data.id,
        text: data.name
      };
    }

    const companiesConfig: AutocompleteConfig = {
      url: "/companies",
      processResults: (data) => {
        const items = data.data.map(item => ({
          id: item.id,
          text: item.name
        }));
        return {
          results: items,
          pagination: {
            more: (data.last_page > data.current_page)
          }
        }
      }
    }

    onMounted(() => {
      form.value = product.value;
      fetchCompany();
    });
    return {
      form,
      submitForm,
      PRODUCT_TYPE,
      companiesConfig,
      companySelected
    };
  },
});
</script>

<style>
</style>