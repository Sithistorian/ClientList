<template>
<h1 v-if="showEditModal">Editing a Client</h1>
<h1 v-if="showNewClientModal">Adding a Client</h1>
<h1>Client</h1>
<Form :clientName="clientName" :clientEmail="clientEmail" :clientPhone="clientPhone" :clientProviders="clientProviders" :providers="providers" @created-new-provider="this.passToApp()"></Form>
<h1 v-if="showEditModal"><button>Delete</button><button>Cancel</button><button>Add Client</button></h1>
<h1 v-if="showNewClientModal"><button>Cancel</button><button>Save Client</button></h1>
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

  methods: {
    passToApp: function() {
      this.$emit('pass-to-App')
    }
  },

  emits: ["pass-to-app"]
}
</script>

<style scoped>

</style>