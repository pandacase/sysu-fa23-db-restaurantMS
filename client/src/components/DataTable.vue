<script setup>
import DemoGrid from './Grid.vue'
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const searchQuery = ref('')

const dishesColumns = ['id', 'name', 'price', 'description', 'icon']
const ordersColumns = ['id', 'time_added', 'item_list', 'total_price']
const tablesColumns = ['id', 'table_id', 'type', 'customer_num']

const route = useRoute()
const gridColumns = computed(() => {
  const currentPath = route.path
  if (currentPath.includes('/menu')) {
    return dishesColumns
  } else if (currentPath.includes('/order')) {
    return ordersColumns
  } else if (currentPath.includes('/table')) {
    return tablesColumns
  }
})

const gridData = ref(null)
const isLoaded = ref(false)
const API_URL = `http://localhost:5000${route.path}`
watchEffect(async () => {
  const url = `${API_URL}/get`
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Http error with status: ${response.status}`)
    }
    const data = await response.json()
    gridData.value = data.data
    isLoaded.value = true;
  } catch (err) {
    console.log(err)
  }
})
</script>

<template>
  <div class="DataTable" >
    <form id="search">
      Search: <input name="query" v-model="searchQuery">
    </form>
      <DemoGrid
        v-if="isLoaded"
        class="TableBody"
        :data="gridData"
        :columns="gridColumns"
        :filter-key="searchQuery">
      </DemoGrid>
    <div v-if="!isLoaded">Loading...</div>
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