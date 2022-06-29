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
          <PhCheck/>
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
import Container from '@/components/UI/Layout/Container.vue'
import Heading from "@/components/UI/Layout/Heading.vue";
import Card from "@/components/UI/Card/Card.vue";
import CardHeader from "@/components/UI/Card/CardHeader.vue";
import CardContent from "@/components/UI/Card/CardContent.vue";
import Text from "@/components/UI/Layout/Text.vue";
import Button from "@/components/UI/Button/Button.vue";
import NotificationItem from './NotificationItem.vue'
import {PhCheck} from 'phosphor-vue'

export default defineComponent({
    components: {Container, Heading, Card, CardHeader,CardContent, Text, Button, NotificationItem,PhCheck},
    setup() {
        //
    }
})
</script>

<style>

</style>