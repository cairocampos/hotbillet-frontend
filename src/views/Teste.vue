<template>
  <Container>
    <PhBook />
    <Can :permissions="permissions">
      <div>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa, exercitationem.
        </p>
      </div>
    </Can>

    <Datatable
      :headers="headers"
      :items="items"
      :searchable="true"
    />
  </Container>
</template>

<script lang='ts'>
import { defineComponent, DirectiveBinding, ref } from 'vue';
import Container from '@/components/UI/Layout/Container.vue';
import { IHeader } from '@/interfaces/IDatatable';
import Datatable from '@/components/UI/Datatable/Datatable.vue';
import Can from '@/components/Can.vue';

import { PhBook } from 'phosphor-vue'

function testador(el: HTMLElement, binding: string[]) {
  const p = ["list"];
  const teste = document.createComment('');
  const has = binding.every(permission => {
    return p.includes(permission)
  })
  if(!has) {
    el.parentNode?.removeChild(el);
    return
  }

  teste.parentNode?.insertBefore(el, teste)
}

export default defineComponent({
  components: { Container, Datatable, Can, PhBook },
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

      const permissions = ref(["teste"]);

      setTimeout(() => {
        permissions.value = ["list"]
      }, 5000)

      return {
        headers,
        items,
        permissions
      }
    }
})
</script>

<style lang='scss' scoped>
</style>