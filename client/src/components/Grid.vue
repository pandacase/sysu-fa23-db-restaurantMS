<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  data: Array,
  columns: Array,
  filterKey: String
})

const sortKey = ref('')
const sortOrders = ref(
  props.columns.reduce((o, key) => ((o[key] = 1), o), {})
)

const filteredData = computed(() => {
  let { data, filterKey } = props
  if (filterKey) {
    filterKey = filterKey.toLowerCase()
    data = data.filter((row) => {
      return Object.keys(row).some((key) => {
        return String(row[key]).toLowerCase().indexOf(filterKey) > -1
      })
    })
  }
  const key = sortKey.value
  if (key) {
    const order = sortOrders.value[key]
    data = data.slice().sort((a, b) => {
      a = a[key]
      b = b[key]
      return (a === b ? 0 : a > b ? 1 : -1) * order
    })
  }
  return data
})

function sortBy(key) {
  sortKey.value = key
  sortOrders.value[key] *= -1
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// row hover
const isHover = ref({})
for (const row of props.data) {
  isHover[row.id] = false
}
console.log(isHover)

function handleMouseHover(id) {
  isHover.value[id] = true
}

function handleMouseLeave(id) {
  isHover.value[id] = false
}
</script>

<template>
  <table v-if="filteredData.length">
    <thead>
      <tr>
        <th v-for="key in columns"
          @click="sortBy(key)"
          :class="{ active: sortKey == key }">
          {{ capitalize(key) }}
          <span class="arrow" 
            :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
          </span>
        </th>

        <th class="optionTh">
          Options
        </th>        
      </tr>
    </thead>
    <tbody>
      <tr 
        v-for="entry in filteredData" 
        :key="entry.id"
        :class="{'hoverRow': isHover[entry.id]}"
        @mouseover="handleMouseHover(entry.id)"
        @mouseleave="handleMouseLeave(entry.id)"
        >
        <td v-for="key in columns">
          {{entry[key]}}
        </td>
        
        <td class="optionTd">
          <button class="iconfont icon-bianji-xian" 
            @click="$emit('editBtnClicked', entry)"></button>
          <button class="iconfont icon-shanchu-xian"
            @click="$emit('deleteBtnClicked', entry.id)"></button>
        </td>
      </tr>
    </tbody>
  </table>
  <p v-else>Empty result</p>
</template>

<style scoped>
@import url('../icons/iconfont.css');

/* row hover */
.hoverRow td {
  background-color: white;
}

/* button style */
.optionTd button {
  margin: 0 5px;
  border: 2px solid #f9f9f9;
  width: 30px;
  height: 30px;
  border-radius: 10px;
}

.optionTd button:hover {
  border: 2px dashed gray;
}

/* nomal style */
table {
  border: 2px solid #eec927;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #eec927;
  color: rgba(255, 255, 255, 0.66);
  cursor: pointer;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th,
td {
  min-width: 100px;
  padding: 10px 20px;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}

/* tr td:hover {
  background-color: white;
} */

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}
</style>