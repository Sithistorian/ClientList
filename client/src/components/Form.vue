<template>
  <form id="form">

  <label :for="clientName">Name</label>
  <input  :id="clientName" type="text" v-model="name"/><br>

  <label :for="clientEmail">Email</label>
  <input  :id="clientEmail" type="email" v-model="email"/><br>

  <label :for="clientPhone">Phone</label>
  <input  :id="clientPhone" type="text" v-model="phone"/><br>

  <label for="clientProviders">Providers</label>
  <input  id="clientProviders" type="text" v-model="newProvider"/>

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
      id: this.clientId,
      name: this.clientName,
      email: this.clientEmail,
      phone: this.clientPhone
    }
  },

  props: [
    "providers",
    "clientId",
    "clientName",
    "clientEmail",
    "clientPhone",
    "clientProviders"
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
        })
      .catch(err => console.log('Something went wrong', err));
      },
    manageProviders: function (checked, provider) {

      if(checked){
        let present = false;
        for (let i = 0; i < this.clientProviders.length; i++){
          if (provider.name === this.clientProviders[i].name) {
            present = true;
            break;
          }
        }
        if(!present) {
          this.clientProviders.push(provider)
        }
      } else {
        for (let i = 0; i < this.clientProviders.length; i++){
          if (provider.name === this.clientProviders[i].name) {
            this.clientProviders.splice(i, 1);
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
            phone: parseInt(this.clientPhone.split('-').join('')),
            providers: this.clientProviders
          }
        };
      this.$emit('modified-client', mod)
      return mod;
    },
    newClient () {
      let newClient = {
            name: this.name ? this.name : null,
            email: this.email ? this.email : null,
            phone: this.clientPhone ? parseInt(this.clientPhone.split('-').join('')) : null,
            providers: this.clientProviders ? this.clientProviders : null
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
