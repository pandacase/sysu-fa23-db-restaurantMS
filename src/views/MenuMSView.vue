<script setup>
import { ref, defineEmits } from 'vue'
import { useRoute  } from 'vue-router'
const route = useRoute()

import DataTable from '@/components/DataTable.vue'
import FloatingMenu from '@/components/FloatingMenu.vue'
import Modal from '@/components/Modal.vue'

/* render the DataTable */
const dishesColumns = ref(['id', 'name', 'price', 'description'])

/* render the Modal */
const showModal = ref(false)
const modalContentColumns = ref(['name', 'price', 'description'])
const name = ref('')
const price = ref(0)
const description = ref('')

/* refresh event */
const reload = ref(false)

/* row options */
const id = ref(null)
function optionEdit(entry) {
  showModal.value = true
  // show the original value to user
  id.value = entry.id
  name.value = entry.name
  price.value = entry.price
  description.value = entry.description
  // set the apiPath
  apiPath.value = '/update'
}

function optionDelete(rowId) {
  id.value = rowId
  deleteDish()
}

// api path router
const apiPath = ref('')
function handleSubmit() {
  if (apiPath.value === '/add') {
    addDish()
  } else if (apiPath.value === '/update') {
    updateDish()
  }
}

/* utils */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const emit = defineEmits()
const API_URL = `http://45.77.18.47:5000${route.path}`

function clearRef() {
  id.value = null
  name.value  = null
  price.value = ''
  description.value = ''
}


///////////////////////////////////////////////////////////
///////////* http methods *////////////////////////////////
///////////////////////////////////////////////////////////

async function addDish() {
  const url = `${API_URL}/add`
  try {
    const response = await fetch(url, {
      headers: {
        'Content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        name: name.value,
        price: price.value,
        description: description.value
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

async function updateDish() {
  const url = `${API_URL}/update`
  try {
    const response = await fetch(url, {
      headers: {
        'Content-type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({
        id: id.value,
        name: name.value,
        price: price.value,
        description: description.value
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

async function deleteDish() {
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
      :gridColumns="dishesColumns" 
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
            <div v-if="col === 'name'">
              <label :for="col">{{ capitalize(col) }}</label>
              <input type="text" :id="col" v-model="name">
            </div>

            <div v-else-if="col === 'price'">
              <label :for="col">{{ capitalize(col) }}</label>
              <input type="number" :id="col" v-model="price">
            </div>

            <div v-else-if="col === 'description'">
              <label :for="col">{{ capitalize(col) }}</label>
              <textarea :id="col" :rows="5" v-model="description"></textarea>
            </div>
          </div>
        </template>
      </modal>
    </Teleport>
  </div>
</template>