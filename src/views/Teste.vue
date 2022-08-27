<template>
  <Listbox
    v-model="selectedPeople"
    multiple
  >
    <ListboxButton>
      {{ selectedPeople.map((person) => person.name).join(', ') }}
    </ListboxButton>
    <ListboxOptions>
      <ListboxOption
        v-for="person in people"
        :key="person"
        :value="person"
      >
        {{ person.name }}
      </ListboxOption>
    </ListboxOptions>
  </Listbox>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
  } from '@headlessui/vue'

  const people = [
    { id: 1, name: 'Durward Reynolds' },
    { id: 2, name: 'Kenton Towne' },
    { id: 3, name: 'Therese Wunsch' },
    { id: 4, name: 'Benedict Kessler' },
    { id: 5, name: 'Katelyn Rohan' },
  ]
  const selectedPeople = ref([{id: 1,name: "Kenton Towne"}])
</script>