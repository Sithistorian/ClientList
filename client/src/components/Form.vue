<template>
  <form id="form">

  <label :for="selectedClient.name">Name</label>
  <input  :id="selectedClient.name" type="text" v-model="name"/><br>

  <label :for="selectedClient.email">Email</label>
  <input  :id="selectedClient.email" type="email" v-model="email"/><br>

  <label :for="selectedClient.phone">Phone</label>
  <input  :id="selectedClient.phone" type="tel" v-model="phone"/><br>

  <label for="selectedClientProviders">Providers</label>
  <input  id="selectedClientProviders" type="text" v-model="newProvider"/>

  <button @click.prevent="this.createNewProvider({name: newProvider}); $emit('get-all')">Add Provider</button><br>

  <div v-for="provider in providers" :key="provider._id">
    <ProvidersCheckBoxes
    :provider="provider"
    :selectedClientProviders="selectedClient.providers"
    :showEditModal="showEditModal"
    @get-all="$emit('get-all')"
    @checked-or-not="manageProviders" >
    </ProvidersCheckBoxes>
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
      id: this.showEditModal ? this.selectedClient.id : null,
      name: this.showEditModal ? this.selectedClient.name : null,
      email: this.showEditModal ? this.selectedClient.email : null,
      phone: this.showEditModal ? this.selectedClient.phone : null

    }
  },

  props: [
    "selectedClient",
    "providers",
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

      let providers = this.selectedClient.providers;

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
        providers: this.selectedClient.providers
      }
      this.$emit('form-information', formData)
    }
  },

  emits: ["get-all", "checked-or-not"],

  updated () {
    this.validateForm()
  }


}

</script>



<style scoped>

</style>
