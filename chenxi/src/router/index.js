import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import n from '../views/404.vue'
import {
  token
} from "../http/index";

Vue.use(VueRouter)
let t = localStorage.getItem('token')
let Token = new Promise((res, rej) => {
  token(t).then(data => {
    if (data.data.code == 0) {
      res(t)
    } else {
      rej()
    }
  })
})

const routes = [{
    path: '/home', //发送订单
    name: 'home',
    component: Home,
    beforeEnter: (to, from, next) => {
      Token.then((t) => {
        if (/2$/.test(t)) {
          next()
        } else {
          next({
            path: '/about'
          })
        }
      }, () => {
        next({
          path: '/about'
        })
      })
    }

  },
  {
    path: '/about', //库存
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/slist', //已出库
    name: 'slist',
    // route level code-splitting
    // this generates a separate chunk (slist.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "slist" */ '../views/Slist.vue'),
    beforeEnter: (to, from, next) => {
      Token.then((t) => {
        if (/1$/.test(t)) {
          next()
        } else {
          next({
            path: '/about'
          })
        }
      }, () => {
        next({
          path: '/about'
        })
      })
    }
  },
  {
    path: '/login', //注册
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/log', //登录
    name: 'log',
    // route level code-splitting
    // this generates a separate chunk (log.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "log" */ '../views/Log.vue')
  },
  {
    path: '/order', //订单列表
    name: 'order',
    // route level code-splitting
    // this generates a separate chunk (order.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "order" */ '../views/Order.vue'),
    beforeEnter: (to, from, next) => {
      Token.then((t) => {
        if (/1$/.test(t)) {
          next()
        } else {
          next({
            path: '/about'
          })
        }
      }, () => {
        next({
          path: '/about'
        })
      })
    }
  },
  {
    path: '*',
    name: '404',
    component: n
  },
]

const router = new VueRouter({
  routes
})

export default router