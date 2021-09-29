<template>
<h1 v-if="showEditModal">Editing a Client</h1>
<h1 v-if="showNewClientModal">Adding a Client</h1>

<h1>Client</h1>

<Form :clientId="clientId"
:clientName="clientName"
:clientEmail="clientEmail"
:clientPhone="clientPhone"
:clientProviders="clientProviders"
:providers="providers"
@get-all="this.$emit('get-all')"
@modified-client="setModifiedClient">
</Form>

<h1 v-if="showEditModal">
  <button form="form" type="submit">Delete</button>
  <button form="form" type="submit" @toggle-edit-modal="$emit('toggle-edit-modal')">Cancel</button>
  <button form="form" type="submit" @click.prevent="modifyClient(this.modifiedClient); $emit('toggle-edit-modal')">Save Client</button>
</h1>

<h1 v-if="showNewClientModal">
  <button form="form" type="submit" @toggle-new-client-modal="$emit('toggle-new-client-modal')">Cancel</button>
  <button form="form" type="submit">Add Client</button>
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
      modifiedClient: null
    }
  },

  props: [
    "providers",
    "clientId",
    "clientName",
    "clientEmail",
    "clientPhone",
    "clientProviders",
    "showEditModal",
    "showNewClientModal"
      ],
  methods: {
    setModifiedClient: function (mod) {
        this.modifiedClient = mod;
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
      this.getAll();
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

  },

  emits: ["get-all", "toggle-edit-modal", "toggle-new-client-modal"]
}
</script>

<style scoped>

</style>