<script setup>
const props = defineProps({
    show: Boolean,
    x: Number,
    y: Number,
    actions: Array
})

</script>

<template>
<div class="ContextMenuOfRow">
  <div
    class="fixed h-1/3 z-50 context-menu"
    :style="{ top: y + 'px', left: x + 'px' }" >
    <div
      class="options"
      v-for="action in actions"
      :key="action.action"
      @click="$emit('actionSelected', action.action)" >
      {{ action.label }}
    </div>
  </div>
</div>
</template>

<style scoped>
.context-menu {
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  min-width: 100px;
}

.context-menu .options {
  cursor: pointer;
}

.context-menu div:hover {
  background-color: #f0f0f0;
}
</style>