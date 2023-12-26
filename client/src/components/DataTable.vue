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
const API_URL = `http://66.42.114.101:5000${route.path}`
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

// handle option
function optionEdit(entry) {
  emit('optionEdit', entry)
}

function optionDelete(id) {
  emit('optionDelete', id)
}
</script>

<template>
  <div class="DataTable" @click="showMenu = false">
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
      @editBtnClicked="optionEdit"
      @deleteBtnClicked="optionDelete"
    />
  </div>
</template>

<style scoped>
.DataTable {
  margin: 0 auto;
  width: 100%;
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