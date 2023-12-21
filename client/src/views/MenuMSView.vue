<script setup>
import { ref } from 'vue'
// @ is an alias to /src
import DataTable from '@/components/DataTable.vue'
import FloatingMenu from '@/components/FloatingMenu.vue'

const dishesColumns = ref(['id', 'name', 'price', 'description', 'icon'])

const reload = ref(false)
</script>

<template>
  <div class="orderMS">
    <FloatingMenu @reloadData="reload = true"/>

    <DataTable :gridColumns="dishesColumns" :reload="reload" @reloadFinished="reload = false"/>
  </div>
</template>