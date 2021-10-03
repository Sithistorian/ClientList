<template>
<h1 class="modal-heading" v-if="showEditModal">Editing a Client</h1>
<h1 class="modal-heading" v-if="showNewClientModal">Adding a Client</h1>
<div id="modal-container">
<h1 id="modal-title">Client</h1>

<Form
:showEditModal="showEditModal"
:selectedClient="selectedClient"
:allProviders="allProviders"
@get-all="$emit('get-all')"
@form-information="setFormInformation">
</Form>

<h1 class="modal-footer-container" v-if="showEditModal">

  <button id="modal-delete" type="button" @click.prevent="deleteClient(this.selectedClient.id); $emit('reset-selectedClient')">Delete
  </button>

  <button class="modal-cancel" type="button"
  @click.prevent="$emit('toggle-edit-modal'); $emit('reset-selectedClient')"
  @toggle-edit-modal="$emit('toggle-edit-modal')">Cancel
  </button>

  <button id="modal-save-client" type="button" @click.prevent="modifyClient(this.formInformation); $emit('reset-selectedClient')">Save Client
  </button>

</h1>

<h1 class="modal-footer-container" v-if="showNewClientModal">

  <button class="modal-cancel" type="button"
  @click.prevent="$emit('toggle-new-client-modal') "
  @toggle-new-client-modal="$emit('toggle-new-client-modal')">Cancel
  </button>

  <button id="modal-add-client" type="button" @click.prevent="createClient(this.formInformation); $emit('toggle-new-client-modal')">Add Client
  </button>
</h1>
</div>
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
    "allProviders",
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
        console.log(res);
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

#modal-container {

  position: fixed;
  top: 55%;
  left: 50%;
  height: 80vh;
  width: 60vw;
  margin-top: -40vh;
  margin-left: -30vw;

  transition: 1.1s ease-out;
  box-shadow: -10px 10px 10px rgb(187, 178, 178);
  overflow: hidden;
  z-index: 1;

  background-color: white;
  border-color: #35017F;
  border: solid;
  border-width: 2px;

  display: flex;
  flex-direction: column;

}

.modal-heading {
  color: #35017F;
}

#modal-title {
  margin: 0;
  color: #35017F;
  padding: 10px;
  border: solid;
  border-width: 2px;
  border-color: #35017F;
  border-top: transparent;
  border-left: transparent;
  border-right: transparent;

  margin-bottom: 20px;
}

.modal-footer-container {
  border: solid;
  border-width: 2px;
  border-color: #35017F;
  border-bottom: transparent;
  border-left: transparent;
  border-right: transparent;

  display: grid;
  grid-template-columns: repeat(5, 12vw);

}

button {
  height: 35px;
  width: 100px;
  margin-top: 15px;
  justify-self: center;

  border: solid;
  border-width: 1px;
  border-radius: .5%;
  background-image: linear-gradient(white, rgb(245, 244, 244));
}

button:hover {
  height: 35px;
  width: 100px;
  margin-top: 15px;
  justify-self: center;


  border: solid;
  border-width: 1px;
  border-radius: .5%;
  background-image: linear-gradient(rgb(245, 244, 244), white);
  transition: ease-in-out;
  cursor: pointer;
}

#modal-delete {
  grid-column-start: 1;
  grid-column-end: 2;
  color: white;

  background-image: linear-gradient(rgb(255, 0, 0), rgb(216, 13, 13));
}

#modal-delete:hover {
  grid-column-start: 1;
  grid-column-end: 2;
  color: white;

  cursor: pointer;
  background-image: linear-gradient(rgb(216, 13, 13), rgb(255, 0, 0));

}

.modal-cancel {
 grid-column-start: 4;
 grid-column-end: 5;
}

#modal-save-client {
 grid-column-start: 5;
 grid-column-end: 6;
}

#modal-add-client {
 grid-column-start: 5;
 grid-column-end: 6;
}

</style>