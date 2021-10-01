<template>

<input type="checkbox" :id="this.checkboxId" v-model="checked" @change="$emit('checked-or-not', checked, provider); $emit('get-all')"/>
<label v-if="!editingProviderName" :for="checkboxId" >{{provider.name}}</label>

<input v-if="editingProviderName" v-model="newProviderName" type="text" :id="provider._id" :placeholder="provider.name" @keyup.enter="changeProviderName(this.nameChangeObj)"/>

<button type="button" @click.prevent="changeProviderName(this.nameChangeObj)"><i class="fa fa-edit"></i></button>
<button type="button" @click.prevent="deleteProvider(this.provider._id); $emit('get-all')"><i class="fa fa-trash"></i></button>

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

  props: ["providers", "provider"],

  computed: {
    nameChangeObj () {
      return {
        currentProviderName: this.provider.name,
        newProviderName: this.newProviderName
        }
    }
  },

  props: ["provider", "selectedClientProviders", "showEditModal"],

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
      .then(this.$emit('get-all'))
      .then(this.toggleEditingProviderName())
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
      if(this.showEditModal) {
        for (let i = 0; i < this.selectedClientProviders.length; i++) {
          if(this.provider._id === this.selectedClientProviders[i]._id) {
            this.checked = true;
          }
        }
      }
      },
  },

  emits: ["get-all", "checked-or-not"],

  mounted () {
    this.checkedOrNot()
  }

}
</script>

<style scoped>

</style>
