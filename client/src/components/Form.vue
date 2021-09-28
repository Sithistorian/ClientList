<template>
<h1>The form is rendering</h1>
  <form>
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
    <ProvidersCheckBoxes :provider="provider" @get-all="this.$emit('get-all')"></ProvidersCheckBoxes>
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
      name: this.clientName,
      email: this.clientEmail,
      phone: this.clientPhone
    }
  },

  props: [
    "providers",
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
      }
  },

  emits: ["get-all"],


}

</script>



<style scoped>

</style>
