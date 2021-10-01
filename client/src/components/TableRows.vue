<template>
  <td>{{client.name}}</td>
  <td>{{client.email}}</td>
  <td>{{modifyPhone}}</td>
  <td class="table-rows-provider-table-data">{{getProviderNames(client.providers, providers)}}</td>
  <td><button id="table-rows-edit-button" @click="setSelectedClient(client, modifyPhone, getProviders(client.providers, providers)); $emit('toggle-show-edit-modal')">Edit</button></td>
  <td><button id="table-rows-delete-button" @click="deleteClient(client._id)">Delete</button></td>
</template>



<script>
import axios from 'axios';

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
    },
    deleteClient: function(clientId) {
    var data = JSON.stringify({
      "clientId": clientId
    });

    var config = {
      method: 'post',
      url: 'http://localhost:3000/clients/deleteClient/',
      headers: {
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
    .then(res => {
      console.log(res.data);
        })
    .then(() => this.$emit('get-all'))
    .catch(err => console.log('Something went wrong', err));

      },
  },

  computed: {
    modifyPhone: function () {
      let modified = this.client.phone.toString().split('');
      modified.splice(3, 0, '-');
      modified.splice(7, 0, '-');
      modified = modified.join('');
      return modified;
    }
  },

  emits: ["get-all"]
}

</script>



<style scoped>

td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;

}

.table-rows-provider-table-data {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  word-wrap: break-word;
  max-width: 250px;
}

button {
  background-color: white;
  border-color: transparent;
  color: #35017F;
  font-size: 1em;
}

button:hover {
  background-color: white;
  border-color: #35017F;
  border-top-color: transparent;
  border-left-color: transparent;
  border-right-color: transparent;
  color: #35017F;
  cursor: pointer;
  font-size: 1em;
  transition: ease-in-out;
}

</style>