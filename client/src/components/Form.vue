<template>
  <form id="form">

  <label :for="selectedClient.name">Name</label>
  <input  :id="selectedClient.name" type="text" v-model="name"/><br>

  <label :for="selectedClient.email">Email</label>
  <input  :id="selectedClient.email" type="email" v-model="email"/><br>

  <label :for="selectedClient.phone">Phone</label>
  <input  :id="selectedClient.phone" type="text" v-model="phone"/><br>

  <label for="selectedClientProviders">Providers</label>
  <input  id="selectedClientProviders" type="text" v-model="newProvider"/>

  <button @click.prevent="this.createNewProvider({name: this.newProvider}); this.$emit('get-all')">Add Provider</button><br>

  <div v-for="provider in providers" :key="provider._id">
    <ProvidersCheckBoxes
    :provider="provider"
    @get-all="this.$emit('get-all')"
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
      id: this.selectedClient.id,
      name: this.selectedClient.name,
      email: this.selectedClient.email,
      phone: this.selectedClient.phone
    }
  },

  props: [
    "selectedClient",
    "clientProviders",
    "providers"
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
    }
  },

  computed: {
    modifiedClient () {
      let mod = {
          clientId: this.id,
          modifiedClient:  {
            name: this.name,
            email: this.email,
            phone: parseInt(this.selectedClient.phone.split('-').join('')),
            providers: this.selectedClient.providers
          }
        };
      this.$emit('modified-client', mod)
      return mod;
    },
    newClient () {
      let newClient = {
            name: this.name ? this.name : null,
            email: this.email ? this.email : null,
            phone: this.selectedClient.phone ? parseInt(this.selectedClient.phone.split('-').join('')) : null,
            providers: this.selectedClient.providers ? this.selectedClient.providers : null
      }
      this.$emit('new-client', newClient)
      return newClient

    }
  },

  emits: ["get-all", "checked-or-not"],


}

</script>



<style scoped>

</style>
