import Vue from 'vue'
import Router from 'vue-router'

import login from '@/views/login.vue'
import graduateIndex from '@/views/graduateIndex.vue'
import resultWatch from '@/views/graduate/resultWatch.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/',
      name: '/',
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
