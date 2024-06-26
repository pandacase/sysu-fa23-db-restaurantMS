<script setup>
import { ref, defineEmits, watchEffect } from 'vue'
import { useRoute  } from 'vue-router'
const route = useRoute()


import DataTable from '@/components/DataTable.vue'
import FloatingMenu from '@/components/FloatingMenu.vue'
import Modal from '@/components/Modal.vue'
import { fetchData } from '@/components/Request.vue';

/* render the DataTable */
const ordersColumns = ref(['id', 'time_added', 'item_list', 'total_price', 'table_id'])

/* render the Modal */
const showModal = ref(false)
const modalContentColumns = ref(['item_list', 'table_id'])
const item_list = ref([])
const total_price = ref(0)
const table_id = ref(0)
const dishes_list = ref(null)
watchEffect(async () => {
  const data = await fetchData('http://45.77.18.47:5000/menu')
  dishes_list.value = data;
})

/* refresh event */
const reload = ref(false)

/* row options */
const id = ref(null)
function optionEdit(entry) {
  showModal.value = true
  // show the original value to user
  id.value = entry.id
  item_list.value = entry.item_list
  table_id.value = entry.table_id
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
const API_URL = `http://45.77.18.47:5000${route.path}`

function clearRef() {
  id.value = null
  item_list.value = null
  total_price.value = 0
  table_id.value = 0
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
        table_id: table_id.value
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
        table_id: table_id.value
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
              <div v-for="dish in dishes_list" :key="dish.id">
                <input type="checkbox" :id="dish.name" :value="dish.name" v-model="item_list">
                <label :for="dish.name">{{ dish.name }}</label>
                <input type="number" v-model="item_list">
              </div>
              <div>Checked names: {{ item_list }}</div>
              <br><br>
            </div>

            <div v-else-if="col === 'table_id'">
              <label :for="col">{{ capitalize(col) }}</label>
              <input type="number" :id="col" v-model="table_id">
            </div>
          </div>
        </template>
      </modal>
    </Teleport>
  </div>
</template>
