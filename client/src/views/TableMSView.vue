<script setup>
import { ref, defineEmits } from 'vue'
import { useRoute  } from 'vue-router'
const route = useRoute()

import DataTable from '@/components/DataTable.vue'
import FloatingMenu from '@/components/FloatingMenu.vue'
import Modal from '@/components/Modal.vue'

/* render the DataTable */
const tablesColumns = ref(['id', 'table_id', 'type', 'customer_num'])

/* render the Modal */
const showModal = ref(false)
const modalContentColumns = ref(['table_id', 'type', 'customer_num'])
const table_id = ref(null)
const type = ref('')
const customer_num = ref(0)

/* refresh event */
const reload = ref(false)

/* row options */
const id = ref(null)
function optionEdit(entry) {
  showModal.value = true
  // show the original value to user
  id.value = entry.id
  table_id.value = entry.table_id
  type.value = entry.type
  customer_num.value = entry.customer_num
  // set the apiPath
  apiPath.value = '/update'
}

function optionDelete(rowId) {
  id.value = rowId
  deleteTable()
}

// api path router
const apiPath = ref('')
function handleSubmit() {
  if (apiPath.value === '/add') {
    addTable()
  } else if (apiPath.value === '/update') {
    updateTable()
  }
}

/* utils */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const emit = defineEmits()
const API_URL = `http://localhost:5000${route.path}`

function clearRef() {
  id.value = null
  table_id.value = null
  type.value = ''
  customer_num.value = 0
}

/* http methods */
async function addTable() {
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
      clearRef()
    } else {
      alert('Network Err!')
    }
  } catch (err) {
    console.log(err)
  }
}

async function updateTable() {
  const url = `${API_URL}/update`
  try {
    const response = await fetch(url, {
      headers: {
        'Content-type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({
        id: id.value,
        table_id: table_id.value,
        type: type.value,
        customer_num: customer_num.value
      })
    })
    const result = await response.json()
    if (result.success) {
      showModal.value = false
      reload.value = true
      clearRef()
    } else {
      alert('Network Err!')
    }
  } catch (err) {
    console.log(err)
  }
}

async function deleteTable() {
  const url = `${API_URL}/delete/${id.value}`
  try {
    const response = await fetch(url, {
      method: 'DELETE'
    })
    const result = await response.json()
    if (result.success) {
      reload.value = true
      clearRef()
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
      @optionEdit="optionEdit"
      @optionDelete="optionDelete"
    />
    
    <FloatingMenu 
      @showModal="showModal = true; apiPath = '/add'" 
      @reloadData="reload = true"
    />

    <Teleport to="body">
      <modal 
        :show="showModal" 
        @confirmBtn="handleSubmit" 
        @cancelBtn="showModal = false; clearRef()">
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
