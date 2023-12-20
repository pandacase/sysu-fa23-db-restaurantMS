<script setup>
import { ref } from 'vue'
// @ is an alias to /src
import DataTable from '@/components/DataTable.vue'
import FloatingMenu from '@/components/FloatingMenu.vue'

const ordersColumns = ref(['id', 'time_added', 'item_list', 'total_price'])
</script>

<template>
  <div class="orderMS">
    <FloatingMenu/>

    <DataTable :gridColumns="ordersColumns"/>
  </div>
</template>
