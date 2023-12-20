<script setup>
import { ref } from 'vue'
import { createApp } from 'vue'
const eventBus = createApp({})

// @ is an alias to /src
import DataTable from '@/components/DataTable.vue'
import FloatingMenu from '@/components/FloatingMenu.vue'

const tablesColumns = ref(['id', 'table_id', 'type', 'customer_num'])
</script>


<template>
  <div class="tableMS">
    <FloatingMenu @refreshBtn="console.log('Refresh Click')"/>

    <DataTable :gridColumns="tablesColumns"/>
  </div>
</template>
  


<style>

</style>


