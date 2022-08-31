<template>
  <div class="m-12">
    {{ company_id }}
    <div class="grid grid-cols-2 gap-8 items-center">
      <AppSelect
        v-model="company_id"
        label="Empresa"
        :options="options"
        key-name="name"
        key-value="name"
        :server="true"
        :loading="loading"
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
import Select2 from '@/components/UI/Select2/Select2.vue';
import TextField from '@/components/UI/Form/Input/TextField.vue';
import { debounce } from '@/core/helpers';
import axios from 'axios';

const company_id = ref(4)
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