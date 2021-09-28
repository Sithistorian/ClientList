<template>

<input type="checkbox" :id="this.checkboxId"/>
<label v-if="!editingProviderName" :for="this.checkboxId" >{{this.provider.name}}</label>
<input v-if="editingProviderName" type="text" :id="this.checkboxId" :placeholder="this.checkboxPlaceholder"/>
<button @click.prevent="toggleEditingProviderName"><i class="fa fa-edit"></i></button>
<button @click.prevent="this.deleteProvider(this.provider._id); this.$emit('get-all')"><i class="fa fa-trash"></i></button>

</template>


<script>
import axios from 'axios';

export default {

  data() {
    return {
      editingProviderName: false
    }
  },

  computed: {
    checkboxId () {
      return this.provider._id
    },
    checkboxPlaceholder () {
      return this.provider.name
    }

  },

  props: ["provider"],

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
    toggleEditingProviderName: function () {
      this.editingProviderName = true;
      }
    },

  emits: ["get-all"]

}
</script>

<style scoped>

</style>
