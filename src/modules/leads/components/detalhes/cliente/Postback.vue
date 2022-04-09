<template>
  <table class="table-sm table-white w-full">
    <thead>
      <th class="text-xs">
        ID
      </th>
      <th class="text-xs">
        Lead
      </th>
      <th class="text-xs">
        Recebido em
      </th>
      <th></th>
    </thead>
    <tbody>
      <tr class="text-xs">
        <td>593621</td>
        <td>154565</td>
        <td>22/03/2021 11:55</td>
        <td>
          <div class="flex items-center justify-end space-x-2 divide-x-2 divide-gray-200">
            <button class="text-blue-500 text-xs">
              Ver
            </button>
            <button
              v-tooltip="'Copiar'"
              v-copy="'Ok'"
              class="transition hover:bg-gray-200 rounded-md p-1"
            >
              <img
                src="@/assets/icons/copy.svg"
                alt=""
              >
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {

}
</script>

<style scoped>
table td {
  font-size: 10px;
}

</style>