<template>
  <div id="app" >
    <UserLibrary />
  </div>
</template>

<script>
import UserLibrary from './pages/phoneBook.vue'
export default {
  name: 'App',
  components: {
    UserLibrary
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100%;
  /* margin-top: 60px; */
}
</style>
