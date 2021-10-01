<template>
  <table>
   <tr>
     <th><strong>Name</strong></th>
     <th>Email</th>
     <th>Phone</th>
     <th id="client-table-provider-table-head">Providers</th>
     <th></th>
     <th></th>
   </tr>
   <tr v-for="client in clients" :key="client._id">
   <TableRows
   :client="client"
   :allProviders="allProviders"
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

  props: ["clients", "allProviders", "setSelectedClient"],
  emits: ["toggle-show-edit-modal", "get-all"]
}
</script>




<style scoped>

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}

th {
  border: 2px solid #35017F;
  text-align: left;
  padding: 8px;

  color: #35017F;
  background-color: rgb(238, 237, 237);

}

#client-table-provider-table-head {
  border: 2px solid #35017F;
  text-align: left;
  padding: 8px;

  color: #35017F;
  background-color: rgb(238, 237, 237);
  word-wrap: break-word;
  max-width: 150px;
}
</style>
