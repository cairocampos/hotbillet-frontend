<template>
  <Container class="flex items-center justify-center h-full">
    <Button
      :bordered="true"
      variant="success"
    >
      Login
    </Button>
  </Container>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import Container from '@/components/UI/Container.vue';
import Button from '@/components/UI/Button.vue';
export default defineComponent({
  components: { Container, Button },
    setup() {
        //
    },
})
</script>

<style lang='scss' scoped>
</style>