<template>
<h1>The form is rendering</h1>
  <form>
  <label for="clientName">Name</label>
  <input  id="clientName" type="text"/><br>
  <label for="clientEmail">Email</label>
  <input  id="clientEmail" type="email"/><br>
  <label for="clientPhone">Phone</label>
  <input  id="clientPhone" type="text"/><br>
  <label for="clientProviders">Providers</label>
  <input  id="clientProvidrs" type="text"/>
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
    "clientProviders"
      ],

  data() {

  }

}

</script>



<style scoped>

</style>
