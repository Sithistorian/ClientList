<template>
<h1 v-if="showEditModal">Editing a Client</h1>
<h1 v-if="showNewClientModal">Adding a Client</h1>

<h1>Client</h1>

<Form :clientName="clientName" :clientEmail="clientEmail" :clientPhone="clientPhone" :clientProviders="clientProviders" :providers="providers" @get-all="this.$emit('get-all')"></Form>

<h1 v-if="showEditModal">
  <button form="form" type="submit">Delete</button>
  <button form="form" type="submit" @toggle-edit-modal="this.emit('toggle-edit-modal')">Cancel</button>
  <button form="form" type="submit">Save Client</button>
</h1>
<h1 v-if="showNewClientModal">
  <button form="form" type="submit" @toggle-new-client-modal="this.emit('toggle-new-client-modal')">Cancel</button>
  <button form="form" type="submit">Add Client</button>
</h1>
</template>

<script>
import Form from './Form.vue';

export default {
  components: {
    Form
  },

  props: [
    "providers",
    "clientName",
    "clientEmail",
    "clientPhone",
    "clientProviders",
    "showEditModal",
    "showNewClientModal"
      ],

  emits: ["get-all", "toggle-edit-modal", "toggle-new-client-modal"]
}
</script>

<style scoped>

</style>