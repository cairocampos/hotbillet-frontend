<template>
  <Sidebar
    :show="modelValue"
    @close="$emit('update:modelValue', false)"
  >
    <template #body>
      <Form>
        <Text>Filtros</Text>
        <Grid cols="2">
          <InputMoney
            v-model="form.price"
            mask="##"
            label="De"
          />
          <InputMoney
            v-model="form.price"
            mask="##"
            label="Até"
          />
        </Grid>
        <Button
          variant="light"
          block
        >
          Limpar
        </Button>
      </Form>
    </template>
  </Sidebar>
</template>

<script lang='ts'>
import Sidebar from '@/components/UI/Sidebar/Sidebar.vue';
import { defineComponent, reactive } from 'vue';
import InputMoney from '@/components/UI/Form/Input/InputMoney.vue';
import Grid from '@/components/UI/Form/Grid.vue';
import Form from '@/components/UI/Form/Form.vue';
import Button from '@/components/UI/Button/Button.vue';
import Text from '@/components/UI/Layout/Text.vue';
export default defineComponent({
  components: { Sidebar, InputMoney, Grid, Form, Button, Text },
  props: {
    modelValue: {
      type: Boolean,
      required:true
    }
  },
  emits: ['update:modelValue'],
  setup() {
    const initialState = {
      price: ""
    }
    const form = reactive({...initialState})


    return {
      form
    }
  }
})
</script>

<style lang='scss' scoped>
</style>