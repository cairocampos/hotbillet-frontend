<template>
  <Container>
    {{ model }}
    <CheckTab
      v-model="model"
      label="Teste"
      true-value="teste"
      value="teste"
    />

    <CheckTab
      v-model="model"
      label="Teste2"
      value="ok"
      true-value="ok"
    />
  </Container>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import Container from '@/components/UI/Container.vue';
import CheckTab from '@/components/UI/Form/Elements/InputRadio/CheckTab.vue';
export default defineComponent({
  components: { Container, CheckTab },
  setup() {
    const model = ref('')

    return {
      model
    }
  }
})
</script>

<style lang='scss' scoped>
</style>