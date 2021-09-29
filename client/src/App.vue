<template>
  <Modal v-if="showEditModal | showNewClientModal"
  :clientId="clientId"
  :clientName="clientName"
  :clientEmail="clientEmail"
  :clientPhone="clientPhone"
  :clientProviders="clientProviders"
  :showEditModal="showEditModal"
  :showNewClientModal="showNewClientModal"
  :providers="providers"
  @get-all="getAll"
  @toggle-edit-modal="toggleShowEditModal"
  @toggle-new-client-modal="toggleShowNewClientModal">
  </Modal>

  <h1>Clients
    <span>
      <button @click="toggleShowNewClientModal">New Client</button>
    </span>
  </h1>

  <ClientTable :clients="this.clients" :providers="this.providers" :toggleShowEditModal="toggleShowEditModal" :setFormInformation="setFormInformation" @toggle-show-edit-modal="toggleShowEditModal">
  </ClientTable>
</template>


<script>
import axios from 'axios';
import ClientTable from './components/ClientTable.vue';
import Modal from './components/Modal.vue';


export default {
  components: {
    ClientTable,
    Modal
  },
  data() {
    return {
      clients: null,
      providers: null,
      showEditModal: false,
      showNewClientModal: false,
      clientId: null,
      clientName: null,
      clientEmail: null,
      clientPhone: null,
      clientProviders: [],
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
    toggleShowEditModal: function () {
      if(this.showEditModal) {
        this.showEditModal = false;
      } else {
        if(!this.showNewClientModal) {
          this.showEditModal = true;
        } else {
          this.toggleShowNewClientModal();
          this.showEditModal = true;
        }
      }
    },
    toggleShowNewClientModal: function () {
      if(this.showNewClientModal) {
        this.showNewClientModal = false;
      } else {
        if(!this.showEditModal) {
          this.showNewClientModal = true;
        } else {
          this.toggleShowEditModal();
          this.showNewClientModal = true;
        }
      }

    },
    setFormInformation: function (client, phone, providers) {
      this.clientId = client._id;
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