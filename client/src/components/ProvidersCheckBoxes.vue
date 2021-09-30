<template>

<input type="checkbox" :id="this.checkboxId" v-model="checked" @change="$emit('checked-or-not', checked, provider); $emit('get-all')"/>
<label v-if="!editingProviderName" :for="this.checkboxId" >{{this.provider.name}}</label>

<input v-if="editingProviderName" v-model="newProviderName" type="text" :id="this.checkboxId" :placeholder="this.checkboxPlaceholder" @keyup.enter="this.changeProviderName(this.nameChangeObj); this.toggleEditingProviderName()"/>

<button @click.prevent="toggleEditingProviderName"><i class="fa fa-edit"></i></button>
<button @click.prevent="this.deleteProvider(this.provider._id); $emit('get-all')"><i class="fa fa-trash"></i></button>

</template>


<script>
import axios from 'axios';

export default {

  data() {
    return {
      editingProviderName: false,
      newProviderName: '',
      checked: null
    }
  },

  props: ["providers"],

  computed: {
    checkboxId () {
      return this.provider._id
    },
    checkboxPlaceholder () {
      return this.provider.name
    },
    nameChangeObj () {
      return {
        currentProviderName: this.checkboxPlaceholder,
        newProviderName: this.newProviderName
        }
    }
  },

  props: ["provider", "selectedClientProviders"],

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
      })
      .catch(err => console.log('Something went wrong', err));
      },
    toggleEditingProviderName: function () {
      if (!this.editingProviderName) {
        this.editingProviderName = true;
      } else {
        this.editingProviderName = false;
      }
      },
    checkedOrNot () {
        for (let i = 0; i < this.selectedClientProviders.length; i++) {
          if(this.provider._id === this.selectedClientProviders[i]._id) {
            this.checked = true;
          }
        }
      }
    },

  emits: ["get-all", "checked-or-not"],

  mounted () {
    this.checkedOrNot()
  }

}
</script>

<style scoped>

</style>
