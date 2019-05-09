import Vue from 'vue'
import Router from 'vue-router'
import home from './views/pages/home/index.vue'
import login from './views/pages/account/index.vue'
import indexBody from './views/pages/home/components/index-body.vue'
import result from './views/pages/result/index.vue'
import detail from './views/pages/detail/index.vue'
import personal from './views/pages/personal/index.vue'
import personalData from './views/pages/personal/components/personal-data.vue' 
import cart from './views/pages/personal/components/cart.vue'
import order from './views/pages/personal/components/order.vue'
import admin from './views/pages/admin/index.vue'
import goods from './views/pages/admin/components/goods.vue'
import orderManagement from './views/pages/admin/components/order-management.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component:home,
      children:[
        {
          path: '/',
          name:'home',
          component:indexBody,          
        },
        {
          path: 'result/:key?',
          name:'result',
          component:result,          
        },
        {
          path: 'detail',
          name:'detail',
          component:detail,          
        }        
      ]
    },
    {
      path: '/account',
      name:'account',
      component:login
    },
    {
      path: '/home',
      redirect:'/'
    },
    {
      path:'/personal',
      component:personal,
      children:[
        {
          name:'personalData',
          path:'personaldata',
          component:personalData
        },
        {
          name:'cart',
          path:'cart',
          component:cart
        },
        {
          name:'order',
          path:'order/:command?',
          component:order
        }        
      ]
    },
    {
      path:'/admin',
      component:admin,
      children:[
        {
          path:'/',
          redirect:'goods'
        },
        {
          name:'goods',
          path:'goods',
          component:goods
        },
        {
          name:'orderManagement',
          path:'orderManagement',
          component:orderManagement
        }                     
      ]
    }    
  ]
})
