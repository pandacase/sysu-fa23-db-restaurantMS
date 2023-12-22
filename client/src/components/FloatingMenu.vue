
<script setup>

// Button 1: Back to top
function scrollToTop() {
  const top = document.querySelector('#topNav')
  top.scrollIntoView({behavior: 'smooth'})
}
</script>

<template>
  <div class="FloatingMenu">
    <div class="btnList">
      <button 
        id="backToTopBtn" 
        class="iconfont icon-a-jiantou-shang" 
        @click="scrollToTop">
      </button>
      <button 
        id="addBtn" 
        class="iconfont icon-tianjia-xian" 
        @click="$emit('showModal')">
      </button>
      <button 
        id="refreshBtn" 
        class="iconfont icon-zhongzhi-xian" 
        @click="$emit('reloadData')">
      </button>
    </div>
  </div>
</template>

<style scoped>
@import url('../icons/iconfont.css');

.btnList {
  position: fixed;
  top: 70%;
  transform: translateY(-50%);
  right: 100px;
}

.btnList button {
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 20px;
  border: none;
  margin: 20px 10px;
  cursor: pointer;
  font-size: 22px;
}

.btnList button:hover {
  border: 2px gray dashed;
}

.btnList button:active {
  background-color: white;
}
</style>