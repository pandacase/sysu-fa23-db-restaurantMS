<script setup>
import { ref } from 'vue'
// @ is an alias to /src
import DataTable from '@/components/DataTable.vue'
import FloatingMenu from '@/components/FloatingMenu.vue'

const dishesColumns = ref(['id', 'name', 'price', 'description'])
const dishesColumnsToAdd = ref(['name', 'price', 'description'])

const reload = ref(false)
</script>

<template>
  <div class="orderMS">
    <DataTable :gridColumns="dishesColumns" :reload="reload" @reloadFinished="reload = false"/>
    
    <FloatingMenu :gridColumnsToAdd="dishesColumnsToAdd" @reloadData="reload = true"/>
  </div>
</template>