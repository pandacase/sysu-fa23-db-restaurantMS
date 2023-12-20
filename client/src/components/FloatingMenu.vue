
<script setup>

</script>

<template>
  <div class="FloatingMenu">
    <div class="btnList">
      <button id="backToTopBtn">Top</button>
      <button id="refreshBtn">Re</button>
      <button id="addBtn">Add</button>
    </div>
  </div>
</template>

<style scoped>
@import url('../icons/iconfont.css');

.btnList {
  position: fixed;
  top: 75%;
  transform: translateY(-50%);
  right: 100px;
}

.btnList button {
  display: block;
  width: 50px;
  height: 50px;
  margin: 20px 10px;
}

</style>
