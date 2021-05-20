import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/views/index'
import Login from '@/components/views/login/login'
import Register from '@/components/views/register/register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path:'/index',
      name:'index',
      component:Index
    },{
      path:'/login',
      name:'login',
      component:Login
    },{
      path:'/register',
      name:'register',
      component:Register
    }
  ]
})
