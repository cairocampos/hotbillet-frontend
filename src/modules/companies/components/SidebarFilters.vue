<template>
  <Sidebar
    :show="modelValue"
    @close="$emit('update:modelValue', false)"
  >
    <template #body>
      <Form>
        <Text>Filtros</Text>
        <FormInline>
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
        </FormInline>
        <Button
          variant="secondary"
          :blocked="true"
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
import TextField from '@/components/UI/Form/Input/TextField.vue';
import InputMoney from '@/components/UI/Form/Input/InputMoney.vue';
import FormInline from '@/components/UI/Form/FormInline.vue';
import Form from '@/components/UI/Form/Form.vue';
import Button from '@/components/UI/Button/Button.vue';
import Text from '@/components/UI/Layout/Text.vue';
export default defineComponent({
  components: { Sidebar, InputMoney, FormInline, Form, Button, Text },
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