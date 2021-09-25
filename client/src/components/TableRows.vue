<template>
  <td>{{client.name}}</td>
  <td>{{client.email}}</td>
  <td>{{this.modifyPhone(client.phone)}}</td>
  <td></td>
  <td></td>
</template>



<script>
export default {

  props: [ "client", "providers"],
  data () {

  },
  methods: {
    modifyPhone: function (clientPhone) {
      let modified = clientPhone.toString().split('');
      modified.splice(3, 0, '-');
      modified.splice(7, 0, '-');
      modified = modified.join('');
      return modified;
    }
  }
}

</script>



<style scoped>

</style>