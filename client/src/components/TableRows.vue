<template>
  <td>{{client.name}}</td>
  <td>{{client.email}}</td>
  <td>{{modifyPhone}}</td>
  <td>{{getProviderNames(client.providers, providers)}}</td>
  <td><button @click="setSelectedClient(client, modifyPhone, getProviders(client.providers, providers)); $emit('toggle-show-edit-modal')">Edit</button></td>
  <td><button>Delete</button></td>
</template>



<script>
export default {

  props: [ "client", "providers", "setSelectedClient"],
  methods: {
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
  },

  computed: {
    modifyPhone: function () {
      let modified = this.client.phone.toString().split('');
      modified.splice(3, 0, '-');
      modified.splice(7, 0, '-');
      modified = modified.join('');
      return modified;
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