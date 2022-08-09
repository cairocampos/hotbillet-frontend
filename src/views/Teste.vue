<!-- <template>
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

      return {
        headers,
        items
      }
    },
})
</script>

<style lang='scss' scoped>
</style> -->