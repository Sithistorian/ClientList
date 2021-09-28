<template>

<input type="checkbox" id="this.provider._id"/>
<label for="this.provider._id">{{this.provider.name}}</label>
<button><i class="fa fa-edit"></i></button>
<button @click.prevent="this.deleteProvider(this.provider._id); this.$emit('get-all')"><i class="fa fa-trash"></i></button>

</template>


<script>
import axios from 'axios';

export default {

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
      }
    },

  emits: ["get-all"]

}
</script>

<style scoped>

</style>
