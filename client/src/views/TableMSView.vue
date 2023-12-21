<script setup>
import { ref } from 'vue'
// @ is an alias to /src
import DataTable from '@/components/DataTable.vue'
import FloatingMenu from '@/components/FloatingMenu.vue'

const tablesColumns = ref(['id', 'table_id', 'type', 'customer_num'])

const reload = ref(false)
</script>


<template>
  <div class="tableMS">
    <FloatingMenu @reloadData="reload = true"/>

    <DataTable :gridColumns="tablesColumns" :reload="reload" @reloadFinished="reload = false"/>
  </div>
</template>
  


<style>

</style>


