<template>
  <Modal v-if="showEditModal | showNewClientModal"
  :selectedClient="selectedClient"
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

  <ClientTable
  :clients="this.clients"
  :providers="this.providers"
  :toggleShowEditModal="toggleShowEditModal"
  :setSelectedClient="setSelectedClient"
  @toggle-show-edit-modal="toggleShowEditModal">

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
      selectedClient: {
        id: null,
        name: null,
        email: null,
        phone: null,
        providers: []
      }
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
    setSelectedClient: function (client, phone, providers) {
      this.selectedClient = {
        id: client._id,
        name: client.name,
        email: client.email,
        phone: phone,
        providers: providers,

      }
    }
  },
  mounted() {
    this.getAll()
  }
}
</script>

<style>

</style>