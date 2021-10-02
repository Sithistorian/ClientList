<template>
  <form id="form">

  <label :for="selectedClient.name" class="form-label">Name:</label>
  <input  :id="selectedClient.name" class="form-text-input" type="text" v-model="name"/><br>

  <label :for="selectedClient.email" class="form-label">Email:</label>
  <input  :id="selectedClient.email" class="form-text-input" type="email" v-model="email"/><br>

  <label :for="selectedClient.phone" class="form-label">Phone:</label>
  <input  :id="selectedClient.phone" class="form-text-input" type="tel" v-model="phone"/><br>

  <label id="form-label-for-selectedClientProviders" for="selectedClientProviders" class="form-label">Providers:</label>
  <input  id="selectedClientProviders" type="text" v-model="newProvider" @keyup.enter="createNewProvider({name: newProvider}); resetNewProvider()"/>

  <button id="form-add-provider-button" type="button"
  @click.prevent="createNewProvider({name: newProvider}); resetNewProvider()">Add Provider
  </button><br>

  <div id="form-providers-list">
  <div class="form-provider" v-for="provider in allProviders" :key="provider._id">
    <ProvidersCheckBoxes
    :provider="provider"
    :selectedClientProviders="selectedClient.providers"
    :showEditModal="showEditModal"
    @get-all="$emit('get-all')"
    @checked-or-not="manageProviders" >
    </ProvidersCheckBoxes>
  </div>
  </div>

  </form>
</template>

<script>
import axios from 'axios';
import ProvidersCheckBoxes from './ProvidersCheckBoxes.vue'

export default {
  components: { ProvidersCheckBoxes },

  data() {
    return {
      newProvider: null,
      newClientProviders: [],
      id: this.showEditModal ? this.selectedClient.id : null,
      name: this.showEditModal ? this.selectedClient.name : null,
      email: this.showEditModal ? this.selectedClient.email : null,
      phone: this.showEditModal ? this.selectedClient.phone : null,
      providers: this.showEditModal ? this.selectedClient.providers : this.newClientProviders,
    }
  },

  props: [
    "selectedClient",
    "allProviders",
    "showEditModal"
      ],

  methods: {
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
        this.$emit('get-all');
        })
      .catch(err => console.log('Something went wrong', err));
      },
    manageProviders: function (checked, provider) {

      let providers = this.showEditModal ? this.selectedClient.providers : this.newClientProviders;

      if(checked){
        let present = false;
        for (let i = 0; i < providers.length; i++){
          if (provider.name === providers[i].name) {
            present = true;
            break;
          }
        }
        if(!present) {
          providers.push(provider)
        }
      } else {
        for (let i = 0; i < providers.length; i++){
          if (provider.name === providers[i].name) {
            providers.splice(i, 1);
          }
        }

      }
      this.$emit('get-all')
    },
    validateForm () {

      let valid = true;
      if (!this.name || !this.email || !this.phone) {
        valid = false;
      }
      if(valid) {
        this.sendFormInformation()
      }
    },
    sendFormInformation () {

      let formData = {
        id: this.id ? this.id : null,
        name: this.name,
        email: this.email,
        phone: this.phone,
        providers: this.showEditModal ? this.selectedClient.providers : this.newClientProviders
      }
      this.$emit('form-information', formData)
    },
    resetNewProvider() {

      this.newProvider = null;
    }
  },

  emits: ["get-all", "checked-or-not"],

  updated () {
    this.validateForm()
  }


}

</script>



<style scoped>

label {
  color: #35017F;
  font-size: 16px;
}

#form {
  align-self: center;
}

.form-text-input {
  width: 400px;
  height: 30px;
  margin: 5px;
}

#selectedClientProviders {
  width: 300px;
  height: 30px;
  margin: 5px;

  position: relative;
  left: -20px;
}

#form-label-for-selectedClientProviders {
  position: relative;
  left: -20px;
}

#form-add-provider-button {
  position: relative;
  left: -20px;
  height: 35px;

  border: solid;
  border-width: 1px;
  border-radius: .5%;
  background-image: linear-gradient(white, rgb(245, 244, 244));
}

#form-add-provider-button:hover {
  position: relative;
  left: -20px;
  height: 35px;

  border: solid;
  border-width: 1px;
  border-radius: .5%;
  background-image: linear-gradient(rgb(245, 244, 244), white);
  transition: ease-in-out;
  cursor: pointer;
}

#form-providers-list {
  position: relative;
  left: 50px;
  width: 305px;
  height: 200px;

  border: solid;
  border-width: 1px;
  border-radius: .5%;

  overflow: scroll;

}

.form-provider {
  display: grid;
  grid-template-columns: repeat(20, 15.25px);
}

</style>
