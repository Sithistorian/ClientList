<template>
<h1 v-if="showEditModal">Editing a Client</h1>
<h1 v-if="showNewClientModal">Adding a Client</h1>
<h1>Client</h1>

</template>

<script>

export default {
  props: [
    "clientName",
    "clientEmail",
    "clientPhone",
    "clientProviders",
    "showEditModal",
    "showNewClientModal"
      ]
}
</script>

<style scoped>

</style>