import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('../views/main.vue'),
    children:[
      {path: '/categories/create',name: 'categoryedit',component: () => import('../views/CategoryEdit.vue')},
      {path: '/categories/edit/:id',component: () => import('../views/CategoryEdit.vue'),props:true},
      {path: '/categories/list',name: 'categorylist',component: () => import('../views/CategoryList.vue')},
      
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
