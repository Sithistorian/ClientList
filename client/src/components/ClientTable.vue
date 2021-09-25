<template>
  <table>
   <tr>
     <th>Name</th>
     <th>Email</th>
     <th>Phone</th>
     <th>Providers</th>
     <th></th>
   </tr>
   <tr v-for="client in clients" :key="client._id">
   <TableRows :client="client" :providers="providers"></TableRows>
   </tr>
  </table>
</template>



<script>
import TableRows from './TableRows.vue';

export default {
  components: {
    TableRows
  },

  props: ["clients", "providers"],

  data() {

  }
}
</script>




<style scoped>

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 80%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
</style>
