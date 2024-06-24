<script setup>
import { ref, defineEmits } from 'vue'
import { useRoute  } from 'vue-router'
const route = useRoute()


import DataTable from '@/components/DataTable.vue'
import FloatingMenu from '@/components/FloatingMenu.vue'
import Modal from '@/components/Modal.vue'

/* render the DataTable */
const ordersColumns = ref(['id', 'time_added', 'item_list', 'total_price'])

/* render the Modal */
const showModal = ref(false)
const modalContentColumns = ref(['item_list', 'total_price'])
const item_list = ref(null)
const total_price = ref(0)

/* refresh event */
const reload = ref(false)

/* row options */
const id = ref(null)
function optionEdit(entry) {
  showModal.value = true
  // show the original value to user
  id.value = entry.id
  item_list.value = entry.item_list
  item_list.value = item_list.value.substring(1, item_list.value.length - 1)
  total_price.value = entry.total_price
  // set the apiPath
  apiPath.value = '/update'
}

// api path router
const apiPath = ref('')
function handleSubmit() {
  if (apiPath.value === '/add') {
    addOrder()
  } else if (apiPath.value === '/update') {
    updateOrder()
  }
}

function optionDelete(rowId) {
  id.value = rowId
  deleteOrder()
}

/* utils */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const emit = defineEmits()
const API_URL = `http://127.0.0.1:5000${route.path}`

function clearRef() {
  id.value = null
  item_list.value = null
  total_price.value = 0
}


///////////////////////////////////////////////////////////
///////////* http methods *////////////////////////////////
///////////////////////////////////////////////////////////

async function addOrder() {
  const url = `${API_URL}/add`
  try {
    const response = await fetch(url, {
      headers: {
        'Content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        item_list: item_list.value,
        total_price: total_price.value
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

async function updateOrder() {
  const url = `${API_URL}/update`
  try {
    const response = await fetch(url, {
      headers: {
        'Content-type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({
        id: id.value,
        item_list: item_list.value,
        total_price: total_price.value
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

async function deleteOrder() {
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
  <div class="orderMS">
    <DataTable 
      :gridColumns="ordersColumns" 
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
            <div v-if="col === 'item_list'">
              <label :for="col">{{ capitalize(col) }}</label>
              <input type="text" :id="col" v-model="item_list">
            </div>

            <div v-else-if="col === 'total_price'">
              <label :for="col">{{ capitalize(col) }}</label>
              <input type="number" :id="col" v-model="total_price">
            </div>
          </div>
        </template>
      </modal>
    </Teleport>
  </div>
</template>
