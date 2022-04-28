<template>
  <Container>
    <HeadPage class="mb-10">
      <RouteBack :route="{name:'Companies'}">
        <h1 class="text-xl text-dark">
          {{ company?.company_name ?? 'Carregando...' }}
        </h1>
      </RouteBack>
    </HeadPage>
    
    <Tabs v-model="activeTab">
      <Tab>
        <template #title>
          <div class="flex items-center space-x-4">
            <Loading
              v-if="loading"
              class="h-4 w-4"
            />
            <span>Dados</span>
          </div>
        </template>
        <CompanyDataTab
          v-if="company?.id"
          :company="company"
        />
      </Tab>
      <Tab
        title="Produtos"
        :lazy="true"
      >
        <CompanyProductsTab :id="id" />
      </Tab>

      <template #actions>
        <Button
          variant="reset"
          size="sm"
        >
          <template #left>
            <img src="@/assets/icons/report.svg" />
          </template>
          <span class="text-default">Relatório de Conversão</span>
        </button>
      </template>
    </Tabs>
  </Container>
</template>

<script lang='ts'>
import Container from '@/components/UI/Layout/Container.vue';
import useNotifications from '@/composables/useNotifications';
import { api } from '@/services';
import { defineComponent, onMounted, ref } from 'vue';
import { ICompany } from '../interfaces/ICompany';
import RouteBack from '@/components/RouteBack.vue';
import Tabs from '@/components/UI/Tabs/Tabs.vue';
import Tab from '@/components/UI/Tabs/Tab.vue';
import Button from '@/components/UI/Button/Button.vue';
import CompanyDataTab from '../components/CompanyDataTab.vue';
import CompanyProductsTab from '../components/CompanyProductsTab.vue';
import Loading from '@/components/global/Loading.vue';
export default defineComponent({
  components: { Container, RouteBack, Tabs, Tab, Button, CompanyDataTab, CompanyProductsTab, Loading },
  props: {
    id: {
      type: [String,Number],
      required:true
    }
  },
  setup(props) {
    const {notifications} = useNotifications()
    const loading = ref(false);
    const company = ref<ICompany>();
    const activeTab = ref(0)
    const fetchCompany = async () => {
      try {
        loading.value = true;
        const {data} = await api.get<ICompany>(`/companies/${props.id}`)
        company.value = data;
      } catch (error) {
        notifications.error(error);
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      fetchCompany()
    })

    return {
      loading,
      company,
      activeTab
    }
  }
})
</script>

<style lang='scss' scoped>
</style>