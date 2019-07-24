export default {
    namespaced: true,
    state: {
      domain: '',
      monitored: false,
      confirmed: false,
      unique: false,
      tags: []
    },
    mutations: {
      update_domain (state, payload) {
        state.domain = payload
      },
      filter_monitored (state, payload) {
        state.monitored = payload
      },
      filter_confirmed (state, payload) {
        state.confirmed = payload
      },
      filter_unique (state, payload) {
        state.unique = payload
      },
      filter_tags (state, payload) {
        state.tags = payload
      }
    },
    getters: {
      domain (state) {
        return state.domain
      },
      unique (state) {
        return state.unique
      },
      monitored (state) {
        return state.monitored
      },
      confirmed (state) {
        return state.confirmed
      },
      tags (state) {
        return state.tags
      }
    }
  }
  