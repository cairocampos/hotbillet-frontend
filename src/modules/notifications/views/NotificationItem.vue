<template>
  <div class="p-2 hover:bg-gray-100 cursor-pointer transition-all flex justify-between items-center">
    <div class="flex space-x-2 items-center">
      <Avatar
        variant="info"
        size="md"
      />
      <div>
        <Heading
          size="sm"
          :bold="true"
        >
          Cairo Campos
        </Heading>
        <Text
          size="xs"
          class="text-default"
        >
          Nova compra
        </Text>
      </div>
    </div>
    <div class="space-x-2">
      <Dropdown>
        <template #title>
          <Icon icon="ellipsis" />
        </template>
        <DropdownItem
          class="flex space-x-2 items-center"
          @click="onClick"
        >
          <Icon icon="check" />
          <span>Marcar como lida</span>
        </DropdownItem>
      </Dropdown>
      <span
        v-tooltip="'Não lida'"
        class="h-4 w-4 rounded-full bg-info inline-block"
      ></span>
    </div>
  </div>
</template>

<script lang="ts">
import Avatar from '@/components/UI/Avatar/Avatar.vue'
import Heading from '@/components/UI/Heading.vue'
import Text from '@/components/UI/Text.vue'
import Dropdown from '@/components/UI/Dropdown/Dropdown.vue'
import DropdownItem from '@/components/UI/Dropdown/DropdownItem.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { Avatar, Heading, Text,Dropdown,DropdownItem },
    setup () {    
      const onClick = () => {
        alert('clicou')
      }   
      return {
        onClick
      }
    }
})
</script>

<style scoped>

</style>