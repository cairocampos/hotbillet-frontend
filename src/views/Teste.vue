<template>
  <div class="m-12">
    {{ pokemons }}
    <div class="grid grid-cols-2 gap-8 items-center">
      <AppSelect
        v-model="pokemons"
        label="Empresa"
        :options="options"
        key-name="name"
        key-value="name"
        :server="true"
        :loading="loading"
        :multiple="true"
        @load-more="fetchAPI()"
        @open="reset()"
        @search="fetchAPI($event)"
      />
      <TextField
        v-model="teste"
        label="Teste"
        variant="secondary"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppSelect from '../components/UI/AppSelect/AppSelect.vue';
import TextField from '@/components/UI/Form/Input/TextField.vue';
import axios from 'axios';

const pokemons = ref([])
const teste = ref('')
const options = ref<{name:string}[]>([]);

const paginationProps = ref({
  limit: 10,
  offset: 0,
  currentPage: 1
});
const loading = ref(false)



const fetchAPI = async (search = "") => {
  if(loading.value) return;
  try {
    loading.value = true;
    const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon`, {
    params: {
        limit: paginationProps.value.limit,
        offset: paginationProps.value.offset * paginationProps.value.limit,
        search
      }
    })
    options.value.push(...data.results)
    const page = paginationProps.value.currentPage + 1;
    paginationProps.value = {
      currentPage: page,
      offset: (page - 1) * 10,
      limit: 10
    }
  } finally {
    loading.value = false;
  }
}

const reset = () => {
  options.value = [];
  paginationProps.value = {
    limit: 10,
    offset: 0,
    currentPage: 1
  }

  fetchAPI();
}

</script>