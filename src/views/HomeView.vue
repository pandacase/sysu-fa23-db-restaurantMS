<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>


<template>
  <div class="home">
    <img alt="logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Restaurant Management App👍👍👍"/>
  </div>
</template>


<style scoped>
img {
  width: 256px;
}

</style>