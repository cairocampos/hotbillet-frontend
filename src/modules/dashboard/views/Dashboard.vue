<template>
  <div>
    <HeadPage>
      <h1 class="text-2xl text-gray-600">
        Dashboard
      </h1>
    </HeadPage>

    <p>
      {{ store.$state }}
    </p>
  </div>
</template>

<script lang='ts' setup>
import HeadPage from '@/components/HeadPage.vue'
import { useAuthStore } from '@/core/store/modules/auth';
const store = useAuthStore();
</script>

<style lang='scss' scoped>
</style>