<script setup>
import { ref } from 'vue'
// @ is an alias to /src
import DataTable from '@/components/DataTable.vue'
import FloatingMenu from '@/components/FloatingMenu.vue'

const dishesColumns = ref(['id', 'name', 'price', 'description', 'icon'])
</script>

<template>
  <div class="orderMS">
    <FloatingMenu @refreshBtn="console.log('Refresh Click')"/>

    <DataTable :gridColumns="dishesColumns"/>
  </div>
</template>