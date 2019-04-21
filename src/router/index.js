import Vue from 'vue'
import Router from 'vue-router'

import Indexs from '@/views/index.vue'
import Pe from '@/views/personalIntroduce.vue'
import Le from '@/views/learnContent.vue'
import login from '@/views/login.vue'
import adIndex from '@/views/admin/index.vue'
import graduateIndex from '@/views/graduateIndex.vue'
import resultWatch from '@/views/graduate/resultWatch.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: '/',
    component: Indexs,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/pe',
    name: 'pe',
    component: Pe,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/le',
    name: 'le',
    component: Le,
    meta: {
      keepAlive: true
    }
  },

  {
    path: '/handsome/',
    name: 'adindex',
    component: adIndex,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/graduateIndex',
    name: 'graduateIndex',
    component: graduateIndex,
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/resultWatch',
    name: 'resultWatch',
    component: resultWatch,
    meta: {
      keepAlive: false
    }
  }
  ]
})
