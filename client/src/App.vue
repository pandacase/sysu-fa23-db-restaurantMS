<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/menu">Menu</router-link> |
    <router-link to="/order">Orders</router-link> |
    <router-link to="/table">Tables</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  margin-bottom: 75px;
  padding: 30px;
  font-size: 25px;
}

nav a {
  font-weight: bold;
  color: #070c14;
  padding: 0 100px;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #eec927;
}
</style>

