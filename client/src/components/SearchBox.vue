
<script>
import { loadTable } from './loadTable.vue'

export default {
  name: 'SearchBox',
  methods: {
    handleSearchBtnClick() {
      const searchInput = document.querySelector('.SearchBox input');
      const name = searchInput.value;
      searchInput.value = '';
      if (name.length === 0) {
        
      }

      fetch('http:localhost:5000/menu/search/' + name, {
        method: 'GET'
      })
      .then(response => response.json())
      .then(data => loadTable(data['data']));
    }
  }
}
</script>

<template>
  <div class="SearchBox">
    <input type="text" placeholder="Search by item name">
    <button id="searchBtn" @click="handleSearchBtnClick">Search</button>
  </div>
</template>

<style scoped>
.SearchBox {
  margin: 0 auto;
  width: 750px;
}

.SearchBox input {
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
