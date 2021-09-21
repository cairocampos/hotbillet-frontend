<template>
  <div class="relative">
      <ul class="w-full border-b text-sm">
        <li>Titulo</li>
      </ul>

      <div class="absolute bg-red-500 w-full top-6 select__dropdown">
          <ul class="text-sm text-default">
              <li class="hover:bg-red-200 p-2" v-for="item in 50" :key="item">Titulo</li>
          </ul>
      </div>
  </div>
</template>


<script lang="ts" setup>


</script>

<style lang="scss" scoped>
.select {
    &__dropdown {
        max-height: 150px;
        overflow-y: scroll;
    }
}
</style>