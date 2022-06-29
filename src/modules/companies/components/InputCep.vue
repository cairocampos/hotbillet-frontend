<template>
  <TextField
    v-model="cep"
    variant="secondary"
    label="CEP"
    mask="#####-###"
    @input="$emit('update:modelValue', $event)"
  >
    <template #right>
      <Loading
        v-if="loading"
        class="h-4 w-4"
      />
    </template>
  </TextField>
</template>

<script lang="ts">
import { viaCep } from "@/services/viaCep";
import { defineComponent, onMounted, ref, toRefs, watch } from "vue";
import Loading from "@/components/global/Loading.vue";
import TextField from "@/components/UI/Form/Input/TextField.vue";
export default defineComponent({
  components: { Loading, TextField },
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ["zipcode-found", "update:modelValue"],
  setup(props, { emit }) {
    const {modelValue} = toRefs(props)
    const cep = ref("");

    const loading = ref(false);
    const getCep = async () => {
      try {
        loading.value = true;
        const { bairro, localidade, logradouro, uf } = await viaCep(
          cep.value
        );
        emit("zipcode-found", { bairro, localidade, logradouro, uf });
      } finally {
        loading.value = false;
      }
    };
    watch(cep, (val) => {
      if (val.length == 9) getCep();
    });

    watch(modelValue, val => {
      cep.value = val
    })

    onMounted(() => cep.value = modelValue.value)

    return { cep, loading };
  },
});
</script>

<style lang="scss" scoped></style>
