<template>
  <h1>Clients<span>
    <button type="submit"></button>
    </span></h1>
  <ClientTable v-bind:clients="this.clients" v-bind:providers="this.providers"></ClientTable>
</template>


<script>
import axios from 'axios';
import ClientTable from './components/ClientTable.vue'

export default {
  components: {
    ClientTable
  },
  data() {
    return {
      message: 'Vue is working just fine!',
      clients: null,
      providers: null,
      showEditModal: false,
      showNewClientModal: false
    }
  },
  methods: {
    getAll: function(populated = 'false') {

      var config = {
        method: 'get',
        url: `http://localhost:3000/all/?populated=${populated}`
      };

      axios(config)
      .then(res => {
        console.log(res.data)
        this.clients = res.data.clients;
        this.providers = res.data.providers;
        return res.data;
      })
      .catch(err =>  {
        console.log('Something went wrong', err)
      });
    },
    createClient: function(client) {
    var data = JSON.stringify(client);

    var config = {
      method: 'post',
      url: 'http://localhost:3000/clients/createClient/',
      headers: {
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
    .then(res => {
      console.log(res.data);
      this.getAll();
    })
    .catch(err => console.log('Something went wrong', err));
    },
    modifyClient: function(obj) {
    var data = JSON.stringify(obj);

    var config = {
      method: 'put',
      url: 'http://localhost:3000/clients/modifyClient',
      headers: {
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
    .then(res => {
      console.log(res.data);
      this.getAll()
      })
    .catch(err => console.log('Something went wrong', err));
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
      this.getAll();
      })
    .catch(err => console.log('Something went wrong', err));

    },
    createNewProvider: function(provider) {
    var data = JSON.stringify(provider);

    var config = {
      method: 'post',
      url: 'http://localhost:3000/providers/createNewProvider/',
      headers: {
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
    .then(res => {
      console.log(res.data);
      this.getAll();
      })
    .catch(err => console.log('Something went wrong', err));
    },
    changeProviderName: function(obj) {
    var data = JSON.stringify(obj);

    var config = {
      method: 'put',
      url: 'http://localhost:3000/providers/changeName',
      headers: {
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
    .then(res => {
      console.log(res.data);
      this.getAll()
    })
    .catch(err => console.log('Something went wrong', err));
    }
  },
  mounted() {
    this.getAll()
  }
}
</script>

<style>

</style>