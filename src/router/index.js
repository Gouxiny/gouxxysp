import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/views/index'
import Login from '@/views/login/login'
import Register from '@/views/register/register'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
    },{
      path:'*',
      name:'Helloworld',
      component:Index
    }
  ]
})
