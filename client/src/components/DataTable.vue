<script setup>
import Grid from '@/components/Grid.vue'
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

// show content menu of row
function showContentMenuOfRow(event, entry) {
  showMenu.value = true
  event.preventDefault()
  menuX.value = event.clientX
  menuY.value = event.clientY
  console.log(entry.id)
}

import ContextMenu from '@/components/ContextMenuOfRow.vue'
const showMenu = ref(false)
const menuX = ref(0)
const menuY = ref(0)
const contextMenuActions = ref([
  { label: 'Edit', action: 'edit' },
  { label: 'Delete', action: 'delete' },
])

function handleAction(action) {
  console.log(action)
}
</script>

<template>
  <div class="DataTable" >
    <form id="search">
      Search: <input name="query" v-model="searchQuery">
    </form>
    
    <div v-if="!isLoaded">Loading...</div>
    
    <Grid
      v-if="isLoaded"
      class="TableBody"
      :data="gridData"
      :columns="props.gridColumns"
      :filter-key="searchQuery"
      @tableRowRightClicked="showContentMenuOfRow"
    />

    <ContextMenu
      v-if="showMenu"
      :x="menuX"
      :y="menuY"
      :actions="contextMenuActions"
      @actionSelected="handleAction"
    />
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