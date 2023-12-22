<script setup>
import { ref } from 'vue'
// @ is an alias to /src
import DataTable from '@/components/DataTable.vue'
import FloatingMenu from '@/components/FloatingMenu.vue'

const ordersColumns = ref(['id', 'time_added', 'item_list', 'total_price'])
const ordersColumnsToAdd = ref(['item_list', 'total_price'])

const reload = ref(false)
</script>

<template>
  <div class="orderMS">
    <DataTable :gridColumns="ordersColumns" :reload="reload" @reloadFinished="reload = false"/>
      
    <FloatingMenu :gridColumnsToAdd="ordersColumnsToAdd" @reloadData="reload = true"/>
  </div>
</template>
