<script setup>
import DemoGrid from './Grid.vue'
import { ref, watch, watchEffect, defineProps, defineEmits } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
import { fetchData } from '@/components/FetchData.vue'

const searchQuery = ref('')

const props = defineProps({
  gridColumns: {
    type: Array,
    required: true
  },
  reload: {
    type: Boolean
  }
})

// load data
const gridData = ref(null)
const isLoaded = ref(false)
const API_URL = `http://localhost:5000${route.path}`
watchEffect(async () => {
  const data = await fetchData(API_URL)
  gridData.value = data
  isLoaded.value = true
})

// reload data
const emit = defineEmits()
watch(() => props.reload, async (newValue, oldValue) => {
  if (oldValue == false && newValue == true) {
    isLoaded.value = false
    const data = await fetchData(API_URL)
    gridData.value = data
    isLoaded.value = true
    emit('reloadFinished')
  }
})
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