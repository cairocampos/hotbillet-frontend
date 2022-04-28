<template>
  <Container>
    <HeadPage class="mb-10">
      <RouteBack :route="{name:'Companies'}">
        <h1 class="text-xl text-dark">
          Teste
        </h1>
      </RouteBack>
    </HeadPage>
    
    <Tabs v-model="activeTab">
      <Tab title="Dados">
        <CompanyDataTab />
      </Tab>
      <Tab title="Produtos">
        <CompanyProductsTab />
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
export default defineComponent({
  components: { Container, RouteBack, Tabs, Tab, Button, CompanyDataTab, CompanyProductsTab },
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
        await api.get(`/companies/${props.id}`)
      } catch (error) {
        notifications.error(error);
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      // fetchCompany()
    })

    return {
      company,
      activeTab
    }
  }
})
</script>

<style lang='scss' scoped>
</style>