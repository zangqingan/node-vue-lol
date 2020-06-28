import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('../views/main.vue'),
    children:[
      // 分类
      {path: '/categories/create',name: 'categoryedit',component: () => import('../views/CategoryEdit.vue')},
      {path: '/categories/edit/:id',component: () => import('../views/CategoryEdit.vue'),props:true},
      {path: '/categories/list',name: 'categorylist',component: () => import('../views/CategoryList.vue')},
      // 物品
      {path: '/items/create',name: 'itemedit',component: () => import('../views/ItemEdit.vue')},
      {path: '/items/edit/:id',component: () => import('../views/ItemEdit.vue'),props:true},
      {path: '/items/list',name: 'itemlist',component: () => import('../views/ItemList.vue')},
      
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
