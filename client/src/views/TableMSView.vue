<script setup>
import { ref } from 'vue'
// @ is an alias to /src
import DataTable from '@/components/DataTable.vue'
import FloatingMenu from '@/components/FloatingMenu.vue'

const tablesColumns = ref(['id', 'table_id', 'type', 'customer_num'])
</script>


<template>
  <div class="tableMS">
    <FloatingMenu/>

    <DataTable :gridColumns="tablesColumns"/>
  </div>
</template>
  


<style>

</style>


