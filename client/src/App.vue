<template>
  <edit-client-modal v-if="showEditModal"></edit-client-modal>
  <new-client-modal v-if="showNewClientModal"></new-client-modal>
  <h1>Clients<span>
    <button @click="showNewClientModal = true">New Client</button>
    </span></h1>
  <ClientTable :clients="this.clients" :providers="this.providers" :toggleShowEditModal="toggleShowEditModal"></ClientTable>
</template>


<script>
import axios from 'axios';
import ClientTable from './components/ClientTable.vue';
import EditClientModal from './components/EditClientModal.vue';
import NewClientModal from './components/NewClientModal.vue';

export default {
  components: {
    ClientTable,
    EditClientModal,
    NewClientModal
  },
  data() {
    return {
      message: 'Vue is working just fine!',
      clients: null,
      providers: null,
      showEditModal: false,
      showNewClientModal: false,
      clientName: null,
      clientEmail: null,
      clientPhone: null,
      clientProviders: null

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
    },
    toggleShowEditModal: function (client, phone, providers) {
      console.log('Here', providers);
      this.showEditModal = true;
      this.clientName = client.name;
      this.clientEmail = client.email;
      this.clientPhone = phone;
      this.clientProviders = providers;
    }
  },
  mounted() {
    this.getAll()
  }
}
</script>

<style>

</style>