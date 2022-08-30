<template>
  <div class="mb-10">
    <div class="flex flex-wrap -mx-3 items-end">
      <!-- <div class="form-group md:w-1/4 px-3">
        <label class="label">Tag</label>
        <input
          type="text"
          class="form-control input-white input-sm"
        />
      </div> -->
      <div class="form-group md:w-1/4 px-3">
        <label class="label">Filtrar Produto</label>
        <div class="input-group border border-gray-200 px-2 input-sm bg-white">
          <div class="input-prepend mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            class="outline-none bg-transparent w-full"
          >
        </div>
      </div>

      <div class="form-group md:w-1/4 px-3">
        <label class="label">Filtrar Transação</label>
        <select
          id=""
          name=""
          class="form-control input-white input-sm"
        >
          <option value="">
            Teste
          </option>
        </select>
      </div>
      <!-- <div class="form-group md:w-1/4 px-3">
        <label class="label">Filtrar Status</label>
        <input
          type="text"
          class="form-control input-white input-sm"
        />
      </div> -->
      <div>
        <Button
          variant="dark"
        >
          Buscar
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/UI/Button/Button.vue';

const form = {
  search: "",
  event_id: Number()
}

</script>

<style scoped>

</style>