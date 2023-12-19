<script setup>
import DemoGrid from './Grid.vue'
import { ref } from 'vue'

const searchQuery = ref('')
const gridColumns = ['id', 'name', 'price', 'description']
const gridData = [
  { id: 1, name: 'Chuck Norris', price: 128, description: "none" },
  { id: 2, name: 'Bruce Lee', price: 328, description: "none" },
  { id: 3, name: 'Jackie Chan', price: 198, description: "none" },
  { id: 4, name: 'Jet Li', price: 648, description: "none" }
]
</script>

<template>
  <div class="DataTable">
    <form id="search">
      Search: <input name="query" v-model="searchQuery">
    </form>
    <DemoGrid
      class="TableBody"
      :data="gridData"
      :columns="gridColumns"
      :filter-key="searchQuery">
    </DemoGrid>
  </div>
</template>

<style scoped>
.DataTable {
  margin: 0 auto;
  width: 750px;
}

.DataTable input {
  height: 30px;
  width: 450px;
  padding: 0 20px;
  border-radius: 15px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  border: none;
  margin: 20px 0;
}

.TableBody {
  margin: 50px auto;
}
</style>