<script setup>
import { ref } from 'vue'

// @ is an alias to /src
import DataTable from '@/components/DataTable.vue'
import FloatingMenu from '@/components/FloatingMenu.vue'

const dishesColumns = ref(['id', 'name', 'price', 'description', 'icon'])

const DataTableRef = ref()
function handleRefreshBtnClicked() {
  DataTableRef.value.fetchData();
  console.log("hi")
}

</script>

<template>
  <div class="orderMS">
    <FloatingMenu @refreshBtnClicked="handleRefreshBtnClicked"/>

    <DataTable :ref="DataTableRef" :gridColumns="dishesColumns"/>
  </div>
</template>
