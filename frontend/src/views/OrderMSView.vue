<template>
  <div>
    <!-- 订单列表 -->
    <ul>
      <li v-for="order in orders" :key="order.id">
        {{ order.content }} - {{ order.money }}
        <button @click="deleteOrder(order.id)">删除</button>
      </li>
    </ul>

    <!-- 悬浮菜单栏 -->
    <div class="floating-menu">
      <button @click="showForm">新建订单</button>
      <button @click="scrollToTop">回到顶部</button>
    </div>

    <!-- 新建订单窗口 -->
    <div v-if="showNewOrderForm">
      <input type="text" v-model="newOrder.time" placeholder="订单时间">
      <input type="text" v-model="newOrder.content" placeholder="订单内容">
      <input type="number" v-model="newOrder.money" placeholder="订单金额">
      <button @click="addOrder">确定</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: [],              // 存放从数据库查询到的订单列表
      showNewOrderForm: false, // 控制是否显示新建订单窗口
      newOrder: {              // 存放新建订单的数据
        time: '',
        content: '',
        money: 0
      }
    }
  },
  mounted() {
    // 在页面加载时，从数据库查询订单内容
    this.fetchOrders();
  },
  methods: {
    fetchOrders() {
      // 发送请求到后端，从数据库查询订单内容
      // 将返回的订单数据赋值给 orders 数组
    },
    deleteOrder(id) {
      // 发送请求到后端，删除指定 ID 的订单
      // 删除成功后，从 orders 数组中删除对应的订单数据
    },
    showForm() {
      // 显示新建订单窗口
      this.showNewOrderForm = true;
    },
    addOrder() {
      // 发送请求到后端，将新建订单的数据保存到数据库
      // 添加成功后，将新订单数据添加到 orders 数组
      // 清空 newOrder 对象的数据
      this.showNewOrderForm = false;
    },
    scrollToTop() {
      // 回到页面顶部的逻辑
    }
  }
}
</script>

<style>
.floating-menu {
  position: fixed;
  top: 50%; /* 调整位置，使菜单垂直居中 */
  right: 20px;
}
</style>
