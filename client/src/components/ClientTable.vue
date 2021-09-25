<template>
  <table>
   <tr>
     <th>Name</th>
     <th>Email</th>
     <th>Phone</th>
     <th>Providers</th>
     <th></th>
   </tr>
  </table>
</template>



<script>
export default {
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
