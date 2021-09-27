<template>
<h1>The form is rendering</h1>
  <form>
  <label for="clientName">Name</label>
  <input  id="clientName" type="text" v-model="name"/><br>
  <label for="clientEmail">Email</label>
  <input  id="clientEmail" type="email" v-model="email"/><br>
  <label for="clientPhone">Phone</label>
  <input  id="clientPhone" type="text" v-model="phone"/><br>
  <label for="clientProviders">Providers</label>
  <input  id="clientProviders" type="text" v-model="newProvider"/>
  <button>Add Provider</button><br>
  <div v-for="provider in providers" :key="provider._id">
    <ProvidersCheckBoxes :provider="provider"></ProvidersCheckBoxes>
  </div>
  </form>


</template>

<script>
import ProvidersCheckBoxes from './ProvidersCheckBoxes.vue'

export default {
  components: { ProvidersCheckBoxes },

  props: [
    "providers",
    "clientName",
    "clientEmail",
    "clientPhone",
    "clientProviders",
    "newProvider",
    "newClient"
      ],

  data() {
    return {
      newProvider: null,
      name: this.clientName,
      email: this.clientEmail,
      phone: this.clientPhone,
      providers: this.clientProviders

    }
  },

  methods: {
    deleteProvider: function(providerId) {
      var data = JSON.stringify({
        "providerId": providerId
      });

      var config = {
        method: 'post',
        url: 'http://localhost:3000/providers/deleteProvider',
        headers: {
          'Content-Type': 'application/json'
        },
        data : data
      };

      axios(config)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
    },
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
        this.getAll();
        })
      .catch(err => console.log('Something went wrong', err));
      },
    changeProviderName: function(obj) {
      var data = JSON.stringify(obj);

      var config = {
        method: 'put',
        url: 'http://localhost:3000/providers/changeName',
        headers: {
          'Content-Type': 'application/json'
        },
        data : data
      };

      axios(config)
      .then(res => {
        console.log(res.data);
        this.getAll()
      })
      .catch(err => console.log('Something went wrong', err));
      },
  }

}

</script>



<style scoped>

</style>
