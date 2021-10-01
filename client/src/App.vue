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

  <h1 id="app-top-bar">Clients
      <button id="app-newClient-button" @click="toggleShowNewClientModal">New Client</button>
  </h1>

  <ClientTable
  :clients="clients"
  :providers="providers"
  :toggleShowEditModal="toggleShowEditModal"
  :setSelectedClient="setSelectedClient"
  @get-all="getAll"
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

<style scoped>

#app-top-bar {

/* position */
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 88.9%;
  margin-left: auto;
  margin-right: auto;

/* height */
  height: 60px;

/* font */
  font-family: arial, sans-serif;
  color: #35017F;

/* border */
  margin-bottom: 0;
  border: 1px solid #dddddd;
  border-bottom: 0;
  padding: .5vw;
  padding-top: 20px;
}

#app-newClient-button {
  /* position */
  justify-self: right;
  align-self: center;

  border-radius: 8%;
  width: 100px;
  height: 35px;

}

</style>>
