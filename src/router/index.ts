import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import homeView from '../views/homeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    // component: HomeView
    component: import(/* webpackChunkName: "about" */ '../views/graphView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
