<template>
  <Container>
    <HeadPage>
      <Heading size="2xl">
        Notificações
      </Heading>
    </HeadPage>

    <Card>
      <CardHeader>
        <Text>
          Todas Notificações
        </Text>
        <Button
          size="sm"
          variant="success"
        >
          <Icon icon="check" />
          Ler todas
        </Button>
      </CardHeader>
      <CardContent>
        <NotificationItem
          v-for="item in 15"
          :key="item"
        />
      </CardContent>
    </Card>
  </Container>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import Container from '@/components/UI/Container.vue'
import Heading from "@/components/UI/Heading.vue";
import Card from "@/components/UI/Card/Card.vue";
import CardHeader from "@/components/UI/Card/CardHeader.vue";
import CardContent from "@/components/UI/Card/CardContent.vue";
import Text from "@/components/UI/Text.vue";
import Button from "@/components/UI/Button/Button.vue";
import NotificationItem from './NotificationItem.vue'

export default defineComponent({
    components: {Container, Heading, Card, CardHeader,CardContent, Text, Button, NotificationItem},
    setup() {
        //
    }
})
</script>

<style>

</style>