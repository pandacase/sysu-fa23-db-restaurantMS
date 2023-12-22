<!-- <template #body>
    <div v-for="col in modalContentColumns" :key="col.id">
      <div v-if="col === 'price' || col === 'total_price' || col === 'table_id' || col === 'customer_num'">
        <label :for="col">{{ capitalize(col) }}</label>
        <input type="number" :id="col">
      </div>
      <div v-else-if="col === 'description'">
        <label :for="col">{{ capitalize(col) }}</label>
        <textarea :id="col" :rows="4"></textarea>
      </div>
      <div v-else-if="col === 'item_list'">
        <label :for="col">{{ capitalize(col) }}</label>
        <div :id="col">还没有放东西</div>
      </div>
      <div v-else-if="col === 'type'">
        <label :for="col">{{ capitalize(col) }}</label>
        <select v-model="selected">
          <option disabled value="">Please select one</option>
          <option>small(2)</option>
          <option>middle(4)</option>
          <option>large(8)</option>
        </select>
      </div>
      <div v-else>
        <label :for="col">{{ capitalize(col) }}</label>
        <input type="text" :id="col">
      </div>
    </div>
  </template> -->