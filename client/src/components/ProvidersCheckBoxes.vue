<template>

<input type="checkbox" id="this.provider._id"/>
<label for="this.provider._id">{{this.provider.name}}</label>
<button><i class="fa fa-edit"></i></button>
<button><i class="fa fa-trash"></i></button>

</template>


<script>

export default {

  props: ["provider"]

}
</script>

<style scoped>

</style>
