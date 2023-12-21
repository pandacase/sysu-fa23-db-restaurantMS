<script setup>
import { ref } from 'vue'
// @ is an alias to /src
import DataTable from '@/components/DataTable.vue'
import FloatingMenu from '@/components/FloatingMenu.vue'

const ordersColumns = ref(['id', 'time_added', 'item_list', 'total_price'])

const reload = ref(false)
</script>

<template>
  <div class="orderMS">
    <FloatingMenu @reloadData="reload = true"/>

    <DataTable :gridColumns="ordersColumns" :reload="reload" @reloadFinished="reload = false"/>
  </div>
</template>
