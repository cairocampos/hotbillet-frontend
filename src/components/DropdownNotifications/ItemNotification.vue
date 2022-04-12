<template>
  <div class="px-4 py-2 border-b cursor-pointer hover:bg-gray-100">
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
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import Heading from '../UI/Heading.vue';
import Text from '../UI/Text.vue';
import Avatar from '../UI/Avatar/Avatar.vue';
export default defineComponent({
    components: { Heading, Text, Avatar },
    setup() {
        //
    }
})
</script>

<style lang='scss' scoped>
</style>