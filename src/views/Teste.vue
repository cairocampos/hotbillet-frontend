<template>
  <Container class="flex items-center justify-center h-full">
    <Tabs
      v-model="tabActive"
      :tabs="tabs"
    />
    <TabContent>
      <component
        :is="tabActive.component"
        :key="tabActive.label"
      />
    </TabContent>
  </Container>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import Container from '@/components/UI/Container.vue';
import Tabs from '@/components/UI/Tabs/Tabs.vue';
import TabContent from '@/components/UI/Tabs/TabContent.vue';
import Messages from '@/modules/messages/views/Messages.vue';
export default defineComponent({
  components: { Container, Tabs, TabContent, Messages },
  setup() {
    const tabs = [
      {label: 'Dados', component: 'Messages'},
      {label: 'Histórico', component: 'Messages'}
    ]

    const tabActive = ref(tabs[0]);

    return {tabs, tabActive}
  }
})
</script>

<style lang='scss' scoped>
</style>