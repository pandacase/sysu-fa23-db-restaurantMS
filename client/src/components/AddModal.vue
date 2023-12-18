
<script>
export default {
  name: 'AddModal'
}
</script>

<template>
  <div class="AddModal">
    <div class="backgroud">
      <div class="window"></div>
    </div>
  </div>
</template>

<style scoped>
.backgroud {
  /* display: none; */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.window {
  position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 120px;
    background-color: white;
    border: #000 solid 2px;
}
</style>
