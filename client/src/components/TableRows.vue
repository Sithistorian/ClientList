<template>
  <td>{{client.name}}</td>
  <td>{{client.email}}</td>
  <td>{{this.modifyPhone(client.phone)}}</td>
  <td>{{this.getProviderNames(client.providers, this.providers)}}</td>
  <td><button @click="setFormInformation(this.client, this.modifyPhone(client.phone), this.getProviders(client.providers, this.providers)); $emit('toggle-show-edit-modal')">Edit</button></td>
  <td><button>Delete</button></td>
</template>



<script>
export default {

  props: [ "client", "providers", "setFormInformation"],
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
    getProviderNames: function(clientProviders, allProviders) {
      let result = [];
      for (let i = 0; i < allProviders.length; i++) {
        if(clientProviders.includes(allProviders[i]._id)) {
          result.push(allProviders[i].name);
        }
      }
      result = result.join(', ');
      return result;
    },
    getProviders: function(clientProviders, allProviders) {
      let result = [];
      for (let i = 0; i < allProviders.length; i++) {
        if(clientProviders.includes(allProviders[i]._id)) {
          result.push(allProviders[i]);
        }
      }
      return result;
    }
  }
}

</script>



<style scoped>

td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

</style>