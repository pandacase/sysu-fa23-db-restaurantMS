<script setup>
import { ref, onMounted } from 'vue'
// @ is an alias to /src
import DataTable from '@/components/DataTable.vue'

const tableList = ref([])

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:5000/table/get')
    const data = await response.json()
    tableList.value = data['data']
  } catch (err) {
    console.error(err)
  }
})
</script>


<template>
  <div class="tableMS">
    <div>

    </div>

    <DataTable/>

    
  </div>
</template>
  


<style>

</style>


