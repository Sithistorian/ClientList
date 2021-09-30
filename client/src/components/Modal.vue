<template>
<h1 v-if="showEditModal">Editing a Client</h1>
<h1 v-if="showNewClientModal">Adding a Client</h1>

<h1>Client</h1>

<Form
:showEditModal="showEditModal"
:selectedClient="selectedClient"
:providers="providers"
@get-all="$emit('get-all')"
@form-information="setFormInformation">
</Form>

<h1 v-if="showEditModal">
  <button form="form" type="button" @click.prevent="deleteClient(this.selectedClient.id)">Delete</button>
  <button form="form" type="button" @toggle-edit-modal="$emit('toggle-edit-modal')">Cancel</button>
  <button form="form" type="button" @click.prevent="modifyClient(this.formInformation)">Save Client</button>
</h1>

<h1 v-if="showNewClientModal">
  <button form="form" type="button" @toggle-new-client-modal="$emit('toggle-new-client-modal')">Cancel</button>
  <button form="form" type="button" @click.prevent="createClient(this.formInformation); $emit('toggle-new-client-modal')">Add Client</button>
</h1>
</template>

<script>
import Form from './Form.vue';
import axios from 'axios';

export default {
  components: {
    Form
  },

  data () {
    return {
      formInformation: null
    }
  },

  props: [
    "providers",
    "selectedClient",
    "showEditModal",
    "showNewClientModal"
      ],
  methods: {
    setModifiedClient: function (mod) {
        this.modifiedClient = mod;
      },
    setNewClient: function (newClient) {
      this.newClient = newClient;
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
        console.log('Modified the Client for sure!', res.data);
        this.$emit('get-all')
        })
      .then(() => this.$emit('toggle-edit-modal'))
      .catch(err => console.log('Something went wrong', err));
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
      this.$emit('get-all')
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
      this.$emit('get-all')
        })
    .then(() => this.$emit('toggle-edit-modal'))
    .catch(err => console.log('Something went wrong', err));

      },
    setFormInformation (formData) {
      if(this.showEditModal) {
        this.formInformation = {
          clientId: formData.id,
          modifiedClient: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone.split('-').join(''),
            providers: formData.providers
          }
        }
      } else {
        this.formInformation = {
          name: formData.name,
            email: formData.email,
            phone: formData.phone.split('-').join(''),
            providers: formData.providers
        }
      }
    }

  },

  emits: ["get-all", "toggle-edit-modal", "toggle-new-client-modal"]
}
</script>

<style scoped>

</style>