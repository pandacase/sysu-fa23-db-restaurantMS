
<script setup>
import loadTable from './loadTable.vue'

function handleSearchBtnClick() {
  const searchInput = document.querySelector('.SearchByName input');
  const name = searchInput.value;
  searchInput.value = '321';
  if (name.length === 0) {

  }

  fetch('http:localhost:5000/menu/search/' + name, {
    method: 'GET'
  })
  .then(response => response.json())
  .then(data => loadTable(data['data']));
}
</script>

<template>
  <div class="SearchByName">
    <input type="text" placeholder="Search by item name">
    <button id="searchBtn" @click="handleSearchBtnClick">Search</button>
  </div>
</template>

<style scoped>
.SearchByName {
  margin: 0 auto;
  width: 750px;
}

.SearchByName input {
  height: 30px;
  width: 450px;
  padding: 0 20px;
  border-radius: 15px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  border: none;
}

#searchBtn {
  margin: 0 20px;
  height: 30px;
  width: 60px;
  border-radius: 15px;
}
</style>
