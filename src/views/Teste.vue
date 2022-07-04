<template>
  <Container>
    <Autocomplete
      v-model="company_id"
      :options="companies"
      label-name="name"
      key-name="id"
      :loading="loading"
      variant="secondary"
      @scrollend="onScrollEnd"
    />
  </Container>
</template>

<script setup lang="ts">
import Container from '@/components/UI/Layout/Container.vue';
import Autocomplete from '@/components/UI/Autocomplete/Autocomplete.vue';
import { onMounted, ref } from 'vue';
import { api } from '@/services/api';
import { IPagination } from '@/interfaces/IPagination';
import usePagination from '@/composables/usePagination';

interface Company {
  id:number;
  name:string;
}

const company_id = ref();
const companies = ref<Company[]>([])
const {pagination, nextPage} = usePagination();
const loading = ref(false);
const fetchCompanies = async () => {
  loading.value = true;
  const {data: {data, ...paginationsProps}} = await api.get<IPagination<Company[]>>('/companies', {
    params: {
      page: pagination.value.current_page
    }
  })
  loading.value = false;
  companies.value.push(...data)
  pagination.value = paginationsProps
}

const onScrollEnd = () => {
  if(loading.value) return;
  nextPage(() => {
    fetchCompanies();
  });
}

onMounted(() => fetchCompanies());

</script>