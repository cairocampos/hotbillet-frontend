<template>
  <table class="w-full">
    <thead class="text-default">
      <th>Comissionados</th>
      <th>Código</th>
      <th>%</th>
      <th>Valor</th>
    </thead>
    <tbody>
      <tr
        v-for="item in 5"
        :key="item"
        class="text-xs"
      >
        <td>Sergio Ramos</td>
        <td>asdf45</td>
        <td>15%</td>
        <td>R$ 24,00</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
export default {

}
</script>

<style>

</style>