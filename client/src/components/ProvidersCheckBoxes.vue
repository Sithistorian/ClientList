<template>

<input class="checkbox" type="checkbox" :id="provider._id" v-model="checked" @change="$emit('checked-or-not', checked, provider); $emit('get-all')"/>

<label class="provider-name" v-if="!editingProviderName" :for="provider._id" >{{provider.name}}</label>

<input class="provider-name" v-if="editingProviderName" v-model="newProviderName" type="text" :id="provider._id" :placeholder="provider.name" @keyup.enter="changeProviderName(nameChangeObj())"/>

<button id="edit" type="button" @click.prevent="changeProviderName(nameChangeObj())"><i class="fa fa-edit"></i></button>
<button id="trash" type="button" @click.prevent="deleteProvider(provider._id); $emit('get-all')"><i class="fa fa-trash"></i></button>

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

  props: ["allProviders", "provider", "selectedClientProviders", "showEditModal"],

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
    nameChangeObj () {
      return {
        currentProviderName: this.provider.name,
        newProviderName: this.newProviderName
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

button {
  background-color: transparent;
  border: none;
}

button:hover {
  cursor: pointer;
}

.checkbox {
  grid-column-start: 1;
  grid-column-end: 2;

}
.provider-name {
  grid-column-start: 3;
  grid-column-end: 16;

}

#edit {
  grid-column-start: 17;
  grid-column-end: 19;
}

#trash {
  grid-column-start: 19;
  grid-column-end: 20;

}

#trash:hover {
  color: red
}

#edit:hover {
  color: purple;
}

</style>
