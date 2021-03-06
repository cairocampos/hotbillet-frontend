<template>
  <div>
    <HeadPage
      class="mb-10"
      title="Empresas"
    />

    <Tabs v-model="activeTab">
      <Tab title="Ativas" />
      <Tab title="Inativas" />

      <template #actions>
        <ButtonActions @filter="showFilters = true" />
      </template>
    </Tabs>

    <PageLoading v-if="loading.primary" />
    <div
      v-else
      class="space-y-4"
    >
      <div class="flex justify-end mt-4 mb-8">
        <Button
          variant="dark"
          redirect="/empresas/adicionar"
          radius="full"
        >
          Cadastrar Empresa
        </Button>
      </div>
      <Datatable
        :headers="headers"
        :items="companies"
      >
        <template #actions="{ item }">
          <router-link
            :to="{ name: 'CompanyDetails', params: { id: item.id } }"
            class="flex items-center text-xs border-l-2 border-gray-300"
          >
            <span class="mx-2 pl-4 font-medium">Ver</span>
            <Icon
              icon="arrow-right"
              class="text-lg"
            />
          </router-link>
        </template>
      </Datatable>
    </div>

    <SidebarFilters v-model="showFilters" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import Datatable from "@/components/UI/Datatable/Datatable.vue";
import useLoading from "@/composables/useLoading";
import useNotifications from "@/composables/useNotifications.ts";
import { api } from "../../../services";
import { IHeader } from "@/interfaces/IDatatable";
import Tabs from "@/components/UI/Tabs/Tabs.vue";
import Tab from "@/components/UI/Tabs/Tab.vue"; 
import ButtonActions from "../components/ButtonActions.vue";
import SidebarFilters from "../components/SidebarFilters.vue";
import { ICompanySimple } from "../interfaces/ICompany";
import PageLoading from "@/components/global/PageLoading.vue";
import Button from "@/components/UI/Button/Button.vue";
import HeadPage from "@/components/HeadPage.vue";
export default defineComponent({
  components: {
    Datatable,
    Tabs,
    Tab,
    ButtonActions,
    SidebarFilters,
    PageLoading,
    Button,
    HeadPage
},
  setup() {
    const { loading } = useLoading();
    const { notifications } = useNotifications();
    const tabs = { ACTIVE: 0, INACTIVE: 1 };
    const activeTab = ref(tabs.ACTIVE);
    const companies = ref<ICompanySimple[]>([]);
    const showFilters = ref(false);

    const headers = computed<IHeader[]>(() => [
      {
        text: "Empresa",
        value: "name",
      },
      {
        text: "Nº de Produtos",
        value: "products_total",
      },
      {
        text: "Conversão Mensal",
        value: "sales_month",
      },
      {
        text: "Ações",
        value: "actions",
        align: "right",
        show: false,
      },
    ]);

    const fetchCompanies = async () => {
      try {
        loading.value.primary = true;
        const { data } = await api.get<{ companies: ICompanySimple[] }>(
          `/companies/list`,
          {
            params: {
              status: activeTab.value == 0 ? "ATIVO" : "INATIVO"
            }
          }
        );
        companies.value = data.companies;
      } catch (error) {
        notifications.error(error);
      } finally {
        loading.value.primary = false;
      }
    };

    watch(activeTab, () => fetchCompanies());

    onMounted(() => fetchCompanies());

    return {
      headers,
      companies,
      activeTab,
      showFilters,
      loading,
    };
  },
});
</script>

<style lang="scss" scoped></style>
