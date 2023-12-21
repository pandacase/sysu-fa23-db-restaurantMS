
<script setup>
import Modal from './Modal.vue'
import { ref, defineEmits } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

// Button 1: Back to top
function scrollToTop() {
  const top = document.querySelector('#topNav')
  top.scrollIntoView({behavior: 'smooth'})
}

// Button 2: Add Data => Open modal
const showAddModal = ref(false)
// Modal => Comfirm Btn handle
const emit = defineEmits();
const API_URL = `http://localhost:5000${route.path}`
async function addData() {
  const url = `${API_URL}/add`
  try {
    const response = await fetch(url, {
      headers: {
        'Content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        table_id: 0,
        type: 'small(2)'
      })
    })
    const result = await response.json()
    if (result.success) {
      showAddModal = false
      emit('reloadData')
    } else {
      alert('Network Err!')
    }
  } catch (err) {
    console.log(err)
  }
}
</script>

<template>
  <div class="FloatingMenu">
    <div class="btnList">
      <button id="backToTopBtn" class="iconfont icon-a-jiantou-shang" @click="scrollToTop"></button>
      <button id="addBtn" class="iconfont icon-tianjia-xian" @click="showAddModal = true"></button>
      <button id="refreshBtn" class="iconfont icon-zhongzhi-xian" @click="$emit('reloadData')"></button>
    </div>

    <Teleport to="body">
      <modal :show="showAddModal" @confirmBtn="addData" @cancelBtn="showAddModal = false">
        <template #header>
          <h3>custom header</h3>
        </template>
      </modal>
    </Teleport>
  </div>
</template>

<style scoped>
@import url('../icons/iconfont.css');

.btnList {
  position: fixed;
  top: 70%;
  transform: translateY(-50%);
  right: 100px;
}

.btnList button {
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 20px;
  border: none;
  margin: 20px 10px;
  cursor: pointer;
  font-size: 22px;
}

.btnList button:hover {
  border: 2px gray dashed;
}

.btnList button:active {
  background-color: white;
}
</style>