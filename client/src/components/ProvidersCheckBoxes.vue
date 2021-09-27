<template>

<input type="checkbox" id="this.provider._id"/>
<label for="this.provider._id">{{this.provider.name}}</label>

</template>


<script>

export default {

  props: ["provider"]

}
</script>

<style scoped>

</style>
