<template>
  <Container>
    <Dropdown>
      <DropdownItem href="teste">
        Item 01
      </DropdownItem>
      <DropdownItem href="teste2">
        Item 02
      </DropdownItem>
    </Dropdown>

    <Dropdown>
      <DropdownItem href="teste">
        Item 01
      </DropdownItem>
      <DropdownItem href="teste2">
        Item 02
      </DropdownItem>
    </Dropdown>
  </Container>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import Container from '@/components/UI/Container.vue';
import DropdownItem from '@/components/UI/Dropdown/DropdownItem.vue';
import Dropdown from '@/components/UI/Dropdown/Dropdown.vue';
export default defineComponent({
  components: { Container, DropdownItem, Dropdown },
  setup() {
    //
  }
})
</script>

<style lang='scss' scoped>
</style>