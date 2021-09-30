<template>
  <table>
   <tr>
     <th>Name</th>
     <th>Email</th>
     <th>Phone</th>
     <th>Providers</th>
     <th></th>
     <th></th>
   </tr>
   <tr v-for="client in clients" :key="client._id">
   <TableRows
   :client="client"
   :providers="providers"
   :setSelectedClient="setSelectedClient"
   @toggle-show-edit-modal="$emit('toggle-show-edit-modal')"
   @get-all="$emit('get-all')">
   </TableRows>
   </tr>
  </table>
</template>



<script>
import TableRows from './TableRows.vue';

export default {
  components: {
    TableRows
  },

  props: ["clients", "providers", "setSelectedClient"],
  emits: ["toggle-show-edit-modal", "get-all"]
}
</script>




<style scoped>

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 80%;
}

th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
</style>
