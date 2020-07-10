import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Money from '@/views/Money.vue'
import Chart from '@/views/Chart.vue'
import Edit from '@/views/Edit.vue'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/money',
    component: Money
  },{
    path: '/chart',
    component: Chart
  },
    {
      path: '/details/edit/:id',
      name:'detailEdit',
      component:Edit
    }
  
]

const router = new VueRouter({
  routes
})

export default router
