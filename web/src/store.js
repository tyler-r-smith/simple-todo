import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: false
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
    getCurrentUser (context) {
      return new Promise((resolve, reject) => {
        fetch('/api/current-user')
          .then(response => response.json())
          .then(user => {
            context.commit('setUser', user)
            resolve(user)
          })
          .catch(err => {
            context.commit('setUser', false)
            reject(err)
          })
      })
    },
    authenticate (context, { username, password }) {
      return new Promise((resolve, reject) => {
        return fetch('/api/authenticate', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          body: JSON.stringify({
            username: username,
            password: password
          })
        })
          .then(res => res.json())
          .then(user => {
            context.commit('setUser', user)
            resolve(user)
          })
          .catch(reject)
      })
    },
    logout (context) {
      return new Promise((resolve, reject) => {
        return fetch('/api/user/logout', {
          method: 'post'
        })
          .then(_ => {
            context.commit('setUser', false)
            resolve(true)
          })
          .catch(reject)
      })
    }
  }
})
