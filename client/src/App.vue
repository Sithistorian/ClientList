<template>
  <div>{{message}}</div>
</template>


<script>
import requests from './logic/requests.js';
import axios from 'axios';

export default {
  data() {
    return {
      message: 'Vue is working just fine!',
      information: null
    }
  },
  methods: {
    getAll1: requests.getAll,
    getAll: function (populated = 'false') {

    var config = {
      method: 'get',
      url: `http://localhost:3000/all/?populated=${populated}`
    };

    axios(config)
    .then(res => {
      console.log(res.data)
      this.information = res.data
      return res.data;
    })
    .catch(err =>  {
      console.log('Something went wrong', err)
    });
  },
    getClientById: requests.getClientById,
    getProviderById: requests.getProviderById,
    createClient: requests.createClient,
    deleteClient: requests.deleteClient,
    createNewProvider: requests.createNewProvider,
    changeProviderName: requests.changeProviderName,
    modifyClient: requests.modifyClient
  },
  mounted() {
    this.getAll()
  }
}
</script>

<style>

body {
  color: rgb(230, 46, 46);
}
</style>