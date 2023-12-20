<script setup>
import DemoGrid from './Grid.vue'
import { ref, watchEffect, defineProps } from 'vue'
import { useRoute } from 'vue-router'

const searchQuery = ref('')

const route = useRoute()

const props = defineProps({
  gridColumns: {
    type: Array,
    required: true
  }
})

const gridData = ref(null)
const isLoaded = ref(false)
const API_URL = `http://localhost:5000${route.path}`
watchEffect(fetchData)
async function fetchData() {
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
}
</script>

<template>
  <div class="DataTable" >
    <form id="search">
      Search: <input name="query" v-model="searchQuery">
    </form>
    <div v-if="!isLoaded">Loading...</div>
      <DemoGrid
        v-if="isLoaded"
        class="TableBody"
        :data="gridData"
        :columns="props.gridColumns"
        :filter-key="searchQuery">
      </DemoGrid>
  </div>
</template>

<style scoped>
.DataTable {
  margin: 0 auto;
  width: 800px;
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
  margin: 25px auto;
}
</style>