import Vue from 'vue'
import Router from 'vue-router'
import store from './store/index.js'

import Main from './templates/Main.vue'
import Login from './templates/Login.vue'
import Install from './templates/Install.vue'

import Hits from './views/Hits.vue'
import Snapshots from './views/Snapshots.vue'
import Whitelist from './views/Whitelist.vue'
import Regex from './views/Regex.vue'
import Fuzzy from './views/Fuzzy.vue'
import State from './views/State.vue'
import ImageCompare from './views/ImageCompare.vue'

import Users from './views/Users.vue'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Root',
      component: Main,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/state',
          name: 'State',
          component: State
        },
        {
          path: '/imagecompare',
          name: 'ImageCompare',
          component: ImageCompare
        },
        {
          path: '/hits',
          name: 'Hits',
          component: Hits
        },
        {
          path: '/snapshots',
          name: 'Snapshots',
          component: Snapshots
        },
        {
            path: '/whitelist',
            name: 'Whitelist',
            component: Whitelist
        },
        {
          path: '/regex',
          name: 'Regex',
          component: Regex
        },
        {
          path: '/fuzzy',
          name: 'Fuzzy',
          component: Fuzzy
        },
        {
          path: '/users',
          name: 'Users',
          component: Users
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/install',
      name: 'Install',
      component: Install
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters['auth/access_token']) {
      next({
        path: '/login',
        query: { redirect: to.fillPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
