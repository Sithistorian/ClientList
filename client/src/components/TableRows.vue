<template>
  <td>{{client.name}}</td>
  <td>{{client.email}}</td>
  <td>{{this.modifyPhone(client.phone)}}</td>
  <td>{{this.getProviders(client.providers, this.providers)}}</td>
  <td><button @click="toggleShowEditModal(this.client, this.getProviders(client.providers, this.providers))">Edit</button></td>
  <td><button>Delete</button></td>
</template>



<script>
export default {

  props: [ "client", "providers", "toggleShowEditModal"],
  data () {

  },
  methods: {
    modifyPhone: function (clientPhone) {
      let modified = clientPhone.toString().split('');
      modified.splice(3, 0, '-');
      modified.splice(7, 0, '-');
      modified = modified.join('');
      return modified;
    },
    getProviders: function(clientProviders, allProviders) {
      console.log('This is the client providers:', clientProviders)
      let result = [];
      for (let i = 0; i < allProviders.length; i++) {
        if(clientProviders.includes(allProviders[i]._id)) {
          result.push(allProviders[i].name);
        }
      }
      result = result.join(', ');
      return result;
    }
  }
}

</script>



<style scoped>

</style>