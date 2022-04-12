<template>
  <Container>
    <Avatar
      size="md"
      variant="dark"
    />
  </Container>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import Container from '@/components/UI/Container.vue';
import Avatar from '@/components/UI/Avatar/Avatar.vue';
export default defineComponent({
  components: { Container, Avatar },
  setup() {
    //
  }
})
</script>

<style lang='scss' scoped>
</style>