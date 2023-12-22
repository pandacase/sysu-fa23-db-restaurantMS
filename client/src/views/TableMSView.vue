<script setup>
import { ref, defineEmits } from 'vue'
import { useRoute  } from 'vue-router'
const route = useRoute()

import DataTable from '@/components/DataTable.vue'
import FloatingMenu from '@/components/FloatingMenu.vue'
import Modal from '@/components/Modal.vue'

// render the DataTable
const tablesColumns = ref(['id', 'table_id', 'type', 'customer_num'])

// render the Modal
const showModal = ref(false)
const modalContentColumns = ref(['table_id', 'type', 'customer_num'])
const table_id = ref(null)
const type = ref('')
const customer_num = ref(0)

// refresh event
const reload = ref(false)

// utils
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const emit = defineEmits()
const API_URL = `http://localhost:5000${route.path}`
async function sumitTable() {
  const url = `${API_URL}/add`
  try {
    const response = await fetch(url, {
      headers: {
        'Content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        table_id: table_id.value,
        type: type.value,
        customer_num: customer_num.value
      })
    })
    const result = await response.json()
    if (result.success) {
      showModal.value = false
      reload.value = true
    } else {
      alert('Network Err!')
    }
  } catch (err) {
    console.log(err)
  }
}
</script>


<template>
  <div class="tableMS">
    <DataTable 
      :gridColumns="tablesColumns" 
      :reload="reload" 
      @reloadFinished="reload = false"
    />
    
    <FloatingMenu 
      @showModal="showModal = true" 
      @reloadData="reload = true"
    />

    <Teleport to="body">
      <modal 
        :show="showModal" 
        @confirmBtn="sumitTable" 
        @cancelBtn="showModal = false">
        <template #header>
          <h3>Add a new {{ route.path.substring(1) }}</h3>
        </template>

        <template #body>
          <div v-for="col in modalContentColumns" :key="col.id">
            <div v-if="col === 'table_id'">
              <label :for="col">{{ capitalize(col) }}</label>
              <input type="number" :id="col" v-model="table_id">
            </div>

            <div v-else-if="col === 'type'">
              <label :for="col">{{ capitalize(col) }}</label>
              <select v-model="type" >
                <option disabled value="">Please select one</option>
                <option>small(2)</option>
                <option>middle(4)</option>
                <option>large(8)</option>
              </select>
            </div>

            <div v-else-if="col === 'customer_num'">
              <label :for="col">{{ capitalize(col) }}</label>
              <input type="number" :id="col" v-model="customer_num">
            </div>
          </div>
        </template>
      </modal>
    </Teleport>
  </div>
</template>
  


<style>

</style>


