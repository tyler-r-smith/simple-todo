import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Store from './store'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/user',
      name: 'about',
      beforeEnter: (to, from, next) => {
        const currentUser = Store.state.user
        if (!currentUser) {
          fetch('/api/current-user')
            .then(results => results.json())
            .then(user => {
              Store.commit('setUser', user)
            })
            .catch(err => {
              console.error(err)
              next({ path: '/' })
            })
        }
        next()
      },
      component: () => import(/* webpackChunkName: "user" */ './views/User.vue')
    }
  ]
})
