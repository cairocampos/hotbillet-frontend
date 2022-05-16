<template>
  <Container>
    <HeadPage title="Integrações" />

    <Tabs v-model="selectedTab">
      <Tab title="Básico">
        <IntegrationBasic />
      </Tab>
      <Tab title="Avançado">
        Avançado
      </Tab>
    </Tabs>
  </Container>
</template>

<script lang="ts" setup>
import Container from '@/components/UI/Layout/Container.vue';
import HeadPage from '@/components/HeadPage.vue';
import Tabs from '@/components/UI/Tabs/Tabs.vue';
import Tab from '@/components/UI/Tabs/Tab.vue';
import IntegrationBasic from '../components/tabs/IntegrationBasic.vue';
import { ref } from 'vue';

const tabs = {BASIC: 0, ADVANCED: 1}

const selectedTab = ref(tabs.BASIC)

</script>

<style scoped>

</style>