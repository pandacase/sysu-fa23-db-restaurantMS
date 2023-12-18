import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MenuMSView from '../views/MenuMSView.vue'
import OrderMSView from '../views/OrderMSView.vue'
import TableMSView from '../views/TableMSView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/menu',
    name: 'menu',
    component: MenuMSView
  },
  {
    path: '/order',
    name: 'order',
    component: OrderMSView
  },
  {
    path: '/table',
    name: 'table',
    component: TableMSView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
