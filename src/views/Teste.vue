<template>
  <Container>
    <Datatable
      :headers="headers"
      :items="items"
      :searchable="true"
    />
  </Container>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import Container from '@/components/UI/Layout/Container.vue';
import { IHeader } from '@/interfaces/IDatatable';
import Datatable from '@/components/UI/Datatable/Datatable.vue';
export default defineComponent({
  components: { Container, Datatable },
    setup() {
      const headers: IHeader[] = [
        {
          text: "Nome",
          value: "name",
          format: (value: string) => value.toUpperCase()
        },
        {
          text: "Idade",
          value: "age"
        },
        {
          text: "Perfil",
          value: "profile.name"
        }
      ];

      const items = [
        {id: 1, name: "Cairo", age: 23, profile: {id: 1, name: "Admin"}},
        {id: 2, name: "Leticia", age: 22, profile: {id: 1, name: "Admin"}},
        {id: 2, name: "Juan", age: 26, profile: {id: 1, name: "Admin"}},
      ];

      return {
        headers,
        items
      }
    },
})
</script>

<style lang='scss' scoped>
</style>